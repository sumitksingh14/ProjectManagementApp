import React, { useState } from "react";
import { useProject } from "../../../context/ProjectContext";
import { Sparkles, X } from "lucide-react";

interface IdeaFormProps {
  onClose: () => void;
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onClose }) => {
  const { addIdea } = useProject();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Process Improvement");
  const [expectedBenefits, setExpectedBenefits] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addIdea({
      title,
      description,
      category,
      expectedBenefits,
      authorId: "", // Will be filled by context using authUser
      authorName: "", // Will be filled by context using authUser
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#120F1D] border border-white/[0.1] rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-semibold text-white">Submit New Idea</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="idea-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Idea Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Implement AI-driven task estimation"
                className="w-full bg-[#1A1726] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-[#1A1726] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
              >
                <option value="Process Improvement">Process Improvement</option>
                <option value="New Feature">New Feature</option>
                <option value="Cost Reduction">Cost Reduction</option>
                <option value="AI Integration">AI Integration</option>
                <option value="Culture & Wellness">Culture & Wellness</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Description</label>
              <textarea
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your idea in detail..."
                rows={4}
                className="w-full bg-[#1A1726] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Expected Benefits</label>
              <textarea
                value={expectedBenefits}
                onChange={e => setExpectedBenefits(e.target.value)}
                placeholder="What value will this bring? (e.g., save 5 hrs/week, increase revenue)"
                rows={2}
                className="w-full bg-[#1A1726] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[14px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
              />
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-white/[0.06] flex items-center justify-end gap-3 bg-[#120F1D] rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="idea-form"
            className="px-4 py-2 rounded-lg text-[13px] font-medium bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-lg shadow-purple-500/25 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Submit Idea
          </button>
        </div>
      </div>
    </div>
  );
};
