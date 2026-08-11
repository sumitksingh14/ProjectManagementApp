import React from "react";
import { useProject } from "../../../context/ProjectContext";
import { Trophy, Medal, Star } from "lucide-react";

export const Leaderboard: React.FC = () => {
  const { gamification, authUser, users } = useProject();

  const sortedGamification = [...gamification].sort((a, b) => b.points - a.points);
  
  // Get top 5 for the leaderboard
  const topUsers = sortedGamification.slice(0, 5);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1: return <Medal className="w-5 h-5 text-slate-300" />;
      case 2: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center font-bold text-slate-500 text-sm">{index + 1}</span>;
    }
  };

  return (
    <div className="bg-[#1A1726] border border-white/[0.06] rounded-xl p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-purple-400" />
        <h3 className="text-[15px] font-semibold text-white">Innovation Leaderboard</h3>
      </div>
      
      <div className="space-y-3">
        {topUsers.map((g, index) => {
          const isCurrentUser = authUser?.userId === g.userId;
          // In a real app we'd map g.userId to the actual user name, here we mock it or use what's in context if available.
          // Since we might not have all users loaded correctly in our dummy context, we'll try to find or fallback
          const userObj = users.find(u => u.id === g.userId);
          // Just using string manipulation to mock a name if userObj is missing (since we didn't add all to Users context)
          const name = userObj?.name || (isCurrentUser ? authUser.displayName : `User ${g.userId}`);

          return (
            <div 
              key={g.userId} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isCurrentUser 
                  ? "bg-purple-500/10 border-purple-500/30" 
                  : "bg-white/[0.02] border-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 flex justify-center">
                  {getRankIcon(index)}
                </div>
                <div>
                  <p className="text-[13.5px] font-medium text-white">{name}</p>
                  <p className="text-[11px] text-slate-400">
                    {g.ideasSubmitted} Ideas • {g.votesReceived} Votes Rx
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-bold text-purple-400">{g.points}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">PTS</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
