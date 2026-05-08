import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const SERVIZI = [
  {
    name: "Analisi dell'immobile",
    workflowType: "ANALISI_IMMOBILE",
    description:
      "Valutiamo la congruità del prezzo rispetto al mercato locale e verifichiamo che l'immobile risponda alle tue reali aspettative. Analisi comparativa, valutazione rischio/opportunità e report di congruità.",
  },
  {
    name: "Due diligence tecnica",
    workflowType: "DUE_DILIGENCE",
    description:
      "Verifichiamo la legittimità urbanistica e catastale dell'immobile, controlliamo permessi, concessioni e conformità. Ti proteggiamo da rischi nascosti prima che diventino problemi costosi.",
  },
  {
    name: "Progettazione e soluzioni",
    workflowType: "PROGETTAZIONE",
    description:
      "Progettiamo gli spazi in base alle tue esigenze di vita e troviamo soluzioni tecniche personalizzate. Dalla planimetria al progetto di ristrutturazione, ogni centimetro è ottimizzato.",
  },
  {
    name: "Gare d'appalto e realizzazione",
    workflowType: "APPALTO",
    description:
      "Gestiamo le gare d'appalto per selezionare i migliori esecutori al prezzo giusto e supervisioniamo la fase realizzativa. Direzione lavori, collaudo e consegna finale.",
  },
];

async function main() {
  const adminPassword = await bcrypt.hash("admin1234", 10);
  await prisma.user.upsert({
    where: { email: "admin@bertonirocaro.it" },
    update: {},
    create: {
      name: "Studio BR",
      email: "admin@bertonirocaro.it",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("Admin: admin@bertonirocaro.it / admin1234");

  for (const s of SERVIZI) {
    const existing = await prisma.service.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.service.create({ data: s });
      console.log(`Servizio creato: ${s.name}`);
    } else {
      await prisma.service.update({ where: { id: existing.id }, data: { workflowType: s.workflowType } });
      console.log(`Servizio aggiornato: ${s.name} → workflow ${s.workflowType}`);
    }
  }
  console.log("Seed completato.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
