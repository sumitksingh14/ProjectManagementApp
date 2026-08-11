import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";
import {
  Package,
  DollarSign,
  Calendar,
  Star,
  AlertTriangle,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  FileText
} from "lucide-react";
import { VendorItem, VendorDeliverable } from "../../types";

const defaultVendors: VendorItem[] = [
  {
    id: "vnd-001",
    vendorCode: "VND-001",
    vendorName: "CloudSphere Technologies",
    category: "Cloud Services",
    contractType: "SLA-Based",
    contractValue: 480000,
    startDate: "2026-01-15",
    endDate: "2026-12-31",
    accountManager: "Sarah Chen",
    slaTerms: "99.95% uptime, <200ms API response, 4h P1 resolution SLA",
    performanceScore: 88,
    status: "Active",
    paymentTerms: "Monthly in arrears",
    deliverables: [
      { id: "vd-001", title: "Cloud Infrastructure Setup", dueDate: "2026-03-01", status: "Accepted", amount: 80000 },
      { id: "vd-002", title: "Migration Completion", dueDate: "2026-06-30", status: "Delivered", amount: 150000 },
      { id: "vd-003", title: "Ongoing Managed Services", dueDate: "2026-12-31", status: "Pending", amount: 250000 }
    ],
    notes: "Preferred vendor. Strong SLA performance with minor latency spikes in Aug 2026."
  },
  {
    id: "vnd-002",
    vendorCode: "VND-002",
    vendorName: "SecureAuth Solutions",
    category: "Software",
    contractType: "Fixed Price",
    contractValue: 125000,
    startDate: "2026-02-01",
    endDate: "2026-10-31",
    accountManager: "Mark Thompson",
    slaTerms: "SAML 2.0 integration delivery, defect resolution within 72h",
    performanceScore: 72,
    status: "Active",
    paymentTerms: "30% upfront, 70% on delivery",
    deliverables: [
      { id: "vd-004", title: "SAML/SSO Integration Module", dueDate: "2026-05-30", status: "Overdue", amount: 75000 },
      { id: "vd-005", title: "Security Audit Documentation", dueDate: "2026-09-30", status: "Pending", amount: 50000 }
    ],
    notes: "Delivery delays on SSO module. Escalated to senior management."
  },
  {
    id: "vnd-003",
    vendorCode: "VND-003",
    vendorName: "DataBridge Consulting",
    category: "Consulting",
    contractType: "Time & Materials",
    contractValue: 200000,
    startDate: "2026-03-01",
    endDate: "2026-09-30",
    accountManager: "Priya Sharma",
    slaTerms: "Weekly deliverables, max 2-day turnaround on reviews",
    performanceScore: 95,
    status: "Active",
    paymentTerms: "Bi-weekly invoicing, NET-15",
    deliverables: [
      { id: "vd-006", title: "Data Migration Strategy", dueDate: "2026-04-15", status: "Accepted", amount: 60000 },
      { id: "vd-007", title: "ETL Pipeline Development", dueDate: "2026-07-31", status: "Delivered", amount: 90000 },
      { id: "vd-008", title: "Post-migration Validation", dueDate: "2026-09-30", status: "Pending", amount: 50000 }
    ],
    notes: "Excellent performance. Recommended for follow-on work."
  }
];

const statusConfig = {
  Active: "badge-green",
  "On Hold": "badge-amber",
  Completed: "badge-slate",
  Terminated: "badge-red"
};

const deliverableStatusConfig: Record<VendorDeliverable["status"], string> = {
  Pending: "badge-slate",
  Delivered: "badge-blue",
  Accepted: "badge-green",
  Overdue: "badge-red"
};

const ScoreMeter: React.FC<{ score: number }> = ({ score }) => {
  const barColor = score >= 90 ? "var(--green)" : score >= 70 ? "var(--amber)" : "var(--pink)";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[12px]">
        <span className="text-[var(--text-secondary)]">Performance Score</span>
        <span className="font-bold text-[var(--text-primary)]">{score}/100</span>
      </div>
      <div className="h-1.5 w-full bg-[var(--bg-card-hover)] rounded-full overflow-hidden">
        <div style={{ height: "100%", width: `${score}%`, background: barColor, borderRadius: "99px" }} />
      </div>
    </div>
  );
};

