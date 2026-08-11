import React, { useState } from "react";
import { useProject } from "../../../context/ProjectContext";
import { IdeaCard } from "./IdeaCard";
import { IdeasDashboard } from "./IdeasDashboard";
import { Leaderboard } from "./Leaderboard";
import { IdeaForm } from "./IdeaForm";
import { Sparkles, Plus, Search, Filter } from "lucide-react";

export const IdeasPortalView: React.FC = () => {
  const { ideas } = useProject();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || idea.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className="animate-fadeIn"
      style={{
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div
        className="hero-banner animate-fadeIn"
        style={{
          padding: "24px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span
              className="badge-violet"
              style={{ fontSize: "12px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.06em" }}
            >
              Innovation
            </span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>
              Enterprise Ideas &amp; Innovation Portal
            </span>
          </div>
          <h1
            style={{
              fontSize: "var(--text-2xl)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.3px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkles style={{ width: "22px", height: "22px", color: "#FCD34D" }} />
            Innovation Portal
          </h1>
          <p
            style={{
              fontSize: "var(--text-base)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "580px",
              lineHeight: 1.6,
            }}
          >
            Submit, collaborate, and vote on new ideas to improve processes, drive innovation,
            and unlock strategic opportunities.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-accent"
          style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
        >
          <Plus style={{ width: "15px", height: "15px" }} />
          Submit New Idea
        </button>
      </div>

      {/* ── Stats Dashboard ──────────────────────────────────────────────── */}
      <IdeasDashboard />

      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
          alignItems: "start",
        }}
        className="ideas-grid"
      >
        {/* Left — Ideas Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Search & Filter Bar */}
          <div
            className="glass-card"
            style={{
              padding: "12px 16px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", minWidth: "200px", flex: 1, maxWidth: "300px" }}>
              <Search
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "14px",
                  height: "14px",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                }}
              />
              <input
                type="text"
                aria-label="Search ideas"
                placeholder="Search ideas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-dark"
                style={{ paddingLeft: "34px" }}
              />
            </div>

            {/* Status Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Filter style={{ width: "14px", height: "14px", color: "var(--text-muted)", flexShrink: 0 }} />
              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="input-dark"
                style={{ width: "auto", padding: "8px 12px", cursor: "pointer" }}
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Implemented">Implemented</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "16px",
            }}
          >
            {filteredIdeas.length > 0 ? (
              filteredIdeas.map(idea => <IdeaCard key={idea.id} idea={idea} />)
            ) : (
              <div
                className="glass-card"
                style={{
                  gridColumn: "1 / -1",
                  padding: "40px",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontSize: "var(--text-base)",
                }}
              >
                No ideas found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right — Leaderboard */}
        <div style={{ position: "sticky", top: "24px" }}>
          <Leaderboard />
        </div>
      </div>

      {isFormOpen && <IdeaForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};
