"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createRequest(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const serviceId = formData.get("serviceId") as string;
  const notes = formData.get("notes") as string;

  const service = await prisma.service.findUnique({ where: { id: serviceId, isActive: true } });
  if (!service) throw new Error("Prestazione non trovata.");

  const request = await prisma.request.create({
    data: {
      clientId: session.user.id!,
      serviceId,
      notes: notes || null,
      statusUpdates: {
        create: { status: "INVIATA", message: "Richiesta inviata con successo." },
      },
    },
  });

  redirect(`/dashboard/richiesta/${request.id}`);
}

