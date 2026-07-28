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
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-900">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
              Module 4
            </span>
            <span className="text-xs text-slate-500">Generative PMO Engine</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            AI Project Plan & WBS Generator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated 4-Level Work Breakdown Structure (Phase → Work Package → Task → Subtask) with effort & dependency estimation.
          </p>
        </div>
      </div>

      {/* AI Prompt Launcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          AI Generation Prompt & Architecture Directives
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="e.g. Generate agile project plan for Cloud EHR Healthcare migration..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            onClick={handleGenerate}
            disabled={isAiLoading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-md shadow-sm flex items-center gap-2 shrink-0 transition-all"
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
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            Work Breakdown Structure Hierarchy (4 Levels)
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {lifecyclePhases.length} Phases Loaded
          </span>
        </div>

        <div className="space-y-4">
          {lifecyclePhases.map((phase) => {
            const isExp = expandedPhases[phase.id] ?? true;
            return (
              <div key={phase.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                {/* Level 1: Phase Header */}
                <div
                  onClick={() => togglePhase(phase.id)}
                  className="bg-slate-100/80 hover:bg-slate-100 p-3 flex items-center justify-between cursor-pointer text-xs font-bold text-slate-800 border-b border-slate-200"
                >
                  <div className="flex items-center gap-2.5">
                    {isExp ? <ChevronDown className="w-4 h-4 text-indigo-600" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                    <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 text-[11px]">
                      LEVEL 1: {phase.wbsCode}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{phase.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 font-normal">
                    <span className="flex items-center gap-1 font-mono text-xs">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      {phase.durationDays} Days
                    </span>
                  </div>
                </div>

                {/* Level 2: Work Packages */}
                {isExp && (
                  <div className="p-4 space-y-4">
                    {phase.workPackages.map((wp) => (
                      <div key={wp.id} className="border border-slate-200 rounded-lg p-3.5 bg-white space-y-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                              LEVEL 2: {wp.wbsCode}
                            </span>
                            <span className="text-xs font-bold text-slate-800">{wp.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">Owner: <strong className="text-slate-700">{wp.owner}</strong></span>
                        </div>

                        {/* Level 3: Tasks */}
                        <div className="space-y-2 pl-2">
                          {wp.tasks.map((t) => (
                            <div key={t.id} className="bg-slate-50 p-2.5 rounded-md border border-slate-200 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-indigo-600 font-bold">{t.wbsCode}</span>
                                  <span className="font-semibold text-slate-800">{t.title}</span>
                                  {t.isCriticalPath && (
                                    <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded border border-red-200">
                                      Critical Path
                                    </span>
                                  )}
                                  {t.isMilestone && (
                                    <span className="text-[9px] bg-amber-50 text-amber-600 font-bold px-1.5 py-0.5 rounded border border-amber-200">
                                      Milestone
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                                  <span>Role: <strong className="text-slate-700">{t.assignedRole}</strong></span>
                                  <span>Effort: <strong className="text-slate-700">{t.effortDays}d</strong></span>
                                  {t.dependencies.length > 0 && (
                                    <span>Pre-reqs: <strong className="text-indigo-600">{t.dependencies.join(", ")}</strong></span>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                  t.status === "Completed"
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                    : t.status === "In Progress"
                                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                                    : "bg-slate-100 text-slate-600 border border-slate-200"
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
