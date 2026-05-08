export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { confirmAppointment, cancelAppointment } from "@/app/actions/appointments";
import { LogoFull } from "@/app/components/Logo";
import Link from "next/link";

const SERVICE_LABEL: Record<string, string> = {
  ANALISI_IMMOBILE: "Analisi immobile",
  DUE_DILIGENCE: "Due diligence",
  PROGETTAZIONE: "Progettazione",
  APPALTO: "Gare d'appalto",
  GENERALE: "Consulenza generale",
};

const STATUS_COLOR: Record<string, string> = {
  RICHIESTA: "bg-blue-100 text-blue-700",
  CONFERMATO: "bg-green-100 text-green-700",
  ANNULLATO: "bg-red-100 text-red-700",
};

export default async function AdminAppuntamentiPage() {
  await auth();

  const appuntamenti = await prisma.appointment.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });

  const inAttesa = appuntamenti.filter((a) => a.status === "RICHIESTA");
  const altri = appuntamenti.filter((a) => a.status !== "RICHIESTA");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Admin</Link>
          <span className="text-gray-200">|</span>
          <Link href="/"><LogoFull /></Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[#0F2540]">Appuntamenti</h2>
          <span className="text-sm bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full">
            {inAttesa.length} in attesa
          </span>
        </div>

        {inAttesa.length > 0 && (
          <>
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">Da confermare</h3>
            <div className="space-y-4 mb-10">
              {inAttesa.map((a) => (
                <div key={a.id} className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-bold text-[#0F2540]">{a.client.name}</p>
                      <p className="text-xs text-gray-400">{a.client.email}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">📍 {a.city}</span>
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                          {SERVICE_LABEL[a.serviceType] ?? a.serviceType}
                        </span>
                        {a.preferredDate && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                            📅 {new Date(a.preferredDate).toLocaleDateString("it-IT")}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full">
                      In attesa
                    </span>
                  </div>

                  {a.notes && (
                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                      <p className="text-xs text-gray-400 mb-1 font-semibold">Note del cliente</p>
                      <p className="text-sm text-gray-600">{a.notes}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3">
                    <form action={confirmAppointment} className="space-y-2">
                      <input type="hidden" name="id" value={a.id} />
                      <input
                        type="date"
                        name="confirmedDate"
                        required
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                      <input
                        type="text"
                        name="confirmedNotes"
                        placeholder="Note di conferma (facoltativo)"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                      />
                      <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                      >
                        Conferma appuntamento
                      </button>
                    </form>
                    <form action={cancelAppointment}>
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        className="w-full border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2 rounded-lg text-sm transition-colors"
                      >
                        Annulla
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {altri.length > 0 && (
          <>
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">Archivio</h3>
            <div className="space-y-3">
              {altri.map((a) => (
                <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-3 opacity-70">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{a.client.name}</p>
                    <p className="text-xs text-gray-400">{a.city} · {SERVICE_LABEL[a.serviceType] ?? a.serviceType}</p>
                    {a.confirmedDate && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Confermato per il {new Date(a.confirmedDate).toLocaleDateString("it-IT")}
                      </p>
                    )}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[a.status]}`}>
                    {a.status === "CONFERMATO" ? "Confermato" : "Annullato"}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {appuntamenti.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">Nessun appuntamento ancora richiesto.</p>
          </div>
        )}
      </main>
    </div>
  );
}
