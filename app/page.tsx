import { auth } from "@/auth";
import Link from "next/link";
import { LogoFull } from "./components/Logo";
import { logout } from "./actions/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "help for home — Consulenza immobiliare a Milano",
  description:
    "Compra, vendi o ristruttura casa a Milano con esperti indipendenti al tuo fianco. Perizie, due diligence tecnica, valutazioni e ristrutturazioni integrate. Oltre 20.000 perizie. CTU Tribunale di Milano.",
  alternates: { canonical: "https://www.helpforhome.it" },
  openGraph: {
    title: "help for home — Consulenza immobiliare a Milano",
    description:
      "Esperti indipendenti per comprare, vendere e ristrutturare casa a Milano. Nessun conflitto d'interesse. Oltre 20.000 perizie.",
    url: "https://www.helpforhome.it",
  },
};

const SERVIZI = [
  {
    numero: "01",
    titolo: "Analisi dell'immobile",
    sottotitolo: "Compra o vendi al giusto prezzo",
    descrizione:
      "Per chi compra: verifichiamo che il prezzo sia congruo e che l'immobile risponda alle tue aspettative reali. Per chi vende: sapere il valore esatto del tuo immobile prima di trattare è il primo vantaggio negoziale.",
    dettagli: ["Analisi comparativa di mercato", "Valutazione rischio/opportunità", "Report di congruità prezzo", "Sostenibilità finanziaria dell'operazione"],
    icona: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="20" r="12" strokeLinejoin="round"/>
        <path d="M16 20h16M24 12v16" strokeLinecap="round"/>
        <path d="M10 40h28M14 40l-4-8M34 40l4-8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="36" cy="12" r="6" fill="#F59E0B" stroke="none"/>
        <path d="M33.5 12l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    numero: "02",
    titolo: "Due diligence tecnica",
    sottotitolo: "Nessuna sorpresa. Mai.",
    descrizione:
      "Per chi compra: ogni rischio nascosto identificato prima della firma. Per chi vende: un immobile con documenti in ordine, conforme alla normativa nazionale e locale, vale di più — e si vende senza blocchi last-minute.",
    dettagli: ["Verifica conformità catastale e urbanistica", "Controllo permessi e concessioni", "Regolarizzazione difformità e sanatorie", "Relazione tecnica certificata"],
    icona: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="6" width="28" height="36" rx="2" strokeLinejoin="round"/>
        <path d="M14 16h16M14 22h16M14 28h10" strokeLinecap="round"/>
        <circle cx="37" cy="37" r="8" fill="#F59E0B" stroke="none"/>
        <path d="M34 37l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    numero: "03",
    titolo: "Progettazione e soluzioni",
    sottotitolo: "Comfort, fruibilità, valore",
    descrizione:
      "Progettiamo spazi integrati: domotica, climatizzazione, materiali, layout. Non pezzi separati affidati a chiunque, ma un progetto unico che massimizza il comfort abitativo, la fruibilità e il valore dell'immobile.",
    dettagli: ["Analisi esigenze e stili di vita", "Domotica e impianti integrati", "Ottimizzazione spazi e comfort", "Scelta materiali e soluzioni tecniche"],
    icona: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 42l8-8 6 6-8 8-6-6z" strokeLinejoin="round"/>
        <path d="M14 34l20-20" strokeLinecap="round"/>
        <path d="M34 14l4-4a3 3 0 014 4l-4 4-4-4z" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="3" fill="#F59E0B" stroke="none"/>
      </svg>
    ),
  },
  {
    numero: "04",
    titolo: "Gare d'appalto e realizzazione",
    sottotitolo: "Budget rispettato. Qualità garantita.",
    descrizione:
      "Selezioniamo le imprese con gara aperta, gestiamo il cantiere e verifichiamo ogni fase. Nessun preventivo gonfiato, nessun sorpasso di budget ingiustificato. Consegniamo quello che è stato progettato e promesso.",
    dettagli: ["Redazione capitolato d'appalto", "Selezione imprese con gara comparativa", "Direzione lavori e controllo costi", "Collaudo e consegna finale"],
    icona: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="20" width="40" height="22" rx="2" strokeLinejoin="round"/>
        <path d="M12 20V14a12 12 0 0124 0v6" strokeLinecap="round"/>
        <circle cx="24" cy="31" r="4" fill="#F59E0B" stroke="none"/>
        <path d="M24 35v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const FASI = [
  {
    n: "01",
    titolo: "Prenota il tuo appuntamento",
    desc: "Scegli città, tipo di servizio e data preferita. Ti confermiamo un incontro entro 24 ore — di persona o in videochiamata.",
  },
  {
    n: "02",
    titolo: "Prima consulenza gratuita",
    desc: "Ascoltiamo il tuo progetto come se fosse il nostro. Nessun limite di tempo, nessun formulario — solo una conversazione vera.",
  },
  {
    n: "03",
    titolo: "Si apre la tua area personale",
    desc: "Dopo l'appuntamento attivi la pratica. Carichi documenti, segui lo stato in tempo reale e comunichi direttamente con noi.",
  },
  {
    n: "04",
    titolo: "Realizziamo insieme",
    desc: "Dalla due diligence alla consegna delle chiavi: ogni passo è tracciato, ogni decisione è tua, ogni rischio è già gestito.",
  },
];

