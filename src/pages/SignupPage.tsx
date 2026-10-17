import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Logo } from '../components/common/Logo';
import { Eye, EyeOff, Check } from 'lucide-react';
import { ChallengeCategory } from '../types';

const INTEREST_OPTIONS: ChallengeCategory[] = [
  'Logical Reasoning',
  'Creative Thinking',
  'Analytical Thinking',
  'Engineering and Design',
  'Business Strategy',
  'Decision-Making',
  'Spot the Flaw',
  'First-Principles Thinking',
];

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'credentials' | 'interests'>('credentials');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<ChallengeCategory[]>([
    'Logical Reasoning',
    'Decision-Making',
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('All credential fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (!acceptTerms) {
      setErrorMessage('You must accept the Terms of Service to continue.');
      return;
    }

    setErrorMessage('');
    setStep('interests');
  };

  const toggleInterest = (interest: ChallengeCategory) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleFinishOnboarding = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 700);
  };

  return (
    <PublicLayout>
      <div className="py-16 px-6 max-w-lg mx-auto">
        <div className="bg-white border border-stone-300 rounded-lg p-8 shadow-xs">
          <div className="text-center mb-6">
            <Logo size="md" className="justify-center" />
            <h1 className="mt-4 text-2xl font-serif font-bold text-stone-900">
              Create Your MindForge Account
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Start your 30-day free trial and forge daily cognitive discipline
            </p>
          </div>

          <div className="mb-6 p-3 bg-[#FAF8F5] border border-stone-200 rounded text-xs text-stone-700">
            <span className="font-semibold block text-stone-900 mb-0.5">Prototype Mode Notice:</span>
            Authentication state is stored locally for this frontend preview. Real secure server-side account provisioning is prepared for production backend integration.
          </div>

          {errorMessage && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs">
              {errorMessage}
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Work / Personal Email
                </label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-[#163323] focus:ring-[#163323]"
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" target="_blank" className="text-[#163323] underline">
                      Terms of Service
                    </Link>{' '}
                    and acknowledge the{' '}
                    <Link to="/privacy" target="_blank" className="text-[#163323] underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-2.5 bg-[#163323] text-white font-semibold rounded text-xs hover:bg-[#1f4530] transition-colors"
              >
                Continue to Curriculum Preferences →
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Select Your Reasoning Focus
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Choose the domains you wish to prioritize for your daily recommendations:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {INTEREST_OPTIONS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 text-left rounded border text-xs transition-colors flex items-center justify-between ${
                        isSelected
                          ? 'border-[#163323] bg-[#EBF2EC] text-[#163323] font-semibold'
                          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{interest}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="px-4 py-2 border border-stone-300 rounded text-xs text-stone-700 hover:bg-stone-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinishOnboarding}
                  disabled={isLoading}
                  className="flex-1 py-2 bg-[#163323] text-white font-semibold rounded text-xs hover:bg-[#1f4530] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Setting up Workspace...' : 'Complete Setup & Open Workspace'}
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-stone-200 text-center text-xs text-stone-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#163323] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
