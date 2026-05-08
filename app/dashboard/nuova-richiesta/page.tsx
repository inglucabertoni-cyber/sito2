export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { createRequest } from "@/app/actions/requests";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoFull } from "@/app/components/Logo";

export default async function NuovaRichiestaPage({
  searchParams,
}: {
  searchParams: Promise<{ serviceId?: string }>;
}) {
  const { serviceId } = await searchParams;
  if (!serviceId) notFound();

  const service = await prisma.service.findUnique({ where: { id: serviceId, isActive: true } });
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/"><LogoFull /></Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-12">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mb-4 block">
          ← Le mie richieste
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Nuova richiesta</h2>
          <p className="text-sm text-gray-600 mb-6">
            Prestazione selezionata: <strong>{service.name}</strong>
          </p>
          <form action={createRequest} className="space-y-5">
            <input type="hidden" name="serviceId" value={service.id} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note aggiuntive <span className="text-gray-400">(facoltativo)</span>
              </label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Descrivi la tua situazione o aggiungi dettagli utili..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm"
            >
              Invia richiesta
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
