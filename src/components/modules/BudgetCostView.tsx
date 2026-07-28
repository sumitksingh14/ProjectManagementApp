import React from "react";
import { useProject } from "../../context/ProjectContext";
import { DollarSign, PieChart, TrendingUp, AlertTriangle } from "lucide-react";

export const BudgetCostView: React.FC = () => {
  const { activeProject } = useProject();
  const costLineItems = activeProject?.costLineItems || [];
  const intake = activeProject?.intake || { estimatedBudget: 0 };

  const totalPlanned = costLineItems.reduce((acc, c) => acc + c.plannedAmount, 0);
  const totalForecast = costLineItems.reduce((acc, c) => acc + c.forecastAmount, 0);
  const totalActual = costLineItems.reduce((acc, c) => acc + c.actualAmount, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 8
            </span>
            <span className="text-xs text-slate-400">Cost Breakdown Structure (CBS)</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Budget & Cost Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track planned budget vs forecast vs actual expenditures across Labor, Cloud, Licenses, Vendors & Contingency.
          </p>
        </div>
      </div>

      {/* Financial Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
          <span className="text-xs text-slate-400 font-medium">Approved Planned Budget</span>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono">${totalPlanned.toLocaleString()}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
          <span className="text-xs text-slate-400 font-medium">Forecasted Total Spend</span>
          <div className="text-2xl font-extrabold text-indigo-400 mt-1 font-mono">${totalForecast.toLocaleString()}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
          <span className="text-xs text-slate-400 font-medium">Actual Incurred Spend</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">${totalActual.toLocaleString()}</div>
        </div>
      </div>

      {/* Cost Breakdown Structure Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-indigo-400" />
          Cost Breakdown Structure (CBS) Line Items
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3">Cost Category</th>
                <th className="p-3">Description</th>
                <th className="p-3 font-mono">Planned ($)</th>
                <th className="p-3 font-mono">Forecast ($)</th>
                <th className="p-3 font-mono">Actual Incurred ($)</th>
                <th className="p-3 font-mono">Variance ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {costLineItems.map((c) => {
                const variance = c.plannedAmount - c.forecastAmount;
                return (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-bold text-white">
                      <span className="bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">
                        {c.category}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{c.description}</td>
                    <td className="p-3 font-mono text-slate-200">${c.plannedAmount.toLocaleString()}</td>
                    <td className="p-3 font-mono text-indigo-300">${c.forecastAmount.toLocaleString()}</td>
                    <td className="p-3 font-mono text-emerald-400">${c.actualAmount.toLocaleString()}</td>
                    <td className="p-3 font-mono">
                      <span className={variance >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                        {variance >= 0 ? `+$${variance.toLocaleString()}` : `-$${Math.abs(variance).toLocaleString()}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
