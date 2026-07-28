import React from "react";
import { useProject } from "../../context/ProjectContext";
import { Layers, TrendingUp, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";

export const PortfolioView: React.FC = () => {
  const { activePortfolio, activeProject, setActiveProjectById } = useProject();

  const portfolioName = activePortfolio?.name || "Enterprise Digital Portfolio";
  const portfolioDesc = activePortfolio?.description || "Strategic IT and Product Initiatives";
  const portfolioBudget = activePortfolio?.totalBudget ? (activePortfolio.totalBudget / 1000000).toFixed(1) : "12.5";
  const portfolioOwner = activePortfolio?.owner || "VP of Strategy";
  const alignmentScore = activePortfolio?.strategicAlignmentScore || 92;
  const projectList = activePortfolio?.projects || [];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-900">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">
              Module 18 & 20
            </span>
            <span className="text-xs text-slate-500">Enterprise PMO Portfolio Management</span>
          </div>
          <h1 className="text-xl font-bold text-slate-800">{portfolioName}</h1>
          <p className="text-xs text-slate-500 mt-1">{portfolioDesc}</p>
        </div>
      </div>

      {/* Portfolio KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-1">
          <span className="text-slate-500 font-medium">Total Portfolio Investment</span>
          <div className="text-2xl font-bold text-slate-800 font-mono">${portfolioBudget}M</div>
          <p className="text-[10px] text-slate-500">Owner: {portfolioOwner}</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-1">
          <span className="text-slate-500 font-medium">Strategic Alignment Score</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">{alignmentScore} / 100</div>
          <p className="text-[10px] text-slate-500">Corporate Strategy Focus 2026</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-1">
          <span className="text-slate-500 font-medium">Active Projects in Portfolio</span>
          <div className="text-2xl font-bold text-indigo-600 font-mono">{projectList.length} Projects</div>
          <p className="text-[10px] text-slate-500">Active PMO Supervision</p>
        </div>
      </div>

      {/* Portfolio Projects Cards */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Portfolio Projects Roster</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {projectList.map((p) => {
            const isCurrent = p.id === activeProject.id;
            return (
              <div
                key={p.id}
                onClick={() => setActiveProjectById(p.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer space-y-3 ${
                  isCurrent
                    ? "bg-indigo-50 border-indigo-300 shadow-sm"
                    : "bg-slate-50/50 border-slate-200 hover:bg-slate-100/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded border border-indigo-200">
                    {p.code}
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Health: {p.health?.overallHealth || "Green"}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{p.intake?.strategicObjective || ""}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex gap-3 font-mono">
                    <span>CPI: <strong className="text-indigo-600">{p.evm?.CPI || 1.0}</strong></span>
                    <span>SPI: <strong className="text-indigo-600">{p.evm?.SPI || 1.0}</strong></span>
                  </div>
                  <span className="text-indigo-600 font-bold flex items-center gap-1">
                    {isCurrent ? "Active Project" : "Switch View"} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
