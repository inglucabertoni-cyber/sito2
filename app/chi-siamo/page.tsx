import Link from "next/link";
import { LogoFull } from "@/app/components/Logo";

export const metadata = {
  title: "Chi siamo — help for house",
  description: "Giuliana Roccaro e Luca Bertoni: ingegneri gestionali, appassionati di case e tecnologia.",
};

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/"><LogoFull /></Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Torna alla home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0F2540] text-white py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-4">Chi siamo</p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6">
            Prima ancora di essere consulenti,<br />
            <span className="text-[#F59E0B]">siamo diventati clienti.</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Abbiamo vissuto sulla nostra pelle ogni dubbio, ogni trattativa, ogni sorpresa nascosta
            dietro una porta. Ed è da quella esperienza diretta che è nata la nostra missione:
            stare davvero dalla parte di chi acquista.
          </p>
        </div>
      </section>

      {/* Giuliana */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-block bg-[#F59E0B] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
              Fondatrice &amp; Responsabile
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F2540] mb-1">Giuliana</h2>
            <h3 className="text-xl font-semibold text-[#F59E0B] mb-2">Roccaro</h3>
            <p className="text-sm font-semibold text-gray-400 mb-6 italic">
              Guida e coordina ogni progetto — dal primo contatto alla consegna finale.
            </p>

            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                Giuliana è la mente e il cuore di <strong className="text-[#0F2540]">help for house</strong>.
                È lei che accoglie ogni cliente, ascolta le esigenze, costruisce la strategia
                e coordina tutte le fasi del progetto — garantendo continuità, coerenza e attenzione
                in ogni passaggio.
              </p>
              <p>
                Da oltre <strong className="text-[#0F2540]">20 anni</strong> è uno dei punti di riferimento
                della valutazione immobiliare milanese. Collabora con <strong className="text-[#0F2540]">CRIF</strong> e
                ha firmato più di <strong className="text-[#0F2540]">20.000 perizie</strong> — una carriera
                costruita su rigore, competenza e fiducia guadagnata nel tempo.
              </p>
              <p>
                Il Tribunale di Milano l'ha nominata <strong className="text-[#0F2540]">CTU (Consulente Tecnico d'Ufficio)</strong>,
                riconoscimento che ne certifica autorevolezza e terzietà di giudizio.
              </p>
              <p>
                Ma Giuliana non è solo numeri e perizie. <strong className="text-[#0F2540]">Ama le case</strong> —
                con quella passione di chi entra in un appartamento e lo vede già vissuto e trasformato.
                A questa sensibilità aggiunge una profonda passione per
                <strong className="text-[#0F2540]"> l'arredo e il design degli spazi</strong>: ogni ambiente
                racconta chi lo abita, e lei sa leggere quella storia meglio di chiunque altro.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Guida e coordina il team", "20.000+ perizie", "CTU Tribunale di Milano", "Collaboratrice CRIF", "20+ anni di esperienza"].map((tag) => (
                <span key={tag} className="text-xs font-semibold bg-[#0F2540] text-white px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Decorative card */}
          <div className="bg-amber-50 rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-64">
            <div className="text-5xl font-black text-[#F59E0B] leading-none">20.000+</div>
            <p className="text-sm text-amber-800/70 font-medium mt-2">perizie redatte a Milano</p>
            <div className="mt-8 border-t border-amber-200 pt-6 space-y-4">
              <p className="text-xs text-amber-700/60 italic font-medium leading-relaxed">
                "Ogni casa ha una storia. Il mio lavoro è raccontarla con onestà,
                tutelandoti prima che tu firmi."
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.facebook.com/livesocialofficial/videos/giuliana-roccaro-ingegnere-gestionale-abilitata-allesercizio-della-professione-d/789018354942897/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0"><path d="M8 5v14l11-7z"/></svg>
                  Guarda l'intervista →
                </a>
                <a
                  href="https://www.linkedin.com/in/giuliana-roccaro-bertoni-00114060/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 100-4 2 2 0 000 4z"/></svg>
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-t border-gray-100" />
      </div>

      {/* Luca */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 gap-12 items-start">
          {/* Decorative card */}
          <div className="bg-[#0F2540] rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-64 order-last sm:order-first">
            <div className="text-5xl font-black text-white/20 leading-none">01</div>
            <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
              {["Domotica avanzata", "Materiali e progettazione", "Climatizzazione ottimizzata", "Ingegneria degli impianti"].map((item) => (
                <p key={item} className="text-xs text-white/50 font-medium flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#F59E0B] inline-block flex-shrink-0" />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <div className="inline-block bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
              Co-fondatore
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F2540] mb-1">Luca</h2>
            <h3 className="text-xl font-semibold text-[#F59E0B] mb-2">Bertoni</h3>
            <p className="text-sm font-semibold text-gray-400 mb-6 italic">
              Porta la tecnologia dove gli altri si fermano.
            </p>

            <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              <p>
                Luca è <strong className="text-[#0F2540]">innamorato della tecnologia</strong> — quella concreta,
                applicata, che migliora davvero la vita di chi abita una casa.
                Progetta sistemi di gestione degli impianti, modelli ottimizzati di climatizzazione
                e soluzioni domotiche integrate: tutto quanto serve per rendere un immobile
                <strong className="text-[#0F2540]"> adeguato ai tempi e alle esigenze di oggi</strong>.
              </p>
              <p>
                La sua passione abbraccia anche i <strong className="text-[#0F2540]">materiali e la progettazione</strong>:
                conosce le ultime innovazioni del settore edilizio e guida i clienti verso
                scelte che durano nel tempo, esteticamente belle e tecnicamente solide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rete di professionisti */}
      <section className="bg-[#0F2540] py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-4">Il lavoro di squadra</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
              Un mondo di competenze al servizio del cliente.
            </h2>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Il lavoro di squadra è essenziale. <strong className="text-white/80">help for house</strong> non è
              uno studio singolo — è un ecosistema di professionisti selezionati, coordinati da Giuliana,
              ciascuno coinvolto quando la situazione lo richiede.
            </p>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Il risultato è un servizio <strong className="text-white/80">profondamente personalizzato</strong>
              — cucito sulle esigenze di ogni singolo cliente — ma sempre
              <strong className="text-white/80"> allineato al meglio che il mercato può offrire</strong>.
              Non un compromesso, ma l'eccellenza accessibile.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { titolo: "Notai e avvocati", desc: "Per la tutela legale e la verifica degli atti" },
              { titolo: "Geometri e architetti", desc: "Per rilievi, progetti e conformità urbanistica" },
              { titolo: "Periti e stimatori", desc: "Per valutazioni tecniche certificate" },
              { titolo: "Imprese edili", desc: "Per ristrutturazioni e cantieri selezionati" },
              { titolo: "Esperti di impianti", desc: "Elettrici, idraulici, termotecnici" },
              { titolo: "Interior designer", desc: "Per arredo, materiali e soluzioni d'interni" },
            ].map((item) => (
              <div key={item.titolo} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <p className="font-bold text-white text-sm mb-1">{item.titolo}</p>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missione */}
      <section className="bg-gray-50 py-16 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase mb-4">La nostra missione</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F2540] mb-6 leading-tight">
            Trasformare i tuoi desideri in qualcosa di reale, concreto, tuo.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-10">
            Insieme portiamo competenze complementari: la conoscenza profonda del mercato immobiliare
            milanese di Giuliana e la visione tecnica e tecnologica di Luca. Due prospettive,
            un unico obiettivo — aiutarti a fare la scelta giusta.
          </p>
          <Link
            href="/dashboard/appuntamento/nuovo"
            className="inline-block bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors shadow-lg shadow-amber-200"
          >
            Prenota la tua consulenza gratuita →
          </Link>
        </div>
      </section>

      <footer className="bg-[#08172B] text-white/40 py-6 px-4 text-center text-xs">
        <p>© {new Date().getFullYear()} help for house by Roccaro e Bertoni. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
