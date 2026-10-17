import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import {
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Award,
  RefreshCw,
  XCircle,
} from 'lucide-react';

export const SubscriptionPage: React.FC = () => {
  const { currentUser, updateSubscriptionStatus } = useApp();
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const sub = currentUser.subscription;

  const handleCancel = () => {
    updateSubscriptionStatus('Cancelled');
    setFeedbackMsg('Subscription scheduled for cancellation at the conclusion of current billing cycle.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleReactivate = () => {
    updateSubscriptionStatus('Active');
    setFeedbackMsg('Membership reactivated successfully.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const sampleBillingHistory = [
    {
      id: 'inv-oct-2026',
      date: '2026-10-01',
      description: 'First Month Free Trial Period',
      amount: '$0.00',
      status: 'Paid',
    },
    {
      id: 'inv-sep-2026',
      date: '2026-09-01',
      description: 'Monthly Top-10 Performer Credit (Admin Grant)',
      amount: '$0.00',
      status: 'Complimentary Credit',
    },
  ];

  return (
    <AppLayout pageTitle="Subscription & Performance Rewards">
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="pb-6 border-b border-stone-300">
          <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
            Membership & Compensation
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
            Subscription & Monthly Rewards
          </h1>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            MindForge offers transparent pricing with first-month trial access and merit-based complimentary rewards for top monthly leaderboard performers.
          </p>
        </div>

        {feedbackMsg && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] border border-[#163323]/20 rounded text-xs">
            {feedbackMsg}
          </div>
        )}

        {/* Demo Mode Notice Banner */}
        <div className="p-4 bg-[#FAF8F5] border border-stone-300 rounded-lg text-xs text-stone-700 space-y-1">
          <span className="font-semibold text-stone-900 block">Demonstration Billing Mode:</span>
          <p className="leading-relaxed">
            Payment gateway integrations (e.g. Stripe/LemonSqueezy) will be connected during production deployment. No actual credit card transactions or raw payment details are processed on this frontend prototype.
          </p>
        </div>

        {/* Active Membership Status Card */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider block">
                Current Plan
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                {sub.planName}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Status:
              </span>
              <span
                className={`px-3 py-1 rounded text-xs font-semibold border ${
                  sub.status === 'Trial'
                    ? 'bg-[#FDFBF7] text-[#997A3D] border-[#997A3D]/40'
                    : sub.status === 'Active'
                    ? 'bg-[#EBF2EC] text-[#163323] border-[#163323]/30'
                    : sub.status === 'Cancelled'
                    ? 'bg-stone-100 text-stone-700 border-stone-300'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {sub.status}
              </span>
            </div>
          </div>

          {/* Plan Breakdown Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-stone-500 block uppercase text-[10px]">Standard Rate</span>
              <span className="text-xl font-serif font-bold text-stone-900 mt-1 block tabular-nums">
                ${sub.monthlyPrice} / month
              </span>
              <span className="text-stone-400 text-[11px]">Set by platform administration</span>
            </div>

            <div>
              <span className="text-stone-500 block uppercase text-[10px]">Trial Period Concludes</span>
              <span className="text-sm font-semibold text-stone-900 mt-1 block">
                {new Date(sub.trialEndsAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="text-[#4E7A5D] text-[11px]">First month free for eligible users</span>
            </div>

            <div>
              <span className="text-stone-500 block uppercase text-[10px]">Next Scheduled Renewal</span>
              <span className="text-sm font-semibold text-stone-900 mt-1 block">
                {new Date(sub.renewsAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="text-stone-500 text-[11px]">Billed to payment method on file</span>
            </div>
          </div>

          {/* State Switcher for prototype testing */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Test UI Status:</span>
              {(['Trial', 'Active', 'Cancelled', 'Payment Failed'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => updateSubscriptionStatus(st)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-colors ${
                    sub.status === st
                      ? 'bg-[#163323] text-white border-[#163323]'
                      : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {sub.status === 'Cancelled' ? (
                <button
                  type="button"
                  onClick={handleReactivate}
                  className="px-4 py-2 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530]"
                >
                  Reactivate Membership
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancel Auto-Renew
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Rewards & Merit Credit Panel */}
        <div className="bg-[#FAF8F5] border border-stone-300 rounded-lg p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#163323] uppercase tracking-wider">
              Merit-Based Rewards Protocol
            </span>
            <span className="text-xs text-[#163323] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Eligible
            </span>
          </div>

          <h3 className="text-lg font-serif font-bold text-stone-900">
            Complimentary Membership for Monthly Top Performers
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed max-w-2xl">
            Members who rank in the top 10 on the global monthly leaderboard at the close of each calendar cycle are awarded a complimentary one-month membership credit. This grant is audited and applied by platform administrators.
          </p>

          <div className="p-4 bg-white rounded border border-stone-200 text-xs text-stone-700 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-stone-900">Your Eligibility Status:</span>
              <span className="font-bold text-[#163323]">Rank #6 Monthly (Top 10 Tier)</span>
            </div>
            <div>· Qualification Deadline: October 31, 2026, 23:59 UTC</div>
            <div>· Expected Credit: 1 Month Free Subscription Extension ($19 value)</div>
          </div>
        </div>

        {/* Billing History Table */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-4">
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Billing History & Transactions
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 uppercase text-[10px] font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Invoice ID</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {sampleBillingHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4 font-mono text-stone-600">{item.id}</td>
                    <td className="py-3 px-4 text-stone-700">{item.date}</td>
                    <td className="py-3 px-4 text-stone-900 font-medium">{item.description}</td>
                    <td className="py-3 px-4 text-right font-mono text-stone-800">{item.amount}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[#163323] font-semibold">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