export const VendorView: React.FC = () => {
  const { activeProject, updateActiveProject } = useProject();
  const vendors: VendorItem[] = (activeProject?.vendors && activeProject.vendors.length > 0)
    ? activeProject.vendors
    : defaultVendors;

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVendor, setNewVendor] = useState<Partial<VendorItem>>({
    category: "Consulting",
    contractType: "Fixed Price",
    status: "Active",
    deliverables: []
  });
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const totalContractValue = vendors.reduce((acc, v) => acc + v.contractValue, 0);
  const activeCount = vendors.filter(v => v.status === "Active").length;
  const overdueDeliverables = vendors.flatMap(v => v.deliverables).filter(d => d.status === "Overdue").length;
  const avgScore = vendors.length > 0
    ? Math.round(vendors.reduce((acc, v) => acc + v.performanceScore, 0) / vendors.length)
    : 0;

  const filtered = filterStatus === "All" ? vendors : vendors.filter(v => v.status === filterStatus);

  const handleAddVendor = () => {
    if (!newVendor.vendorName || !newVendor.accountManager || !newVendor.contractValue) return;
    const vendor: VendorItem = {
      id: `vnd-${Date.now()}`,
      vendorCode: `VND-${(vendors.length + 1).toString().padStart(3, "0")}`,
      vendorName: newVendor.vendorName!,
      category: newVendor.category as VendorItem["category"] || "Consulting",
      contractType: newVendor.contractType as VendorItem["contractType"] || "Fixed Price",
      contractValue: Number(newVendor.contractValue) || 0,
      startDate: newVendor.startDate || "",
      endDate: newVendor.endDate || "",
      accountManager: newVendor.accountManager!,
      slaTerms: newVendor.slaTerms || "",
      performanceScore: 80,
      status: "Active",
      paymentTerms: newVendor.paymentTerms || "",
      deliverables: []
    };
    updateActiveProject(prev => ({ ...prev, vendors: [...(prev.vendors || []), vendor] }));
    setShowAddForm(false);
    setNewVendor({ category: "Consulting", contractType: "Fixed Price", status: "Active", deliverables: [] });
  };

  return (
    <div className="animate-fadeIn" style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px"}}>
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
              Vendor & Third-Party Management
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>Enterprise PMO</span>
          </div>
          <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            Vendor Management & SLA Tracker
          </h1>
          <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", maxWidth: "580px", lineHeight: 1.6 }}>
            Track vendor contracts, SLAs, deliverable milestones, and performance scores.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <PlusCircle style={{ width: "32px", height: "32px", color: "#fff" }} />
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Contract Value", value: `$${(totalContractValue / 1000).toFixed(0)}K`, color: "text-[var(--text-primary)]" },
          { label: "Active Vendors", value: activeCount, color: "text-[var(--accent)]" },
          { label: "Overdue Deliverables", value: overdueDeliverables, color: overdueDeliverables > 0 ? "text-[var(--pink)]" : "text-[var(--green)]" },
          { label: "Avg Performance Score", value: `${avgScore}/100`, color: avgScore >= 80 ? "text-[var(--green)]" : "text-[var(--amber)]" }
        ].map((kpi, i) => (
          <div key={i} className="glass-card rounded-xl p-4 shadow-sm">
            <p className="text-[12px] text-[var(--text-secondary)] uppercase font-bold tracking-wide">{kpi.label}</p>
            <div className={`text-2xl font-extrabold font-mono mt-1 ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Active", "On Hold", "Completed", "Terminated"].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${filterStatus === s ? "bg-[var(--accent)] text-white border-indigo-600" : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-indigo-400"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="glass-card animate-fadeIn" style={{ padding: "24px", borderColor: "var(--accent-border)", background: "linear-gradient(145deg, rgba(109,40,217,0.08) 0%, var(--bg-card) 100%)" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Register New Vendor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {[
              { label: "Vendor Name *", key: "vendorName", type: "text" },
              { label: "Account Manager *", key: "accountManager", type: "text" },
              { label: "Contract Value ($) *", key: "contractValue", type: "number" },
              { label: "Payment Terms", key: "paymentTerms", type: "text" },
              { label: "Start Date", key: "startDate", type: "date" },
              { label: "End Date", key: "endDate", type: "date" },
              { label: "SLA Terms", key: "slaTerms", type: "text" }
            ].map(f => (
              <div key={f.key}>
                <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>{f.label}</label>
                <input type={f.type} value={(newVendor as any)[f.key] || ""} onChange={e => setNewVendor(p => ({ ...p, [f.key]: e.target.value }))}
                  className="form-input-dark" />
              </div>
            ))}
            <div>
              <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>Category</label>
              <select value={newVendor.category} onChange={e => setNewVendor(p => ({ ...p, category: e.target.value as VendorItem["category"] }))}
                className="form-input-dark">
                {["Software", "Hardware", "Consulting", "Cloud Services", "Staffing", "Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="section-label" style={{ display: "block", marginBottom: "6px" }}>Contract Type</label>
              <select value={newVendor.contractType} onChange={e => setNewVendor(p => ({ ...p, contractType: e.target.value as VendorItem["contractType"] }))}
                className="form-input-dark">
                {["Fixed Price", "Time & Materials", "Retainer", "SLA-Based"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAddVendor} className="btn-accent">Register Vendor</button>
            <button onClick={() => setShowAddForm(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "var(--text-xs)", fontWeight: 700, padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Vendor Cards */}
      <div className="space-y-6">
        {filtered.map(vendor => {
          const isEx = expandedId === vendor.id;
          const overdueCount = vendor.deliverables.filter(d => d.status === "Overdue").length;
          return (
            <div key={vendor.id} className={`glass-card overflow-hidden ${overdueCount > 0 ? "border-[var(--pink)]" : ""}`}>
              <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-[var(--bg-card)] gap-6" onClick={() => setExpandedId(isEx ? null : vendor.id)}>
                <div className="flex items-center gap-6">
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--accent-glow)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", fontWeight: 900, fontSize: "var(--text-md)" }}>
                    {vendor.vendorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-[var(--text-primary)]">{vendor.vendorName}</span>
                      <span className="text-[12px] font-mono bg-[var(--bg-card-hover)] text-[var(--text-secondary)] px-2.5 py-1 rounded">{vendor.vendorCode}</span>
                      {overdueCount > 0 && <span className="badge-red flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{overdueCount} Overdue</span>}
                    </div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{vendor.category} · {vendor.contractType} · Manager: {vendor.accountManager}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-extrabold font-mono text-[var(--text-primary)]">${vendor.contractValue.toLocaleString()}</div>
                    <div className="text-[12px] text-[var(--text-muted)]">Contract Value</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= Math.round(vendor.performanceScore / 20) ? "text-amber-400 fill-amber-400" : "text-[var(--border)]"}`} />
                    ))}
                  </div>
                  <span className={statusConfig[vendor.status]}>{vendor.status}</span>
                  {isEx ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                </div>
              </div>
              {isEx && (
                <div className="border-t border-[var(--border)] p-5 bg-[var(--bg-card)]/50 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="space-y-2">
                      <div><span className="text-[var(--text-secondary)]">Contract Period</span><div className="font-bold text-[var(--text-primary)]">{vendor.startDate} → {vendor.endDate}</div></div>
                      <div><span className="text-[var(--text-secondary)]">Payment Terms</span><div className="font-bold text-[var(--text-primary)]">{vendor.paymentTerms}</div></div>
                      <ScoreMeter score={vendor.performanceScore} />
                    </div>
                    <div className="md:col-span-2">
                      <div className="mb-2"><span className="text-[12px] font-bold text-[var(--text-secondary)] uppercase">SLA Terms</span><p className="text-xs text-[var(--text-primary)] mt-1">{vendor.slaTerms}</p></div>
                      {vendor.notes && <div><span className="text-[12px] font-bold text-[var(--text-secondary)] uppercase">Notes</span><p className="text-xs text-[var(--text-primary)] mt-1 italic">{vendor.notes}</p></div>}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-bold text-[var(--text-secondary)] uppercase mb-2">Deliverable Milestones</h4>
                    <div className="space-y-2">
                      {vendor.deliverables.map(del => (
                        <div key={del.id} className="flex items-center justify-between p-3 bg-[var(--bg-card)] rounded-lg border border-[var(--border)]">
                          <div>
                            <div className="text-xs font-bold text-[var(--text-primary)]">{del.title}</div>
                            <div className="text-[12px] text-[var(--text-muted)]">Due: {del.dueDate} · Value: ${del.amount.toLocaleString()}</div>
                          </div>
                          <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full border ${deliverableStatusConfig[del.status]}`}>{del.status}</span>
                        </div>
                      ))}
                    </div>
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
