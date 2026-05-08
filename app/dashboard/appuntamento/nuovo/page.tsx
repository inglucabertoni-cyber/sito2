import { auth } from "@/auth";
import { bookAppointment } from "@/app/actions/appointments";
import { LogoFull } from "@/app/components/Logo";
import Link from "next/link";
import { redirect } from "next/navigation";

const CITTA = ["Milano", "Torino", "Genova", "Firenze", "Bologna", "Roma", "Napoli", "Venezia", "Altra città"];

const TIPI_SERVIZIO = [
  { value: "ANALISI_IMMOBILE", label: "Analisi dell'immobile — prezzo e aspettative" },
  { value: "DUE_DILIGENCE", label: "Due diligence tecnica — legittimità e conformità" },
  { value: "PROGETTAZIONE", label: "Progettazione e soluzioni — spazi su misura" },
  { value: "APPALTO", label: "Gare d'appalto e realizzazione — cantiere e consegna" },
  { value: "GENERALE", label: "Consulenza generale — non so ancora da dove iniziare" },
];

export default async function NuovoAppuntamentoPage() {
  const session = await auth();
  if ((session?.user as { role?: string })?.role === "ADMIN") redirect("/admin");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/"><LogoFull /></Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-10 sm:py-14">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mb-6 block">
          ← La mia area
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            Consulenza gratuita
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F2540] mb-3">
            Prenota il tuo appuntamento
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Dicci dove sei, che tipo di progetto hai in mente e quando preferiresti incontrarci. Ti contatteremo entro 24 ore per confermare.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <form action={bookAppointment} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Città di interesse <span className="text-red-400">*</span>
              </label>
              <select
                name="city"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
              >
                <option value="">Seleziona la città</option>
                {CITTA.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Tipo di servizio <span className="text-red-400">*</span>
              </label>
              <select
                name="serviceType"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
              >
                <option value="">Cosa ti interessa?</option>
                {TIPI_SERVIZIO.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Indirizzo dell'immobile <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="Es: Via Roma 12, Milano"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Via, numero civico e città — ci serve per organizzare il sopralluogo</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Data preferita
                <span className="text-gray-400 font-normal ml-1">(indicativa)</span>
              </label>
              <input
                type="date"
                name="preferredDate"
                min={new Date().toISOString().split("T")[0]}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Descrivici brevemente il tuo progetto
                <span className="text-gray-400 font-normal ml-1">(facoltativo)</span>
              </label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Es: Sto valutando un appartamento di 90mq in zona semicentrale, prezzo richiesto 280.000€. Vorrei capire se è congruo e se ci sono rischi…"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-md shadow-amber-200 mt-2"
            >
              Invia la richiesta di appuntamento
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          La consulenza iniziale è sempre gratuita e senza impegno.
        </p>
      </main>
    </div>
  );
}
