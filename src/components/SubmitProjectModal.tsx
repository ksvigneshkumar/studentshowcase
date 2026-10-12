'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  UploadCloud,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { StudentProject } from '../types';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newProject: StudentProject) => void;
}

export const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: 'AI & ML' as StudentProject['category'],
    leadStudent: '',
    teamMembers: '',
    institution: '',
    description: '',
    tags: '',
    githubUrl: '',
    demoUrl: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.leadStudent || !formData.institution || !formData.description) {
      setError('Please fill in all required fields (Project Title, Lead Student, Institution, and Description).');
      return;
    }

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#1f6fb2', '#2ec4b6', '#0e8579', '#38bdf8'],
    });

    const parsedMembers = formData.teamMembers
      ? formData.teamMembers.split(',').map((s) => s.trim())
      : [formData.leadStudent];

    const parsedTags = formData.tags
      ? formData.tags.split(',').map((s) => s.trim())
      : [formData.category, 'Prototype'];

    const newProject: StudentProject = {
      id: `proj-${Date.now()}`,
      title: formData.title,
      tagline: formData.tagline || 'Student breakthrough innovation entered for 2026 Awards',
      category: formData.category,
      leadStudent: formData.leadStudent,
      teamMembers: parsedMembers,
      institution: formData.institution,
      description: formData.description,
      image: '/images/hero_banner.jpg',
      tags: parsedTags,
      upvotes: 1,
      openIntelligenceFeatured: false,
      githubUrl: formData.githubUrl || undefined,
      demoUrl: formData.demoUrl || undefined,
      architectureHighlights: [
        'Direct submission into the 2026 National Innovation Call',
        'Eligible for Top 3 Cash Rewards & Open Intelligence Feature',
        'Peer-review and grand jury evaluation queued',
      ],
      impactMetric: 'Newly submitted for evaluation in National Student Innovation 2026',
    };

    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess(newProject);
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl p-[2px] shadow-xs"
              style={{ background: 'linear-gradient(135deg, #1f6fb2, #2ec4b6)' }}
            >
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center text-[#1f6fb2]">
                <UploadCloud className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2
                className="text-lg font-bold text-slate-900 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-plus-jakarta)' }}
              >
                <span>Submit Student Project</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#2ec4b6]/15 text-[#0e8579] border border-[#2ec4b6]/30 font-stylized">
                  Open Intelligence Candidate
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Compete for Top 3 cash prizes & official publication on Open Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                className="text-2xl font-black text-slate-900"
                style={{ fontFamily: 'var(--font-plus-jakarta)' }}
              >
                Project Submitted Successfully! 🎉
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Your project has been recorded in the live 2026 Showcase gallery. The judging jury
                will review your submission for the <strong className="text-slate-900">Top 3 Cash Prizes</strong> and
                <strong className="text-[#1f6fb2]"> Open Intelligence publication</strong>!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {error}
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-stylized text-slate-700 font-semibold">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. NeuroSync Brain Assistant"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-stylized text-slate-700 font-semibold">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as StudentProject['category'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                  >
                    <option value="AI & ML">AI & ML</option>
                    <option value="Robotics & GreenTech">Robotics & GreenTech</option>
                    <option value="Cybersecurity & Web3">Cybersecurity & Web3</option>
                    <option value="IoT & Hardware">IoT & Hardware</option>
                    <option value="Healthcare & Assistive">Healthcare & Assistive</option>
                  </select>
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-stylized text-slate-700 font-semibold">
                  Tagline / One-Line Pitch
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Real-time edge AI for low-latency biomedical telemetry"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                />
              </div>

              {/* Lead Student & Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-stylized text-slate-700 font-semibold">
                    Lead Student Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.leadStudent}
                    onChange={(e) => setFormData({ ...formData, leadStudent: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-stylized text-slate-700 font-semibold">
                    College / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Anna University / IIT / NIT"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                  />
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-1.5">
                <label className="text-xs font-stylized text-slate-700 font-semibold">
                  Additional Team Members (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.teamMembers}
                  onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                  placeholder="e.g. Priya R., Kavin S., Rahul V."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-stylized text-slate-700 font-semibold">
                  Project Description & Problem Solved <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain what the project does, key technical architecture, and impact..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6] resize-none"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-stylized text-slate-700 font-semibold">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-stylized text-slate-700 font-semibold">
                    Live Demo / Video Pitch Link
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://my-app.demo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                  />
                </div>
              </div>

              {/* Tech Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-stylized text-slate-700 font-semibold">
                  Tech Stack Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. Next.js, PyTorch, LoRaWAN, Rust"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-[#2ec4b6] focus:ring-1 focus:ring-[#2ec4b6]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: 'linear-gradient(135deg, #1f6fb2, #2ec4b6)' }}
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Submit Project For Evaluation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
