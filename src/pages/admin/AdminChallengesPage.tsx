import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { Challenge, ChallengeCategory, ChallengeDifficulty } from '../../types';
import { Plus, Edit3, Trash2, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

const CATEGORIES: ChallengeCategory[] = [
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

const DIFFICULTIES: ChallengeDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const AdminChallengesPage: React.FC = () => {
  const { challenges, adminCreateChallenge, adminUpdateChallenge } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ChallengeCategory>('Analytical Thinking');
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>('Intermediate');
  const [estimatedMinutes, setEstimatedMinutes] = useState(25);
  const [xpReward, setXpReward] = useState(200);
  const [problemStatement, setProblemStatement] = useState('');
  const [rules, setRules] = useState('');
  const [successCriteria, setSuccessCriteria] = useState('');
  const [hints, setHints] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const resetForm = () => {
    setTitle('');
    setCategory('Analytical Thinking');
    setDifficulty('Intermediate');
    setEstimatedMinutes(25);
    setXpReward(200);
    setProblemStatement('');
    setRules('');
    setSuccessCriteria('');
    setHints('');
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !problemStatement) {
      alert('Title and problem statement are required.');
      return;
    }

    const rulesArray = rules
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);
    const criteriaArray = successCriteria
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);
    const hintsArray = hints
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    if (editingId) {
      adminUpdateChallenge(editingId, {
        title,
        category,
        difficulty,
        estimatedMinutes,
        xpReward,
        problemStatement,
        rulesAndConstraints: rulesArray.length > 0 ? rulesArray : ['Respect system conservation laws.'],
        successCriteria: criteriaArray.length > 0 ? criteriaArray : ['Clear deductive proof.'],
        hints: hintsArray,
      });
      setStatusMessage(`Challenge "${title}" updated successfully.`);
    } else {
      adminCreateChallenge({
        title,
        category,
        difficulty,
        estimatedMinutes,
        xpReward,
        problemStatement,
        rulesAndConstraints: rulesArray.length > 0 ? rulesArray : ['Respect system conservation laws.'],
        successCriteria: criteriaArray.length > 0 ? criteriaArray : ['Clear deductive proof.'],
        hints: hintsArray,
      });
      setStatusMessage(`New challenge "${title}" published to curriculum.`);
    }

    resetForm();
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleEditClick = (c: Challenge) => {
    setEditingId(c.id);
    setTitle(c.title);
    setCategory(c.category);
    setDifficulty(c.difficulty);
    setEstimatedMinutes(c.estimatedMinutes);
    setXpReward(c.xpReward);
    setProblemStatement(c.problemStatement);
    setRules(c.rulesAndConstraints.join('\n'));
    setSuccessCriteria(c.successCriteria.join('\n'));
    setHints(c.hints.join('\n'));
    setIsCreating(true);
  };

  return (
    <AppLayout pageTitle="Curriculum Management">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider">
              Administration · Challenge Operations
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              Curriculum & Scenario Publishing
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Author new cognitive scenarios, configure rubric constraints, and schedule daily problems.
            </p>
          </div>

          {!isCreating && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                setIsCreating(true);
              }}
              className="px-4 py-2 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530] transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Scenario</span>
            </button>
          )}
        </div>

        {statusMessage && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] rounded border border-[#163323]/20 text-xs">
            {statusMessage}
          </div>
        )}

        {/* Creation / Edit Form Modal or Inline Panel */}
        {isCreating && (
          <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {editingId ? 'Edit Challenge Scenario' : 'Author New Problem Scenario'}
              </h2>
              <button
                type="button"
                onClick={resetForm}
                className="text-xs text-stone-500 hover:text-stone-800"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Challenge Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Desalination Energy Trade-off"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category Domain
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Difficulty Tier
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                  >
                    {DIFFICULTIES.map((diff) => (
                      <option key={diff} value={diff}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Estimated Time (min)
                  </label>
                  <input
                    type="number"
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                    min={5}
                    max={90}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    XP Reward Value
                  </label>
                  <input
                    type="number"
                    value={xpReward}
                    onChange={(e) => setXpReward(Number(e.target.value))}
                    min={50}
                    max={500}
                    step={10}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Problem Statement & Scenario Context
                </label>
                <textarea
                  rows={5}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="Detail the dilemma, baseline parameters, and core conflict..."
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mandatory Constraints (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    placeholder="Constraint 1\nConstraint 2"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Success Criteria (1 per line)
                  </label>
                  <textarea
                    rows={4}
                    value={successCriteria}
                    onChange={(e) => setSuccessCriteria(e.target.value)}
                    placeholder="Criterion 1\nCriterion 2"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Optional Architectural Hints (1 per line)
                </label>
                <textarea
                  rows={2}
                  value={hints}
                  onChange={(e) => setHints(e.target.value)}
                  placeholder="Hint 1\nHint 2"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530]"
                >
                  {editingId ? 'Save Updates' : 'Publish to Curriculum'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Existing Challenges Table */}
        <div className="bg-white border border-stone-300 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-stone-300 text-stone-600 uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Problem Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4 text-center">XP</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {challenges.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4 font-serif font-bold text-stone-900 max-w-xs truncate">
                      {c.title}
                    </td>
                    <td className="py-3 px-4 text-stone-700">{c.category}</td>
                    <td className="py-3 px-4 text-stone-700">{c.difficulty}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#163323] tabular-nums">
                      {c.xpReward}
                    </td>
                    <td className="py-3 px-4">
                      {c.isDailyChallenge ? (
                        <span className="text-[10px] font-bold text-[#997A3D] uppercase">
                          Daily Featured
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-600">Standard</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleEditClick(c)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-stone-700 hover:text-stone-900 border border-stone-300 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          adminUpdateChallenge(c.id, {
                            isDailyChallenge: !c.isDailyChallenge,
                          });
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#163323] hover:underline"
                      >
                        {c.isDailyChallenge ? 'Unset Daily' : 'Make Daily'}
                      </button>
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
