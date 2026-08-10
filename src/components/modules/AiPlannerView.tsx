import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { Sparkles, Layers, ChevronRight, ChevronDown, CheckCircle2, Clock, User, Plus, Loader2 } from "lucide-react";

export const AiPlannerView: React.FC = () => {
  const { activeProject, generateAiProjectPlan, isAiLoading, updateActiveProject } = useProject();
  const lifecyclePhases = activeProject?.lifecyclePhases || [];

  const [promptInput, setPromptInput] = useState(
    `Generate enterprise project plan for ${activeProject?.name || "Project"} with 5 phases, resource allocations, and dependencies.`
  );

  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    "ph-1": true,
    "ph-2": true,
    "ph-3": true
  });

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerate = async () => {
    if (isAiLoading) return;
    await generateAiProjectPlan({
      projectName: activeProject.name,
      projectType: activeProject.intake.type,
      department: activeProject.intake.department,
      description: promptInput,
      estimatedBudget: activeProject.intake.estimatedBudget,
      durationMonths: 6
    });
  };

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, sans-serif" }}>
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <div
        className="hero-banner animate-fadeIn"
        style={{ padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              Module 4
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Generative PMO Engine</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles className="w-5 h-5 text-amber-500" />
            AI Project Plan & WBS Generator
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Automated 4-Level Work Breakdown Structure (Phase → Work Package → Task → Subtask) with effort & dependency estimation.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <Sparkles style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* AI Prompt Launcher */}
      <div className="glass-card rounded-xl p-5 shadow-sm space-y-6">
        <label className="block section-label">
          AI Generation Prompt & Architecture Directives
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="e.g. Generate agile project plan for Cloud EHR Healthcare migration..."
            className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-md px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            onClick={handleGenerate}
            disabled={isAiLoading}
            className="bg-[var(--accent)] hover:bg-[var(--accent-2)] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-md shadow-sm flex items-center gap-2 shrink-0 transition-all"
          >
            {isAiLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>{isAiLoading ? "Generating WBS..." : "Run AI Generator"}</span>
          </button>
        </div>
      </div>

      {/* 4-Level Interactive WBS Tree */}
      <div className="glass-card rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <h3 className="section-label flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--accent)]" />
            Work Breakdown Structure Hierarchy (4 Levels)
          </h3>
          <span className="text-xs text-[var(--text-secondary)] font-mono">
            {lifecyclePhases.length} Phases Loaded
          </span>
        </div>

        <div className="space-y-6">
          {lifecyclePhases.map((phase) => {
            const isExp = expandedPhases[phase.id] ?? true;
            return (
              <div key={phase.id} className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-card)]/50">
                {/* Level 1: Phase Header */}
                <div
                  onClick={() => togglePhase(phase.id)}
                  className="bg-[var(--bg-card-hover)]/80 hover:bg-[var(--bg-card-hover)] p-3 flex items-center justify-between cursor-pointer text-xs font-bold text-[var(--text-primary)] border-b border-[var(--border)]"
                >
                  <div className="flex items-center gap-2.5">
                    {isExp ? <ChevronDown className="w-4 h-4 text-[var(--accent)]" /> : <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />}
                    <span className="font-mono text-[var(--accent)] bg-[var(--accent-glow)] px-2 py-0.5 rounded border border-[var(--accent-border)] text-[11px]">
                      LEVEL 1: {phase.wbsCode}
                    </span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">{phase.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--text-secondary)] font-normal">
                    <span className="flex items-center gap-1 font-mono text-xs">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {phase.durationDays} Days
                    </span>
                  </div>
                </div>

                {/* Level 2: Work Packages */}
                {isExp && (
                  <div className="p-4 space-y-6">
                    {phase.workPackages.map((wp) => (
                      <div key={wp.id} className="border border-[var(--border)] rounded-lg p-3.5 bg-[var(--bg-card)] space-y-6 shadow-xs">
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-[var(--green)] bg-[var(--green-dim)] px-2 py-0.5 rounded border border-emerald-200 font-bold">
                              LEVEL 2: {wp.wbsCode}
                            </span>
                            <span className="text-xs font-bold text-[var(--text-primary)]">{wp.name}</span>
                          </div>
                          <span className="text-[12px] text-[var(--text-secondary)]">Owner: <strong className="text-[var(--text-primary)]">{wp.owner}</strong></span>
                        </div>

                        {/* Level 3: Tasks */}
                        <div className="space-y-2 pl-2">
                          {wp.tasks.map((t) => (
                            <div key={t.id} className="bg-[var(--bg-card)] p-2.5 rounded-md border border-[var(--border)] text-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[12px] text-[var(--accent)] font-bold">{t.wbsCode}</span>
                                  <span className="font-semibold text-[var(--text-primary)]">{t.title}</span>
                                  {t.isCriticalPath && (
                                    <span className="text-[9px] bg-[var(--pink-dim)] text-[var(--pink)] font-bold px-2.5 py-1 rounded border border-red-200">
                                      Critical Path
                                    </span>
                                  )}
                                  {t.isMilestone && (
                                    <span className="text-[9px] bg-[var(--amber-dim)] text-[var(--amber)] font-bold px-2.5 py-1 rounded border border-amber-200">
                                      Milestone
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-[12px] text-[var(--text-secondary)]">
                                  <span>Role: <strong className="text-[var(--text-primary)]">{t.assignedRole}</strong></span>
                                  <span>Effort: <strong className="text-[var(--text-primary)]">{t.effortDays}d</strong></span>
                                  {t.dependencies.length > 0 && (
                                    <span>Pre-reqs: <strong className="text-[var(--accent)]">{t.dependencies.join(", ")}</strong></span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`text-[12px] font-bold px-2 py-0.5 rounded ${
                                  t.status === "Completed"
                                    ? "bg-[var(--green-dim)] text-[var(--green)] border border-emerald-200"
                                    : t.status === "In Progress"
                                    ? "bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent-border)]"
                                    : "bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border border-[var(--border)]"
                                }`}>
                                  {t.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
