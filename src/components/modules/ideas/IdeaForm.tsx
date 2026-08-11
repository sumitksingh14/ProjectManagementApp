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
      authorId: "",   // filled by context using authUser
      authorName: "", // filled by context using authUser
    });

    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(8px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="idea-form-title"
    >
      <div
        className="card-dark animate-fadeIn"
        style={{
          width: "100%",
          maxWidth: "640px",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: "var(--grad-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles style={{ width: "15px", height: "15px", color: "#fff" }} />
            </div>
            <h2
              id="idea-form-title"
              style={{
                fontSize: "var(--text-lg)",
                fontWeight: "var(--fw-semibold)",
                color: "var(--text-primary)",
              }}
            >
              Submit New Idea
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close form"
            style={{
              padding: "6px",
              borderRadius: "8px",
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <X style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "18px" }}>
          <form id="idea-form" onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

              {/* Title */}
              <div>
                <label
                  htmlFor="idea-title"
                  className="section-label"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Idea Title *
                </label>
                <input
                  id="idea-title"
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Implement AI-driven task estimation"
                  className="input-dark"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="idea-category"
                  className="section-label"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Category
                </label>
                <select
                  id="idea-category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="input-dark"
                  style={{ cursor: "pointer" }}
                >
                  <option value="Process Improvement">Process Improvement</option>
                  <option value="New Feature">New Feature</option>
                  <option value="Cost Reduction">Cost Reduction</option>
                  <option value="AI Integration">AI Integration</option>
                  <option value="Culture & Wellness">Culture &amp; Wellness</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="idea-description"
                  className="section-label"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Description *
                </label>
                <textarea
                  id="idea-description"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your idea in detail..."
                  rows={4}
                  className="input-dark"
                  style={{ resize: "none" }}
                />
              </div>

              {/* Expected Benefits */}
              <div>
                <label
                  htmlFor="idea-benefits"
                  className="section-label"
                  style={{ display: "block", marginBottom: "8px" }}
                >
                  Expected Benefits
                </label>
                <textarea
                  id="idea-benefits"
                  value={expectedBenefits}
                  onChange={e => setExpectedBenefits(e.target.value)}
                  placeholder="What value will this bring? (e.g., save 5 hrs/week, increase revenue)"
                  rows={2}
                  className="input-dark"
                  style={{ resize: "none" }}
                />
              </div>

            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "12px",
            padding: "16px 20px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--fw-medium)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--border-accent)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="idea-form"
            className="btn-accent"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Sparkles style={{ width: "14px", height: "14px", color: "#FCD34D" }} />
            Submit Idea
          </button>
        </div>
      </div>
    </div>
  );
};
