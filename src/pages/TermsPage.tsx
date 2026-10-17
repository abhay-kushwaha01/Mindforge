import React from 'react';
import { PublicLayout } from '../components/layout/PublicLayout';

export const TermsPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-16 px-6 max-w-4xl mx-auto font-sans-body">
        <div className="mb-8">
          <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
            Legal & Governance
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-[#163323]">
            MindForge Terms of Service
          </h1>
          <p className="mt-2 text-xs text-stone-500">
            Effective Date: October 9, 2026 · Document Version: 1.0 (Prototype Specification)
          </p>
        </div>

        <div className="bg-white border border-stone-300 rounded-lg p-8 space-y-8 text-stone-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing MindForge ("the Platform"), creating an account, or participating in problem-solving activities, you agree to comply with and be bound by these Terms of Service. If you do not agree with any provision, you must not use the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              2. Subscription Terms & Billing Structure
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
              <li><strong>First-Month Free Trial:</strong> Eligible new accounts receive an initial 30-day evaluation trial with full platform access without immediate recurring charge.</li>
              <li><strong>Subsequent Billing:</strong> Following expiration of the initial trial, access continues at the administrator-configured monthly rate unless cancelled prior to renewal.</li>
              <li><strong>Cancellation:</strong> You may cancel auto-renewal at any time via the Subscription settings panel. Active access persists until the conclusion of the paid billing cycle.</li>
              <li><strong>Monthly Merit Rewards:</strong> Authorized administrators may grant complimentary subscription credits to top performers on monthly leaderboards subject to configured governance rules.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              3. Nature of AI Evaluation Feedback
            </h2>
            <p>
              MindForge AI feedback is provided strictly for educational self-reflection, cognitive exercise, and intellectual challenge. Feedback, scores, and XP do not constitute professional engineering, medical, legal, financial, or clinical advice, nor do they represent certified psychological IQ metrics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              4. Community Voting & Governance
            </h2>
            <p>
              Participation in community curriculum and policy ballots is limited to members holding an active paid subscription tier. Voting privileges are strictly non-transferable, and duplicate votes or automated vote manipulation are grounds for suspension.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              5. Intellectual Property & Academic Honesty
            </h2>
            <p>
              Challenge statements, rubrics, and platform materials are the proprietary property of MindForge. You retain ownership of your original solution text, while granting MindForge a perpetual, non-exclusive license to process your submission for grading, telemetry, and platform operations.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
};
