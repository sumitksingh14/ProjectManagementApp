import React from "react";
import { useProject } from "../../context/ProjectContext";
import {
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Edit3,
  Activity,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const DashboardView: React.FC = () => {
  const { activeProject, currentRole, setActiveTab } = useProject();
  const {
    evm = { BAC: 0, PV: 0, EV: 0, AC: 0, CPI: 1.0, SPI: 1.0, EAC: 0, VAC: 0, SV: 0, CV: 0 },
    health = {
      overallHealth: "Green", scheduleHealth: "Green", budgetHealth: "Green",
      scopeHealth: "Green", qualityHealth: "Green", riskHealth: "Green",
      resourceHealth: "Green", aiHealthCommentary: ""
    },
    intake = { executiveSummary: "", strategicObjective: "" },
    risks = [],
    lifecyclePhases = [],
  } = activeProject || {};

  const totalTasks = (lifecyclePhases || []).reduce(
    (acc, ph) => acc + (ph.workPackages || []).reduce((wpAcc, wp) => wpAcc + (wp.tasks || []).length, 0), 0
  );
  const completedTasks = (lifecyclePhases || []).reduce(
    (acc, ph) => acc + (ph.workPackages || []).reduce(
      (wpAcc, wp) => wpAcc + (wp.tasks || []).filter((t) => t?.status === "Completed").length, 0
    ), 0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 68;
  const cpi = evm.CPI || 1.0;
  const spi = evm.SPI || 1.0;
  const openRisks = (risks || []).filter(r => r?.status === "Open").length;

  const healthColor = (s: string) => {
    if (s === "Green") return { bg: "var(--green-dim)", text: "var(--green)", border: "rgba(16,185,129,0.25)" };
    if (s === "Amber") return { bg: "var(--amber-dim)", text: "var(--amber)", border: "rgba(245,158,11,0.25)" };
    return { bg: "var(--pink-dim)", text: "var(--pink)", border: "rgba(236,72,153,0.25)" };
  };

  // Mini sparkline-style bars for Gantt
  const ganttBars = [
    { label: "Architecture Design", left: "5%",  width: "35%", color: "var(--accent)" },
    { label: "Core Engine Build",   left: "40%", width: "35%", color: "var(--green)" },
    { label: "Integration Testing", left: "70%", width: "20%", color: "var(--cyan)" },
    { label: "Global Deployment",   left: "90%", width: "10%", color: "var(--text-muted)", opacity: 0.4 },
  ];

  const kpis = [
    {
      label: "Portfolio Health",
      value: `${overallProgress}%`,
      delta: "+2.4%",
      up: true,
      sub: "Overall project health",
      icon: Activity,
      accentColor: "var(--green)",
      glowColor: "rgba(16,185,129,0.15)",
    },
    {
      label: "Cost Performance (CPI)",
      value: cpi.toFixed(2),
      delta: cpi >= 1 ? "On Budget" : "Over Budget",
      up: cpi >= 1,
      sub: `EAC: $${((evm.EAC || evm.BAC || 0) / 1000).toFixed(0)}k · BAC: $${((evm.BAC || 0) / 1000).toFixed(0)}k`,
      icon: TrendingUp,
      accentColor: cpi >= 1 ? "var(--green)" : "var(--pink)",
      glowColor: cpi >= 1 ? "rgba(16,185,129,0.15)" : "rgba(236,72,153,0.15)",
    },
    {
      label: "Schedule Risk",
      value: String(openRisks),
      delta: "Open risks",
      up: openRisks === 0,
      sub: "Predictively identified by AI",
      icon: AlertTriangle,
      accentColor: openRisks > 2 ? "var(--pink)" : "var(--amber)",
      glowColor: openRisks > 2 ? "rgba(236,72,153,0.15)" : "rgba(245,158,11,0.15)",
    },
    {
      label: "Resource Utilization",
      value: "92%",
      delta: "Optimal",
      up: true,
      sub: "Targeting capacity balance",
      icon: Users,
      accentColor: "var(--cyan)",
      glowColor: "rgba(6,182,212,0.15)",
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", fontFamily: "Inter, sans-serif" }}>

      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <div
        className="hero-banner animate-fadeIn"
        style={{ padding: "24px 28px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              {activeProject?.code || "PRJ"}
            </span>
            {(() => {
              const c = healthColor(health.overallHealth);
              return (
                <span style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                  ● {health.overallHealth} Health
                </span>
              );
            })()}
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
              Role: <strong style={{ color: "rgba(255,255,255,0.85)" }}>{currentRole}</strong>
            </span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px" }}>
            {activeProject?.name || "Project Dashboard"}
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            {intake.executiveSummary || intake.strategicObjective || "Enterprise PMO — Monitor performance, costs, risks and deliverables in real-time."}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <button
            onClick={() => setActiveTab("edit-project")}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)",
              color: "#fff", borderRadius: "10px", padding: "8px 16px",
              fontSize: "12px", fontWeight: 600, cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            <Edit3 style={{ width: "13px", height: "13px" }} />
            Edit Project
          </button>
          <button
            onClick={() => setActiveTab("ai-planner")}
            className="btn-accent"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Sparkles style={{ width: "13px", height: "13px", color: "#FCD34D" }} />
            AI WBS Generator
          </button>
        </div>
      </div>

      {/* ── KPI Cards ────────────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "24px" }} className="animate-fadeIn">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="glass-card"
              style={{
                padding: "20px",
                background: `linear-gradient(135deg, ${kpi.glowColor} 0%, var(--bg-card) 60%)`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <p className="section-label">{kpi.label}</p>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "10px",
                  background: kpi.glowColor, border: `1px solid ${kpi.accentColor}40`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon style={{ width: "15px", height: "15px", color: kpi.accentColor }} />
                </div>
              </div>
              <div className="kpi-value" style={{ marginBottom: "4px" }}>{kpi.value}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {kpi.up
                  ? <ArrowUpRight style={{ width: "13px", height: "13px", color: "var(--green)" }} />
                  : <ArrowDownRight style={{ width: "13px", height: "13px", color: "var(--pink)" }} />
                }
                <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: kpi.up ? "var(--green)" : "var(--pink)" }}>{kpi.delta}</span>
              </div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "6px" }}>{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── Main Body: Gantt + Resources | AI Panel ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Gantt-style Schedule */}
          <div className="glass-card" style={{ overflow: "hidden" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 18px", borderBottom: "1px solid var(--border)"
            }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Project Schedule
              </h3>
              <div style={{ display: "flex", gap: "10px" }}>
                {["Day", "Week"].map((t) => (
                  <button key={t} style={{
                    fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", cursor: "pointer",
                    background: t === "Week" ? "var(--grad-primary)" : "rgba(255,255,255,0.05)",
                    color: t === "Week" ? "#fff" : "var(--text-muted)",
                    border: t === "Week" ? "none" : "1px solid var(--border)",
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "0", borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "14px" }}>
                <span className="section-label">Phase / Task</span>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {["Oct 01", "Oct 15", "Nov 01", "Nov 15", "Dec 01"].map(d => (
                    <span key={d} className="section-label">{d}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {ganttBars.map((bar, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr", alignItems: "center", gap: "12px", opacity: bar.opacity || 1 }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", truncate: "true", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{bar.label}</span>
                    <div style={{ position: "relative", height: "14px", background: "rgba(255,255,255,0.04)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{
                        position: "absolute", left: bar.left, width: bar.width, height: "100%",
                        background: bar.color, borderRadius: "4px",
                        boxShadow: `0 0 8px ${bar.color}60`
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resource Allocation Table */}
          <div className="glass-card" style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Portfolio Resource Allocation
              </h3>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Heatmap View</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Resource Name", "Role", "Capacity", "Projects", "Status"].map(h => (
                    <th key={h} className="section-label" style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Sarah Jenkins",  role: "Lead Architect",   dots: ["pink","pink","amber"], projects: "3 Active", status: "Overloaded", statusColor: "badge-red" },
                  { name: "Marcus Wong",    role: "Senior Frontend",  dots: ["green","green","dim"], projects: "1 Active", status: "Available",  statusColor: "badge-green" },
                  { name: "Priya Sharma",   role: "Program Manager",  dots: ["cyan","cyan","dim"],   projects: "2 Active", status: "Optimal",    statusColor: "badge-cyan" },
                ].map((row, i) => (
                  <tr key={i} className="table-row-dark">
                    <td style={{ padding: "14px 20px", fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{row.name}</td>
                    <td style={{ padding: "14px 20px", fontSize: "12px", color: "var(--text-secondary)" }}>{row.role}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        {row.dots.map((d, di) => (
                          <div key={di} style={{
                            width: "12px", height: "12px", borderRadius: "3px",
                            background: d === "pink" ? "var(--pink)" : d === "green" ? "var(--green)" : d === "amber" ? "var(--amber)" : d === "cyan" ? "var(--cyan)" : "rgba(255,255,255,0.08)"
                          }} />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: "12px", color: "var(--text-secondary)" }}>{row.projects}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span className={row.statusColor} style={{ fontSize: "12px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column — AI Copilot + Health Matrix */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* AI Copilot Card */}
          <div
            className="glass-card animate-glow"
            style={{
              padding: "20px",
              background: "linear-gradient(145deg, rgba(109,40,217,0.25) 0%, var(--bg-card) 100%)",
              borderColor: "var(--accent-border)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: "var(--grad-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Sparkles style={{ width: "14px", height: "14px", color: "#fff" }} />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Copilot Predictive AI
                </span>
              </div>
              <span style={{ fontSize: "12px", background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--accent-border)", padding: "2px 8px", borderRadius: "6px", fontFamily: "monospace" }}>
                v4.2
              </span>
            </div>

            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "16px", marginBottom: "10px" }}>
              <p className="section-label" style={{ marginBottom: "10px" }}>Predictive Risk Analysis</p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {health.aiHealthCommentary || "AI is analyzing your project data. Run the AI WBS Generator to get predictive insights."}
              </p>
            </div>
            <div style={{ background: "rgba(139,92,246,0.08)", borderRadius: "10px", padding: "16px", border: "1px solid var(--accent-border)" }}>
              <p style={{ fontSize: "12px", color: "var(--accent)", fontStyle: "italic", lineHeight: 1.6 }}>
                "Generate a mitigation plan for the Resource Gap identified in {activeProject?.name || "this project"}."
              </p>
            </div>
          </div>

          {/* Health Matrix */}
          <div className="glass-card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px" }}>
              Executive AI Health Matrix
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {[
                { label: "Schedule Health", status: health.scheduleHealth },
                { label: "Budget Health",   status: health.budgetHealth },
                { label: "Scope Health",    status: health.scopeHealth },
                { label: "Quality Health",  status: health.qualityHealth },
                { label: "Risk Health",     status: health.riskHealth },
                { label: "Resource Health", status: health.resourceHealth },
              ].map((item, idx) => {
                const c = healthColor(item.status);
                return (
                  <div key={idx} style={{
                    padding: "16px", borderRadius: "10px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border)",
                    display: "flex", flexDirection: "column", gap: "8px"
                  }}>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, padding: "2px 8px", borderRadius: "6px", background: c.bg, color: c.text, border: `1px solid ${c.border}`, alignSelf: "flex-start" }}>
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Card */}
          <div className="glass-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Overall Progress
              </h3>
              <span className="kpi-value" style={{ fontSize: "22px", color: "var(--accent)" }}>{overallProgress}%</span>
            </div>
            <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "99px", overflow: "hidden", marginBottom: "14px" }}>
              <div style={{
                height: "100%", width: `${overallProgress}%`,
                background: "var(--grad-primary)", borderRadius: "99px",
                boxShadow: "0 0 10px var(--accent-glow)",
                transition: "width 1s ease",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle2 style={{ width: "12px", height: "12px", color: "var(--green)" }} />
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{completedTasks} tasks done</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Clock style={{ width: "12px", height: "12px", color: "var(--amber)" }} />
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{totalTasks - completedTasks} remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
