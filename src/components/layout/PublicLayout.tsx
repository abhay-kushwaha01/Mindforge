import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C201D] flex flex-col font-sans-body">
      {/* Top Bar Contract: 1-line Brand, 4-5 single-line links, 1 primary action */}
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-sm border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element brand wordmark */}
          <Logo size="md" showTagline to="/" />

          {/* Zone 2: 4-5 clean single-line text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <Link to="/#how-it-works" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Methodology
            </Link>
            <Link to="/challenges" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Curriculum
            </Link>
            <Link to="/#rubrics" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Evaluation Rubrics
            </Link>
            <Link to="/#rewards" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Monthly Rewards
            </Link>
            <Link to="/#faq" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              FAQ
            </Link>
          </nav>

          {/* Zone 3: 1 primary action + login shortcut */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/login"
              className="hidden sm:inline-block text-xs font-semibold text-stone-700 hover:text-stone-900 whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#163323] rounded-md hover:bg-[#1f4530] transition-colors whitespace-nowrap"
            >
              Start Thinking
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1">{children}</main>

      {/* Comprehensive Editorial Footer */}
      <footer className="bg-[#EDE9E1] border-t border-stone-300 py-12 text-stone-700 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo size="sm" showTagline to="/" />
            <p className="mt-3 text-stone-600 leading-relaxed">
              Think Deeper. Solve Smarter. Grow Daily.
            </p>
            <p className="mt-2 text-stone-500 text-[11px]">
              Daily critical-thinking, logic verification, and systemic problem-solving.
            </p>
          </div>

          <div>
            <div className="font-semibold text-stone-900 uppercase tracking-wider mb-3 text-[11px]">
              Curriculum Domains
            </div>
            <ul className="space-y-2">
              <li><Link to="/challenges" className="hover:text-stone-900">Logical Reasoning</Link></li>
              <li><Link to="/challenges" className="hover:text-stone-900">Spot the Flaw</Link></li>
              <li><Link to="/challenges" className="hover:text-stone-900">First-Principles Thinking</Link></li>
              <li><Link to="/challenges" className="hover:text-stone-900">High-Stakes Decision-Making</Link></li>
              <li><Link to="/challenges" className="hover:text-stone-900">Engineering & Systems Design</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-stone-900 uppercase tracking-wider mb-3 text-[11px]">
              Platform & Governance
            </div>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-stone-900">Member Workspace</Link></li>
              <li><Link to="/voting" className="hover:text-stone-900">Community Curriculum Voting</Link></li>
              <li><Link to="/subscription" className="hover:text-stone-900">Subscription & Rewards</Link></li>
              <li><Link to="/leaderboard" className="hover:text-stone-900">Global Leaderboard</Link></li>
              <li><Link to="/admin" className="hover:text-stone-900">Administration Console</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-stone-900 uppercase tracking-wider mb-3 text-[11px]">
              Legal & Disclaimers
            </div>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-stone-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-stone-900">Terms of Service</Link></li>
            </ul>
            <p className="mt-4 text-[11px] text-stone-500 leading-normal">
              MindForge evaluations are AI-powered educational cognitive exercises and do not represent formal psychometric or scientific IQ certifications.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div>© {new Date().getFullYear()} MindForge. All rights reserved. Forge a Sharper Mind.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <span>·</span>
            <span>Initial Prototype Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
