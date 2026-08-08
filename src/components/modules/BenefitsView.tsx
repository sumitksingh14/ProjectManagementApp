import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  DollarSign,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import { Benefit } from "../../types";

const statusConfig: Record<Benefit["realizationStatus"], { color: string; label: string }> = {
  "Not Started": { color: "badge-slate", label: "Not Started" },
  "In Progress": { color: "badge-blue", label: "In Progress" },
  "Partially Realized": { color: "badge-amber", label: "Partial" },
  "Fully Realized": { color: "badge-green", label: "Realized ✓" },
  "Not Achieved": { color: "badge-red", label: "Not Achieved" }
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Financial": <DollarSign className="w-3.5 h-3.5" />,
  "Operational": <BarChart2 className="w-3.5 h-3.5" />,
  "Strategic": <Sparkles className="w-3.5 h-3.5" />,
  "Customer": <CheckCircle2 className="w-3.5 h-3.5" />,
  "Compliance": <Target className="w-3.5 h-3.5" />,
  "Risk Reduction": <AlertCircle className="w-3.5 h-3.5" />
};

const defaultBenefits: Benefit[] = [
  {
    id: "ben-001",
    title: "Annual Labor Cost Reduction",
    category: "Financial",
    description: "Automate manual processes to reduce FTE headcount for operational tasks",
    owner: "CFO Office",
    targetValue: "$2.4M annual savings",
    targetDate: "2026-12-31",
    actualValue: "$1.1M achieved",
    realizationStatus: "Partially Realized",
    measurementMethod: "FTE cost tracking via HR system quarterly reports"
  },
  {
    id: "ben-002",
    title: "Customer Onboarding Time Reduction",
    category: "Customer",
    description: "Reduce customer onboarding cycle from 14 days to 3 days via digital portal",
    owner: "Head of Customer Success",
    targetValue: "3 business days",
    targetDate: "2026-09-30",
    actualValue: "5 business days",
    realizationStatus: "In Progress",
    measurementMethod: "CRM average onboarding cycle time dashboard"
  },
  {
    id: "ben-003",
    title: "Regulatory Compliance Audit Pass",
    category: "Compliance",
    description: "Achieve ISO 27001 and SOC 2 Type II certification by end of program",
    owner: "CISO",
    targetValue: "100% audit compliance",
    targetDate: "2026-11-30",
    realizationStatus: "Not Started",
    measurementMethod: "Third-party audit report"
  },
  {
    id: "ben-004",
    title: "System Uptime Improvement",
    category: "Operational",
    description: "Increase platform availability from 99.5% to 99.95% SLA",
    owner: "VP Engineering",
    targetValue: "99.95% uptime",
    targetDate: "2026-10-31",
    actualValue: "99.91% achieved",
    realizationStatus: "In Progress",
    measurementMethod: "Infrastructure monitoring dashboards (Datadog)"
  }
];

