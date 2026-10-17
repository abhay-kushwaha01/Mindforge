import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { Vote, CheckCircle2, AlertCircle, Clock, ShieldCheck, Lock } from 'lucide-react';

export const VotingPage: React.FC = () => {
  const { votingPolls, currentUser, castVote, updateSubscriptionStatus } = useApp();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ [pollId: string]: { message: string; success: boolean } }>({});

  const isEligible = currentUser.subscription.status === 'Active';

  const handleSelectOption = (pollId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [pollId]: optionId }));
  };

  const handleCastVote = (pollId: string) => {
    const optionId = selectedOptions[pollId];
    if (!optionId) return;

    const res = castVote(pollId, optionId);
    setFeedback((prev) => ({ ...prev, [pollId]: res }));
  };

  return (
    <AppLayout pageTitle="Curriculum & Governance Voting">
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Community Governance · Member Ballots
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
              Curriculum & Policy Ballots
            </h1>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Active paid members determine monthly deep-dive themes and rubric weightings through weighted sovereign voting.
            </p>
          </div>

          {/* Eligibility Badge */}
          <div className="p-3 bg-white border border-stone-300 rounded text-xs flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isEligible ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#163323]" />
                  <span className="font-semibold text-[#163323]">Voting Ballot Authorized</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#997A3D]" />
                  <span className="font-semibold text-stone-700">Trial Tier (Read-Only)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ineligible Explanation Notice (if in trial or other state) */}
        {!isEligible && (
          <div className="p-4 bg-[#FAF8F5] border border-[#997A3D]/40 rounded-lg text-xs text-stone-800 space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-[#61491E]">
              <AlertCircle className="w-4 h-4" />
              <span>Voting Eligibility Restriction</span>
            </div>
            <p className="leading-relaxed">
              Curriculum governance voting is exclusively available to members with an active paid subscription tier. Your account is currently on a <strong>{currentUser.subscription.status}</strong> tier. You may browse current ballots and live distributions below.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <Link
                to="/subscription"
                className="font-semibold text-[#163323] underline"
              >
                Manage Subscription Plan →
              </Link>
              <button
                type="button"
                onClick={() => updateSubscriptionStatus('Active')}
                className="text-[11px] px-2 py-0.5 border border-stone-300 rounded bg-white text-stone-700"
              >
                (Demo: Enable Active Paid Status)
              </button>
            </div>
          </div>
        )}

        {/* Voting Polls List */}
        <div className="space-y-6">
          {votingPolls.map((poll) => {
            const hasVoted = Boolean(poll.userVotedOptionId);
            const isOpen = poll.status === 'Open';
            const selectedOpt = selectedOptions[poll.id] || poll.userVotedOptionId;
            const pollFeedback = feedback[poll.id];

            return (
              <div
                key={poll.id}
                className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6"
              >
                {/* Poll Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-[#163323]">{poll.category}</span>
                      <span>·</span>
                      <span className={isOpen ? 'text-[#4E7A5D] font-semibold' : 'text-stone-400'}>
                        {poll.status}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif font-bold text-stone-900">
                      {poll.title}
                    </h2>
                  </div>

                  <div className="text-xs text-stone-500 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Closes {new Date(poll.closesAt).toLocaleDateString()}
                    </span>
                    <span>·</span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      {poll.totalVotes} Verified Votes
                    </span>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed max-w-3xl">
                  {poll.description}
                </p>

                {pollFeedback && (
                  <div
                    className={`p-3 rounded text-xs border ${
                      pollFeedback.success
                        ? 'bg-[#EBF2EC] text-[#163323] border-[#163323]/20'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    {pollFeedback.message}
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-3">
                  {poll.options.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    const isVoted = poll.userVotedOptionId === opt.id;
                    const percent =
                      poll.totalVotes > 0
                        ? Math.round((opt.votes / poll.totalVotes) * 100)
                        : 0;

                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          if (isOpen && !hasVoted && isEligible) {
                            handleSelectOption(poll.id, opt.id);
                          }
                        }}
                        className={`p-4 rounded-lg border text-xs transition-colors ${
                          isVoted
                            ? 'border-[#163323] bg-[#EBF2EC]'
                            : isSelected
                            ? 'border-[#163323] bg-stone-50'
                            : 'border-stone-300 bg-white hover:bg-stone-50/70'
                        } ${!hasVoted && isOpen && isEligible ? 'cursor-pointer' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-stone-900 text-sm">
                                {opt.title}
                              </span>
                              {isVoted && (
                                <span className="text-[10px] font-bold text-[#163323] uppercase">
                                  (Your Recorded Vote)
                                </span>
                              )}
                            </div>
                            <p className="text-stone-600 leading-relaxed">{opt.description}</p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono font-bold text-sm text-stone-900 tabular-nums">
                              {percent}%
                            </span>
                            <span className="block text-[10px] text-stone-400 tabular-nums">
                              {opt.votes} votes
                            </span>
                          </div>
                        </div>

                        {/* Progress visual */}
                        <div className="w-full h-1.5 bg-stone-100 rounded-full mt-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isVoted ? 'bg-[#163323]' : 'bg-[#4E7A5D]'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Submit Ballot Action */}
                {isOpen && !hasVoted && (
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      Single-vote restriction enforced · Audit logging enabled
                    </span>
                    <button
                      type="button"
                      disabled={!selectedOpt || !isEligible}
                      onClick={() => handleCastVote(poll.id)}
                      className="px-5 py-2 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530] transition-colors disabled:opacity-40"
                    >
                      Cast Ballot
                    </button>
                  </div>
                )}

                {hasVoted && (
                  <div className="pt-2 text-xs text-[#163323] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Ballot recorded. Results will finalize at poll close.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};
