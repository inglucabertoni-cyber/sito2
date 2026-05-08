"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Registrati</h1>
        {state?.message && (
          <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
            {state.message}
          </p>
        )}
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              name="name"
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.name && (
              <p className="text-xs text-red-600 mt-1">{state.errors.name[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.email && (
              <p className="text-xs text-red-600 mt-1">{state.errors.email[0]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state?.errors?.password && (
              <p className="text-xs text-red-600 mt-1">{state.errors.password[0]}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm disabled:opacity-60"
          >
            {pending ? "Registrazione in corso..." : "Crea account"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Hai già un account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
