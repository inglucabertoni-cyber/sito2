export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { STATO_COLOR, STATO_LABEL } from "@/lib/constants";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { auth } from "@/auth";
import { LogoFull } from "@/app/components/Logo";

export default async function AdminPage() {
  const session = await auth();
  const requests = await prisma.request.findMany({
    include: {
      client: true,
      service: true,
      statusUpdates: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  });

  const aperte = requests.filter((r) => {
    const s = r.statusUpdates[0]?.status;
    return s !== "RISPOSTA_FORNITA" && s !== "RIFIUTATA";
  });
  const chiuse = requests.filter((r) => {
    const s = r.statusUpdates[0]?.status;
    return s === "RISPOSTA_FORNITA" || s === "RIFIUTATA";
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/"><LogoFull /></Link>
          <div className="flex items-center gap-4">
            <Link href="/admin/appuntamenti" className="text-sm text-gray-600 hover:text-gray-900">
              Appuntamenti
            </Link>
            <Link href="/admin/prestazioni" className="text-sm text-gray-600 hover:text-gray-900">
              Prestazioni
            </Link>
            <span className="text-sm text-gray-600">Admin: {session!.user!.name}</span>
            <form action={logout}>
              <button className="text-sm text-gray-500 hover:text-gray-800">Esci</button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pannello Admin</h2>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{requests.length}</p>
            <p className="text-sm text-gray-600 mt-1">Richieste totali</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-orange-500">{aperte.length}</p>
            <p className="text-sm text-gray-600 mt-1">In lavorazione</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{chiuse.length}</p>
            <p className="text-sm text-gray-600 mt-1">Chiuse</p>
          </div>
        </div>

        {aperte.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Richieste aperte</h3>
            <div className="space-y-3 mb-8">
              {aperte.map((req) => {
                const stato = req.statusUpdates[0]?.status ?? "INVIATA";
                return (
                  <Link
                    key={req.id}
                    href={`/admin/richiesta/${req.id}`}
                    className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{req.service.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {req.client.name} · {new Date(req.createdAt).toLocaleDateString("it-IT")}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATO_COLOR[stato]}`}>
                        {STATO_LABEL[stato]}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {chiuse.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Richieste chiuse</h3>
            <div className="space-y-3">
              {chiuse.map((req) => {
                const stato = req.statusUpdates[0]?.status ?? "INVIATA";
                return (
                  <Link
                    key={req.id}
                    href={`/admin/richiesta/${req.id}`}
                    className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow opacity-70"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{req.service.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {req.client.name} · {new Date(req.createdAt).toLocaleDateString("it-IT")}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATO_COLOR[stato]}`}>
                        {STATO_LABEL[stato]}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {requests.length === 0 && (
          <p className="text-center text-gray-500 py-16">Nessuna richiesta ancora ricevuta.</p>
        )}
      </main>
    </div>
  );
}
