export type WorkflowType = "ANALISI_IMMOBILE" | "DUE_DILIGENCE" | "PROGETTAZIONE" | "APPALTO" | "GENERICO";

export interface WorkflowDef {
  label: string;
  states: string[];
  finals: string[];
  transitions: Record<string, string[]>;
}

export const WORKFLOWS: Record<WorkflowType, WorkflowDef> = {
  ANALISI_IMMOBILE: {
    label: "Analisi dell'immobile",
    states: ["INVIATA", "SOPRALLUOGO_PROGRAMMATO", "ANALISI_IN_CORSO", "DOCS_INTEGRATIVI", "VALUTAZIONE_COMPLETATA", "RIFIUTATA"],
    finals: ["VALUTAZIONE_COMPLETATA", "RIFIUTATA"],
    transitions: {
      INVIATA: ["SOPRALLUOGO_PROGRAMMATO", "RIFIUTATA"],
      SOPRALLUOGO_PROGRAMMATO: ["ANALISI_IN_CORSO", "RIFIUTATA"],
      ANALISI_IN_CORSO: ["DOCS_INTEGRATIVI", "VALUTAZIONE_COMPLETATA", "RIFIUTATA"],
      DOCS_INTEGRATIVI: ["ANALISI_IN_CORSO", "RIFIUTATA"],
      VALUTAZIONE_COMPLETATA: [],
      RIFIUTATA: [],
    },
  },
  DUE_DILIGENCE: {
    label: "Due diligence tecnica",
    states: ["INVIATA", "DOCUMENTI_RICHIESTI", "VERIFICA_IN_CORSO", "RELAZIONE_PRONTA", "RIFIUTATA"],
    finals: ["RELAZIONE_PRONTA", "RIFIUTATA"],
    transitions: {
      INVIATA: ["DOCUMENTI_RICHIESTI", "RIFIUTATA"],
      DOCUMENTI_RICHIESTI: ["VERIFICA_IN_CORSO", "RIFIUTATA"],
      VERIFICA_IN_CORSO: ["DOCUMENTI_RICHIESTI", "RELAZIONE_PRONTA", "RIFIUTATA"],
      RELAZIONE_PRONTA: [],
      RIFIUTATA: [],
    },
  },
  PROGETTAZIONE: {
    label: "Progettazione e soluzioni",
    states: ["INVIATA", "BRIEF_ELABORATO", "PROGETTO_IN_CORSO", "REVISIONE_RICHIESTA", "PROGETTO_CONSEGNATO", "RIFIUTATA"],
    finals: ["PROGETTO_CONSEGNATO", "RIFIUTATA"],
    transitions: {
      INVIATA: ["BRIEF_ELABORATO", "RIFIUTATA"],
      BRIEF_ELABORATO: ["PROGETTO_IN_CORSO", "RIFIUTATA"],
      PROGETTO_IN_CORSO: ["REVISIONE_RICHIESTA", "PROGETTO_CONSEGNATO", "RIFIUTATA"],
      REVISIONE_RICHIESTA: ["PROGETTO_IN_CORSO", "RIFIUTATA"],
      PROGETTO_CONSEGNATO: [],
      RIFIUTATA: [],
    },
  },
  APPALTO: {
    label: "Gare d'appalto e realizzazione",
    states: ["INVIATA", "CAPITOLATO_IN_ELABORAZIONE", "GARA_AVVIATA", "CONTRATTO_AGGIUDICATO", "CANTIERE_IN_CORSO", "COLLAUDO", "LAVORI_COMPLETATI", "RIFIUTATA"],
    finals: ["LAVORI_COMPLETATI", "RIFIUTATA"],
    transitions: {
      INVIATA: ["CAPITOLATO_IN_ELABORAZIONE", "RIFIUTATA"],
      CAPITOLATO_IN_ELABORAZIONE: ["GARA_AVVIATA", "RIFIUTATA"],
      GARA_AVVIATA: ["CONTRATTO_AGGIUDICATO", "RIFIUTATA"],
      CONTRATTO_AGGIUDICATO: ["CANTIERE_IN_CORSO", "RIFIUTATA"],
      CANTIERE_IN_CORSO: ["COLLAUDO", "RIFIUTATA"],
      COLLAUDO: ["LAVORI_COMPLETATI", "RIFIUTATA"],
      LAVORI_COMPLETATI: [],
      RIFIUTATA: [],
    },
  },
  GENERICO: {
    label: "Generico",
    states: ["INVIATA", "IN_REVISIONE", "IN_LAVORAZIONE", "IN_ATTESA", "RISPOSTA_FORNITA", "RIFIUTATA"],
    finals: ["RISPOSTA_FORNITA", "RIFIUTATA"],
    transitions: {
      INVIATA: ["IN_REVISIONE", "RIFIUTATA"],
      IN_REVISIONE: ["IN_LAVORAZIONE", "IN_ATTESA", "RIFIUTATA"],
      IN_LAVORAZIONE: ["IN_ATTESA", "RISPOSTA_FORNITA", "RIFIUTATA"],
      IN_ATTESA: ["IN_LAVORAZIONE", "RISPOSTA_FORNITA", "RIFIUTATA"],
      RISPOSTA_FORNITA: [],
      RIFIUTATA: [],
    },
  },
};

