"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function checkAdmin() {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    throw new Error("Non autorizzato.");
  }
  return session;
}

export async function createService(formData: FormData) {
  await checkAdmin();
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const workflowType = (formData.get("workflowType") as string) || "GENERICO";
  if (!name || !description) return;
  await prisma.service.create({ data: { name, description, workflowType } });
  revalidatePath("/admin/prestazioni");
  redirect("/admin/prestazioni");
}

export async function toggleService(formData: FormData) {
  await checkAdmin();
  const id = formData.get("id") as string;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return;
  await prisma.service.update({ where: { id }, data: { isActive: !service.isActive } });
  revalidatePath("/admin/prestazioni");
}

export async function deleteService(formData: FormData) {
  await checkAdmin();
  const id = formData.get("id") as string;
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/prestazioni");
}

export async function advanceStatus(formData: FormData) {
  await checkAdmin();

  const requestId = formData.get("requestId") as string;
  const newStatus = formData.get("status") as string;
  const message = (formData.get("message") as string)?.trim() || null;

  const { getWorkflow } = await import("@/lib/constants");

  const request = await prisma.request.findUnique({
    where: { id: requestId },
    include: {
      statusUpdates: { orderBy: { createdAt: "desc" }, take: 1 },
      service: true,
    },
  });
  if (!request) throw new Error("Richiesta non trovata.");

  const currentStatus = request.statusUpdates[0]?.status ?? "INVIATA";
  const workflow = getWorkflow(request.service.workflowType);
  const allowed = workflow.transitions[currentStatus] ?? [];
  if (!allowed.includes(newStatus)) throw new Error("Transizione non consentita.");

  await prisma.statusUpdate.create({ data: { requestId, status: newStatus, message } });

  revalidatePath(`/admin/richiesta/${requestId}`);
  revalidatePath(`/dashboard/richiesta/${requestId}`);
}