export default async function HomePage() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAVBAR ── */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <LogoFull inverted />
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/chi-siamo" className="hidden sm:block text-sm text-white/70 hover:text-white px-3 py-2">Chi siamo</Link>
            {session ? (
              <>
                <Link href={role === "ADMIN" ? "/admin" : "/dashboard"} className="text-sm text-white/80 hover:text-white px-2 sm:px-3 py-2">
                  {role === "ADMIN" ? "Admin" : "Le mie pratiche"}
                </Link>
                <form action={logout} className="inline">
                  <button className="text-sm text-white/70 hover:text-white px-2 sm:px-3 py-2">Esci</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:block text-sm text-white/80 hover:text-white px-3 py-2">Accedi</Link>
                <Link href="/register" className="text-xs sm:text-sm bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-4 sm:px-5 py-2 rounded-lg transition-colors whitespace-nowrap">
                  Prenota ora
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-[#0F2540] text-white overflow-hidden">
        {/* Geometric grid */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        {/* Amber accent shapes */}
        <div className="absolute -bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#F59E0B] opacity-[0.07] rounded-full" />
        <div className="absolute top-1/3 -left-20 w-56 sm:w-72 h-56 sm:h-72 bg-[#F59E0B] opacity-[0.04] rounded-full" />
        {/* Top amber bar accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-36 sm:pt-44 pb-28 sm:pb-36 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 text-white/70 text-[10px] sm:text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] inline-block" />
            Soluzioni di ingegno per la tua casa, presente e futura
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
            Prima ancora di essere<br className="hidden sm:block" /> consulenti,{" "}
            <span className="text-[#F59E0B]">siamo diventati clienti.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed px-2">
            Che tu stia <strong className="text-white/90">comprando</strong>,{" "}
            <strong className="text-white/90">vendendo</strong> o{" "}
            <strong className="text-white/90">ristrutturando</strong> — ti affianchiamo con competenza ingegneristica,
            indipendenza totale e la responsabilità congiunta di ogni consiglio che ti diamo.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href={session ? (role === "ADMIN" ? "/admin" : "/dashboard/appuntamento/nuovo") : "/register"}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-6 sm:px-8 py-4 rounded-xl text-sm sm:text-base transition-colors shadow-lg shadow-amber-500/20"
            >
              Prenota la tua consulenza gratuita
            </Link>
            <a
              href="#come-funziona"
              className="border border-white/25 hover:border-white/50 text-white font-semibold px-6 sm:px-8 py-4 rounded-xl text-sm sm:text-base transition-colors"
            >
              Come funziona →
            </a>
          </div>

        </div>

        {/* Wave → amber */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60V30C360 0 720 60 1080 30C1260 15 1380 25 1440 30V60H0Z" fill="#F59E0B"/>
          </svg>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-[#F59E0B]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/70 text-xs font-black tracking-widest uppercase mb-5">Come lavoriamo</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-6">
            A noi non basta mettere in contatto le parti<br className="hidden sm:block" /> per avere diritto a un compenso.
          </h2>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Qualsiasi intermediario può farlo. Noi lavoriamo in modo diverso:{" "}
            <strong className="text-white">ci prendiamo la responsabilità di quello che facciamo</strong>.
            Ogni analisi, ogni consiglio, ogni valutazione che ti diamo porta la nostra firma —
            e quella firma conta.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { titolo: "Firmiamo i nostri consigli", desc: "Ogni raccomandazione è documentata e motivata. Non ci nascondiamo dietro l'«è una mia impressione»." },
              { titolo: "Non guadagniamo sul volume", desc: "Non abbiamo immobili da piazzare né imprese da favorire. Il nostro unico interesse è il tuo risultato." },
              { titolo: "Scegliamo insieme", desc: "Non decidiamo al posto tuo — ti diamo tutti gli elementi per decidere con consapevolezza." },
              { titolo: "Gestiamo la sostenibilità finanziaria", desc: "Ti aiutiamo a capire se l'operazione regge, costruiamo i fascicoli documentali per le banche e ti affianchiamo nel relazionarti con i periti — in ogni fase del processo di finanziamento." },
            ].map((item) => (
              <div key={item.titolo} className="bg-white rounded-2xl p-5 text-left shadow-sm">
                <p className="font-black text-[#0F2540] text-sm mb-2">{item.titolo}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUMERI ── */}
      <section className="bg-[#0F2540] py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { valore: "20.000+", label: "perizie redatte a Milano" },
            { valore: "20+", label: "anni nel mercato immobiliare" },
            { valore: "CTU", label: "nominata dal Tribunale di Milano" },
            { valore: "20+", label: "ingegneri e specialisti nel team" },
          ].map((n) => (
            <div key={n.label}>
              <div className="text-2xl sm:text-3xl font-black text-[#F59E0B] leading-none mb-1">{n.valore}</div>
              <div className="text-[11px] sm:text-xs text-white/45 leading-tight">{n.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PER CHI SEI ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#F59E0B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">A chi ci rivolgiamo</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F2540] mb-5">
              Stai comprando, vendendo<br className="hidden sm:block" /> o ristrutturando?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 max-w-2xl mx-auto">
              <p className="text-sm sm:text-base text-gray-600">
                <strong className="text-[#0F2540]">Abbiamo la credibilità</strong> per consigliare chi compra.
              </p>
              <span className="hidden sm:block text-gray-300">|</span>
              <p className="text-sm sm:text-base text-gray-600">
                <strong className="text-[#0F2540]">Abbiamo la capacità</strong> per consigliare chi vende.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                tag: "Stai comprando?",
                icon: "🔑",
                titolo: "Compra al giusto prezzo, senza brutte sorprese",
                desc: "Verifichiamo ogni aspetto dell'immobile prima che tu firmi: valore di mercato, conformità urbanistica, vizi nascosti. Decidi con dati alla mano, non con l'emozione del momento.",
                punti: ["Analisi comparativa di mercato", "Due diligence tecnica e catastale", "Supporto alla richiesta di finanziamento", "Tutela in trattativa"],
                colore: "border-amber-200 hover:bg-amber-50",
              },
              {
                tag: "Stai vendendo?",
                icon: "📋",
                titolo: "Vendi un bene sicuro, conforme e davvero vendibile",
                desc: "Ti aiutiamo a vendere — ma prima ci assicuriamo che il tuo immobile sia in regola con la normativa nazionale e locale. Nessuna difformità nascosta, nessun blocco last-minute, nessun rischio dopo il rogito.",
                punti: ["Verifica conformità urbanistica e catastale", "Regolarizzazione difformità e sanatorie", "Perizia indipendente al giusto valore"],
                colore: "border-blue-100 hover:bg-blue-50/40",
              },
              {
                tag: "Stai ristrutturando?",
                icon: "🏗️",
                titolo: "Un progetto integrato, non pezzi separati",
                desc: "Progettiamo, selezioniamo le imprese e coordiniamo ogni fase. Domotica, impianti, materiali, layout — tutto coordinato per massimizzare comfort, fruibilità e valore.",
                punti: ["Progettazione e capitolato", "Selezione e gestione imprese", "Direzione lavori e collaudo"],
                colore: "border-green-100 hover:bg-green-50/40",
              },
            ].map((c) => (
              <div key={c.tag} className={`rounded-2xl border-2 p-6 transition-colors ${c.colore}`}>
                <div className="text-2xl mb-3">{c.icon}</div>
                <p className="text-[10px] font-black tracking-widest uppercase text-[#F59E0B] mb-2">{c.tag}</p>
                <h3 className="font-black text-[#0F2540] text-base sm:text-lg leading-snug mb-3">{c.titolo}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">{c.desc}</p>
                <ul className="space-y-1.5">
                  {c.punti.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1 h-1 rounded-full bg-[#F59E0B] flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIZI ── */}
      <section id="servizi" className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#F59E0B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">I nostri servizi</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F2540]">
              Cosa facciamo, concretamente
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Quattro servizi integrati — per chi compra, per chi vende, per chi ristruttura.
              Ogni servizio porta la nostra firma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SERVIZI.map((s) => (
              <div
                key={s.numero}
                className="group relative bg-white hover:bg-[#0F2540] rounded-2xl p-6 sm:p-8 transition-all duration-300 border border-gray-100 hover:border-transparent hover:shadow-2xl"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="text-[#0F2540] group-hover:text-white transition-colors flex-shrink-0">
                    {s.icona}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#F59E0B] text-[10px] font-black tracking-widest mb-1">{s.numero}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F2540] group-hover:text-white transition-colors mb-1">
                      {s.titolo}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F59E0B] font-semibold mb-3">{s.sottotitolo}</p>
                    <p className="text-xs sm:text-sm text-gray-600 group-hover:text-white/75 transition-colors leading-relaxed mb-4">
                      {s.descrizione}
                    </p>
                    <ul className="space-y-1">
                      {s.dettagli.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 group-hover:text-white/60 transition-colors">
                          <span className="w-1 h-1 rounded-full bg-[#F59E0B] flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-100 group-hover:border-white/15 transition-colors">
                  <Link
                    href={session ? "/dashboard/appuntamento/nuovo" : "/register"}
                    className="text-xs sm:text-sm font-semibold text-[#F59E0B] hover:underline flex items-center gap-1"
                  >
                    Prenota una consulenza →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section id="come-funziona" className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#F59E0B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">Il percorso</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F2540]">
              Come si lavora con noi
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Dalla prima chiamata alla consegna finale — semplice, trasparente, senza sorprese.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {FASI.map((fase) => (
              <div key={fase.n} className="flex gap-5 p-5 sm:p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0F2540] flex items-center justify-center">
                  <span className="text-[10px] font-black text-[#F59E0B] tracking-widest">{fase.n}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0F2540] mb-1 text-sm sm:text-base">{fase.titolo}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{fase.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href={session ? (role === "ADMIN" ? "/admin" : "/dashboard/appuntamento/nuovo") : "/register"}
              className="inline-flex items-center gap-2 bg-[#0F2540] hover:bg-[#1E3A5F] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors"
            >
              Inizia ora — è gratuito
              <span className="text-[#F59E0B]">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CHI SIAMO — teaser ── */}
      <section className="bg-[#0F2540] py-14 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[#F59E0B] font-bold text-xs tracking-widest uppercase mb-4">Chi siamo</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
              Giuliana Roccaro e Luca Bertoni.<br />
              <span className="text-[#F59E0B]">Ingegneri gestionali. Dalla tua parte.</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Giuliana guida e coordina ogni progetto: oltre 20 anni nel mercato milanese,
              20.000+ perizie, CTU nominata dal Tribunale di Milano.
              Luca porta la visione tecnica e tecnologica.
              Insieme guidano un team di oltre 20 ingegneri e specialisti.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { n: "20.000+", t: "perizie firmate", s: "Credibilità costruita in vent'anni, perizia per perizia." },
              { n: "0", t: "conflitti d'interesse", s: "Non vendiamo immobili. Non favoriamo imprese. Lavoriamo per te." },
              { n: "20+", t: "specialisti nel team", s: "Il professionista giusto, nel momento esatto in cui serve." },
            ].map((item) => (
              <div key={item.t} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <div className="text-xl font-black text-[#F59E0B] leading-none w-16 flex-shrink-0">{item.n}</div>
                <div>
                  <p className="text-white font-bold text-sm">{item.t}</p>
                  <p className="text-white/45 text-xs leading-relaxed">{item.s}</p>
                </div>
              </div>
            ))}
            <Link href="/chi-siamo" className="text-sm font-semibold text-[#F59E0B] hover:text-white transition-colors mt-1">
              La nostra storia completa →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-[#0F2540] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">
            Il tuo desiderio è già reale.<br />
            <span className="text-[#F59E0B]">Manca solo il primo passo.</span>
          </h2>
          <p className="text-white/60 mb-8 text-sm sm:text-base">
            Prenota la tua consulenza gratuita. Scegli la città, il tipo di servizio e la data che preferisci — ti richiamiamo entro 24 ore.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href={session ? (role === "ADMIN" ? "/admin" : "/dashboard/appuntamento/nuovo") : "/register"}
              className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-7 sm:px-8 py-4 rounded-xl transition-colors text-sm sm:text-base shadow-lg shadow-amber-500/20"
            >
              Prenota ora — è gratuito
            </Link>
            <Link
              href="/login"
              className="border border-white/25 hover:border-white/50 text-white font-semibold px-7 sm:px-8 py-4 rounded-xl transition-colors text-sm sm:text-base"
            >
              Hai già un account? Accedi
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#08172B] text-white/40 py-6 sm:py-8 px-4 sm:px-6 text-center text-xs sm:text-sm">
        <p>© {new Date().getFullYear()} help for home by Roccaro e Bertoni. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
