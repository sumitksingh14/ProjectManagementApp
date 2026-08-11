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
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || idea.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Innovation Portal</h1>
          </div>
          <p className="text-sm text-slate-400">Submit, collaborate, and vote on new ideas to improve our processes.</p>
        </div>
        
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-[13px] font-medium rounded-xl transition-all shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          Submit New Idea
        </button>
      </div>

      <IdeasDashboard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Ideas Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1A1726] border border-white/[0.06] rounded-xl p-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ideas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#120F1D] border border-white/[0.06] rounded-lg pl-9 pr-4 py-2 text-[13px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-[#120F1D] border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-purple-500/40 transition-colors appearance-none cursor-pointer"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIdeas.length > 0 ? (
              filteredIdeas.map(idea => (
                <IdeaCard key={idea.id} idea={idea} />
              ))
            ) : (
              <div className="col-span-full p-8 text-center bg-[#1A1726] border border-white/[0.06] rounded-xl text-slate-400">
                No ideas found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Gamification */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Leaderboard />
          </div>
        </div>
      </div>

      {isFormOpen && <IdeaForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};
