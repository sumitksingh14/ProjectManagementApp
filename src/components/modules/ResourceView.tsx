import React from "react";
import { useProject } from "../../context/ProjectContext";
import { UserCheck, Zap, AlertCircle, BarChart2, ShieldCheck, DollarSign } from "lucide-react";

export const ResourceView: React.FC = () => {
  const { users } = useProject();
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
              Module 6
            </span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)" }}>Enterprise Resource & Capacity Optimization</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Resource Management & Capacity Planning
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Analyze skill gaps, utilization heatmaps, hourly cost rates, and resolve resource allocation conflicts.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* Resource Utilization Heatmap */}
      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
          <BarChart2 style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
          <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)" }}>Resource Allocation &amp; Monthly Utilization Heatmap (%)</h3>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Team Member", "Role & Dept", "Hourly Rate", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Status"].map(h => (
                  <th key={h} className="section-label" style={{ padding: "10px 16px", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((usr, idx) => {
                const util = idx === 4 ? 120 : idx === 5 ? 95 : 80;
                return (
                  <tr key={usr.id} className="table-row-dark">
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={usr.avatar} alt={usr.name} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }} />
                      <div>
                        <div style={{ fontSize: "var(--text-sm)" }}>{usr.name}</div>
                        <div style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 400 }}>{usr.email}</div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
                      <div>{usr.role}</div>
                      <div style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{usr.department}</div>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--green)" }}>${usr.costRate}/hr</td>
                    <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>
                      <span className={util > 100 ? "badge-red" : "badge-green"}>
                        {util}%
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>
                      <span className="badge-blue">{Math.min(util, 100)}%</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>
                      <span className="badge-blue">85%</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>
                      <span className="badge-blue">75%</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {util > 100 ? (
                        <span className="badge-red flex items-center gap-1" style={{ width: "max-content" }}>
                          <AlertCircle className="w-3 h-3" /> Over-Allocated
                        </span>
                      ) : (
                        <span className="badge-green" style={{ width: "max-content", display: "block" }}>Balanced</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skills Gap Analysis */}
      <div className="glass-card" style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "var(--text-md)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Skills Gap Analysis &amp; Capability Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {[
            { skill: "Cloud Architecture (AWS/GCP)", demand: "High", availableCount: 2, gap: "Balanced" },
            { skill: "React 19 / TypeScript", demand: "High", availableCount: 1, gap: "Gap (+1 Senior Eng)" },
            { skill: "Cybersecurity & PCI Compliance", demand: "Critical", availableCount: 1, gap: "Balanced" }
          ].map((item, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "10px", border: "1px solid var(--border)" }} className="space-y-2">
              <div className="flex items-center justify-between">
                <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "var(--text-sm)" }}>{item.skill}</span>
                <span className={item.gap.includes("Gap") ? "badge-amber" : "badge-green"}>
                  {item.gap}
                </span>
              </div>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Demand Level: <strong style={{ color: "var(--text-primary)" }}>{item.demand}</strong></p>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Available Qualified FTEs: <strong style={{ color: "var(--accent)" }}>{item.availableCount}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
