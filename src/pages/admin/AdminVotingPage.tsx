import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { Vote, Plus, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminVotingPage: React.FC = () => {
  const { votingPolls, adminCreatePoll, adminClosePoll } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Platform Curriculum');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !option1 || !option2) {
      alert('Title, description, and at least two options are required.');
      return;
    }

    adminCreatePoll({
      title,
      description,
      category,
      status: 'Open',
      closesAt: '2026-11-20T23:59:59Z',
      options: [
        { id: `opt-${Date.now()}-1`, title: option1, description: 'Candidate Path 1', votes: 0 },
        { id: `opt-${Date.now()}-2`, title: option2, description: 'Candidate Path 2', votes: 0 },
      ],
    });

    setFeedback(`New community ballot "${title}" opened.`);
    setTitle('');
    setDescription('');
    setOption1('');
    setOption2('');
    setIsCreating(false);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <AppLayout pageTitle="Ballot & Community Governance Administration">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider">
              Administration · Community Governance
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              Curriculum Ballot Management
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Author member polls, restrict eligibility to paid tiers, and close voting rounds.
            </p>
          </div>

          {!isCreating && (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Ballot</span>
            </button>
          )}
        </div>

        {feedback && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] rounded border border-[#163323]/20 text-xs">
            {feedback}
          </div>
        )}

        {/* Create Ballot Form */}
        {isCreating && (
          <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3">
              Configure New Community Ballot
            </h2>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Ballot Proposition / Question
                </label>
                <input
                  type="text"
                  placeholder="e.g. December Weekend Simulation Domain"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Description & Context
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain why this decision matters for platform learners..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Option Alpha Title
                  </label>
                  <input
                    type="text"
                    placeholder="Candidate option A"
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Option Beta Title
                  </label>
                  <input
                    type="text"
                    placeholder="Candidate option B"
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-stone-300 rounded font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163323] text-white rounded font-semibold hover:bg-[#1f4530]"
                >
                  Publish Open Ballot
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Ballots List */}
        <div className="space-y-4">
          {votingPolls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white border border-stone-300 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-stone-500">
                  <span className="font-semibold text-[#163323]">{poll.category}</span>
                  <span>·</span>
                  <span
                    className={`font-semibold ${
                      poll.status === 'Open' ? 'text-[#4E7A5D]' : 'text-stone-400'
                    }`}
                  >
                    {poll.status}
                  </span>
                  <span>·</span>
                  <span className="tabular-nums font-mono font-bold text-stone-900">
                    {poll.totalVotes} Total Verified Ballots
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {poll.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">{poll.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {poll.status === 'Open' ? (
                  <button
                    type="button"
                    onClick={() => adminClosePoll(poll.id)}
                    className="px-3.5 py-1.5 border border-stone-300 rounded font-semibold text-stone-700 hover:bg-stone-50"
                  >
                    Close Ballot
                  </button>
                ) : (
                  <span className="text-stone-400 italic">Archived</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};
