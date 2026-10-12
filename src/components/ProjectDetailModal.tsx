'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  ExternalLink,
  Trophy,
  Globe,
  ThumbsUp,
  GraduationCap,
  Users,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { StudentProject } from '../types';

interface ProjectDetailModalProps {
  project: StudentProject | null;
  onClose: () => void;
  onUpvote: (id: string) => void;
  hasUpvoted: boolean;
  currency: 'INR' | 'USD';
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onUpvote,
  hasUpvoted,
  currency,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header Visual */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 bg-slate-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs font-stylized">
              {project.category}
            </span>

            {project.rank && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs font-stylized ${
                  project.rank === 1
                    ? 'bg-amber-400 text-slate-950'
                    : project.rank === 2
                    ? 'bg-slate-200 text-slate-800'
                    : 'bg-amber-700 text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>
                  {project.rank === 1
                    ? '1st Place'
                    : project.rank === 2
                    ? '2nd Place'
                    : '3rd Place'}
                </span>
                <span>•</span>
                <span>
                  {currency === 'INR' ? project.prizeAmountINR : project.prizeAmountUSD}
                </span>
              </span>
            )}

            {project.openIntelligenceFeatured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#0e8579] border border-[#2ec4b6]/40 shadow-xs flex items-center gap-1 font-stylized">
                <Globe className="w-3.5 h-3.5 text-[#2ec4b6]" /> Featured on Open Intelligence
              </span>
            )}
          </div>

          {/* Title on image bottom */}
          <div className="absolute bottom-4 left-6 right-6">
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white"
              style={{ fontFamily: 'var(--font-plus-jakarta)' }}
            >
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Metadata Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1f6fb2]/10 border border-[#1f6fb2]/20 flex items-center justify-center text-[#1f6fb2] shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-stylized">Institution</div>
                <div className="text-sm font-semibold text-slate-900">{project.institution}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2ec4b6]/10 border border-[#2ec4b6]/20 flex items-center justify-center text-[#0e8579] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-stylized">Student Team</div>
                <div className="text-sm font-semibold text-slate-900">
                  {project.teamMembers.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-stylized uppercase tracking-wider text-slate-500 font-bold">
              Project Overview
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-2">
            <h3 className="text-xs font-stylized uppercase tracking-wider text-slate-500 font-bold">
              Technical Innovations & Engineering Highlights
            </h3>
            <div className="space-y-2">
              {project.architectureHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2ec4b6] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Metric Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#1f6fb2] shrink-0" />
            <div>
              <div className="text-[10px] text-[#1f6fb2] uppercase font-stylized font-semibold">
                Validated Performance Metric
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-900">
                {project.impactMetric}
              </div>
            </div>
          </div>

          {/* Tech Stack Tags in Space Grotesk */}
          <div className="space-y-2">
            <h3 className="text-xs font-stylized uppercase tracking-wider text-slate-500 font-bold">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-stylized bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links & Upvote Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-xs transition-opacity hover:opacity-95"
                  style={{ background: 'linear-gradient(135deg, #1f6fb2, #2ec4b6)' }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={() => onUpvote(project.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer font-stylized ${
                hasUpvoted
                  ? 'bg-[#2ec4b6]/20 text-[#0e8579] border border-[#2ec4b6]/40'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current text-[#2ec4b6]' : ''}`} />
              <span>{hasUpvoted ? 'Upvoted!' : 'Upvote Project'}</span>
              <span className="text-[11px] opacity-80">({project.upvotes})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
