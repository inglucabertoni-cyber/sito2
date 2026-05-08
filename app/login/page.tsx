"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const params = useSearchParams();
  const registered = params.get("registered");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Accedi</h1>
        {registered && (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2">
            Registrazione completata. Accedi ora.
          </p>
        )}
        {state?.message && (
          <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
            {state.message}
          </p>
        )}
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm disabled:opacity-60"
          >
            {pending ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Non hai un account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
