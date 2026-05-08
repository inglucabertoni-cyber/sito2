"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function bookAppointment(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const city = (formData.get("city") as string).trim();
  const serviceType = (formData.get("serviceType") as string).trim();
  const preferredDate = (formData.get("preferredDate") as string).trim() || null;
  const notes = (formData.get("notes") as string).trim() || null;

  if (!city || !serviceType) return;

  await prisma.appointment.create({
    data: {
      clientId: session.user.id!,
      city,
      serviceType,
      preferredDate,
      notes,
      status: "RICHIESTA",
    },
  });

  redirect("/dashboard?appuntamento=richiesto");
}

export async function confirmAppointment(formData: FormData) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    throw new Error("Non autorizzato.");
  }

  const id = formData.get("id") as string;
  const confirmedDate = (formData.get("confirmedDate") as string).trim();
  const confirmedNotes = (formData.get("confirmedNotes") as string).trim() || null;

  await prisma.appointment.update({
    where: { id },
    data: { status: "CONFERMATO", confirmedDate, confirmedNotes },
  });

  revalidatePath("/admin/appuntamenti");
  revalidatePath("/dashboard");
}

export async function cancelAppointment(formData: FormData) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    throw new Error("Non autorizzato.");
  }

  const id = formData.get("id") as string;
  await prisma.appointment.update({
    where: { id },
    data: { status: "ANNULLATO" },
  });

  revalidatePath("/admin/appuntamenti");
}
