import React from "react";
import { Idea } from "../../../types";
import { useProject } from "../../../context/ProjectContext";
import { ThumbsUp, MessageSquare, Tag, User } from "lucide-react";

interface IdeaCardProps {
  idea: Idea;
}

const statusColors: Record<string, string> = {
  "Submitted": "bg-slate-500/20 text-slate-400 border-slate-500/30",
  "Under Review": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Approved": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Rejected": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Implemented": "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { authUser, voteIdea, currentRole, updateIdeaStatus } = useProject();
  const hasVoted = authUser ? idea.voterIds.includes(authUser.userId) : false;

  const handleVote = () => {
    voteIdea(idea.id);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateIdeaStatus(idea.id, e.target.value as any);
  };

  const canEditStatus = currentRole === "PMO Admin" || currentRole === "Executive Sponsor";

  return (
    <div className="bg-[#1A1726] border border-white/[0.06] rounded-xl p-5 hover:border-purple-500/30 transition-colors flex flex-col h-full shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[16px] font-semibold text-white leading-tight pr-4">{idea.title}</h3>
        {canEditStatus ? (
          <select
            value={idea.status}
            onChange={handleStatusChange}
            className={`text-[12px] font-medium px-2.5 py-1 rounded-full border outline-none cursor-pointer appearance-none ${statusColors[idea.status]}`}
          >
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Implemented">Implemented</option>
          </select>
        ) : (
          <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${statusColors[idea.status]}`}>
            {idea.status}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 mb-4 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>{idea.authorName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          <span>{idea.category}</span>
        </div>
      </div>

      <p className="text-[13.5px] text-slate-300 mb-4 flex-grow line-clamp-3">
        {idea.description}
      </p>

      <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.04] mb-4">
        <p className="text-[12px] text-slate-400 font-medium mb-1">Expected Benefits</p>
        <p className="text-[13px] text-slate-200">{idea.expectedBenefits}</p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
        <button
          onClick={handleVote}
          disabled={hasVoted}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
            hasVoted
              ? "bg-purple-500/20 text-purple-400 cursor-default"
              : "bg-white/[0.06] text-slate-300 hover:bg-white/[0.1] hover:text-white cursor-pointer"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-purple-400" : ""}`} />
          <span>{idea.voteCount} {idea.voteCount === 1 ? "Vote" : "Votes"}</span>
        </button>
        
        <div className="flex items-center gap-1.5 text-slate-400 text-[13px]">
          <MessageSquare className="w-4 h-4" />
          <span>{idea.comments.length}</span>
        </div>
      </div>
    </div>
  );
};
