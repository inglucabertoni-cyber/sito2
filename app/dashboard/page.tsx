export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { STATO_COLOR, STATO_LABEL } from "@/lib/constants";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { LogoFull } from "@/app/components/Logo";

const SERVICE_LABEL: Record<string, string> = {
  ANALISI_IMMOBILE: "Analisi immobile",
  DUE_DILIGENCE: "Due diligence",
  PROGETTAZIONE: "Progettazione",
  APPALTO: "Gare d'appalto",
  GENERALE: "Consulenza generale",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ appuntamento?: string }>;
}) {
  const session = await auth();
  if ((session?.user as { role: string })?.role === "ADMIN") redirect("/admin");

  const { appuntamento } = await searchParams;

  const [requests, appuntamenti] = await Promise.all([
    prisma.request.findMany({
      where: { clientId: session!.user!.id! },
      include: {
        service: true,
        statusUpdates: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.appointment.findMany({
      where: { clientId: session!.user!.id! },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/"><LogoFull /></Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:block text-sm text-gray-500">Ciao, <strong>{session!.user!.name}</strong></span>
            <form action={logout}>
              <button className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Esci</button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-8">

        {/* Conferma appuntamento richiesto */}
        {appuntamento === "richiesto" && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <span className="text-green-500 text-xl flex-shrink-0">✓</span>
            <div>
              <p className="font-semibold text-green-800 text-sm">Richiesta inviata con successo!</p>
              <p className="text-xs text-green-600 mt-0.5">Ti contatteremo entro 24 ore per confermare data e ora.</p>
            </div>
          </div>
        )}

        {/* Sezione consulenze */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-[#0F2540]">Le mie consulenze</h2>
            <Link
              href="/dashboard/appuntamento/nuovo"
              className="text-xs bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              + Nuova consulenza
            </Link>
          </div>

          {appuntamenti.length === 0 ? (
            <Link
              href="/dashboard/appuntamento/nuovo"
              className="block rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/60 hover:bg-amber-50 hover:border-amber-400 transition-colors p-6 text-center"
            >
              <div className="text-2xl mb-2">📅</div>
              <p className="font-bold text-[#0F2540] text-sm mb-1">Prenota la tua consulenza gratuita</p>
              <p className="text-xs text-gray-500">Scegli città, servizio e data preferita — rispondiamo entro 24 ore</p>
              <span className="inline-block mt-3 bg-[#F59E0B] text-white font-semibold px-5 py-2 rounded-xl text-xs">
                Prenota ora →
              </span>
            </Link>
          ) : (
            <div className="space-y-3">
              {appuntamenti.map((a) => (
                <div key={a.id} className={`rounded-2xl border p-4 sm:p-5 ${
                  a.status === "CONFERMATO" ? "bg-green-50 border-green-200" :
                  a.status === "ANNULLATO" ? "bg-gray-100 border-gray-200 opacity-60" :
                  "bg-blue-50 border-blue-200"
                }`}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-gray-800">
                          {SERVICE_LABEL[a.serviceType] ?? a.serviceType}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          a.status === "CONFERMATO" ? "bg-green-200 text-green-800" :
                          a.status === "ANNULLATO" ? "bg-gray-200 text-gray-600" :
                          "bg-blue-200 text-blue-800"
                        }`}>
                          {a.status === "CONFERMATO" ? "Confermato" :
                           a.status === "ANNULLATO" ? "Annullato" : "In attesa di conferma"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">📍 {a.city}</p>
                      {a.confirmedDate && (
                        <p className="text-sm font-semibold text-green-700 mt-1">
                          📅 {new Date(a.confirmedDate).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                      )}
                      {a.confirmedNotes && (
                        <p className="text-xs text-gray-600 mt-1">{a.confirmedNotes}</p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString("it-IT")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sezione pratiche */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black text-[#0F2540]">Le mie pratiche</h2>
          </div>

          {requests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 text-center text-gray-400">
              <p className="text-sm mb-2">Nessuna pratica ancora aperta.</p>
              <p className="text-xs text-gray-300">Dopo la consulenza iniziale, il tuo consulente aprirà la pratica.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => {
                const stato = req.statusUpdates[0]?.status ?? "INVIATA";
                return (
                  <Link
                    key={req.id}
                    href={`/dashboard/richiesta/${req.id}`}
                    className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 hover:shadow-sm hover:border-gray-200 transition-all"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{req.service.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(req.createdAt).toLocaleDateString("it-IT")}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ml-3 ${STATO_COLOR[stato]}`}>
                      {STATO_LABEL[stato]}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
