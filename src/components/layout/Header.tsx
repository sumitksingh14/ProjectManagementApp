import React from "react";
import { useProject } from "../../context/ProjectContext";
import {
  Sparkles,
  Search,
  PlusCircle,
  Briefcase,
  UserCheck,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";

export const Header: React.FC = () => {
  const {
    projects,
    activeProject,
    setActiveProjectById,
    currentRole,
    setCopilotOpen,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    authUsername,
    authUser,
    logout
  } = useProject();

  return (
    <header
      className="flex items-center justify-between px-5 shrink-0"
      style={{
        height: "56px",
        background: "var(--bg-header)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Left: Project Switcher */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            minWidth: "180px"
          }}
        >
          <Briefcase style={{ width: "13px", height: "13px", color: "var(--accent)", flexShrink: 0 }} />
          <select
            value={activeProject?.id || ""}
            onChange={(e) => setActiveProjectById(e.target.value)}
            className="bg-transparent outline-none cursor-pointer flex-1 truncate"
            style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-primary)" }}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id} style={{ background: "var(--bg-card)", color: "var(--text-primary)" }}>
                {p.code} — {p.name}
              </option>
            ))}
          </select>
          <ChevronDown style={{ width: "11px", height: "11px", color: "var(--text-muted)", flexShrink: 0 }} />
        </div>
      </div>

      {/* Center: Search */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl flex-1 mx-6"
        style={{
          maxWidth: "360px",
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
        }}
      >
        <Search style={{ width: "13px", height: "13px", color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search projects, tasks, risks…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none w-full"
          style={{ fontSize: "var(--text-base)", color: "var(--text-primary)" }}
        />
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-2">

        {/* Role badge (read-only) */}
        <div
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
          style={{
            background: "rgba(139,92,246,0.08)",
            border: "1px solid var(--accent-border)",
          }}
        >
          <UserCheck style={{ width: "12px", height: "12px", color: "var(--accent)" }} />
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--accent)" }}>{currentRole}</span>
        </div>

        {/* AI Copilot */}
        <button
          onClick={() => setCopilotOpen(true)}
          className="btn-accent flex items-center gap-1.5"
          style={{ padding: "6px 14px" }}
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: "#FCD34D" }} />
          <span>AI Copilot</span>
        </button>

        {/* New Intake */}
        <button
          onClick={() => setActiveTab("intake")}
          className="flex items-center gap-1.5 rounded-xl transition-all cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--text-secondary)",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent-border)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          <PlusCircle style={{ width: "13px", height: "13px", color: "var(--accent)" }} />
          <span className="hidden sm:inline">New Intake</span>
        </button>

        {/* Bell */}
        <button
          className="relative rounded-xl flex items-center justify-center transition-all cursor-pointer"
          style={{
            width: "32px", height: "32px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--accent-border)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          <Bell style={{ width: "14px", height: "14px" }} />
          <span
            className="absolute top-1.5 right-1.5 rounded-full"
            style={{ width: "6px", height: "6px", background: "var(--pink)" }}
          />
        </button>

        {/* Divider */}
        <div style={{ width: "1px", height: "24px", background: "var(--border)" }} />

        {/* User badge */}
        <div className="flex items-center gap-2">
          <div
            className="rounded-xl flex items-center justify-center text-white font-bold shrink-0 animate-float"
            style={{
              width: "32px", height: "32px",
              background: authUser?.roleColor || "var(--grad-primary)",
              fontSize: "12px",
              boxShadow: "0 2px 10px var(--accent-glow)",
            }}
          >
            {authUser?.avatarInitials || (authUsername ? authUsername.charAt(0).toUpperCase() : "S")}
          </div>
          <div className="hidden lg:flex flex-col">
            <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
              {authUsername || "Sumit"}
            </span>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", lineHeight: 1.3 }}>
              {currentRole}
            </span>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="rounded-lg flex items-center justify-center transition-all cursor-pointer"
            style={{
              width: "28px", height: "28px",
              background: "transparent",
              color: "var(--text-muted)",
              border: "none",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(236,72,153,0.12)";
              e.currentTarget.style.color = "var(--pink)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <LogOut style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      </div>
    </header>
  );
};
