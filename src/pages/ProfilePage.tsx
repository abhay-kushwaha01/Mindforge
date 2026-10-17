import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { CheckCircle2, Trophy, Flame, Sparkles, Shield, Eye, Edit3 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, setCurrentUser, challenges, achievements } = useApp();
  const [isPublic, setIsPublic] = useState(currentUser.isPublicProfile);
  const [savedNotice, setSavedNotice] = useState('');

  const completedChallenges = challenges.filter((c) => c.status === 'Completed');

  const handleToggleVisibility = () => {
    const nextVal = !isPublic;
    setIsPublic(nextVal);
    setCurrentUser((prev) => ({ ...prev, isPublicProfile: nextVal }));
    setSavedNotice('Profile visibility updated.');
    setTimeout(() => setSavedNotice(''), 2500);
  };

  return (
    <AppLayout pageTitle="User Profile">
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Profile Card Header */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#163323] text-stone-100 font-serif font-bold text-2xl flex items-center justify-center shrink-0">
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-serif font-bold text-stone-900">
                  {currentUser.name}
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Standard Member'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Member since {currentUser.joinDate} · {currentUser.email}
              </p>
              <p className="text-xs text-stone-700 mt-2 max-w-xl leading-relaxed">
                {currentUser.bio}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link
              to="/settings"
              className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Link>

            <button
              type="button"
              onClick={handleToggleVisibility}
              className={`px-4 py-2 rounded text-xs font-semibold border transition-colors ${
                isPublic
                  ? 'border-[#163323] text-[#163323] bg-[#EBF2EC]'
                  : 'border-stone-300 text-stone-600 bg-stone-100'
              }`}
            >
              {isPublic ? 'Public Profile: Visible' : 'Profile: Private'}
            </button>
          </div>
        </div>

        {savedNotice && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] rounded border border-[#163323]/20 text-xs">
            {savedNotice}
          </div>
        )}

        {/* Lifetime Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Cumulative XP
            </span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#163323] tabular-nums">
              {currentUser.totalXp.toLocaleString()}
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Global Rank
            </span>
            <div className="mt-1 text-2xl font-serif font-bold text-[#997A3D] tabular-nums">
              #{currentUser.leaderboardRank}
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Active Streak
            </span>
            <div className="mt-1 text-2xl font-serif font-bold text-stone-900 tabular-nums">
              {currentUser.currentStreak} Days
            </div>
          </div>

          <div className="p-5 bg-white border border-stone-300 rounded-lg">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Solved Challenges
            </span>
            <div className="mt-1 text-2xl font-serif font-bold text-stone-900 tabular-nums">
              {currentUser.challengesCompleted}
            </div>
          </div>
        </div>

        {/* Challenge History */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Verified Solution History
            </h2>
            <span className="text-xs text-stone-500">
              {completedChallenges.length} archived
            </span>
          </div>

          <div className="divide-y divide-stone-200">
            {completedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 text-stone-500 mb-1">
                    <span>{challenge.category}</span>
                    <span>·</span>
                    <span>{challenge.difficulty}</span>
                    <span>·</span>
                    <span>Completed</span>
                  </div>
                  <h3 className="font-serif font-semibold text-stone-900 text-sm">
                    {challenge.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-[#163323] tabular-nums">
                    +{challenge.xpReward} XP
                  </span>
                  <Link
                    to={`/feedback/${challenge.id}`}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded text-stone-800 font-semibold text-[11px]"
                  >
                    View Feedback
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Interests */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-3">
          <h2 className="text-base font-serif font-bold text-stone-900">
            Curriculum Domain Focus
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {currentUser.interests.map((int) => (
              <span
                key={int}
                className="px-3 py-1 rounded bg-[#EBF2EC] text-[#163323] font-medium border border-[#163323]/20"
              >
                {int}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
