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
  { level: "Level 1", title: "Project Manager", description: "Day-to-day decisions, task priority, minor scope clarifications", timeframe: "Same day", color: "border-l-emerald-500 bg-emerald-50" },
  { level: "Level 2", title: "Program Manager / PMO Director", description: "Schedule impacts >5 days, budget variance >5%, cross-project conflicts", timeframe: "24 hours", color: "border-l-amber-500 bg-amber-50" },
  { level: "Level 3", title: "Executive Sponsor / Steering Committee", description: "Budget variance >15%, scope changes, vendor termination, program cancellation", timeframe: "48 hours", color: "border-l-red-500 bg-red-50" }
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
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-900">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">Module 15</span>
            <span className="text-xs text-slate-500">PMO Governance Framework</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Governance, RACI & Decision Log</h1>
          <p className="text-xs text-slate-500 mt-1">Steering committee, RACI matrix, decision authority, escalation paths, and governance decisions.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-emerald-700">{decisionLog.filter(d => d.status === "Approved").length}</div>
            <div className="text-[10px] text-emerald-600 font-bold">Approved Decisions</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-amber-700">{decisionLog.filter(d => d.status === "Pending" || d.status === "Deferred").length}</div>
            <div className="text-[10px] text-amber-600 font-bold">Pending Review</div>
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="flex bg-white border border-slate-200 rounded-xl p-1 text-xs gap-1 shadow-sm flex-wrap">
        {[
          { id: "raci", label: "RACI Matrix", icon: <Users className="w-3.5 h-3.5" /> },
          { id: "decisions", label: "Decision Log", icon: <FileText className="w-3.5 h-3.5" /> },
          { id: "escalation", label: "Escalation Paths", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
          { id: "steering", label: "Steering Committee", icon: <ShieldCheck className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow" : "text-slate-500 hover:text-slate-800"}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* RACI */}
      {activeTab === "raci" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" /> Governance RACI Accountability Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3">Governance Activity</th>
                  <th className="p-3 text-indigo-600">Responsible (R)</th>
                  <th className="p-3 text-red-600">Accountable (A)</th>
                  <th className="p-3 text-amber-600">Consulted (C)</th>
                  <th className="p-3 text-emerald-600">Informed (I)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {raciTasks.map((r, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-800">{r.activity}</td>
                    <td className="p-3"><span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded text-[10px] font-bold">{r.responsible}</span></td>
                    <td className="p-3"><span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[10px] font-bold">{r.accountable}</span></td>
                    <td className="p-3 text-slate-600">{r.consulted}</td>
                    <td className="p-3 text-slate-400">{r.informed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DECISION LOG */}
      {activeTab === "decisions" && (
        <div className="space-y-3">
          {decisionLog.map(dec => {
            const isEx = expandedDec === dec.id;
            const statusColor = dec.status === "Approved" ? "bg-emerald-100 text-emerald-700 border-emerald-300" : dec.status === "Rejected" ? "bg-red-100 text-red-700 border-red-300" : "bg-amber-100 text-amber-700 border-amber-300";
            return (
              <div key={dec.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50" onClick={() => setExpandedDec(isEx ? null : dec.id)}>
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] font-mono text-slate-400">{dec.decisionDate}</div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{dec.title}</div>
                      <div className="text-[10px] text-slate-500">Decision Maker: {dec.decisionMaker}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColor}`}>{dec.status}</span>
                    {isEx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>
                {isEx && (
                  <div className="border-t border-slate-100 p-4 bg-slate-50/50 space-y-3 text-xs">
                    <p className="text-slate-700">{dec.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><span className="font-bold text-slate-500 uppercase text-[10px]">Participants</span><p className="mt-1 text-slate-700">{dec.participants.join(", ")}</p></div>
                      <div><span className="font-bold text-slate-500 uppercase text-[10px]">Impact</span><p className="mt-1 text-slate-700">{dec.impact}</p></div>
                      <div className="md:col-span-2"><span className="font-bold text-emerald-600 uppercase text-[10px]">Rationale</span><p className="mt-1 text-emerald-800 bg-emerald-50 border border-emerald-100 rounded p-2">{dec.rationale}</p></div>
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
        <div className="space-y-4">
          {escalationLevels.map((lvl, i) => (
            <div key={i} className={`bg-white border-l-4 border border-slate-200 rounded-xl p-5 shadow-sm ${lvl.color}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-600">{lvl.level}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm font-bold text-slate-900">{lvl.title}</span>
                  </div>
                  <p className="text-xs text-slate-600">{lvl.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-500">Response Time</div>
                  <div className="text-sm font-bold text-slate-800">{lvl.timeframe}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Named Escalation Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {[
                { label: "Level 1 — PM", value: governance.escalationLevel1 },
                { label: "Level 2 — Program", value: governance.escalationLevel2 },
                { label: "Level 3 — Executive", value: governance.escalationLevel3 }
              ].map((c, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">{c.label}</div>
                  <div className="font-bold text-slate-800 mt-1">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEERING COMMITTEE */}
      {activeTab === "steering" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><Users className="w-4 h-4 text-indigo-600" />Steering Committee Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {governance.steeringCommitteeMembers.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 text-sm">{member.charAt(0)}</div>
                  <span className="text-xs font-semibold text-slate-800">{member}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-600" />Change Control Board (CCB)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {governance.changeControlBoardMembers.map((member, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-700 text-sm">{member.charAt(0)}</div>
                  <span className="text-xs font-semibold text-slate-800">{member}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
