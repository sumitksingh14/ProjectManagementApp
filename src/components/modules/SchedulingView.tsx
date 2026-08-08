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

  const viewTabs = [
    { id: "gantt", label: "Gantt / CPM", icon: <AlignLeft className="w-3.5 h-3.5" /> },
    { id: "kanban", label: "Kanban Board", icon: <Kanban className="w-3.5 h-3.5" /> },
    { id: "milestones", label: "Milestones", icon: <Flag className="w-3.5 h-3.5" /> },
  ];

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
            Scheduling &amp; Gantt Engine
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Critical Path Method (CPM), milestone forecasting, baseline variance comparison, and interactive Kanban.
          </p>
        </div>
        {/* View Mode Toggle */}
        <div className="flex glass-card rounded-xl p-1 gap-1 shrink-0" style={{ padding: "4px" }}>
          {viewTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === tab.id ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* View Content */}
      {viewMode === "gantt" && (
        <div className="glass-card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)" }}>Interactive Gantt &amp; Critical Path Schedule</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5" style={{ color: "var(--pink)", fontWeight: 700 }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} /> Critical Path
              </span>
              <span className="flex items-center gap-1.5" style={{ color: "var(--accent)", fontWeight: 700 }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} /> Standard Task
              </span>
            </div>
          </div>
          <div style={{ padding: "16px 20px" }}>
            <div className="space-y-4">
              {allTasks.map((t) => (
                <div key={t.id} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: "monospace", color: "var(--accent)", fontWeight: 700, fontSize: "10px" }}>{t.wbsCode}</span>
                      <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{t.title}</span>
                      <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>({t.assignedTo})</span>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontFamily: "monospace", fontSize: "11px" }}>{t.progressPercent}% Complete ({t.durationDays}d)</span>
                  </div>
                  {/* Visual Gantt Bar */}
                  <div style={{ width: "100%", background: "rgba(255,255,255,0.05)", height: "24px", borderRadius: "8px", overflow: "hidden", position: "relative", display: "flex", alignItems: "center", padding: "0 8px" }}>
                    <div
                      style={{
                        height: "16px", borderRadius: "6px", transition: "width 0.5s",
                        display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "8px",
                        fontSize: "10px", fontWeight: 700, color: "#fff",
                        width: `${Math.max(t.progressPercent, 15)}%`,
                        background: t.isCriticalPath
                          ? "linear-gradient(90deg, #BE185D, var(--pink))"
                          : "linear-gradient(90deg, var(--accent-2), var(--accent))"
                      }}
                    >
                      {t.progressPercent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Not Started", "In Progress", "Completed"].map((status) => {
            const tasksInCol = allTasks.filter((t) => t.status === status);
            const accentMap: Record<string, string> = {
              "Not Started": "var(--text-muted)",
              "In Progress": "var(--accent)",
              "Completed": "var(--green)"
            };
            return (
              <div key={status} className="glass-card" style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: "10px", marginBottom: "14px" }}>
                  <h3 style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: accentMap[status], textTransform: "uppercase", letterSpacing: "0.06em" }}>{status}</h3>
                  <span style={{ fontFamily: "monospace", fontSize: "var(--text-xs)", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-muted)", padding: "2px 8px", borderRadius: "99px" }}>
                    {tasksInCol.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasksInCol.map((t) => (
                    <div key={t.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: "10px", padding: "12px" }} className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span style={{ fontFamily: "monospace", fontSize: "10px", color: "var(--accent)" }}>{t.wbsCode}</span>
                        {t.isCriticalPath && (
                          <span style={{ fontSize: "9px", background: "var(--pink-dim)", color: "var(--pink)", padding: "2px 6px", borderRadius: "4px", border: "1px solid rgba(236,72,153,0.25)" }}>
                            Critical
                          </span>
                        )}
                      </div>
                      <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{t.title}</p>
                      <div className="flex items-center justify-between" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
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
        <div className="glass-card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)" }}>Project Major Milestones</h3>
          </div>
          <div style={{ padding: "16px 20px" }} className="space-y-3 text-xs">
            {allTasks.filter((t) => t.isMilestone).map((m) => (
              <div key={m.id} style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="flex items-center gap-3">
                  <div style={{ padding: "8px", borderRadius: "8px", background: "var(--amber-dim)", color: "var(--amber)" }}>
                    <Flag className="w-5 h-5" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{m.title}</p>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)" }}>Deliverable: {m.deliverableName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={m.status === "Completed" ? "badge-green" : "badge-amber"}>
                    {m.status}
                  </span>
                  <p style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "4px", fontFamily: "monospace" }}>End: {m.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