export function getWorkflow(workflowType: string): WorkflowDef {
  return WORKFLOWS[workflowType as WorkflowType] ?? WORKFLOWS.GENERICO;
}

// Universal label/color map covering all workflows
export const STATO_LABEL: Record<string, string> = {
  // Shared
  INVIATA: "Inviata",
  RIFIUTATA: "Rifiutata",
  // ANALISI_IMMOBILE
  SOPRALLUOGO_PROGRAMMATO: "Sopralluogo programmato",
  ANALISI_IN_CORSO: "Analisi in corso",
  DOCS_INTEGRATIVI: "Documenti integrativi richiesti",
  VALUTAZIONE_COMPLETATA: "Valutazione completata",
  // DUE_DILIGENCE
  DOCUMENTI_RICHIESTI: "Documenti richiesti",
  VERIFICA_IN_CORSO: "Verifica in corso",
  RELAZIONE_PRONTA: "Relazione tecnica pronta",
  // PROGETTAZIONE
  BRIEF_ELABORATO: "Brief elaborato",
  PROGETTO_IN_CORSO: "Progetto in corso",
  REVISIONE_RICHIESTA: "Revisione richiesta",
  PROGETTO_CONSEGNATO: "Progetto consegnato",
  // APPALTO
  CAPITOLATO_IN_ELABORAZIONE: "Capitolato in elaborazione",
  GARA_AVVIATA: "Gara d'appalto avviata",
  CONTRATTO_AGGIUDICATO: "Contratto aggiudicato",
  CANTIERE_IN_CORSO: "Cantiere in corso",
  COLLAUDO: "Collaudo in corso",
  LAVORI_COMPLETATI: "Lavori completati",
  // GENERICO
  IN_REVISIONE: "In revisione",
  IN_LAVORAZIONE: "In lavorazione",
  IN_ATTESA: "In attesa di informazioni",
  RISPOSTA_FORNITA: "Risposta fornita",
};

export const STATO_COLOR: Record<string, string> = {
  INVIATA: "bg-blue-100 text-blue-800",
  RIFIUTATA: "bg-red-100 text-red-800",
  // ANALISI_IMMOBILE
  SOPRALLUOGO_PROGRAMMATO: "bg-yellow-100 text-yellow-800",
  ANALISI_IN_CORSO: "bg-orange-100 text-orange-800",
  DOCS_INTEGRATIVI: "bg-purple-100 text-purple-800",
  VALUTAZIONE_COMPLETATA: "bg-green-100 text-green-800",
  // DUE_DILIGENCE
  DOCUMENTI_RICHIESTI: "bg-purple-100 text-purple-800",
  VERIFICA_IN_CORSO: "bg-orange-100 text-orange-800",
  RELAZIONE_PRONTA: "bg-green-100 text-green-800",
  // PROGETTAZIONE
  BRIEF_ELABORATO: "bg-yellow-100 text-yellow-800",
  PROGETTO_IN_CORSO: "bg-orange-100 text-orange-800",
  REVISIONE_RICHIESTA: "bg-purple-100 text-purple-800",
  PROGETTO_CONSEGNATO: "bg-green-100 text-green-800",
  // APPALTO
  CAPITOLATO_IN_ELABORAZIONE: "bg-yellow-100 text-yellow-800",
  GARA_AVVIATA: "bg-orange-100 text-orange-800",
  CONTRATTO_AGGIUDICATO: "bg-teal-100 text-teal-800",
  CANTIERE_IN_CORSO: "bg-orange-100 text-orange-800",
  COLLAUDO: "bg-yellow-100 text-yellow-800",
  LAVORI_COMPLETATI: "bg-green-100 text-green-800",
  // GENERICO
  IN_REVISIONE: "bg-yellow-100 text-yellow-800",
  IN_LAVORAZIONE: "bg-orange-100 text-orange-800",
  IN_ATTESA: "bg-purple-100 text-purple-800",
  RISPOSTA_FORNITA: "bg-green-100 text-green-800",
};

// Backward-compat helpers (used where workflowType isn't available)
export const STATI_FINALI: string[] = WORKFLOWS.GENERICO.finals;
export const TRANSIZIONI: Record<string, string[]> = WORKFLOWS.GENERICO.transitions;
