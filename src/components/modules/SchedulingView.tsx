import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { Calendar as CalendarIcon, Kanban, AlignLeft, Flag, Zap, CheckCircle2, AlertCircle } from "lucide-react";

export const SchedulingView: React.FC = () => {
  const { activeProject } = useProject();
  const lifecyclePhases = activeProject?.lifecyclePhases || [];
  const [viewMode, setViewMode] = useState<"gantt" | "kanban" | "milestones">("gantt");

  const allTasks = lifecyclePhases.flatMap((ph) =>
    ph.workPackages.flatMap((wp) => wp.tasks)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div
        className="hero-banner animate-fadeIn"
        style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              Module 5
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Enterprise Scheduling Engine</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Scheduling & Gantt Engine
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Critical Path Method (CPM), milestone forecasting, baseline variance comparison, and interactive Kanban.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <AlignLeft style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* View Content */}
      {viewMode === "gantt" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white">Interactive Gantt & Critical Path Schedule</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Critical Path
              </span>
              <span className="flex items-center gap-1 text-indigo-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-glow)]0"></span> Standard Task
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {allTasks.map((t) => (
              <div key={t.id} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-indigo-400 font-bold">{t.wbsCode}</span>
                    <span className="font-semibold text-white">{t.title}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">({t.assignedTo})</span>
                  </div>
                  <span className="text-[var(--text-muted)] font-mono text-[11px]">{t.progressPercent}% Complete ({t.durationDays}d)</span>
                </div>

                {/* Visual Gantt Bar */}
                <div className="w-full bg-slate-800 h-6 rounded-lg overflow-hidden relative flex items-center px-2">
                  <div
                    className={`h-4 rounded transition-all duration-500 flex items-center justify-end px-2 text-[10px] font-bold text-white ${
                      t.isCriticalPath ? "bg-gradient-to-r from-rose-600 to-rose-500" : "bg-gradient-to-r from-indigo-600 to-blue-500"
                    }`}
                    style={{ width: `${Math.max(t.progressPercent, 15)}%` }}
                  >
                    {t.progressPercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Not Started", "In Progress", "Completed"].map((status) => {
            const tasksInCol = allTasks.filter((t) => t.status === status);
            return (
              <div key={status} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{status}</h3>
                  <span className="text-xs font-mono bg-slate-800 text-[var(--text-muted)] px-2 py-0.5 rounded-full">
                    {tasksInCol.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {tasksInCol.map((t) => (
                    <div key={t.id} className="bg-slate-800/80 border border-slate-700/70 rounded-xl p-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-indigo-400">{t.wbsCode}</span>
                        {t.isCriticalPath && (
                          <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-500/30">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-white">{t.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                        <span>Assigned: {t.assignedTo}</span>
                        <span>{t.effortDays} Days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === "milestones" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white">Project Major Milestones</h3>
          <div className="space-y-3 text-xs">
            {allTasks.filter((t) => t.isMilestone).map((m) => (
              <div key={m.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--amber-dim)]0/20 text-amber-300">
                    <Flag className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{m.title}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">Deliverable: {m.deliverableName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    m.status === "Completed" ? "bg-[var(--green-dim)]0/20 text-emerald-400" : "bg-[var(--amber-dim)]0/20 text-amber-300"
                  }`}>
                    {m.status}
                  </span>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">End: {m.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
