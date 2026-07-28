import React from "react";
import { useProject } from "../../context/ProjectContext";
import { ShieldCheck, Users, CheckCircle2 } from "lucide-react";

export const GovernanceView: React.FC = () => {
  const { activeProject } = useProject();

  const raciTasks = [
    { task: "Project Charter Sign-off", R: "Project Manager", A: "Sponsor", C: "Enterprise Architect", I: "Team" },
    { task: "Architecture Blueprint", R: "Lead Architect", A: "Project Manager", C: "InfoSec Lead", I: "Sponsor" },
    { task: "Budget Approval & Variance", R: "Financial Controller", A: "Sponsor", C: "Project Manager", I: "Steering Committee" },
    { task: "UAT Sign-off & Release Gate", R: "QA Lead", A: "Business Lead", C: "Dev Lead", I: "Users" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 15
            </span>
            <span className="text-xs text-slate-400">PMO Governance & RACI</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Project Governance & RACI Matrix</h1>
          <p className="text-xs text-slate-400 mt-1">
            Define Responsible (R), Accountable (A), Consulted (C), and Informed (I) roles across major project gates.
          </p>
        </div>
      </div>

      {/* RACI Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          Governance RACI Accountability Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Governance Activity</th>
                <th className="p-3 text-indigo-400 font-mono">Responsible (R)</th>
                <th className="p-3 text-rose-400 font-mono">Accountable (A)</th>
                <th className="p-3 text-amber-300 font-mono">Consulted (C)</th>
                <th className="p-3 text-emerald-400 font-mono">Informed (I)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {raciTasks.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-white">{r.task}</td>
                  <td className="p-3 text-slate-200 font-semibold">{r.R}</td>
                  <td className="p-3 text-rose-300 font-semibold">{r.A}</td>
                  <td className="p-3 text-slate-300">{r.C}</td>
                  <td className="p-3 text-slate-400">{r.I}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
