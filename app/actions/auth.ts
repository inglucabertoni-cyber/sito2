"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2, { error: "Nome troppo corto." }).trim(),
  email: z.email({ error: "Email non valida." }).trim(),
  password: z.string().min(8, { error: "Password di almeno 8 caratteri." }).trim(),
});

type FormState = { errors?: Record<string, string[]>; message?: string } | undefined;

export async function register(state: FormState, formData: FormData): Promise<FormState> {
  const parsed = RegisterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }
  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { message: "Email già registrata." };
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, password: hashed } });
  redirect("/login?registered=1");
}

export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (e: unknown) {
    const err = e as { type?: string };
    if (err?.type === "AuthError" || err?.type === "CredentialsSignin") {
      return { message: "Email o password non corretti." };
    }
    throw e;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