export const BenefitsView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();
  const benefits: Benefit[] = (activeProject?.benefits && activeProject.benefits.length > 0)
    ? activeProject.benefits
    : defaultBenefits;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBenefit, setNewBenefit] = useState<Partial<Benefit>>({
    category: "Financial",
    realizationStatus: "Not Started"
  });

  const realized = benefits.filter(b => b.realizationStatus === "Fully Realized").length;
  const inProgress = benefits.filter(b => b.realizationStatus === "In Progress" || b.realizationStatus === "Partially Realized").length;
  const notStarted = benefits.filter(b => b.realizationStatus === "Not Started").length;
  const notAchieved = benefits.filter(b => b.realizationStatus === "Not Achieved").length;
  const realizationRate = benefits.length > 0 ? Math.round((realized / benefits.length) * 100) : 0;

  const handleAddBenefit = () => {
    if (!newBenefit.title || !newBenefit.owner || !newBenefit.targetValue || !newBenefit.targetDate) return;
    const benefit: Benefit = {
      id: `ben-${Date.now()}`,
      title: newBenefit.title!,
      category: newBenefit.category as Benefit["category"] || "Financial",
      description: newBenefit.description || "",
      owner: newBenefit.owner!,
      targetValue: newBenefit.targetValue!,
      targetDate: newBenefit.targetDate!,
      realizationStatus: newBenefit.realizationStatus as Benefit["realizationStatus"] || "Not Started",
      measurementMethod: newBenefit.measurementMethod || ""
    };
    updateActiveProject(prev => ({ ...prev, benefits: [...(prev.benefits || []), benefit] }));
    setShowAddForm(false);
    setNewBenefit({ category: "Financial", realizationStatus: "Not Started" });
  };

  const updateBenefitStatus = (id: string, status: Benefit["realizationStatus"]) => {
    updateActiveProject(prev => ({
      ...prev,
      benefits: (prev.benefits || defaultBenefits).map(b => b.id === id ? { ...b, realizationStatus: status } : b)
    }));
  };

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Inter, sans-serif" }}>
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
              Benefits Realization Management
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Enterprise PMO</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Benefits Realization Tracker
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Track expected business benefits vs. actual outcomes and ROI realization.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <PlusCircle style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total Benefits", value: benefits.length, color: "text-[var(--text-primary)]" },
          { label: "Fully Realized", value: realized, color: "text-[var(--green)]" },
          { label: "In Progress", value: inProgress, color: "text-[var(--cyan)]" },
          { label: "Not Started", value: notStarted, color: "text-[var(--text-secondary)]" },
          { label: "Realization Rate", value: `${realizationRate}%`, color: realizationRate >= 50 ? "text-[var(--green)]" : "text-[var(--amber)]" }
        ].map((kpi, i) => (
          <div key={i} className="glass-card rounded-xl p-4 shadow-sm text-center">
            <p className="text-[10px] text-[var(--text-secondary)] uppercase font-bold tracking-wide">{kpi.label}</p>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="glass-card rounded-xl p-4 shadow-sm">
        <div className="flex justify-between text-xs mb-2">
          <span className="font-bold text-[var(--text-primary)]">Overall Benefits Realization Progress</span>
          <span className="font-bold text-[var(--green)]">{realizationRate}%</span>
        </div>
        <div className="h-3 w-full bg-[var(--bg-card-hover)] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all" style={{ width: `${realizationRate}%` }} />
        </div>
        <div className="flex gap-4 mt-2 text-[10px] text-[var(--text-secondary)]">
          <span className="flex items-center gap-1"><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />{realized} Realized</span>
          <span className="flex items-center gap-1"><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--cyan)", display: "inline-block" }} />{inProgress} In Progress</span>
          <span className="flex items-center gap-1"><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />{notStarted} Not Started</span>
          {notAchieved > 0 && <span className="flex items-center gap-1"><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--pink)", display: "inline-block" }} />{notAchieved} Not Achieved</span>}
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="glass-card animate-fadeIn" style={{ padding: "24px", borderColor: "var(--accent-border)", background: "linear-gradient(145deg, rgba(109,40,217,0.08) 0%, var(--bg-card) 100%)" }}>
          <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Add New Benefit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {[
              { label: "Benefit Title *", key: "title", type: "text" },
              { label: "Owner *", key: "owner", type: "text" },
              { label: "Target Value *", key: "targetValue", type: "text", placeholder: "e.g. $2M savings" },
              { label: "Target Date *", key: "targetDate", type: "date" },
              { label: "Measurement Method", key: "measurementMethod", type: "text" },
              { label: "Description", key: "description", type: "text" }
            ].map(field => (
              <div key={field.key}>
                <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={(newBenefit as any)[field.key] || ""}
                  onChange={e => setNewBenefit(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="form-input-dark"
                />
              </div>
            ))}
            <div>
              <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>Category</label>
              <select
                value={newBenefit.category || "Financial"}
                onChange={e => setNewBenefit(prev => ({ ...prev, category: e.target.value as Benefit["category"] }))}
                className="form-input-dark"
              >
                {["Financial", "Operational", "Strategic", "Customer", "Compliance", "Risk Reduction"].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3" style={{ marginTop: "16px" }}>
            <button onClick={handleAddBenefit} className="btn-accent">Save Benefit</button>
            <button onClick={() => setShowAddForm(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "var(--text-xs)", fontWeight: 700, padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Benefits List */}
      <div className="space-y-3">
        {benefits.map(benefit => {
          const cfg = statusConfig[benefit.realizationStatus];
          const isExpanded = expandedId === benefit.id;
          return (
            <div key={benefit.id} className="glass-card rounded-xl shadow-sm overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--bg-card)] transition-all"
                onClick={() => setExpandedId(isExpanded ? null : benefit.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[var(--green-dim)] border border-[var(--border)] flex items-center justify-center text-[var(--green)]">
                    {categoryIcons[benefit.category] || <Target className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--text-primary)]">{benefit.title}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">{benefit.category} · Owner: {benefit.owner}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 text-xs">
                    <span className="text-[var(--text-secondary)]">Target:</span>
                    <span className="font-bold text-[var(--text-primary)]">{benefit.targetValue}</span>
                    {benefit.actualValue && (
                      <>
                        <span className="text-[var(--text-muted)]">|</span>
                        <span className="text-[var(--text-secondary)]">Actual:</span>
                        <span className="font-bold text-[var(--green)]">{benefit.actualValue}</span>
                      </>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.color}`}>{cfg.label}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                </div>
              </div>
              {isExpanded && (
                <div className="border-t border-[var(--border)] p-4 bg-[var(--bg-card)]/50 space-y-3">
                  <p className="text-xs text-[var(--text-secondary)]">{benefit.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div><span className="text-[var(--text-secondary)] font-medium">Target Date</span><div className="font-bold text-[var(--text-primary)]">{benefit.targetDate}</div></div>
                    <div><span className="text-[var(--text-secondary)] font-medium">Measurement</span><div className="font-bold text-[var(--text-primary)]">{benefit.measurementMethod || "—"}</div></div>
                    <div><span className="text-[var(--text-secondary)] font-medium">Target Value</span><div className="font-bold text-[var(--text-primary)]">{benefit.targetValue}</div></div>
                    <div><span className="text-[var(--text-secondary)] font-medium">Actual Realized</span><div className="font-bold text-[var(--green)]">{benefit.actualValue || "Not yet measured"}</div></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--text-secondary)]">Update Status:</span>
                    {(["Not Started", "In Progress", "Partially Realized", "Fully Realized", "Not Achieved"] as Benefit["realizationStatus"][]).map(s => (
                      <button
                        key={s}
                        onClick={() => updateBenefitStatus(benefit.id, s)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${benefit.realizationStatus === s ? statusConfig[s].color : "badge-slate hover:border-[var(--accent-border)]"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
