import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import { MessageSquare, Send, Sparkles, FileText, CheckCircle2 } from "lucide-react";

export const CommunicationView: React.FC = () => {
  const { activeProject } = useProject();
  const [reportType, setReportType] = useState<"weekly" | "executive" | "steering">("weekly");

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 14
            </span>
            <span className="text-xs text-slate-400">Communication & Status Reporting</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Communication Management & Status Deck</h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated status report generation for Executive Steering Committees, PMO, and project team syncs.
          </p>
        </div>
      </div>

      {/* Report Generator Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs w-max">
          <button
            onClick={() => setReportType("weekly")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              reportType === "weekly" ? "bg-indigo-600 text-white" : "text-slate-400"
            }`}
          >
            Weekly PMO Status Report
          </button>
          <button
            onClick={() => setReportType("executive")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              reportType === "executive" ? "bg-indigo-600 text-white" : "text-slate-400"
            }`}
          >
            Executive 1-Pager Brief
          </button>
        </div>

        {/* Generated Report Card */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {reportType === "weekly" ? "Weekly Project Status Summary" : "Executive Steering Brief"} - {activeProject.name}
            </h3>
            <span className="text-slate-400 font-mono">Date: {new Date().toLocaleDateString()}</span>
          </div>

          <div className="space-y-3 text-slate-300 leading-relaxed">
            <p>
              <strong className="text-white">Executive Progress Overview:</strong> {activeProject.name} is currently tracking at{" "}
              <span className="text-emerald-400 font-bold">{activeProject.health.overallHealth} Health</span>. CPI stands at{" "}
              <strong className="text-indigo-400">{activeProject.evm.CPI}</strong> and SPI at{" "}
              <strong className="text-indigo-400">{activeProject.evm.SPI}</strong>.
            </p>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
              <span className="font-bold text-white uppercase tracking-wider text-[10px]">Key Accomplishments This Week:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Finalized cloud security architecture review and IAM SAML federation.</li>
                <li>Completed Sprint 4 deliverables with 98% quality test pass rate.</li>
                <li>Mitigated RSK-14 database latency risk via read-replica deployment.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
