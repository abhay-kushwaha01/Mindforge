import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import {
  Flame,
  Sparkles,
  Trophy,
  ArrowRight,
  Clock,
  Compass,
  Cpu,
  Atom,
  Calendar,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser, challenges, evaluations, notifications } = useApp();

  const dailyChallenge = challenges.find((c) => c.isDailyChallenge) || challenges[0];
  const isDailyCompleted = dailyChallenge.status === 'Completed';

  // Weekly days activity data
  const weekDays = [
    { day: 'Mon', completed: true, date: 'Oct 5' },
    { day: 'Tue', completed: true, date: 'Oct 6' },
    { day: 'Wed', completed: true, date: 'Oct 7' },
    { day: 'Thu', completed: true, date: 'Oct 8' },
    { day: 'Fri', completed: isDailyCompleted, isToday: true, date: 'Oct 9' },
    { day: 'Sat', completed: false, date: 'Oct 10' },
    { day: 'Sun', completed: false, date: 'Oct 11' },
  ];

  const recentEvalId = Object.keys(evaluations)[0];
  const recentEvaluation = recentEvalId ? evaluations[recentEvalId] : null;
  const recentChallenge = recentEvaluation
    ? challenges.find((c) => c.id === recentEvaluation.challengeId)
    : null;

  return (
    <AppLayout pageTitle="Executive Dashboard">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Banner & Quantitative Progress Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Daily Practice · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Consistent daily problem decomposition sharpens systemic instincts under high uncertainty.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="block text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                Current Streak
              </span>
              <span className="text-2xl font-serif font-bold text-[#163323] tabular-nums">
                {currentUser.currentStreak} Days
              </span>
            </div>

            <div className="h-8 w-px bg-stone-300" />

            <div className="text-right">
              <span className="block text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                Total XP
              </span>
              <span className="text-2xl font-serif font-bold text-[#997A3D] tabular-nums">
                {currentUser.totalXp.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Anchor: Today's Featured Challenge Hero Box */}
        <div className="border border-stone-300 rounded-lg bg-white overflow-hidden shadow-xs">
          <div className="px-6 py-3.5 bg-[#EAE6DE] border-b border-stone-300 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <span className="font-semibold text-[#163323] uppercase tracking-wider text-[11px]">
                Today's Featured Problem
              </span>
              <span>·</span>
              <span>{dailyChallenge.category}</span>
              <span>·</span>
              <span>{dailyChallenge.difficulty}</span>
            </div>
            <div className="flex items-center gap-3 text-stone-600">
              <span className="tabular-nums">Est. {dailyChallenge.estimatedMinutes} min</span>
              <span>·</span>
              <span className="font-semibold text-[#163323] tabular-nums">
                +{dailyChallenge.xpReward} XP Reward
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-stone-900 leading-snug">
              {dailyChallenge.title}
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed max-w-4xl">
              {dailyChallenge.problemStatement}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={`/challenges/${dailyChallenge.id}`}
                className="px-6 py-2.5 bg-[#163323] text-white font-semibold rounded text-xs hover:bg-[#1f4530] transition-colors inline-flex items-center gap-2"
              >
                <span>{isDailyCompleted ? 'Review Submitted Solution' : 'Solve Today’s Challenge'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <span className="text-xs text-stone-500">
                {isDailyCompleted ? 'Completed today' : 'Expires at midnight UTC'}
              </span>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Habit & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 spans): Weekly Activity & Skill Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Habit Calendar */}
            <div className="p-6 bg-white border border-stone-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-semibold text-stone-900 text-base">
                  Weekly Solving Cadence
                </h3>
                <span className="text-xs text-stone-500">Goal: 7 / 7 Days</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((item) => (
                  <div
                    key={item.day}
                    className={`p-3 rounded border text-center transition-colors ${
                      item.completed
                        ? 'border-[#163323] bg-[#EBF2EC]'
                        : item.isToday
                        ? 'border-[#997A3D] bg-[#FAF8F5]'
                        : 'border-stone-200 bg-stone-50'
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-stone-500 uppercase">
                      {item.day}
                    </div>
                    <div className="text-xs text-stone-400 mt-0.5">{item.date}</div>
                    <div className="mt-2 flex justify-center">
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#163323]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-stone-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cognitive Skill Radar Breakdown */}
            <div className="p-6 bg-white border border-stone-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-semibold text-stone-900 text-base">
                  Reasoning Skill Proficiencies
                </h3>
                <Link to="/progress" className="text-xs text-[#163323] font-semibold hover:underline">
                  Full Analytics →
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { skill: 'Logical Deduction & Truth Verification', score: 92, count: '14 solved' },
                  { skill: 'Recognition of Hidden Assumptions', score: 86, count: '18 solved' },
                  { skill: 'First-Principles Deconstruction', score: 89, count: '11 solved' },
                  { skill: 'Practical Feasibility & Staffing Trade-offs', score: 78, count: '15 solved' },
                  { skill: 'Quantitative Constraint Adherence', score: 94, count: '22 solved' },
                ].map((item) => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-stone-800">{item.skill}</span>
                      <div className="flex items-center gap-2 text-stone-500">
                        <span>{item.count}</span>
                        <span>·</span>
                        <span className="font-bold text-stone-900 tabular-nums">{item.score}%</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#163323] rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earned Achievements */}
            <div className="p-6 bg-white border border-stone-300 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-semibold text-stone-900 text-base">
                  Badges & Honors
                </h3>
                <span className="text-xs text-stone-500">4 Unlocked</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: 'The Systems Architect',
                    category: 'Engineering & Systems',
                    unlocked: 'Unlocked Oct 4',
                  },
                  {
                    title: 'First Principles Thinker',
                    category: 'First-Principles',
                    unlocked: 'Unlocked Oct 7',
                  },
                  {
                    title: 'The Pragmatist',
                    category: 'Decision-Making',
                    unlocked: 'Unlocked Sep 28',
                  },
                ].map((badge) => (
                  <div
                    key={badge.title}
                    className="p-3.5 bg-[#FAF8F5] border border-stone-300 rounded"
                  >
                    <span className="text-[10px] font-bold text-[#997A3D] uppercase tracking-wider block">
                      {badge.category}
                    </span>
                    <h4 className="font-serif font-semibold text-stone-900 text-sm mt-1">
                      {badge.title}
                    </h4>
                    <span className="text-[11px] text-[#4E7A5D] mt-2 block">
                      {badge.unlocked}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 span): Recent AI Feedback & Upcoming Challenges */}
          <div className="space-y-8">
            {/* Recent AI Feedback Card */}
            {recentEvaluation && recentChallenge ? (
              <div className="p-6 bg-white border border-stone-300 rounded-lg space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
                    Recent Evaluation
                  </span>
                  <span className="text-xs font-bold text-[#163323] tabular-nums">
                    {recentEvaluation.overallScore} / 100
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm">
                    {recentChallenge.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Evaluated on {new Date(recentEvaluation.evaluationDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="p-3 bg-[#FAF8F5] rounded border border-stone-200 text-xs text-stone-700 space-y-1">
                  <span className="font-semibold block text-stone-900">Key AI Insight:</span>
                  <p className="leading-relaxed">
                    {recentEvaluation.strengths[0]}
                  </p>
                </div>

                <Link
                  to={`/feedback/${recentChallenge.id}`}
                  className="block text-center py-2 border border-stone-300 rounded text-xs font-semibold text-stone-800 hover:bg-stone-50"
                >
                  View Full 8-Criteria Report →
                </Link>
              </div>
            ) : null}

            {/* Upcoming Challenges Queue */}
            <div className="p-6 bg-white border border-stone-300 rounded-lg space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-serif font-semibold text-stone-900 text-sm">
                  Upcoming Daily Problems
                </h3>
                <Link to="/challenges" className="text-xs text-[#163323] hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Rethinking Urban Cold-Chain Logistics Without Stationary Warehouses',
                    domain: 'First-Principles Thinking',
                    date: 'Tomorrow, Oct 10',
                  },
                  {
                    title: 'The High-Frequency Bidding Anomaly: Latency Arbitrage',
                    domain: 'Analytical Thinking',
                    date: 'Sunday, Oct 11',
                  },
                  {
                    title: 'Seismic-Resilient Water Distribution for Mountain Communities',
                    domain: 'Engineering & Design',
                    date: 'Monday, Oct 12',
                  },
                ].map((item) => (
                  <div key={item.title} className="p-3 bg-stone-50 rounded border border-stone-200 text-xs">
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                      {item.domain} · {item.date}
                    </span>
                    <span className="font-semibold text-stone-900 block mt-1 line-clamp-1">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Ballot Notice */}
            <div className="p-6 bg-[#FAF8F5] border border-stone-300 rounded-lg space-y-3">
              <span className="text-[10px] font-bold text-[#997A3D] uppercase tracking-wider block">
                Active Community Ballot
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-sm">
                November Weekend Deep-Dive Investigation Theme
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Eligible paid members are voting on our next multi-stage geopolitical or bio-computing simulation.
              </p>
              <Link
                to="/voting"
                className="inline-block text-xs font-semibold text-[#163323] underline pt-1"
              >
                Go to Voting Booth →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
