export const dynamic = "force-dynamic";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { STATO_COLOR, STATO_LABEL, getWorkflow } from "@/lib/constants";
import { advanceStatus } from "@/app/actions/admin";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoFull } from "@/app/components/Logo";

export default async function AdminRichiestaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await auth();

  const request = await prisma.request.findUnique({
    where: { id },
    include: {
      client: true,
      service: true,
      statusUpdates: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!request) notFound();

  const currentStatus = request.statusUpdates[request.statusUpdates.length - 1]?.status ?? "INVIATA";
  const workflow = getWorkflow(request.service.workflowType);
  const nextStates = workflow.transitions[currentStatus] ?? [];
  const isFinale = workflow.finals.includes(currentStatus);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/"><LogoFull /></Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/admin" className="text-sm text-blue-600 hover:underline mb-4 block">
          ← Pannello Admin
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{request.service.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Cliente: <strong>{request.client.name}</strong> ({request.client.email})
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Inviata il {new Date(request.createdAt).toLocaleDateString("it-IT")}
              </p>
            </div>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATO_COLOR[currentStatus]}`}>
              {STATO_LABEL[currentStatus]}
            </span>
          </div>
          {request.notes && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-medium text-gray-500 mb-1">Note del cliente</p>
              <p className="text-sm text-gray-700">{request.notes}</p>
            </div>
          )}
        </div>

        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Timeline pratica
        </h3>
        <div className="space-y-0 mb-8">
          {request.statusUpdates.map((update, i) => {
            const isLast = i === request.statusUpdates.length - 1;
            return (
              <div key={update.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${isLast ? "bg-blue-600" : "bg-gray-300"}`} />
                  {!isLast && <div className="w-0.5 bg-gray-200 flex-1 my-1" />}
                </div>
                <div className="pb-5">
                  <p className="text-sm font-medium text-gray-900">{STATO_LABEL[update.status]}</p>
                  {update.message && <p className="text-sm text-gray-600 mt-0.5">{update.message}</p>}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(update.createdAt).toLocaleString("it-IT")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {!isFinale && nextStates.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Aggiorna stato pratica</h3>
            <form action={advanceStatus} className="space-y-4">
              <input type="hidden" name="requestId" value={request.id} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nuovo stato</label>
                <select
                  name="status"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {nextStates.map((s) => (
                    <option key={s} value={s}>{STATO_LABEL[s]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Messaggio per il cliente <span className="text-gray-400">(facoltativo)</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Aggiungi un messaggio o la risposta finale..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm"
              >
                Aggiorna stato
              </button>
            </form>
          </div>
        )}

        {isFinale && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm text-gray-600">Questa pratica è chiusa.</p>
          </div>
        )}
      </main>
    </div>
  );
}
