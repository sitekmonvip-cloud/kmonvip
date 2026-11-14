"use client";

import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import LeadCard from "@/components/crm/LeadCard";
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadRow, type LeadStatus } from "@/lib/crm/types";

// Finished leads are rarely worked on, so those columns start folded to save width.
const INITIAL_COLLAPSED: Partial<Record<LeadStatus, boolean>> = { fechado: true, perdido: true };

export default function LeadBoard({
  leads,
  onStatusChange,
  onEdit,
}: {
  leads: LeadRow[];
  onStatusChange: (id: number, status: LeadStatus) => void;
  onEdit: (lead: LeadRow) => void;
}) {
  const [collapsed, setCollapsed] = useState(INITIAL_COLLAPSED);
  const [dragOver, setDragOver] = useState<LeadStatus | null>(null);
  // Kept in state as well as in the drag event: some browsers hide event data during dragover/drop.
  const [dragId, setDragId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<LeadStatus>("novo");

  const byStatus = (status: LeadStatus) => leads.filter((l) => l.status === status);

  return (
    <div>
      {/* Phones: one column at a time, picked with tabs (drag and drop needs a mouse). */}
      <div className="mb-4 flex gap-2 overflow-x-auto md:hidden" role="tablist">
        {LEAD_STATUSES.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={activeTab === s}
            onClick={() => setActiveTab(s)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === s ? "bg-ink-900 text-white" : "border border-ink-200 text-ink-700"
            }`}
          >
            {LEAD_STATUS_LABELS[s]} · {byStatus(s).length}
          </button>
        ))}
      </div>

      <div className="md:flex md:items-start md:gap-4 md:overflow-x-auto md:pb-2">
        {LEAD_STATUSES.map((status) => {
          const items = byStatus(status);
          const isCollapsed = Boolean(collapsed[status]);
          const isOver = dragOver === status;

          return (
            <section
              key={status}
              aria-label={LEAD_STATUS_LABELS[status]}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (dragOver !== status) setDragOver(status);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragOver(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const id = Number(e.dataTransfer.getData("text/plain")) || dragId;
                setDragOver(null);
                setDragId(null);
                if (id) onStatusChange(id, status);
              }}
              className={`rounded-xl border bg-ink-50/60 transition-colors md:shrink-0 ${
                isCollapsed ? "md:w-14" : "md:w-[272px]"
              } ${activeTab === status ? "block" : "hidden"} md:block ${
                isOver ? "border-ink-900 bg-ink-50" : "border-ink-100"
              }`}
            >
              {isCollapsed && (
                <button
                  type="button"
                  onClick={() => setCollapsed((c) => ({ ...c, [status]: false }))}
                  title={`Expandir ${LEAD_STATUS_LABELS[status]}`}
                  className="hidden w-full flex-col items-center gap-3 px-2 py-4 md:flex"
                >
                  <ChevronsLeftRight size={16} className="text-ink-500" />
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-ink-700">
                    {items.length}
                  </span>
                  <span className="text-xs font-medium text-ink-700 [writing-mode:vertical-rl]">
                    {LEAD_STATUS_LABELS[status]}
                  </span>
                </button>
              )}

              <div className={isCollapsed ? "md:hidden" : ""}>
                <header className="hidden items-center justify-between px-3.5 pt-3.5 md:flex">
                  <h2 className="text-sm font-medium text-ink-900">
                    {LEAD_STATUS_LABELS[status]}{" "}
                    <span className="ml-1 rounded-full bg-white px-2 py-0.5 text-xs font-medium text-ink-700">
                      {items.length}
                    </span>
                  </h2>
                  <button
                    type="button"
                    onClick={() => setCollapsed((c) => ({ ...c, [status]: true }))}
                    title="Recolher coluna"
                    aria-label={`Recolher ${LEAD_STATUS_LABELS[status]}`}
                    className="hidden rounded-full p-1.5 text-ink-500 hover:bg-white md:block"
                  >
                    <ChevronsLeftRight size={14} />
                  </button>
                </header>

                <div className="space-y-3 p-3 md:max-h-[calc(100vh-17rem)] md:overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-ink-200 px-3 py-6 text-center text-xs text-ink-500">
                      Nenhum lead
                    </p>
                  ) : (
                    items.map((lead) => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onEdit={onEdit}
                        onStatusChange={onStatusChange}
                        onDragStart={setDragId}
                        onDragEnd={() => {
                          setDragId(null);
                          setDragOver(null);
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
