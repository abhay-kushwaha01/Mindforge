import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { BarChart3, TrendingUp, Users, CheckCircle2, Flame, Trophy } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { challenges } = useApp();

  return (
    <AppLayout pageTitle="Curriculum Analytics & Metrics">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-6 border-b border-stone-300">
          <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider">
            Administration · Data & Telemetry
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
            Platform Engagement Analytics
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Longitudinal telemetry evaluating challenge completion velocity, streak retention, and rubric scores.
          </p>
        </div>

        {/* Demo Telemetry Banner */}
        <div className="p-3.5 bg-[#FAF8F5] border border-stone-300 rounded text-xs text-stone-600">
          Sample aggregated telemetry dataset (Demo Mode) · Production databases stream real-time cluster metrics.
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              7-Day Active Solvers
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-stone-900 tabular-nums">
              842
            </div>
            <span className="text-[11px] text-[#4E7A5D] mt-1 block">+8% over prior week</span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Average Submission Time
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#163323] tabular-nums">
              21.4 min
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">In-line with target bounds</span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Streak Retention Rate
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#997A3D] tabular-nums">
              68.5%
            </div>
            <span className="text-[11px] text-stone-500 mt-1 block">≥7-day consecutive streak</span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Trial-to-Paid Conversion
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-stone-900 tabular-nums">
              34.2%
            </div>
            <span className="text-[11px] text-[#4E7A5D] mt-1 block">Benchmarked at month 2</span>
          </div>
        </div>

        {/* Completion Rates by Discipline */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3">
            Pass Rates & Difficulty by Reasoning Domain
          </h2>

          <div className="space-y-4 text-xs">
            {[
              { domain: 'Logical Reasoning & Truth Tables', passRate: 88, avgScore: 86, attempts: 1840 },
              { domain: 'Spot the Flaw (Telemetry & Fallacy)', passRate: 74, avgScore: 81, attempts: 1420 },
              { domain: 'First-Principles Deconstruction', passRate: 69, avgScore: 78, attempts: 1190 },
              { domain: 'High-Stakes Decision-Making Triage', passRate: 82, avgScore: 84, attempts: 2150 },
              { domain: 'Engineering & Passive Systems Design', passRate: 77, avgScore: 80, attempts: 1280 },
              { domain: 'Analytical Market Microstructure', passRate: 71, avgScore: 79, attempts: 1060 },
            ].map((d) => (
              <div key={d.domain} className="p-3 bg-stone-50 rounded border border-stone-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-semibold text-stone-900 text-sm font-serif">
                    {d.domain}
                  </span>
                  <div className="flex items-center gap-3 text-stone-500">
                    <span className="tabular-nums">{d.attempts.toLocaleString()} total attempts</span>
                    <span>·</span>
                    <span className="font-bold text-[#163323] tabular-nums font-mono">
                      {d.passRate}% pass rate
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#163323] rounded-full"
                    style={{ width: `${d.passRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
