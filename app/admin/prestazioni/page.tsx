export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { createService, toggleService, deleteService } from "@/app/actions/admin";
import { WORKFLOWS } from "@/lib/constants";
import Link from "next/link";
import { LogoFull } from "@/app/components/Logo";

export default async function AdminPrestazioniPage() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin" className="text-sm text-blue-600 hover:underline">← Admin</Link>
          <span className="text-gray-300">|</span>
          <Link href="/"><LogoFull /></Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestione prestazioni</h2>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Aggiungi prestazione</h3>
          <form action={createService} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                name="name"
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
              <textarea
                name="description"
                rows={2}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo di workflow</label>
              <select
                name="workflowType"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(WORKFLOWS).map(([key, wf]) => (
                  <option key={key} value={key}>{wf.label}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm"
            >
              Aggiungi
            </button>
          </form>
        </div>

        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Prestazioni ({services.length})
        </h3>
        {services.length === 0 ? (
          <p className="text-gray-500 text-sm">Nessuna prestazione ancora creata.</p>
        ) : (
          <div className="space-y-3">
            {services.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-gray-900">{s.name}</p>
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      {WORKFLOWS[s.workflowType as keyof typeof WORKFLOWS]?.label ?? s.workflowType}
                    </span>
                    {!s.isActive && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        disattiva
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{s.description}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <form action={toggleService}>
                    <input type="hidden" name="id" value={s.id} />
                    <button
                      type="submit"
                      className="text-xs border border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-lg"
                    >
                      {s.isActive ? "Disattiva" : "Attiva"}
                    </button>
                  </form>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={s.id} />
                    <button
                      type="submit"
                      className="text-xs border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg"
                    >
                      Elimina
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
