import { auth } from "@/auth";
import Link from "next/link";
import { LogoFull } from "./components/Logo";
import { logout } from "./actions/auth";

const SERVIZI = [
  {
    numero: "01",
    titolo: "Analisi dell'immobile",
    sottotitolo: "Scegli con dati alla mano",
    descrizione:
      "Valutiamo la congruità del prezzo rispetto al mercato locale e verifichiamo che l'immobile risponda alle tue reali aspettative. Il nostro approccio ingegneristico trasforma l'emozione dell'acquisto in una decisione razionale e documentata.",
    dettagli: ["Analisi comparativa di mercato", "Valutazione rischio/opportunità", "Report di congruità prezzo", "Verifica aspettative vs realtà"],
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
    sottotitolo: "Acquista senza sorprese",
    descrizione:
      "Verifichiamo la legittimità urbanistica e catastale dell'immobile, controlliamo permessi, concessioni e conformità. Ti proteggiamo da rischi nascosti prima che diventino problemi costosi e irrisolvibili.",
    dettagli: ["Verifica conformità catastale", "Controllo permessi edilizi", "Analisi abusi e condoni", "Relazione tecnica completa"],
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
    sottotitolo: "La casa che immagini, realizzata",
    descrizione:
      "Progettiamo gli spazi in base alle tue esigenze di vita e troviamo soluzioni tecniche personalizzate. Dalla planimetria al progetto di ristrutturazione, ogni centimetro è ottimizzato con metodo ingegneristico.",
    dettagli: ["Analisi esigenze e stili di vita", "Progetto architettonico preliminare", "Ottimizzazione spazi e layout", "Soluzioni impiantistiche"],
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
    sottotitolo: "Dal progetto alla consegna",
    descrizione:
      "Gestiamo le gare d'appalto per selezionare i migliori esecutori al prezzo giusto e supervisioniamo la fase realizzativa. Seguiamo ogni fase del cantiere garantendo qualità, tempi e rispetto del budget.",
    dettagli: ["Redazione capitolato d'appalto", "Selezione e valutazione imprese", "Direzione lavori", "Collaudo e consegna finale"],
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
            Conosciamo ogni dubbio, ogni rischio, ogni opportunità nascosta del mercato immobiliare.
            Per questo possiamo guidarti dove altri non arrivano — e rendere reali i tuoi desideri.
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

          {/* Stats */}
          <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto border-t border-white/10 pt-8 sm:pt-10">
            {[
              { valore: "2", label: "Ingegneri dedicati" },
              { valore: "4", label: "Servizi integrati" },
              { valore: "0%", label: "Conflitti d'interesse" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#F59E0B]">{s.valore}</div>
                <div className="text-[10px] sm:text-xs text-white/50 mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60V30C360 0 720 60 1080 30C1260 15 1380 25 1440 30V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── COME FUNZIONA ── */}
      <section id="come-funziona" className="py-20 sm:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#F59E0B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">Il percorso</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F2540]">
              Quattro passi per realizzare<br className="hidden sm:block" /> il tuo progetto
            </h2>
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

      {/* ── SERVIZI ── */}
      <section id="servizi" className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#F59E0B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">I nostri servizi</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F2540]">
              Ogni servizio è un passo<br className="hidden sm:block" /> verso il tuo obiettivo
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
              Quattro fasi integrate per accompagnarti in ogni aspetto dell&apos;acquisto e della realizzazione.
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

      {/* ── CHI SIAMO ── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-14 items-center">
            <div>
              <p className="text-[#F59E0B] font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">Chi siamo</p>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F2540] mb-5 leading-tight">
                Il tuo sogno di casa?<br />
                <span className="text-[#F59E0B]">Diventa il nostro.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                <strong>Giuliana Roccaro e Luca Bertoni</strong> sono due ingegneri gestionali che hanno vissuto sulla propria pelle ogni complessità del mercato immobiliare — e hanno deciso di mettere quella conoscenza al servizio di chi acquista.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                Il nostro approccio è semplice: <strong>diventiamo clienti insieme a te</strong>. Analizziamo ogni immobile come se lo stessimo acquistando noi, verifichiamo ogni documento come se dovessimo firmarci noi, progettiamo ogni spazio come se ci dovessimo vivere noi.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Non siamo agenti immobiliari. Siamo dalla tua parte — con rigore metodologico, indipendenza totale e un solo obiettivo: <strong>rendere reali i tuoi desideri</strong>.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {[
                { titolo: "Indipendenza assoluta", desc: "Non prendiamo commissioni su immobili o imprese. Lavoriamo solo per te, senza nessun conflitto d'interesse." },
                { titolo: "Metodo ingegneristico", desc: "Ogni valutazione è basata su dati reali, analisi comparative e metodologie verificabili — non su intuizioni." },
                { titolo: "Un unico interlocutore", desc: "Dalla prima analisi alla consegna delle chiavi, sempre le stesse persone al tuo fianco. Nessun passaggio di consegne." },
              ].map((item) => (
                <div key={item.titolo} className="flex gap-4 bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100 hover:border-amber-200 transition-colors">
                  <div className="w-1.5 rounded-full bg-[#F59E0B] flex-shrink-0 self-stretch" />
                  <div>
                    <p className="font-bold text-[#0F2540] mb-1 text-sm sm:text-base">{item.titolo}</p>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
        <p>© {new Date().getFullYear()} help for house by Roccaro e Bertoni. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
