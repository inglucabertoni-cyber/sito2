"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorizzato.");

  const requestId = formData.get("requestId") as string;
  const file = formData.get("file") as File;

  if (!file || file.size === 0) throw new Error("Nessun file selezionato.");
  if (file.size > 10 * 1024 * 1024) throw new Error("File troppo grande (max 10 MB).");

  // Verify ownership
  const request = await prisma.request.findUnique({
    where: { id: requestId, clientId: session.user.id! },
  });
  if (!request) throw new Error("Non autorizzato.");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "uploads", requestId);
  await mkdir(uploadDir, { recursive: true });

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filename = `${Date.now()}-${safeName}`;
  await writeFile(path.join(uploadDir, filename), buffer);

  await prisma.document.create({
    data: {
      requestId,
      name: file.name,
      path: path.join("uploads", requestId, filename),
      size: file.size,
      mimeType: file.type || "application/octet-stream",
      uploadedBy: session.user.id!,
    },
  });

  revalidatePath(`/dashboard/richiesta/${requestId}`);
}

export async function deleteDocument(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorizzato.");

  const documentId = formData.get("documentId") as string;
  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    include: { request: true },
  });

  if (!doc || doc.request.clientId !== session.user.id) throw new Error("Non autorizzato.");

  await prisma.document.delete({ where: { id: documentId } });
  revalidatePath(`/dashboard/richiesta/${doc.requestId}`);
}
