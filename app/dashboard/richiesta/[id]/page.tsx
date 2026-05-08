import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { STATO_COLOR, STATO_LABEL, getWorkflow } from "@/lib/constants";
import { uploadDocument, deleteDocument } from "@/app/actions/documents";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LogoFull } from "@/app/components/Logo";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function RichiestaClientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const request = await prisma.request.findUnique({
    where: { id },
    include: {
      service: true,
      statusUpdates: { orderBy: { createdAt: "asc" } },
      documents: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!request || request.clientId !== session!.user!.id) notFound();

  const currentStatus = request.statusUpdates[request.statusUpdates.length - 1]?.status ?? "INVIATA";
  const workflow = getWorkflow(request.service.workflowType);
  const isFinale = workflow.finals.includes(currentStatus);
  const praticaAvviata = request.statusUpdates.length > 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/"><LogoFull /></Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-10 space-y-6">
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline block">
          ← Le mie pratiche
        </Link>

        {/* Card pratica */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0">
              <h2 className="text-xl font-black text-[#0F2540] leading-tight">{request.service.name}</h2>
              <p className="text-sm text-gray-400 mt-1">
                Aperta il {new Date(request.createdAt).toLocaleDateString("it-IT")}
              </p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${STATO_COLOR[currentStatus]}`}>
              {STATO_LABEL[currentStatus] ?? currentStatus}
            </span>
          </div>
          {request.notes && (
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-400 mb-1">Le tue note iniziali</p>
              <p className="text-sm text-gray-700">{request.notes}</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
            Avanzamento pratica
          </h3>
          <div className="space-y-0">
            {request.statusUpdates.map((update, i) => {
              const isLast = i === request.statusUpdates.length - 1;
              return (
                <div key={update.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${isLast ? "bg-[#F59E0B]" : "bg-gray-200"}`} />
                    {!isLast && <div className="w-0.5 bg-gray-100 flex-1 my-1" />}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-semibold text-gray-800">{STATO_LABEL[update.status] ?? update.status}</p>
                    {update.message && (
                      <p className="text-sm text-gray-500 mt-0.5">{update.message}</p>
                    )}
                    <p className="text-xs text-gray-300 mt-1">
                      {new Date(update.createdAt).toLocaleString("it-IT")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stato in lavorazione */}
        {!isFinale && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-sm text-blue-700">
              La tua pratica è in lavorazione. Riceverai aggiornamenti dallo studio non appena lo stato avanza.
            </p>
          </div>
        )}

        {/* Upload documenti — visibile solo dopo il primo aggiornamento */}
        {praticaAvviata && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h3 className="text-sm font-black text-[#0F2540] mb-1">Documenti</h3>
            <p className="text-xs text-gray-400 mb-5">
              Carica qui tutta la documentazione richiesta dallo studio (max 10 MB per file).
            </p>

            {/* Upload form */}
            <form action={uploadDocument} className="flex flex-col sm:flex-row gap-3 mb-5">
              <input type="hidden" name="requestId" value={request.id} />
              <input
                type="file"
                name="file"
                required
                className="flex-1 text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 file:cursor-pointer cursor-pointer"
              />
              <button
                type="submit"
                className="bg-[#0F2540] hover:bg-[#1E3A5F] text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors whitespace-nowrap"
              >
                Carica →
              </button>
            </form>

            {/* Lista documenti */}
            {request.documents.length > 0 ? (
              <div className="space-y-2">
                {request.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-gray-400 text-base flex-shrink-0">📄</span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-400">{formatSize(doc.size)}</p>
                      </div>
                    </div>
                    <form action={deleteDocument}>
                      <input type="hidden" name="documentId" value={doc.id} />
                      <button type="submit" className="text-xs text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
                        Rimuovi
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-300 text-center py-3">Nessun documento caricato ancora.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
