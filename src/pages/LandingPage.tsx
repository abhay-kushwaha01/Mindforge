import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import {
  ArrowRight,
  Brain,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  GitFork,
  Award,
  Trophy,
  Flame,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activePreviewTab, setActivePreviewTab] = useState<'prompt' | 'solution' | 'evaluation'>('evaluation');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does MindForge differ from standard puzzle or trivia apps?',
      a: 'MindForge focuses on high-order cognitive synthesis rather than rote recall or multiple-choice trivia. Every daily challenge presents authentic engineering, logical, policy, or systemic dilemmas where you write out your deductive reasoning and uncover hidden assumptions.',
    },
    {
      q: 'How does the AI evaluation work?',
      a: 'Your submitted reasoning is evaluated against an 8-dimension rubric: correctness, logical validity, recognition of assumptions and trade-offs, practical feasibility, constraint compliance, clarity, creativity, and relevance. It provides constructive critiques, counter-scenarios, and an improved reasoning model.',
    },
    {
      q: 'How does the subscription and free trial operate?',
      a: 'New members receive their first month free to build a daily thinking habit. The platform subscription begins in month two at the administrator-configured rate. Additionally, top monthly performers on the leaderboard earn complimentary membership credits.',
    },
    {
      q: 'Do I have to draw diagrams or use the visual canvas?',
      a: 'No. The visual thinking canvas is completely optional. You can submit rigorous text-only reasoning, or use the node canvas to map premises, assumptions, and causal dependencies if you think visually.',
    },
    {
      q: 'Does MindForge claim to scientifically measure IQ?',
      a: 'No. MindForge measures reasoning consistency, problem-solving depth, and rubric adherence on deliberate intellectual exercises. We separate gamified XP and scores from any claims of scientific psychometric testing.',
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Cognitive Mastery · Deliberate Practice
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#163323] leading-[1.1] text-balance">
              Forge a Sharper Mind.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-stone-700 leading-relaxed max-w-2xl">
              Build stronger reasoning, challenge your assumptions, and solve real-world problems one day at a time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#163323] rounded-md hover:bg-[#1f4530] transition-colors inline-flex items-center gap-2"
              >
                <span>Start Thinking</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/challenges"
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 bg-[#EAE6DE] rounded-md hover:bg-[#ded9cf] transition-colors"
              >
                Explore Challenges
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-stone-600">
              <span>First Month Free for Eligible Members</span>
              <span>·</span>
              <span>Daily AI-Powered Rubric Feedback</span>
              <span>·</span>
              <span>10 Cognitive Domains</span>
            </div>
          </div>

          {/* Interactive Product Preview (Resembles actual application, not decorative slop) */}
          <div className="mt-14 border border-stone-300 rounded-lg bg-stone-100 shadow-sm overflow-hidden">
            {/* Preview Window Header */}
            <div className="px-6 py-3.5 bg-[#EDE9E1] border-b border-stone-300 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                <span className="text-xs font-semibold text-stone-800">
                  MindForge Workspace Preview · Challenge 492
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-xs text-stone-600">Spot the Flaw</span>
              </div>

              {/* Segmented controls for preview states */}
              <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-md text-xs">
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('prompt')}
                  className={`px-3 py-1 font-medium rounded transition-colors ${
                    activePreviewTab === 'prompt'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Problem Prompt
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('solution')}
                  className={`px-3 py-1 font-medium rounded transition-colors ${
                    activePreviewTab === 'solution'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Member Solution
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('evaluation')}
                  className={`px-3 py-1 font-medium rounded transition-colors ${
                    activePreviewTab === 'evaluation'
                      ? 'bg-[#163323] text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  AI Rubric Feedback
                </button>
              </div>
            </div>

            {/* Preview Window Content */}
            <div className="p-6 md:p-8 bg-[#FAF8F5]">
              {activePreviewTab === 'prompt' && (
                <div className="space-y-4">
                  <div className="text-xs text-stone-500">Published Oct 8 · 180 XP · Estimated 20 min</div>
                  <h3 className="text-xl font-serif font-bold text-[#163323]">
                    The Cargo Ship Energy Paradox: Rotor Sail Telemetry
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    A maritime startup claims a 26.4% net fuel reduction on a 50,000 DWT carrier equipped with four Flettner rotor sails. During sea trials, rotor drives drew 180 kW electrical power while providing measured forward thrust equivalent to 1,420 kW of main engine shaft output. They concluded a net power gain of 1,240 kW. What critical thermodynamic and hydrodynamic flaws invalidate this calculation?
                  </p>
                  <div className="p-4 bg-stone-100 rounded border border-stone-200 text-xs text-stone-700 space-y-1">
                    <span className="font-semibold block text-stone-900">Key Constraints:</span>
                    <div>· Account for leeway drift angle and induced rudder resistance.</div>
                    <div>· Assess auxiliary diesel generator efficiency (SFOC) powering the 180 kW rotor drives.</div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'solution' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200">
                    <span>Submitted by Sarah Chen · Word Count: 218</span>
                    <span className="font-mono text-stone-700">Verified Submission</span>
                  </div>
                  <p className="text-sm text-stone-800 leading-relaxed font-mono text-[13px] bg-white p-4 rounded border border-stone-300">
                    "The startup’s calculation commits two fundamental errors: First, the 180 kW electrical draw is derived from auxiliary diesel gensets operating at ~36% brake thermal efficiency. The true primary fuel input consumed to spin the rotors is approximately 500 kW, not 180 kW. Second, aerodynamic lift perpendicular to apparent wind introduces a substantial lateral heel and leeway angle (β). To maintain heading, the vessel must apply counter-rudder, increasing hydrodynamic drag by 8-12% and eroding shaft power savings. The true net saving is ~11%, not 26.4%."
                  </p>
                </div>
              )}

              {activePreviewTab === 'evaluation' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#4E7A5D]">
                        Evaluation Completed · Demo Feedback
                      </span>
                      <h4 className="text-lg font-serif font-bold text-stone-900">
                        Overall Reasoning Score: 88 / 100
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-600">
                      <span>Status: Exemplary Deduction</span>
                      <span>·</span>
                      <span className="font-semibold text-[#163323]">+180 XP Earned</span>
                    </div>
                  </div>

                  {/* Criteria sample breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded border border-stone-200">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-stone-800">Correctness & Physical Laws</span>
                        <span className="font-mono text-[#163323] font-bold">92%</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-normal">
                        Correctly identified auxiliary genset thermal conversion losses and induced hydrodynamic rudder drag.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded border border-stone-200">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="font-semibold text-stone-800">Recognition of Assumptions</span>
                        <span className="font-mono text-[#163323] font-bold">85%</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-normal">
                        Noted the unstated assumption of steady crosswinds versus real voyage weather variations.
                      </p>
                    </div>
                  </div>

                  {/* Concrete Strengths & Improvement */}
                  <div className="p-4 bg-stone-100 rounded border border-stone-200 text-xs space-y-2">
                    <div className="font-semibold text-stone-800">Actionable Suggestion:</div>
                    <p className="text-stone-700 leading-relaxed">
                      "Incorporate the aerodynamic heel moment on vessel stability and trim angle to model propeller immersion efficiency during strong gusts."
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-[#EAE6DE] border-t border-stone-300 text-right">
              <Link
                to="/challenges/ch-spot-flaw-cargo-rotor"
                className="text-xs font-semibold text-[#163323] hover:underline"
              >
                Inspect Full Challenge Workspace →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: How MindForge Works */}
      <section id="how-it-works" className="py-20 border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Systematic Method
            </span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-[#163323]">
              How MindForge Works
            </h2>
            <p className="mt-3 text-stone-700 leading-relaxed">
              Cognitive agility is developed through deliberate daily tension, structured articulation, and immediate analytical feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-white border border-stone-300 rounded-lg">
              <div className="text-xs font-bold text-[#997A3D] uppercase tracking-wider mb-2">
                Step 01
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
                Tackle the Daily Problem
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every morning, solve a high-stakes scenario across logic, economics, engineering, or ethical triage.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-300 rounded-lg">
              <div className="text-xs font-bold text-[#997A3D] uppercase tracking-wider mb-2">
                Step 02
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
                Articulate & Map
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Explain your premises and trade-offs. Optionally map causal logic nodes with the interactive sandbox canvas.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-300 rounded-lg">
              <div className="text-xs font-bold text-[#997A3D] uppercase tracking-wider mb-2">
                Step 03
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
                Receive 8-Dimension Rubric
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Get an objective critique dissecting soundness, hidden assumptions, feasibility, and constraint compliance.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-300 rounded-lg">
              <div className="text-xs font-bold text-[#997A3D] uppercase tracking-wider mb-2">
                Step 04
              </div>
              <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
                Refine & Compete
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Track streaks, level up cognitive badges, and qualify for monthly membership reward grants on the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Daily Thinking Challenges & 10 Domains */}
      <section className="py-20 border-b border-stone-300 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Comprehensive Curriculum
            </span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-[#163323]">
              10 Core Thinking Disciplines
            </h2>
            <p className="mt-3 text-stone-700 leading-relaxed">
              We rotate across ten foundational reasoning faculties so you do not specialize in narrow puzzles at the expense of systemic judgment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Logical Reasoning', desc: 'Deductive validity & truth tables' },
              { title: 'Spot the Flaw', desc: 'Hidden errors & fallacies' },
              { title: 'First-Principles', desc: 'Deconstruct to basic physics' },
              { title: 'Decision-Making', desc: 'High-stakes resource triage' },
              { title: 'Engineering & Design', desc: 'Passive mechanical resilience' },
              { title: 'Analytical Thinking', desc: 'Market microstructure & data' },
              { title: 'Creative Thinking', desc: 'Non-hierarchical synthesis' },
              { title: 'Business Strategy', desc: 'Protocol lock-in & moats' },
              { title: 'Real-World Policy', desc: 'Incentives & shared resources' },
              { title: 'Constraint Challenges', desc: 'Zero-power & tight bounds' },
            ].map((domain) => (
              <div key={domain.title} className="p-4 bg-white border border-stone-300 rounded-lg">
                <div className="font-serif font-semibold text-stone-900 text-sm mb-1">
                  {domain.title}
                </div>
                <div className="text-xs text-stone-600">{domain.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: AI Rubric Breakdown */}
      <section id="rubrics" className="py-20 border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Objective Grading
            </span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-[#163323]">
              8 Evaluation Dimensions
            </h2>
            <p className="mt-3 text-stone-700 leading-relaxed">
              No generic "looks good" or length-based rewards. Every answer is evaluated on sound deductive structure and genuine feasibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Correctness & Analytical Soundness',
                detail: 'Respects physical conservation laws, mathematical axioms, and baseline parameters.',
              },
              {
                name: 'Logical Reasoning & Deduction',
                detail: 'Valid inferences moving systematically from premise to conclusion without non-sequiturs.',
              },
              {
                name: 'Clarity of Explanation',
                detail: 'Concise prose, structured hierarchy, and exact technical terminology.',
              },
              {
                name: 'Creativity & Synthesis',
                detail: 'Reframes tensions creatively rather than defaulting to simplistic compromises.',
              },
              {
                name: 'Practical Feasibility',
                detail: 'Survives operational, human staffing, and real-world implementation constraints.',
              },
              {
                name: 'Relevance to Core Problem',
                detail: 'Directly addresses the focal dilemma without extraneous fluff or digression.',
              },
              {
                name: 'Compliance with Constraints',
                detail: 'Strict compliance with hard boundaries, maximum bounds, and safety limits.',
              },
              {
                name: 'Recognition of Assumptions & Trade-offs',
                detail: 'Explicitly surfaces unproven assertions and structural trade-offs.',
              },
            ].map((c) => (
              <div key={c.name} className="p-5 bg-white border border-stone-300 rounded-lg">
                <h4 className="font-serif font-semibold text-stone-900 text-sm mb-2">
                  {c.name}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Monthly Rewards & Transparent Subscription */}
      <section id="rewards" className="py-20 border-b border-stone-300 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Fair & Merit-Driven Model
            </span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-[#163323]">
              Transparent Subscription & Performance Rewards
            </h2>
            <p className="mt-3 text-stone-700 leading-relaxed">
              We believe in honest access. Experience the curriculum during your first month without charge. If you excel on the monthly leaderboard, administrators grant free subscription credits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div className="p-8 bg-white border border-stone-300 rounded-lg space-y-4">
              <span className="text-xs font-bold text-[#997A3D] uppercase tracking-wider">
                Member Access
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                1st Month Free · Then $19/mo
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Full access to daily challenges, personal AI rubric evaluations, visual reasoning canvas, global leaderboards, and community voting ballots.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-200">
                <li>· 30-day trial for new eligible members</li>
                <li>· Automated cancel and renew controls in member settings</li>
                <li>· Administrator-controlled platform pricing without hidden fees</li>
                <li>· Demo billing mode active until payment gateway connects</li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-[#163323] text-white rounded text-xs font-semibold hover:bg-[#1f4530] inline-block"
                >
                  Start 30-Day Free Trial
                </Link>
              </div>
            </div>

            <div className="p-8 bg-[#EAE6DE] border border-stone-300 rounded-lg space-y-4">
              <span className="text-xs font-bold text-[#163323] uppercase tracking-wider">
                Merit Recognition
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#163323]">
                Monthly Top Performer Credits
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Top monthly reasoning performers on the global leaderboard are eligible for complimentary subscription grants administered directly through the moderation desk.
              </p>
              <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-stone-300/60">
                <li>· Top 10 monthly leaderboard members reviewed every 30 days</li>
                <li>· Transparent evaluation rubric without artificial vanity points</li>
                <li>· Audit trail of granted rewards visible in administration logs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Upcoming Features Marked "Coming Soon" */}
      <section className="py-20 border-b border-stone-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Roadmap
            </span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-[#163323]">
              Future Features (Coming Soon)
            </h2>
            <p className="mt-3 text-stone-700 leading-relaxed">
              We maintain a rigorous product roadmap. Upcoming capabilities are clearly identified and will unlock as new backend services deploy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: 'Community Solution Gallery',
                status: 'Coming Soon',
                desc: 'Peer review and cross-examination of submitted solutions after challenge deadlines.',
              },
              {
                title: 'AI Devil’s Advocate Mode',
                status: 'Coming Soon',
                desc: 'Interactive real-time agent attacking weak premises in your drafts before final submission.',
              },
              {
                title: 'Voice Pitch Arena',
                status: 'Coming Soon',
                desc: 'Spoken 2-minute strategic elevator defense analyzed for rhetorical and logical consistency.',
              },
              {
                title: '1v1 Live Reasoning Duel',
                status: 'Coming Soon',
                desc: 'Synchronous timed problem-solving against global peers under identical constraints.',
              },
            ].map((f) => (
              <div key={f.title} className="p-5 bg-white border border-stone-300 rounded-lg">
                <span className="text-[10px] font-bold text-[#997A3D] uppercase tracking-wider">
                  {f.status}
                </span>
                <h4 className="font-serif font-semibold text-stone-900 text-sm mt-1 mb-2">
                  {f.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section id="faq" className="py-20 border-b border-stone-300 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Clarity & Standards
            </span>
            <h2 className="mt-2 text-3xl font-serif font-bold text-[#163323]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-stone-300 rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-serif font-semibold text-stone-900 text-sm hover:bg-stone-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#163323] leading-tight text-balance">
            Start Your Daily Deliberate Practice Today
          </h2>
          <p className="mt-4 text-stone-700 text-sm md:text-base leading-relaxed">
            Join a global community of engineers, strategists, and analysts forging sharper critical thinking.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3.5 bg-[#163323] text-white text-xs font-semibold rounded hover:bg-[#1f4530] transition-colors"
            >
              Forge Your Mind Free
            </Link>
            <Link
              to="/login"
              className="px-6 py-3.5 bg-[#EAE6DE] text-stone-800 text-xs font-semibold rounded hover:bg-[#dfdad0] transition-colors"
            >
              Sign In to Workspace
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
