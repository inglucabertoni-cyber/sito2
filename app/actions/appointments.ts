"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const BookSchema = z.object({
  city: z.string().min(1, "Seleziona una città"),
  serviceType: z.string().min(1, "Seleziona un tipo di servizio"),
  address: z.string().min(5, "Inserisci l'indirizzo completo (via, numero, città)"),
  preferredDate: z.string().optional(),
  notes: z.string().optional(),
});

export async function bookAppointment(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const raw = {
    city: (formData.get("city") as string ?? "").trim(),
    serviceType: (formData.get("serviceType") as string ?? "").trim(),
    address: (formData.get("address") as string ?? "").trim(),
    preferredDate: (formData.get("preferredDate") as string ?? "").trim() || undefined,
    notes: (formData.get("notes") as string ?? "").trim() || undefined,
  };

  const result = BookSchema.safeParse(raw);
  if (!result.success) {
    const msg = result.error.issues.map((e) => e.message).join(", ");
    throw new Error(msg);
  }

  await prisma.appointment.create({
    data: {
      clientId: session.user.id!,
      city: result.data.city,
      address: result.data.address,
      serviceType: result.data.serviceType,
      preferredDate: result.data.preferredDate ?? null,
      notes: result.data.notes ?? null,
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

export async function cancelAppointmentByClient(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const id = formData.get("id") as string;
  await prisma.appointment.update({
    where: { id, clientId: session.user.id! },
    data: { status: "ANNULLATO" },
  });

  revalidatePath("/dashboard");
}
