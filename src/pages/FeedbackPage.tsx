import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Award,
} from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { challenges, evaluations, submissions } = useApp();

  const challenge = challenges.find((c) => c.id === id);
  const evaluation = id ? evaluations[id] : null;
  const submission = id ? submissions[id] : null;

  if (!challenge || !evaluation) {
    return (
      <AppLayout pageTitle="Evaluation Pending">
        <div className="p-12 text-center bg-white border border-stone-300 rounded-lg max-w-lg mx-auto">
          <h2 className="font-serif font-bold text-lg text-stone-900">
            No Evaluation Recorded
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            You have not submitted an answer for this challenge yet. Open the workspace to compose and submit your solution.
          </p>
          <div className="mt-4">
            <Link
              to={id ? `/challenges/${id}` : '/challenges'}
              className="px-4 py-2 bg-[#163323] text-white rounded text-xs font-semibold"
            >
              Open Challenge Workspace
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Next challenge in library
  const currentIndex = challenges.findIndex((c) => c.id === id);
  const nextChallenge = challenges[(currentIndex + 1) % challenges.length];

  return (
    <AppLayout pageTitle={`AI Evaluation · ${challenge.title}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Summary Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <Link to="/challenges" className="hover:underline">Challenges</Link>
              <span>/</span>
              <Link to={`/challenges/${challenge.id}`} className="hover:underline">{challenge.title}</Link>
              <span>/</span>
              <span className="font-semibold text-[#163323]">AI Evaluation Report</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Reasoning Evaluation & Rubric Breakdown
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Evaluated on {new Date(evaluation.evaluationDate).toLocaleString()} · Demo feedback mode active
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={`/challenges/${challenge.id}`}
              className="px-4 py-2 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Revise & Try Again</span>
            </Link>
            <Link
              to={`/challenges/${nextChallenge.id}`}
              className="px-4 py-2 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530] flex items-center gap-1.5"
            >
              <span>Next Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Overall Score & Tier Anchor */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider block">
              Cumulative Weighted Score
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl md:text-5xl font-serif font-bold text-[#163323] tabular-nums">
                {evaluation.overallScore}
              </span>
              <span className="text-stone-400 text-lg">/ 100</span>
              <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider ml-2">
                {evaluation.overallScore >= 90
                  ? 'Exemplary Deduction'
                  : evaluation.overallScore >= 80
                  ? 'Proficient Reasoning'
                  : 'Developing Analysis'}
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-2 max-w-xl">
              Calculated across 8 distinct criteria without reliance on superficial keyword matches.
            </p>
          </div>

          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-stone-200 pt-4 md:pt-0 md:pl-6 text-xs text-stone-600">
            <div>
              <span className="text-stone-400 block text-[11px] uppercase">XP Awarded</span>
              <span className="font-bold text-stone-900 text-base tabular-nums">
                +{challenge.xpReward} XP
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] uppercase">Word Count</span>
              <span className="font-bold text-stone-900 text-base tabular-nums font-mono">
                {submission ? submission.wordCount : 180}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block text-[11px] uppercase">Visual Canvas</span>
              <span className="font-bold text-stone-900 text-base">
                {submission && submission.canvasData ? 'Mapped' : 'Text-Only'}
              </span>
            </div>
          </div>
        </div>

        {/* 8 Criterion-Level Feedback Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Criterion-Level Assessment (8 Dimensions)
            </h2>
            <span className="text-xs text-stone-500">Weighted Matrix</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluation.criteria.map((c) => (
              <div
                key={c.name}
                className="bg-white border border-stone-300 rounded-lg p-5 space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-stone-900 text-sm">
                    {c.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 text-[11px]">Weight {c.weight}%</span>
                    <span>·</span>
                    <span className="font-bold text-[#163323] tabular-nums font-mono text-sm">
                      {c.score}%
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      c.score >= 90
                        ? 'bg-[#163323]'
                        : c.score >= 80
                        ? 'bg-[#4E7A5D]'
                        : 'bg-[#997A3D]'
                    }`}
                    style={{ width: `${c.score}%` }}
                  />
                </div>

                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {c.critique}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Areas for Improvement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-3">
            <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#163323]" />
              <span>Key Analytical Strengths</span>
            </h3>
            <ul className="text-xs text-stone-700 space-y-2 list-disc pl-5">
              {evaluation.strengths.map((str, i) => (
                <li key={i} className="leading-relaxed">
                  {str}
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-3">
            <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#997A3D]" />
              <span>Areas for Improvement & Blind Spots</span>
            </h3>
            <ul className="text-xs text-stone-700 space-y-2 list-disc pl-5">
              {evaluation.areasForImprovement.map((area, i) => (
                <li key={i} className="leading-relaxed">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specific Suggestions & Uncovered Assumptions */}
        <div className="bg-[#FAF8F5] border border-stone-300 rounded-lg p-6 space-y-4">
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Critical Assumptions Identified in Your Reasoning
          </h3>
          <p className="text-xs text-stone-600">
            Unconscious premises can introduce catastrophic systemic failures when conditions deviate:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-stone-700">
            {evaluation.assumptionsIdentified.map((assump, i) => (
              <div key={i} className="p-3 bg-white rounded border border-stone-200">
                · {assump}
              </div>
            ))}
          </div>
        </div>

        {/* Socratic Follow-Up Questions */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-3">
          <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#4E7A5D]" />
            <span>Socratic Follow-Up Scenarios</span>
          </h3>
          <p className="text-xs text-stone-600">
            Stress-test your decision model against these adversarial counter-factuals:
          </p>
          <div className="space-y-2 text-xs text-stone-700">
            {evaluation.followUpQuestions.map((q, i) => (
              <div key={i} className="p-3 bg-stone-50 rounded border border-stone-200 leading-relaxed">
                <strong>Q{i + 1}:</strong> {q}
              </div>
            ))}
          </div>
        </div>

        {/* Benchmark Improved Reasoning Model */}
        <div className="bg-white border border-stone-300 rounded-lg p-6 space-y-3">
          <span className="text-xs font-bold text-[#997A3D] uppercase tracking-wider block">
            Exemplar Synthesis Benchmark
          </span>
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Systemic Benchmark Model
          </h3>
          <div className="text-xs text-stone-800 leading-relaxed p-4 bg-[#FAF8F5] rounded border border-stone-200 font-mono text-[13px]">
            {evaluation.improvedReasoningModel}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex items-center justify-between">
          <Link
            to="/challenges"
            className="text-xs font-semibold text-stone-600 hover:text-stone-900"
          >
            ← Back to Challenge Library
          </Link>
          <Link
            to={`/challenges/${nextChallenge.id}`}
            className="px-6 py-2.5 bg-[#163323] text-white rounded font-semibold text-xs hover:bg-[#1f4530]"
          >
            Advance to Next Problem →
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};
