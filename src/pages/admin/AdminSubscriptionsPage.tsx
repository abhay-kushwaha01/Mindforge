import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { CreditCard, Award, Save, CheckCircle2, History } from 'lucide-react';

export const AdminSubscriptionsPage: React.FC = () => {
  const { currentUser, adminUpdatePrice, adminGrantMonthlyReward, adminAuditLogs } = useApp();

  const [priceInput, setPriceInput] = useState(currentUser.subscription.monthlyPrice);
  const [trialDaysInput, setTrialDaysInput] = useState(30);
  const [rewardRecipient, setRewardRecipient] = useState('usr_sarah_chen');
  const [rewardMonths, setRewardMonths] = useState(1);
  const [feedback, setFeedback] = useState('');

  const handleUpdatePrice = (e: React.FormEvent) => {
    e.preventDefault();
    adminUpdatePrice(priceInput);
    setFeedback(`Platform monthly subscription rate updated to $${priceInput}/mo.`);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleGrantReward = (e: React.FormEvent) => {
    e.preventDefault();
    adminGrantMonthlyReward(rewardRecipient, rewardMonths);
    setFeedback(`Granted ${rewardMonths} month(s) complimentary subscription to ${rewardRecipient}.`);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <AppLayout pageTitle="Billing & Merit Rewards Administration">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="pb-6 border-b border-stone-300">
          <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider">
            Administration · Financial & Merit Policy
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
            Subscription Pricing & Performance Rewards
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Configure platform rate schedules, trial windows, and disburse complimentary membership rewards to top monthly scholars.
          </p>
        </div>

        {feedback && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] rounded border border-[#163323]/20 text-xs">
            {feedback}
          </div>
        )}

        {/* Pricing Configuration Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#163323]" />
              <span>Base Platform Pricing</span>
            </h2>

            <form onSubmit={handleUpdatePrice} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Monthly Subscription Fee (USD)
                </label>
                <input
                  type="number"
                  value={priceInput}
                  onChange={(e) => setPriceInput(Number(e.target.value))}
                  min={5}
                  max={99}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono font-bold"
                />
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Takes effect for new subscribers and upcoming billing cycles.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  New Member Free Trial Window (Days)
                </label>
                <input
                  type="number"
                  value={trialDaysInput}
                  onChange={(e) => setTrialDaysInput(Number(e.target.value))}
                  min={7}
                  max={60}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono font-bold"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#163323] text-white rounded font-semibold hover:bg-[#1f4530] transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Pricing Schedule</span>
                </button>
              </div>
            </form>
          </div>

          {/* Reward Disbursal Console */}
          <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#997A3D]" />
              <span>Grant Top-Performer Membership Credit</span>
            </h2>

            <form onSubmit={handleGrantReward} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Eligible Scholar Identifier
                </label>
                <select
                  value={rewardRecipient}
                  onChange={(e) => setRewardRecipient(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900"
                >
                  <option value="usr_sarah_chen">Sarah Chen (Rank #6 Monthly · 3,840 XP)</option>
                  <option value="usr-elena">Elena Rostova (Rank #1 Monthly · 7,280 XP)</option>
                  <option value="usr-kaito">Kaito Tanaka (Rank #2 Monthly · 6,840 XP)</option>
                  <option value="usr-marcus">Marcus Vance (Rank #4 Monthly · 5,910 XP)</option>
                </select>
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Top 10 monthly qualifiers automatically surfaced from verified rubric tallies.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Complimentary Extension Duration (Months)
                </label>
                <select
                  value={rewardMonths}
                  onChange={(e) => setRewardMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900"
                >
                  <option value={1}>1 Month Extension (Standard Monthly Prize)</option>
                  <option value={3}>3 Months Extension (Quarterly Champion)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#997A3D] text-white rounded font-semibold hover:bg-[#80642f] transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Disburse Verified Reward Credit</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Reward Audit Trail */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Reward & Pricing Audit History
            </h3>
            <span className="text-xs text-stone-500 font-mono">Real-Time Ledger</span>
          </div>

          <div className="divide-y divide-stone-200 text-xs">
            {adminAuditLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="font-mono font-bold text-stone-900 text-[11px]">
                    {log.action}
                  </span>
                  <p className="text-stone-600">{log.details}</p>
                </div>
                <span className="font-mono text-stone-400 text-[11px] shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
