import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Trophy, Flame, Search, Award, HelpCircle } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, currentUser } = useApp();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [searchFilter, setSearchFilter] = useState('');

  const entries = leaderboard[period].filter((entry) =>
    entry.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <AppLayout pageTitle="Global Standings">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Reasoning Rigor · Merit Rankings
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
              Global Leaderboard
            </h1>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Rankings reward logical depth, consistency, and constraint adherence. Top 10 monthly performers receive complimentary membership credits.
            </p>
          </div>

          {/* Current User Standings Snippet */}
          <div className="p-3 bg-white border border-stone-300 rounded text-xs flex items-center gap-4">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Your Position</span>
              <span className="font-serif font-bold text-base text-[#163323] tabular-nums">
                #{currentUser.leaderboardRank}
              </span>
            </div>
            <div className="h-6 w-px bg-stone-200" />
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Your XP</span>
              <span className="font-serif font-bold text-base text-[#997A3D] tabular-nums">
                {currentUser.totalXp.toLocaleString()}
              </span>
            </div>
            <div className="h-6 w-px bg-stone-200" />
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Active Streak</span>
              <span className="font-serif font-bold text-base text-stone-900 tabular-nums">
                {currentUser.currentStreak}d
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selection & Search */}
        <div className="p-4 bg-white border border-stone-300 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Functional Period Switcher */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-md text-xs w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setPeriod('daily')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 font-medium rounded transition-colors whitespace-nowrap ${
                period === 'daily'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Daily Standings
            </button>
            <button
              type="button"
              onClick={() => setPeriod('weekly')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 font-medium rounded transition-colors whitespace-nowrap ${
                period === 'weekly'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Weekly Cohort
            </button>
            <button
              type="button"
              onClick={() => setPeriod('monthly')}
              className={`flex-1 sm:flex-initial px-4 py-1.5 font-medium rounded transition-colors whitespace-nowrap ${
                period === 'monthly'
                  ? 'bg-[#163323] text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Monthly Merit (Rewards)
            </button>
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
            />
          </div>
        </div>

        {/* Leaderboard Table with Tabular Figures */}
        <div className="bg-white border border-stone-300 rounded-lg overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-stone-300 text-stone-600 uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-6 w-16 text-center">Rank</th>
                  <th className="py-3 px-6">Problem Solver</th>
                  <th className="py-3 px-6 text-center">Streak</th>
                  <th className="py-3 px-6 text-center">Solved</th>
                  <th className="py-3 px-6 text-right">Earned XP</th>
                  <th className="py-3 px-6 text-right">Reward Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {entries.map((entry) => {
                  const isCurrentUser = entry.userId === currentUser.id;
                  const isTopThree = entry.rank <= 3;

                  return (
                    <tr
                      key={entry.id}
                      className={`transition-colors ${
                        isCurrentUser ? 'bg-[#EBF2EC]/70 font-semibold' : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="py-3.5 px-6 text-center tabular-nums">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
                            entry.rank === 1
                              ? 'bg-[#997A3D] text-white'
                              : entry.rank === 2
                              ? 'bg-stone-300 text-stone-800'
                              : entry.rank === 3
                              ? 'bg-[#8C6D4A] text-white'
                              : 'text-stone-600'
                          }`}
                        >
                          {entry.rank}
                        </span>
                      </td>

                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#163323] text-stone-100 flex items-center justify-center font-serif text-[11px] shrink-0">
                            {entry.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-stone-900 flex items-center gap-2">
                              <span>{entry.name}</span>
                              {isCurrentUser && (
                                <span className="text-[10px] text-[#163323] font-bold">
                                  (You)
                                </span>
                              )}
                            </div>
                            {entry.tierBadge && (
                              <span className="text-[10px] text-stone-500">
                                {entry.tierBadge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-6 text-center tabular-nums text-stone-700">
                        <div className="flex items-center justify-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-[#997A3D]" />
                          <span>{entry.streak}d</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-6 text-center tabular-nums text-stone-700">
                        {entry.challengesCompleted}
                      </td>

                      <td className="py-3.5 px-6 text-right tabular-nums font-mono font-bold text-[#163323]">
                        {entry.xp.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-6 text-right text-[11px]">
                        {period === 'monthly' && entry.rank <= 10 ? (
                          <span className="text-[#163323] font-semibold">
                            Eligible (Credit)
                          </span>
                        ) : (
                          <span className="text-stone-400">Regular Tier</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-[#FAF8F5] border-t border-stone-200 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Demo dataset · Rankings update synchronously following rubric evaluations.</span>
            <span>Anti-spam protocol active: rate-limits duplicate submissions.</span>
          </div>
        </div>

        {/* Ranking Architecture Clarification (Honest & Rigorous) */}
        <div className="bg-[#FAF8F5] border border-stone-300 rounded-lg p-6 space-y-3">
          <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-stone-600" />
            <span>Ranking Governance & Spam Prevention</span>
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            MindForge awards XP exclusively upon passing rubric criteria. Submission length alone yields zero incremental points. Rapid-fire duplicate submissions trigger submission throttling. Monthly rankings reset on the 1st of each calendar month at 00:00 UTC, when top 10 finalists are ratified for complimentary membership credits.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};
