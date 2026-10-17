import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../../components/layout/AppLayout';
import {
  Shield,
  Users,
  Layers,
  FileCheck2,
  CreditCard,
  Vote,
  TrendingUp,
  Activity,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { currentUser, challenges, votingPolls, adminAuditLogs } = useApp();

  // Guard: if not admin
  if (currentUser.role !== 'admin') {
    return (
      <AppLayout pageTitle="Administration Access Restricted">
        <div className="p-12 text-center bg-white border border-stone-300 rounded-lg max-w-lg mx-auto">
          <Shield className="w-8 h-8 text-[#997A3D] mx-auto mb-3" />
          <h2 className="font-serif font-bold text-lg text-stone-900">
            Administrative Authorization Required
          </h2>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            Your current authenticated account role is restricted to standard member privileges. Use the role switch in the sidebar to review the admin suite.
          </p>
          <div className="mt-4">
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-[#163323] text-white rounded text-xs font-semibold"
            >
              Return to Member Workspace
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout pageTitle="Administration Executive Console">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider">
              Governance & Operations · Executive Console
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              MindForge Administration
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Curriculum publishing, pricing configuration, member moderation, and rewards audit trail.
            </p>
          </div>

          <div className="p-2.5 bg-[#FAF8F5] border border-stone-300 rounded text-[11px] text-stone-600">
            Demo analytics mode · Operational audit logging active
          </div>
        </div>

        {/* Executive KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Registered Scholars
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-stone-900 tabular-nums">
              1,428
            </div>
            <span className="text-[11px] text-[#4E7A5D] mt-1 block">
              +14% 30-day cohort growth
            </span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Curriculum Challenges
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#163323] tabular-nums">
              {challenges.length}
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              1 Daily Active · 10 Disciplines
            </span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Evaluated Submissions
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-stone-900 tabular-nums">
              8,940
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">
              84.2% average rubric score
            </span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Active Member Ballots
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#997A3D] tabular-nums">
              {votingPolls.filter((p) => p.status === 'Open').length}
            </div>
            <span className="text-[11px] text-[#163323] font-semibold mt-1 block">
              560 total ballots cast
            </span>
          </div>
        </div>

        {/* Operational Modules Quick Action Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/challenges"
            className="p-6 bg-white border border-stone-300 rounded-lg hover:border-[#163323] transition-colors group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-stone-900 group-hover:text-[#163323]">
                Challenge Management
              </span>
              <Layers className="w-4 h-4 text-stone-400 group-hover:text-[#163323]" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Create, edit rubrics, configure XP rewards, and schedule daily problem publications.
            </p>
          </Link>

          <Link
            to="/admin/subscriptions"
            className="p-6 bg-white border border-stone-300 rounded-lg hover:border-[#163323] transition-colors group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-stone-900 group-hover:text-[#163323]">
                Billing & Merit Rewards
              </span>
              <CreditCard className="w-4 h-4 text-stone-400 group-hover:text-[#163323]" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Adjust base platform subscription rates and grant free credits to top monthly leaderboard performers.
            </p>
          </Link>

          <Link
            to="/admin/votes"
            className="p-6 bg-white border border-stone-300 rounded-lg hover:border-[#163323] transition-colors group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-stone-900 group-hover:text-[#163323]">
                Ballot Governance
              </span>
              <Vote className="w-4 h-4 text-stone-400 group-hover:text-[#163323]" />
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Formulate community policy ballots, control candidate options, and audit ballot integrity.
            </p>
          </Link>
        </div>

        {/* Admin Operational Audit Trail */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Administrative Audit Log
              </h2>
              <p className="text-xs text-stone-500">
                Immutable records of platform price alterations, reward grants, and curriculum changes.
              </p>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              Audit Stream Active
            </span>
          </div>

          <div className="divide-y divide-stone-200 text-xs">
            {adminAuditLogs.map((log) => (
              <div key={log.id} className="py-3.5 space-y-1">
                <div className="flex items-center justify-between text-stone-500">
                  <span className="font-mono font-bold text-stone-900 text-[11px]">
                    {log.action}
                  </span>
                  <span className="tabular-nums font-mono text-[11px]">{log.timestamp}</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
