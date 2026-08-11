import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  Plus,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { DecisionLog, RACIRow } from "../../types";

const defaultDecisionLog: DecisionLog[] = [
  {
    id: "dec-001",
    decisionDate: "2026-08-01",
    title: "Approve Cloud-First Architecture",
    description: "Adopt AWS multi-region architecture over on-premises datacenter upgrade",
    decisionMaker: "CTO",
    participants: ["CTO", "VP Engineering", "Lead Architect", "CISO"],
    rationale: "50% cost reduction over 3 years, improved scalability, and meets enterprise security standards",
    impact: "Budget baseline revised to include $480K cloud services contract",
    status: "Approved"
  },
  {
    id: "dec-002",
    decisionDate: "2026-08-10",
    title: "Extend Vendor SLA Deadline",
    description: "SecureAuth SSO module delivery extended from Aug 30 to Sep 30, 2026",
    decisionMaker: "Project Manager",
    participants: ["Project Manager", "Procurement Lead", "Vendor Account Manager"],
    rationale: "Integration complexity underestimated. Parallel track mitigates schedule impact.",
    impact: "Schedule variance SV: -5 days on critical path. Contingency reserve activated.",
    status: "Approved"
  },
  {
    id: "dec-003",
    decisionDate: "2026-08-20",
    title: "Defer Phase 3 Features to Post-MVP",
    description: "Advanced analytics dashboard features deferred to Phase 3 release roadmap",
    decisionMaker: "Executive Sponsor",
    participants: ["Executive Sponsor", "Product Owner", "Project Manager", "Business Lead"],
    rationale: "Prioritize core platform stability for go-live. Analytics represents low business risk to defer.",
    impact: "Scope reduced by 40 story points. Schedule risk reduced by 3 weeks.",
    status: "Approved"
  }
];

const escalationLevels = [
  { level: "Level 1", title: "Project Manager", description: "Day-to-day decisions, task priority, minor scope clarifications", timeframe: "Same day", color: "border-l-emerald-500 bg-[var(--green-dim)]" },
  { level: "Level 2", title: "Program Manager / PMO Director", description: "Schedule impacts >5 days, budget variance >5%, cross-project conflicts", timeframe: "24 hours", color: "border-l-amber-500 bg-[var(--amber-dim)]" },
  { level: "Level 3", title: "Executive Sponsor / Steering Committee", description: "Budget variance >15%, scope changes, vendor termination, program cancellation", timeframe: "48 hours", color: "border-l-red-500 bg-[var(--pink-dim)]" }
];

