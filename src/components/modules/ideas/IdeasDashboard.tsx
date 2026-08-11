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
    { title: "Total Ideas", value: totalIdeas, icon: Lightbulb, color: "text-amber-400", bg: "bg-amber-400/10" },
    { title: "Implemented", value: implementedIdeas, icon: Target, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Total Votes", value: totalVotes, icon: ThumbsUp, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Engagement Points", value: totalPoints, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, idx) => (
        <div key={idx} className="bg-[#1A1726] border border-white/[0.06] rounded-xl p-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center shrink-0`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div>
            <p className="text-[12px] text-slate-400 font-medium mb-0.5">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
