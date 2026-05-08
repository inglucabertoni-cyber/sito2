export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LogoFull } from "@/app/components/Logo";
import Link from "next/link";
import MappaWrapper from "@/app/components/MappaWrapper";
import type { AppuntamentoPin } from "@/app/components/MappaAppuntamenti";

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

const STATUS_LABEL: Record<string, string> = {
  RICHIESTA: "In attesa",
  CONFERMATO: "Confermato",
  ANNULLATO: "Annullato",
};

export default async function StoricoAppuntamentiPage() {
  await auth();

  const appuntamenti = await prisma.appointment.findMany({
    include: { client: true },
    orderBy: { confirmedDate: "asc" },
  });

  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);

  const futuri = appuntamenti.filter(
    (a) => a.status === "CONFERMATO" && a.confirmedDate && new Date(a.confirmedDate) >= oggi
  );
  const passati = appuntamenti.filter(
    (a) => a.status === "CONFERMATO" && a.confirmedDate && new Date(a.confirmedDate) < oggi
  );
  const inAttesa = appuntamenti.filter((a) => a.status === "RICHIESTA");
  const annullati = appuntamenti.filter((a) => a.status === "ANNULLATO");

  const sections = [
    { title: "Prossimi appuntamenti", items: futuri, emptyMsg: "Nessun appuntamento futuro." },
    { title: "Appuntamenti passati", items: passati, emptyMsg: "Nessun appuntamento passato." },
    { title: "In attesa di conferma", items: inAttesa, emptyMsg: "Nessuna richiesta in attesa." },
    { title: "Annullati", items: annullati, emptyMsg: "Nessun appuntamento annullato." },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin/appuntamenti" className="text-sm text-blue-600 hover:underline">← Appuntamenti</Link>
          <span className="text-gray-200">|</span>
          <Link href="/"><LogoFull /></Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black text-[#0F2540] mb-6">Storico appuntamenti</h2>

        {appuntamenti.length > 0 && (
          <div className="mb-8">
            <MappaWrapper appuntamenti={appuntamenti.map((a): AppuntamentoPin => ({
              id: a.id,
              clientName: a.client.name,
              serviceType: a.serviceType,
              city: a.city,
              address: a.address,
              confirmedDate: a.confirmedDate,
              status: a.status,
            }))} />
          </div>
        )}

        {sections.map(({ title, items, emptyMsg }) => (
          <section key={title} className="mb-10">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
            {items.length === 0 ? (
              <p className="text-sm text-gray-400 py-3">{emptyMsg}</p>
            ) : (
              <div className="space-y-3">
                {items.map((a) => (
                  <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{a.client.name}</p>
                      <p className="text-xs text-gray-400">{a.client.email}</p>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">📍 {a.city}</span>
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                          {SERVICE_LABEL[a.serviceType] ?? a.serviceType}
                        </span>
                        {a.confirmedDate && (
                          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                            📅 {new Date(a.confirmedDate).toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                          </span>
                        )}
                        {!a.confirmedDate && a.preferredDate && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                            Preferita: {new Date(a.preferredDate).toLocaleDateString("it-IT")}
                          </span>
                        )}
                      </div>
                      {a.confirmedNotes && (
                        <p className="text-xs text-gray-500 mt-1">{a.confirmedNotes}</p>
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${STATUS_COLOR[a.status]}`}>
                      {STATUS_LABEL[a.status]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {appuntamenti.length === 0 && (
          <p className="text-center text-gray-400 py-16 text-sm">Nessun appuntamento ancora registrato.</p>
        )}
      </main>
    </div>
  );
}
