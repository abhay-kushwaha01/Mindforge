import React from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import {
  Flame,
  Sparkles,
  Trophy,
  Award,
  CheckCircle2,
  TrendingUp,
  Compass,
  Cpu,
  Atom,
  Lightbulb,
  Calendar,
  Search,
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { currentUser, achievements } = useApp();

  const skillBars = [
    { name: 'Logical Deduction & Truth Tables', level: 'Level 4 · Advanced', score: 92 },
    { name: 'Constraint & Boundary Optimization', level: 'Level 5 · Master', score: 95 },
    { name: 'First-Principles Deconstruction', level: 'Level 4 · Advanced', score: 89 },
    { name: 'Spotting Latent Physical Flaws', level: 'Level 4 · Advanced', score: 88 },
    { name: 'Practical Feasibility & Staffing', level: 'Level 3 · Proficient', score: 79 },
    { name: 'Uncovering Tacit Assumptions', level: 'Level 4 · Advanced', score: 86 },
  ];

  const difficultyBreakdown = [
    { level: 'Beginner', completed: 8, total: 10, percent: 80 },
    { level: 'Intermediate', completed: 11, total: 15, percent: 73 },
    { level: 'Advanced', completed: 5, total: 12, percent: 42 },
  ];

  const monthlyScores = [
    { month: 'Jun', avgScore: 78 },
    { month: 'Jul', avgScore: 82 },
    { month: 'Aug', avgScore: 84 },
    { month: 'Sep', avgScore: 87 },
    { month: 'Oct (Current)', avgScore: 91 },
  ];

  return (
    <AppLayout pageTitle="Personal Progress & Cognitive Growth">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Analytics & Competencies
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
              Thinking-Skill Progression
            </h1>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Objective longitudinal tracking of your reasoning depth, constraint rigor, and cognitive habits.
            </p>
          </div>

          <div className="text-xs text-stone-500 bg-[#FAF8F5] p-3 rounded border border-stone-200">
            Notice: XP metrics reflect deliberate practice adherence and rubric consistency, not psychometric IQ claims.
          </div>
        </div>

        {/* High-Level Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Problems Completed
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#163323] tabular-nums">
              {currentUser.challengesCompleted}
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Across 6 disciplines
            </span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Active Streak
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#997A3D] tabular-nums">
              {currentUser.currentStreak} Days
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Best record: {currentUser.bestStreak} days
            </span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Total XP Accumulated
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-stone-900 tabular-nums">
              {currentUser.totalXp.toLocaleString()}
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Tier: Advanced Scholar
            </span>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Global Rank
            </span>
            <div className="mt-2 text-2xl font-serif font-bold text-[#163323] tabular-nums">
              #{currentUser.leaderboardRank}
            </div>
            <span className="text-[11px] text-[#4E7A5D] font-semibold mt-1 block">
              Monthly reward eligible
            </span>
          </div>
        </div>

        {/* Cognitive Skill Competencies & Longitudinal Score Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Breakdown */}
          <div className="p-6 bg-white border border-stone-300 rounded-lg space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-stone-900 text-base">
                Core Cognitive Proficiencies
              </h2>
              <span className="text-xs text-stone-500">Rubric Averages</span>
            </div>

            <div className="space-y-4">
              {skillBars.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="font-semibold text-stone-800">{skill.name}</span>
                      <span className="text-stone-400 ml-2 text-[11px]">{skill.level}</span>
                    </div>
                    <span className="font-bold text-[#163323] tabular-nums font-mono">
                      {skill.score}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#163323] rounded-full"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Longitudinal Trend Chart with Labeled Axes */}
          <div className="p-6 bg-white border border-stone-300 rounded-lg space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-serif font-bold text-stone-900 text-base">
                  Average Monthly Rubric Scores
                </h2>
                <span className="text-xs text-[#163323] font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +13% over 5 months
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Composite evaluation score progression over sequential calendar months.
              </p>
            </div>

            {/* Custom SVG / Bar Chart with Labeled Axes */}
            <div className="pt-4">
              <div className="h-44 flex items-end justify-between gap-4 border-b border-l border-stone-300 px-4 pb-2">
                {monthlyScores.map((point) => (
                  <div key={point.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#163323] tabular-nums">
                      {point.avgScore}%
                    </span>
                    <div
                      className="w-full max-w-[42px] bg-[#163323] rounded-t transition-all hover:bg-[#1f4530]"
                      style={{ height: `${(point.avgScore / 100) * 120}px` }}
                    />
                    <span className="text-[10px] text-stone-600 font-medium">
                      {point.month}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 mt-2 px-2">
                <span>Baseline (June 2026)</span>
                <span>Y-Axis: 0 to 100 Composite Score</span>
                <span>Current Cohort</span>
              </div>
            </div>

            {/* Difficulty Progression */}
            <div className="pt-4 border-t border-stone-200">
              <h3 className="font-serif font-semibold text-stone-900 text-xs mb-3">
                Difficulty Progression
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {difficultyBreakdown.map((d) => (
                  <div key={d.level} className="p-3 bg-stone-50 rounded border border-stone-200 text-xs">
                    <span className="text-stone-500 block text-[10px] uppercase font-semibold">
                      {d.level}
                    </span>
                    <div className="font-bold text-stone-900 mt-1 tabular-nums">
                      {d.completed} / {d.total}
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-[#997A3D] rounded-full"
                        style={{ width: `${d.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges Grid */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Cognitive Mastery Badges
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Earned through verified problem decomposition and rigorous criteria adherence.
              </p>
            </div>
            <span className="text-xs text-stone-600 tabular-nums">
              4 of {achievements.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => {
              const isUnlocked = Boolean(ach.unlockedAt);

              return (
                <div
                  key={ach.id}
                  className={`p-5 rounded-lg border transition-colors ${
                    isUnlocked
                      ? 'border-stone-300 bg-white'
                      : 'border-stone-200 bg-stone-50/70 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold text-[#997A3D] uppercase tracking-wider">
                      {ach.category}
                    </span>
                    {isUnlocked ? (
                      <span className="text-[11px] font-semibold text-[#163323] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-400 tabular-nums">
                        {ach.progressPercent}%
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-sm mt-2">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {ach.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-200/80 text-[11px] text-stone-500">
                    {isUnlocked ? `Earned ${ach.unlockedAt}` : 'In progress towards requirement'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
