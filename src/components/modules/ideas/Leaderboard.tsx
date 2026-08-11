import React from "react";
import { useProject } from "../../../context/ProjectContext";
import { Trophy, Medal, Star } from "lucide-react";

export const Leaderboard: React.FC = () => {
  const { gamification, authUser, users } = useProject();

  const sortedGamification = [...gamification].sort((a, b) => b.points - a.points);
  const topUsers = sortedGamification.slice(0, 5);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy style={{ width: "16px", height: "16px", color: "var(--amber)" }} />;
      case 1:
        return <Medal style={{ width: "16px", height: "16px", color: "#CBD5E1" }} />;
      case 2:
        return <Medal style={{ width: "16px", height: "16px", color: "#B45309" }} />;
      default:
        return (
          <span
            style={{
              width: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "var(--fw-bold)",
              color: "var(--text-muted)",
            }}
          >
            {index + 1}
          </span>
        );
    }
  };

  return (
    <div className="glass-card">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          paddingBottom: "14px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Star style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
        <h3 style={{ fontSize: "var(--text-md)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>
          Innovation Leaderboard
        </h3>
      </div>

      {/* Rankings */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {topUsers.map((g, index) => {
          const isCurrentUser = authUser?.userId === g.userId;
          const userObj = users.find(u => u.id === g.userId);
          const name = userObj?.name || (isCurrentUser ? authUser!.displayName : `User ${g.userId}`);

          return (
            <div
              key={g.userId}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 12px",
                borderRadius: "10px",
                border: isCurrentUser ? "1px solid var(--accent-border)" : "1px solid var(--border)",
                background: isCurrentUser ? "var(--accent-glow)" : "rgba(255,255,255,0.02)",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "20px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
                  {getRankIcon(index)}
                </div>
                <div>
                  <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>
                    {name}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "var(--lh-snug)" }}>
                    {g.ideasSubmitted} Ideas · {g.votesReceived} Votes Rx
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: "var(--text-md)", fontWeight: "var(--fw-bold)", color: "var(--accent)" }}>
                  {g.points}
                </p>
                <p
                  className="section-label"
                  style={{ fontSize: "12px", letterSpacing: "var(--ls-widest)" }}
                >
                  PTS
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
