import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Save, AlertTriangle, ShieldCheck, Trash2, Key } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, toggleRole } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [evaluationAlerts, setEvaluationAlerts] = useState(true);
  const [leaderboardAlerts, setLeaderboardAlerts] = useState(false);
  const [isPublic, setIsPublic] = useState(currentUser.isPublicProfile);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser((prev) => ({
      ...prev,
      name,
      email,
      bio,
      isPublicProfile: isPublic,
    }));
    setStatusMessage('Profile preferences successfully saved.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmationInput === 'DELETE') {
      setShowDeleteModal(false);
      navigate('/');
    }
  };

  return (
    <AppLayout pageTitle="Account Settings">
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="pb-6 border-b border-stone-300">
          <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
            Configuration & Preferences
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
            Platform Settings
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Manage your personal credentials, notification dispatches, and privacy parameters.
          </p>
        </div>

        {statusMessage && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] border border-[#163323]/20 rounded text-xs">
            {statusMessage}
          </div>
        )}

        {/* Edit Profile Form */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3">
            Profile Details
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Bio & Analytical Background
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-stone-300 text-[#163323] focus:ring-[#163323]"
                />
                <span className="font-medium">
                  Index my profile on global daily, weekly, and monthly leaderboards
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530] transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3">
            In-App Notification Dispatch
          </h2>

          <div className="space-y-3 text-xs text-stone-700">
            <label className="flex items-center justify-between p-3 bg-stone-50 rounded border border-stone-200 cursor-pointer">
              <div>
                <span className="font-semibold block text-stone-900">
                  Daily Challenge Release
                </span>
                <span className="text-stone-500">
                  Receive an alert each morning when today's thinking prompt unlocks.
                </span>
              </div>
              <input
                type="checkbox"
                checked={dailyReminders}
                onChange={(e) => setDailyReminders(e.target.checked)}
                className="rounded border-stone-300 text-[#163323] focus:ring-[#163323]"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-stone-50 rounded border border-stone-200 cursor-pointer">
              <div>
                <span className="font-semibold block text-stone-900">
                  AI Rubric Evaluation Ready
                </span>
                <span className="text-stone-500">
                  Notify when automated scoring across the 8 dimensions finishes.
                </span>
              </div>
              <input
                type="checkbox"
                checked={evaluationAlerts}
                onChange={(e) => setEvaluationAlerts(e.target.checked)}
                className="rounded border-stone-300 text-[#163323] focus:ring-[#163323]"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-stone-50 rounded border border-stone-200 cursor-pointer">
              <div>
                <span className="font-semibold block text-stone-900">
                  Monthly Reward Eligibility & Votes
                </span>
                <span className="text-stone-500">
                  Alerts on community ballots and top-performer credit status.
                </span>
              </div>
              <input
                type="checkbox"
                checked={leaderboardAlerts}
                onChange={(e) => setLeaderboardAlerts(e.target.checked)}
                className="rounded border-stone-300 text-[#163323] focus:ring-[#163323]"
              />
            </label>
          </div>
        </div>

        {/* Role & Access Mode (Convenient reviewer switch) */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3">
            Authorization & Role Access
          </h2>

          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-stone-900 block">
                Current Role: {currentUser.role === 'admin' ? 'Administrator' : 'Standard Member'}
              </span>
              <span className="text-stone-500">
                Administrators can create challenges, configure platform pricing, and audit rewards.
              </span>
            </div>

            <button
              type="button"
              onClick={toggleRole}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold border border-stone-300"
            >
              Switch to {currentUser.role === 'admin' ? 'User Role' : 'Admin Role'}
            </button>
          </div>
        </div>

        {/* Destructive Actions with Confirmation Modal */}
        <div className="bg-white border border-rose-300 rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-serif font-bold text-rose-900 border-b border-rose-200 pb-3">
            Account Termination Interface
          </h2>

          <p className="text-xs text-stone-600 leading-relaxed">
            Requesting account deletion will purge your personal credentials, submission history, and streak records from our databases. This action cannot be reversed.
          </p>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-rose-700 text-white rounded text-xs font-semibold hover:bg-rose-800 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Request Account Deletion</span>
          </button>
        </div>

        {/* Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-stone-300 max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-700 font-serif font-bold text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>Confirm Account Deletion</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Type <strong>DELETE</strong> in the box below to confirm permanent account purge.
              </p>

              <input
                type="text"
                placeholder="Type DELETE"
                value={deleteConfirmationInput}
                onChange={(e) => setDeleteConfirmationInput(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-700"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmationInput('');
                  }}
                  className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteConfirmationInput !== 'DELETE'}
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-rose-700 text-white rounded text-xs font-semibold hover:bg-rose-800 disabled:opacity-50"
                >
                  Permanently Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
