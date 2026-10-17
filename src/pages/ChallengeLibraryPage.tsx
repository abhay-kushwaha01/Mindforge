import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import {
  ChallengeCategory,
  ChallengeDifficulty,
  ChallengeStatus,
} from '../types';
import {
  Search,
  Filter,
  ArrowUpDown,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Flame,
} from 'lucide-react';

const CATEGORIES: ('All' | ChallengeCategory)[] = [
  'All',
  'Logical Reasoning',
  'Spot the Flaw',
  'First-Principles Thinking',
  'Decision-Making',
  'Engineering and Design',
  'Analytical Thinking',
  'Creative Thinking',
  'Business Strategy',
  'Real-World Problems',
  'Constraint Challenges',
];

const DIFFICULTIES: ('All' | ChallengeDifficulty)[] = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
];

const STATUSES: ('All' | ChallengeStatus)[] = [
  'All',
  'Available',
  'In Progress',
  'Completed',
];

export const ChallengeLibraryPage: React.FC = () => {
  const { challenges } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ChallengeCategory>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | ChallengeDifficulty>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ChallengeStatus>('All');
  const [sortBy, setSortBy] = useState<'date' | 'xp' | 'time'>('date');

  const filteredChallenges = useMemo(() => {
    return challenges
      .filter((c) => {
        const matchesSearch =
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === 'All' || c.category === selectedCategory;
        const matchesDifficulty =
          selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
        const matchesStatus =
          selectedStatus === 'All' || c.status === selectedStatus;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'xp') return b.xpReward - a.xpReward;
        if (sortBy === 'time') return a.estimatedMinutes - b.estimatedMinutes;
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      });
  }, [challenges, searchQuery, selectedCategory, selectedDifficulty, selectedStatus, sortBy]);

  return (
    <AppLayout pageTitle="Curriculum Library">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header & Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Comprehensive Archive · 10 Disciplines
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
              Challenge Library
            </h1>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Explore past scenarios, filter by analytical focus, or revisit completed solutions.
            </p>
          </div>

          <div className="text-xs text-stone-600">
            Showing <strong className="text-stone-900 tabular-nums">{filteredChallenges.length}</strong> of{' '}
            <span className="tabular-nums">{challenges.length}</span> challenges
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-white border border-stone-300 rounded-lg space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by topic, keyword, or dilemma..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
              />
            </div>

            {/* Quick Sort & Dropdowns */}
            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
              <div className="flex items-center gap-1 text-xs text-stone-600">
                <span className="font-semibold text-stone-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800"
                >
                  <option value="date">Most Recent</option>
                  <option value="xp">Highest XP</option>
                  <option value="time">Estimated Time</option>
                </select>
              </div>

              <div className="flex items-center gap-1 text-xs text-stone-600">
                <span className="font-semibold text-stone-700">Difficulty:</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                  className="bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800"
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1 text-xs text-stone-600">
                <span className="font-semibold text-stone-700">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-xs text-stone-800"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Category Filter Pills (Functional buttons with click handlers, not static slop) */}
          <div className="pt-2 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-stone-500 font-semibold mr-2 shrink-0">Category:</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#163323] text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge) => {
            const isCompleted = challenge.status === 'Completed';

            return (
              <div
                key={challenge.id}
                className={`bg-white border rounded-lg p-6 flex flex-col justify-between transition-shadow hover:shadow-xs ${
                  challenge.isDailyChallenge
                    ? 'border-[#997A3D] ring-1 ring-[#997A3D]/40'
                    : 'border-stone-300'
                }`}
              >
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#163323]">{challenge.category}</span>
                      <span>·</span>
                      <span>{challenge.difficulty}</span>
                      {challenge.isDailyChallenge && (
                        <>
                          <span>·</span>
                          <span className="font-bold text-[#997A3D]">TODAY'S PICK</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isCompleted ? (
                        <span className="text-[#163323] font-semibold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="text-stone-600 text-[11px]">Available</span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                    <Link
                      to={`/challenges/${challenge.id}`}
                      className="hover:text-[#163323] transition-colors"
                    >
                      {challenge.title}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {challenge.problemStatement}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-stone-500">
                    <span className="tabular-nums">Est. {challenge.estimatedMinutes} min</span>
                    <span>·</span>
                    <span className="font-semibold text-stone-900 tabular-nums">
                      +{challenge.xpReward} XP
                    </span>
                  </div>

                  <Link
                    to={`/challenges/${challenge.id}`}
                    className={`px-3.5 py-1.5 rounded font-semibold text-xs transition-colors ${
                      isCompleted
                        ? 'border border-stone-300 text-stone-700 hover:bg-stone-50'
                        : 'bg-[#163323] text-white hover:bg-[#1f4530]'
                    }`}
                  >
                    {isCompleted ? 'Review Solution' : 'Open Workspace →'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="p-12 text-center bg-white border border-stone-300 rounded-lg">
            <h3 className="font-serif font-bold text-base text-stone-900">
              No matching challenges found
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Try adjusting your search terms or relaxing category and difficulty filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
              }}
              className="mt-4 px-4 py-2 bg-stone-200 text-stone-800 rounded text-xs font-semibold hover:bg-stone-300"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
