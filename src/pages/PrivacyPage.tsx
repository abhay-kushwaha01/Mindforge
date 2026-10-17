import React from 'react';
import { PublicLayout } from '../components/layout/PublicLayout';

export const PrivacyPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-16 px-6 max-w-4xl mx-auto font-sans-body">
        <div className="mb-8">
          <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
            Legal & Governance
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-[#163323]">
            MindForge Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-stone-500">
            Effective Date: October 9, 2026 · Document Version: 1.0 (Prototype Specification)
          </p>
        </div>

        <div className="bg-white border border-stone-300 rounded-lg p-8 space-y-8 text-stone-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              1. Overview and Scope
            </h2>
            <p>
              This Privacy Policy explains how MindForge ("the Platform") collects, processes, and protects your information when you access our cognitive training workspace, submit solutions, interact with AI-powered rubric evaluation engines, and participate in community voting.
            </p>
            <p className="text-xs bg-[#FAF8F5] p-3 rounded border border-stone-200 text-stone-600">
              <strong>Notice:</strong> This policy constitutes a structured framework preparing for production backend deployment. Operating company legal entity, registered address, and formal jurisdiction placeholders are designated for administrative ratification prior to commercial launch.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
              <li><strong>Account Credentials:</strong> Full name, verified email address, authentication credentials, and optional biographical interest selections.</li>
              <li><strong>Intellectual Submissions:</strong> Text solutions, deductive arguments, and visual canvas logic topologies submitted to challenge workspaces.</li>
              <li><strong>Performance Telemetry:</strong> Rubric evaluation scores, completion timestamps, daily solving streaks, XP tallies, and achievement unlocking history.</li>
              <li><strong>Governance & Subscription Activity:</strong> Community ballot votes, subscription status tiers, and monthly reward eligibility records.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              3. Processing of Submitted Solutions by AI Models
            </h2>
            <p>
              When you submit a response for evaluation, your written reasoning and optional canvas node metadata are processed by our automated rubric evaluation pipelines to generate scores and constructive feedback.
            </p>
            <p>
              MindForge does not sell member solution text to third-party data brokers. Submissions are processed solely to deliver immediate cognitive critiques and compute aggregated difficulty metrics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              4. Leaderboard & Profile Visibility Controls
            </h2>
            <p>
              By default, your display name and cumulative XP are indexed on public daily, weekly, and monthly leaderboards. You may set your profile to private in Account Settings at any time, which removes your identity from public standings without forfeiting personal progress analytics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              5. Data Retention & Deletion Rights
            </h2>
            <p>
              You maintain the right to export your challenge history or submit an account deletion request. Upon verified deletion, personal credentials and submission associations are purged from active database collections.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};