export const GovernanceView: React.FC = () => {
  const { activeProject } = useProject();
  const governance = Array.isArray(activeProject?.governance) && activeProject.governance.length > 0
    ? activeProject.governance[0]
    : {
        steeringCommitteeMembers: ["Alex Thompson (Executive Sponsor)", "Sarah Lee (PMO Director)", "James Rivera (CFO)", "Dr. Maya Chen (CTO)"],
        changeControlBoardMembers: ["Sarah Lee (PM)", "James Rivera (Finance)", "Marcus Johnson (Tech Lead)", "Lisa Wang (QA)"],
        escalationLevel1: "Sarah Lee - Project Manager",
        escalationLevel2: "Dr. Maya Chen - Program Director",
        escalationLevel3: "Alex Thompson - Executive Sponsor",
        raciMatrix: [] as RACIRow[],
        decisionLog: defaultDecisionLog
      };

  const decisionLog: DecisionLog[] = (governance as any)?.decisionLog || defaultDecisionLog;

  const raciTasks = (governance.raciMatrix && governance.raciMatrix.length > 0) ? governance.raciMatrix : [
    { activity: "Project Charter Sign-off", responsible: "Project Manager", accountable: "Executive Sponsor", consulted: "Enterprise Architect", informed: "All Stakeholders" },
    { activity: "Architecture Blueprint Approval", responsible: "Lead Architect", accountable: "CTO", consulted: "InfoSec Lead", informed: "Executive Sponsor" },
    { activity: "Budget Approval & Variance Review", responsible: "Financial Controller", accountable: "CFO", consulted: "Project Manager", informed: "Steering Committee" },
    { activity: "Scope Change Control Board (CCB)", responsible: "Project Manager", accountable: "Executive Sponsor", consulted: "All Leads", informed: "Team" },
    { activity: "Risk Escalation Decision", responsible: "Risk Owner", accountable: "Project Manager", consulted: "Steering Committee", informed: "All Stakeholders" },
    { activity: "UAT Sign-off & Release Gate", responsible: "QA Lead", accountable: "Business Owner", consulted: "Dev Lead", informed: "End Users" },
    { activity: "Vendor SLA Performance Review", responsible: "Procurement Lead", accountable: "Project Manager", consulted: "Technical Lead", informed: "Sponsor" },
    { activity: "Project Closure Certificate", responsible: "Project Manager", accountable: "Executive Sponsor", consulted: "PMO Director", informed: "All Stakeholders" }
  ];

  const [activeTab, setActiveTab] = useState<"raci" | "decisions" | "escalation" | "steering">("raci");
  const [expandedDec, setExpandedDec] = useState<string | null>(null);

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px"}}>
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
              Module 15
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>PMO Governance Framework</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Governance, RACI & Decision Log
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Steering committee, RACI matrix, decision authority, escalation paths, and governance decisions.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          
        </div>
      </div>

      {/* Tab Nav */}
      <div className="flex glass-card rounded-xl p-1 text-xs gap-1 shadow-sm flex-wrap">
        {[
          { id: "raci", label: "RACI Matrix", icon: <Users className="w-3.5 h-3.5" /> },
          { id: "decisions", label: "Decision Log", icon: <FileText className="w-3.5 h-3.5" /> },
          { id: "escalation", label: "Escalation Paths", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
          { id: "steering", label: "Steering Committee", icon: <ShieldCheck className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === tab.id ? "bg-[var(--accent)] text-white shadow" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* RACI */}
      {activeTab === "raci" && (
        <div className="glass-card rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--accent)]" /> Governance RACI Accountability Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--text-secondary)] font-bold uppercase tracking-wider text-[12px]">
                  <th className="p-3">Governance Activity</th>
                  <th className="p-3 text-[var(--accent)]">Responsible (R)</th>
                  <th className="p-3 text-[var(--pink)]">Accountable (A)</th>
                  <th className="p-3 text-[var(--amber)]">Consulted (C)</th>
                  <th className="p-3 text-[var(--green)]">Informed (I)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {raciTasks.map((r, idx) => (
                  <tr key={idx} className="hover:bg-[var(--bg-card)] transition-colors">
                    <td className="p-3 font-bold text-[var(--text-primary)]">{r.activity}</td>
                    <td className="p-3"><span className="bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--accent-border)] px-2 py-0.5 rounded text-[12px] font-bold">{r.responsible}</span></td>
                    <td className="p-3"><span className="bg-[var(--pink-dim)] text-[var(--pink)] border border-red-200 px-2 py-0.5 rounded text-[12px] font-bold">{r.accountable}</span></td>
                    <td className="p-3 text-[var(--text-secondary)]">{r.consulted}</td>
                    <td className="p-3 text-[var(--text-muted)]">{r.informed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DECISION LOG */}
      {activeTab === "decisions" && (
        <div className="space-y-6">
          {decisionLog.map(dec => {
            const isEx = expandedDec === dec.id;
            const statusColor = dec.status === "Approved" ? "bg-[var(--green-dim)] text-[var(--green)] border-[var(--border)]" : dec.status === "Rejected" ? "bg-[var(--pink-dim)] text-[var(--pink)] border-[rgba(236,72,153,0.25)]" : "bg-[var(--amber-dim)] text-[var(--amber)] border-[rgba(245,158,11,0.25)]";
            return (
              <div key={dec.id} className="glass-card rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[var(--bg-card)]" onClick={() => setExpandedDec(isEx ? null : dec.id)}>
                  <div className="flex items-center gap-3">
                    <div className="text-[12px] font-mono text-[var(--text-muted)]">{dec.decisionDate}</div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">{dec.title}</div>
                      <div className="text-[12px] text-[var(--text-secondary)]">Decision Maker: {dec.decisionMaker}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full border ${statusColor}`}>{dec.status}</span>
                    {isEx ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                  </div>
                </div>
                {isEx && (
                  <div className="border-t border-[var(--border)] p-4 bg-[var(--bg-card)]/50 space-y-6 text-xs">
                    <p className="text-[var(--text-primary)]">{dec.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><span className="font-bold text-[var(--text-secondary)] uppercase text-[12px]">Participants</span><p className="mt-1 text-[var(--text-primary)]">{dec.participants.join(", ")}</p></div>
                      <div><span className="font-bold text-[var(--text-secondary)] uppercase text-[12px]">Impact</span><p className="mt-1 text-[var(--text-primary)]">{dec.impact}</p></div>
                      <div className="md:col-span-2"><span className="font-bold text-[var(--green)] uppercase text-[12px]">Rationale</span><p className="mt-1 text-[var(--text-primary)] bg-[var(--green-dim)] border border-[var(--border)] rounded p-2">{dec.rationale}</p></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ESCALATION */}
      {activeTab === "escalation" && (
        <div className="space-y-6">
          {escalationLevels.map((lvl, i) => (
            <div key={i} className={`bg-[var(--bg-card)] border-l-4 border border-[var(--border)] rounded-xl p-5 shadow-sm ${lvl.color}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[var(--text-secondary)]">{lvl.level}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span className="text-sm font-bold text-[var(--text-primary)]">{lvl.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{lvl.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[12px] text-[var(--text-secondary)]">Response Time</div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">{lvl.timeframe}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Named Escalation Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {[
                { label: "Level 1 — PM", value: governance.escalationLevel1 },
                { label: "Level 2 — Program", value: governance.escalationLevel2 },
                { label: "Level 3 — Executive", value: governance.escalationLevel3 }
              ].map((c, i) => (
                <div key={i} className="glass-card rounded-lg p-3">
                  <div className="text-[12px] font-bold text-[var(--text-secondary)] uppercase">{c.label}</div>
                  <div className="font-bold text-[var(--text-primary)] mt-1">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEERING COMMITTEE */}
      {activeTab === "steering" && (
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-5 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2"><Users className="w-4 h-4 text-[var(--accent)]" />Steering Committee Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {governance.steeringCommitteeMembers.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-[var(--bg-card)] rounded-lg border border-[var(--border)]">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-glow)] border border-[var(--accent-border)] flex items-center justify-center font-bold text-[var(--accent)] text-sm">{member.charAt(0)}</div>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{member}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-xl p-5 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[var(--amber)]" />Change Control Board (CCB)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {governance.changeControlBoardMembers.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-[var(--amber-dim)] rounded-lg border border-amber-100">
                  <div className="w-8 h-8 rounded-full bg-[var(--amber-dim)] border border-[rgba(245,158,11,0.25)] flex items-center justify-center font-bold text-[var(--amber)] text-sm">{member.charAt(0)}</div>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

