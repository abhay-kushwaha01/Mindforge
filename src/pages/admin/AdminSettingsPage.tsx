import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { Settings, Save, ShieldAlert, Cpu } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { adminAuditLogs } = useApp();

  const [gracePeriodHours, setGracePeriodHours] = useState(6);
  const [minWordCount, setMinWordCount] = useState(15);
  const [maxSubmissionsPerHour, setMaxSubmissionsPerHour] = useState(5);
  const [aiEvaluationModel, setAiEvaluationModel] = useState('Gemini 2.5 Flash (Production Alias)');
  const [feedback, setFeedback] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('Platform administrative parameters successfully updated.');
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <AppLayout pageTitle="Platform Architecture & Configuration">
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="pb-6 border-b border-stone-300">
          <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider">
            Administration · Global Parameters
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
            Platform Engine Configuration
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Govern automated anti-spam thresholds, streak grace windows, and AI evaluation pipeline aliases.
          </p>
        </div>

        {feedback && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] rounded border border-[#163323]/20 text-xs">
            {feedback}
          </div>
        )}

        {/* Global Settings Form */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3">
            Anti-Spam & Submission Boundaries
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Daily Streak Grace Window (Hours)
                </label>
                <input
                  type="number"
                  value={gracePeriodHours}
                  onChange={(e) => setGracePeriodHours(Number(e.target.value))}
                  min={0}
                  max={24}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono font-bold"
                />
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Buffer period allowing members across disparate timezones to preserve active streaks.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Minimum Submission Word Count
                </label>
                <input
                  type="number"
                  value={minWordCount}
                  onChange={(e) => setMinWordCount(Number(e.target.value))}
                  min={10}
                  max={100}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono font-bold"
                />
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Prevents single-word answers from consuming automated grading tokens.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Rate Limit (Max Submissions/Hour)
                </label>
                <input
                  type="number"
                  value={maxSubmissionsPerHour}
                  onChange={(e) => setMaxSubmissionsPerHour(Number(e.target.value))}
                  min={1}
                  max={20}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-mono font-bold"
                />
                <span className="text-stone-400 text-[11px] mt-1 block">
                  Protects evaluation queue from automated script spam.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block font-semibold text-stone-700 mb-1">
                Evaluation Backend Engine Tier
              </label>
              <select
                value={aiEvaluationModel}
                onChange={(e) => setAiEvaluationModel(e.target.value)}
                className="w-full max-w-md px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900 font-medium"
              >
                <option value="Gemini 2.5 Flash (Production Alias)">
                  Gemini 2.5 Flash (Production Alias - Low Latency, High Analytical Precision)
                </option>
                <option value="Gemini 2.5 Pro (Deep Research Synthesis)">
                  Gemini 2.5 Pro (Deep Research Synthesis)
                </option>
              </select>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#163323] text-white rounded font-semibold hover:bg-[#1f4530] transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Architecture Parameters</span>
              </button>
            </div>
          </form>
        </div>

        {/* Audit Log Stream */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-3">
            Configuration Change Log
          </h2>
          <div className="divide-y divide-stone-200 text-xs">
            {adminAuditLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between text-stone-600">
                <div>
                  <span className="font-mono font-bold text-stone-900 mr-2">{log.action}:</span>
                  <span>{log.details}</span>
                </div>
                <span className="font-mono text-stone-400 text-[11px] shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
