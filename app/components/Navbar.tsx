import Link from "next/link";
import { auth } from "@/auth";
import { LogoFull } from "./Logo";
import { logout } from "@/app/actions/auth";

export default async function Navbar({ inverted = false }: { inverted?: boolean }) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;

  const linkClass = inverted
    ? "text-sm text-white/80 hover:text-white px-3 py-2"
    : "text-sm text-gray-600 hover:text-gray-900 px-3 py-2";

  return (
    <header className={inverted ? "bg-transparent" : "bg-white border-b border-gray-200"}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <LogoFull inverted={inverted} />
        </Link>
        <nav className="flex items-center gap-2">
          {session ? (
            <>
              {role === "ADMIN" ? (
                <>
                  <Link href="/admin" className={linkClass}>Richieste</Link>
                  <Link href="/admin/prestazioni" className={linkClass}>Servizi</Link>
                  <form action={logout} className="inline">
                    <button className={linkClass}>Esci</button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className={linkClass}>Le mie pratiche</Link>
                  <form action={logout} className="inline">
                    <button className={linkClass}>Esci</button>
                  </form>
                </>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass}>Accedi</Link>
              <Link
                href="/register"
                className="text-sm bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-5 py-2 rounded-lg"
              >
                Inizia ora
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
