import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import { VisualThinkingCanvas } from '../components/canvas/VisualThinkingCanvas';
import {
  HelpCircle,
  AlertCircle,
  Save,
  Send,
  Eye,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ChallengeWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { challenges, drafts, saveDraft, submissions, submitChallengeAnswer } = useApp();

  const challenge = challenges.find((c) => c.id === id);

  const [solutionText, setSolutionText] = useState('');
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasData, setCanvasData] = useState<{ nodes: any[]; connections: any[] } | undefined>(
    undefined
  );
  const [showHints, setShowHints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveDraftFeedback, setSaveDraftFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load existing draft or submission
  useEffect(() => {
    if (id) {
      if (submissions[id]) {
        setSolutionText(submissions[id].solutionText);
        if (submissions[id].canvasData) {
          setCanvasData(submissions[id].canvasData);
          setShowCanvas(true);
        }
      } else if (drafts[id]) {
        setSolutionText(drafts[id].text);
        if (drafts[id].nodes) {
          setCanvasData({
            nodes: drafts[id].nodes || [],
            connections: drafts[id].connections || [],
          });
          setShowCanvas(true);
        }
      } else if (challenge && challenge.id === 'ch-daily-hospital-power') {
        // Pre-fill a thoughtful starting structure for the daily challenge so the user can easily test
        setSolutionText(
          `1. Dynamic Power Distribution Schema:
- Surgical ICU: Maintain 190 kW uninterrupted. All 14 ventilator patients remain fully powered.
- Airborne Negative-Pressure Ward: Duty-cycle exhaust blowers at 65% power (104 kW) with automated differential pressure sensor monitoring to maintain negative pressure within safe biological containment parameters.
- NICU Incubators: Allocate 180 kW steady-state while duty-cycling thermal warming coils; utilize 30-minute built-in battery thermal inertia buffers during any transient spikes.
Total Allocated Steady-State = 190 + 104 + 180 = 474 kW (below 480 kW trip boundary by 6 kW safety margin).

2. Transients & Diagnostic Spikes:
- Place diagnostic CT and automated pharmacy dispensaries on an immediate manual shed protocol. Diagnostic scans must be delayed unless life-or-death surgical indications exist, with emergency load shedding if current exceeds 475 kW.

3. Secondary Bottlenecks & Staffing:
- We have only 7 floor nurses available, so manual bag-valve ventilation for all 14 ICU patients is physically impossible without catastrophic hypoxia. Ventilator power is non-negotiable.

4. Generator B Complete Failure Contingency (Supply drops to 320 kW):
- Immediately transition NICU to 30-minute internal battery reserves.
- Relocate stable ICU patients to neighboring medical facilities with mobile ambulance transport.`
        );
      }
    }
  }, [id, submissions, drafts, challenge]);

  if (!challenge) {
    return (
      <AppLayout pageTitle="Challenge Not Found">
        <div className="p-12 text-center bg-white border border-stone-300 rounded-lg max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-rose-700 mx-auto mb-3" />
          <h2 className="font-serif font-bold text-lg text-stone-900">Problem Not Found</h2>
          <p className="text-xs text-stone-600 mt-1">
            The requested challenge identifier does not exist in the curriculum archive.
          </p>
          <Link
            to="/challenges"
            className="mt-4 inline-block px-4 py-2 bg-[#163323] text-white rounded text-xs font-semibold"
          >
            Return to Challenge Library
          </Link>
        </div>
      </AppLayout>
    );
  }

  const wordCount = solutionText.trim().split(/\s+/).filter(Boolean).length;
  const isAlreadySubmitted = challenge.status === 'Completed' || Boolean(submissions[challenge.id]);

  const handleSaveDraft = () => {
    if (!id) return;
    saveDraft(id, solutionText, canvasData);
    setSaveDraftFeedback('Draft saved locally.');
    setTimeout(() => setSaveDraftFeedback(''), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (wordCount < 15) {
      setErrorMessage('Please provide a substantive answer with at least 15 words explaining your reasoning.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Call submit handler in AppContext
    setTimeout(() => {
      submitChallengeAnswer(id, solutionText, canvasData);
      setIsSubmitting(false);
      navigate(`/feedback/${id}`);
    }, 700);
  };

  return (
    <AppLayout pageTitle={`Workspace · ${challenge.category}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Workspace Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <Link to="/challenges" className="hover:underline">
                Challenges
              </Link>
              <span>/</span>
              <span className="font-semibold text-[#163323]">{challenge.category}</span>
              <span>/</span>
              <span>{challenge.difficulty}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {challenge.title}
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-600">
            <span className="tabular-nums">Est. {challenge.estimatedMinutes} min</span>
            <span>·</span>
            <span className="font-bold text-[#163323] tabular-nums">+{challenge.xpReward} XP</span>
            {isAlreadySubmitted && (
              <Link
                to={`/feedback/${challenge.id}`}
                className="px-3 py-1.5 bg-[#163323] text-white rounded font-semibold text-xs hover:bg-[#1f4530]"
              >
                View Existing Feedback →
              </Link>
            )}
          </div>
        </div>

        {/* Problem Specification & Constraints Panel */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider block mb-1">
              Problem Statement
            </span>
            <div className="text-sm text-stone-800 leading-relaxed whitespace-pre-line font-serif">
              {challenge.problemStatement}
            </div>
          </div>

          {challenge.backgroundContext && (
            <div className="p-4 bg-[#FAF8F5] rounded border border-stone-200 text-xs text-stone-700 space-y-1">
              <span className="font-semibold block text-stone-900">Systemic Background:</span>
              <p className="leading-relaxed">{challenge.backgroundContext}</p>
            </div>
          )}

          {/* Rules, Constraints, and Success Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-stone-200">
            <div>
              <h3 className="font-serif font-semibold text-stone-900 text-sm mb-2">
                Mandatory Constraints & Boundary Limits
              </h3>
              <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-5">
                {challenge.rulesAndConstraints.map((rule, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-stone-900 text-sm mb-2">
                Expected Success Criteria
              </h3>
              <ul className="text-xs text-stone-700 space-y-1.5 list-disc pl-5">
                {challenge.successCriteria.map((crit, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {crit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Hints Dropdown */}
          {challenge.hints && challenge.hints.length > 0 && (
            <div className="pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-xs font-semibold text-[#997A3D] hover:text-[#80642f]"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHints ? 'Hide Architectural Hints' : 'Reveal Optional Architectural Hints'}</span>
                {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showHints && (
                <div className="mt-3 p-4 bg-[#FDFBF7] border border-[#997A3D]/30 rounded text-xs text-stone-700 space-y-2">
                  {challenge.hints.map((hint, idx) => (
                    <div key={idx} className="leading-relaxed">
                      · {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Answer Submission & Canvas Workspace */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Solution Formulation
              </h2>
              <p className="text-xs text-stone-500">
                Articulate your reasoning clearly. Explain trade-offs, identify dependencies, and formulate contingencies.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowCanvas(!showCanvas)}
                className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                  showCanvas
                    ? 'bg-[#163323] text-white border-[#163323]'
                    : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                }`}
              >
                {showCanvas ? 'Hide Visual Canvas' : '+ Open Optional Visual Thinking Canvas'}
              </button>
            </div>
          </div>

          {/* Optional Visual Thinking Canvas */}
          {showCanvas && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span className="font-semibold text-stone-800">
                  Visual Logic & Causal Dependencies (Optional Sandbox)
                </span>
                <span>Connect premises to conclusions to clarify system flow</span>
              </div>
              <VisualThinkingCanvas
                initialNodes={canvasData?.nodes}
                initialConnections={canvasData?.connections}
                onChange={(data) => setCanvasData(data)}
              />
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
              {errorMessage}
            </div>
          )}

          {/* Text Editor */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs text-stone-600">
                <label className="font-semibold text-stone-800">
                  Primary Text Reasoning & Deductive Proof
                </label>
                <div className="flex items-center gap-2">
                  <span className="tabular-nums font-mono text-stone-700">
                    {wordCount} words
                  </span>
                  <span>·</span>
                  <span className="text-stone-400">Target: 100–300 words</span>
                </div>
              </div>

              <textarea
                rows={12}
                value={solutionText}
                onChange={(e) => setSolutionText(e.target.value)}
                placeholder="Write your step-by-step reasoning here. Explicitly address power allocations, duty-cycling, staffing constraints, and failure contingencies..."
                className="w-full p-4 bg-stone-50 border border-stone-300 rounded font-sans text-xs sm:text-sm text-stone-900 leading-relaxed focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2 bg-stone-100 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-200 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Draft</span>
                </button>
                {saveDraftFeedback && (
                  <span className="text-xs text-[#163323] font-medium">
                    {saveDraftFeedback}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#163323] text-white font-semibold rounded text-xs hover:bg-[#1f4530] transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Evaluating Solution...' : 'Submit Answer for AI Rubric Evaluation'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};
