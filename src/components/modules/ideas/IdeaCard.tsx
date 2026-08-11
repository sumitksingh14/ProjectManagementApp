import React from "react";
import { Idea } from "../../../types";
import { useProject } from "../../../context/ProjectContext";
import { ThumbsUp, MessageSquare, Tag, User } from "lucide-react";

interface IdeaCardProps {
  idea: Idea;
}

// Map idea statuses to design-system badge classes
const statusBadgeClass: Record<string, string> = {
  "Submitted":    "badge-slate",
  "Under Review": "badge-blue",
  "Approved":     "badge-green",
  "Rejected":     "badge-red",
  "Implemented":  "badge-violet",
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { authUser, voteIdea, currentRole, updateIdeaStatus } = useProject();
  const hasVoted = authUser ? idea.voterIds.includes(authUser.userId) : false;

  const handleVote = () => voteIdea(idea.id);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateIdeaStatus(idea.id, e.target.value as any);
  };

  const canEditStatus = currentRole === "PMO Admin" || currentRole === "Executive Sponsor";
  const badgeClass = statusBadgeClass[idea.status] ?? "badge-slate";

  return (
    <div
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Title + Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
        <h3 style={{ fontSize: "var(--text-md)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)", lineHeight: "var(--lh-snug)" }}>
          {idea.title}
        </h3>
        {canEditStatus ? (
          <select
            value={idea.status}
            onChange={handleStatusChange}
            aria-label="Update idea status"
            className={`${badgeClass}`}
            style={{ cursor: "pointer", background: "transparent", flexShrink: 0 }}
          >
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Implemented">Implemented</option>
          </select>
        ) : (
          <span className={badgeClass} style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
            {idea.status}
          </span>
        )}
      </div>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "14px" }}>
        <span className="helper-text" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <User style={{ width: "13px", height: "13px" }} />
          {idea.authorName}
        </span>
        <span className="helper-text" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Tag style={{ width: "13px", height: "13px" }} />
          {idea.category}
        </span>
      </div>

      {/* Description */}
      <p className="body-text" style={{ marginBottom: "14px", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {idea.description}
      </p>

      {/* Expected Benefits */}
      <div
        style={{
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "12px 14px",
          marginBottom: "14px",
        }}
      >
        <p className="section-label" style={{ marginBottom: "6px" }}>Expected Benefits</p>
        <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--lh-normal)" }}>
          {idea.expectedBenefits}
        </p>
      </div>

      {/* Footer: Vote + Comments */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "14px",
          borderTop: "1px solid var(--border)",
          marginTop: "auto",
        }}
      >
        <button
          onClick={handleVote}
          disabled={hasVoted}
          aria-label={hasVoted ? "You voted for this idea" : "Vote for this idea"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "7px 14px",
            borderRadius: "8px",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--fw-medium)",
            cursor: hasVoted ? "default" : "pointer",
            border: hasVoted ? "1px solid var(--accent-border)" : "1px solid var(--border)",
            background: hasVoted ? "var(--accent-glow)" : "rgba(255,255,255,0.04)",
            color: hasVoted ? "var(--accent)" : "var(--text-secondary)",
            transition: "all 0.2s",
            minHeight: "36px",
          }}
        >
          <ThumbsUp style={{ width: "14px", height: "14px", fill: hasVoted ? "var(--accent)" : "none" }} />
          <span>{idea.voteCount} {idea.voteCount === 1 ? "Vote" : "Votes"}</span>
        </button>

        <span className="helper-text" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <MessageSquare style={{ width: "14px", height: "14px" }} />
          {idea.comments.length}
        </span>
      </div>
    </div>
  );
};
