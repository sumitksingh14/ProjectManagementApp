import React from "react";
import { useProject } from "../../../context/ProjectContext";
import { Lightbulb, ThumbsUp, Target, TrendingUp } from "lucide-react";

export const IdeasDashboard: React.FC = () => {
  const { ideas, gamification } = useProject();

  const totalIdeas = ideas.length;
  const implementedIdeas = ideas.filter(i => i.status === "Implemented").length;
  const totalVotes = ideas.reduce((acc, idea) => acc + idea.voteCount, 0);
  const totalPoints = gamification.reduce((acc, g) => acc + g.points, 0);

  const statCards = [
    {
      title: "Total Ideas",
      value: totalIdeas,
      icon: Lightbulb,
      accentColor: "var(--amber)",
      glowColor: "rgba(245,158,11,0.15)",
    },
    {
      title: "Implemented",
      value: implementedIdeas,
      icon: Target,
      accentColor: "var(--green)",
      glowColor: "rgba(16,185,129,0.15)",
    },
    {
      title: "Total Votes",
      value: totalVotes,
      icon: ThumbsUp,
      accentColor: "var(--cyan)",
      glowColor: "rgba(6,182,212,0.15)",
    },
    {
      title: "Engagement Points",
      value: totalPoints,
      icon: TrendingUp,
      accentColor: "var(--accent)",
      glowColor: "rgba(139,92,246,0.15)",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
      }}
    >
      {statCards.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="glass-card"
            style={{
              padding: "20px",
              background: `linear-gradient(135deg, ${stat.glowColor} 0%, var(--bg-card) 60%)`,
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: stat.glowColor,
                border: `1px solid ${stat.accentColor}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon style={{ width: "18px", height: "18px", color: stat.accentColor }} />
            </div>
            <div>
              <p className="section-label" style={{ marginBottom: "6px" }}>{stat.title}</p>
              <div className="kpi-value" style={{ fontSize: "var(--text-2xl)" }}>{stat.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
