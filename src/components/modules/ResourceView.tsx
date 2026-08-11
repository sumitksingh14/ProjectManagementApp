import React from "react";
import { useProject } from "../../context/ProjectContext";
import { UserCheck, Zap, AlertCircle, BarChart2, ShieldCheck, DollarSign, ArrowUpRight } from "lucide-react";

export const ResourceView: React.FC = () => {
  const { users } = useProject();

  const kpis = [
    { label: "Total Managed Resources", value: String(users.length), delta: "Full-Time Equivalents", up: true, sub: "Cross-functional engineering & PMO", accentColor: "var(--accent)", glowColor: "rgba(139,92,246,0.15)" },
    { label: "Average Utilization Rate", value: "88%", delta: "Target: 85-90%", up: true, sub: "Capacity optimization balance", accentColor: "var(--cyan)", glowColor: "rgba(6,182,212,0.15)" },
    { label: "Over-Allocated Resources", value: "1 Member", delta: "Action Required", up: false, sub: "Sarah Jenkins (> 110% capacity)", accentColor: "var(--pink)", glowColor: "rgba(236,72,153,0.15)" },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fadeIn">
      {/* Header */}
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
              Module 6
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Enterprise Resource & Capacity Optimization</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            Resource Management & Capacity Planning
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Analyze skill gaps, utilization heatmaps, hourly cost rates, and resolve resource allocation conflicts.
          </p>
        </div>
      </div>

      {/* Resource KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="animate-fadeIn">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="glass-card"
            style={{
              padding: "20px",
              background: `linear-gradient(135deg, ${kpi.glowColor} 0%, var(--bg-card) 60%)` }}
          >
            <p className="section-label" style={{ marginBottom: "12px" }}>{kpi.label}</p>
            <div className="kpi-value" style={{ marginBottom: "10px" }}>{kpi.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ArrowUpRight style={{ width: "13px", height: "13px", color: kpi.accentColor }} />
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: kpi.accentColor }}>{kpi.delta}</span>
            </div>
            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginTop: "6px" }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Resource Utilization Heatmap */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart2 style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
            Resource Allocation & Monthly Utilization Heatmap (%)
          </h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Heatmap Matrix</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Team Member", "Role & Dept", "Hourly Rate", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Status"].map(h => (
                <th key={h} className="section-label" style={{ padding: "14px 20px", textAlign: "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((usr, idx) => {
              const util = idx === 4 ? 120 : idx === 5 ? 95 : 80;
              return (
                <tr key={usr.id} className="table-row-dark">
                  <td style={{ padding: "14px 20px" }}>
                    <div className="flex items-center gap-3">
                      <img src={usr.avatar} alt={usr.name} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }} />
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>{usr.name}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{usr.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", color: "var(--text-secondary)", fontSize: "12px" }}>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{usr.role}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{usr.department}</div>
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "monospace", color: "var(--green)", fontWeight: 600, fontSize: "12px" }}>${usr.costRate}/hr</td>
                  <td style={{ padding: "14px 20px", fontFamily: "monospace" }}>
                    <span className={util > 100 ? "badge-red" : "badge-green"}>
                      {util}%
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "monospace" }}>
                    <span className="badge-blue">{Math.min(util, 100)}%</span>
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "monospace" }}>
                    <span className="badge-blue">85%</span>
                  </td>
                  <td style={{ padding: "14px 20px", fontFamily: "monospace" }}>
                    <span className="badge-blue">75%</span>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    {util > 100 ? (
                      <span className="badge-red">
                        Over-Allocated
                      </span>
                    ) : (
                      <span className="badge-green">Balanced</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Skills Gap Analysis */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap style={{ width: "14px", height: "14px", color: "var(--accent)" }} />
            Skills Gap Analysis & Capability Matrix
          </h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Talent Assessment</span>
        </div>

        <div style={{ padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { skill: "Cloud Architecture (AWS/GCP)", demand: "High", availableCount: 2, gap: "Balanced" },
              { skill: "React 19 / TypeScript", demand: "High", availableCount: 1, gap: "Gap (+1 Senior Eng)" },
              { skill: "Cybersecurity & PCI Compliance", demand: "Critical", availableCount: 1, gap: "Balanced" }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border)" }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "13px" }}>{item.skill}</span>
                  <span className={item.gap.includes("Gap") ? "badge-amber" : "badge-green"}>
                    {item.gap}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Demand Level: <strong style={{ color: "var(--text-primary)" }}>{item.demand}</strong></p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Available Qualified FTEs: <strong style={{ color: "var(--accent)" }}>{item.availableCount}</strong></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

