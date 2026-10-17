import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Logo } from '../components/common/Logo';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <PublicLayout>
      <div className="py-16 px-6 max-w-md mx-auto">
        <div className="bg-white border border-stone-300 rounded-lg p-8 shadow-xs">
          <div className="text-center mb-6">
            <Logo size="md" className="justify-center" />
            <h1 className="mt-4 text-2xl font-serif font-bold text-stone-900">
              Password Recovery
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Request a secure verification code to reset your credentials
            </p>
          </div>

          <div className="mb-6 p-3 bg-[#FAF8F5] border border-stone-200 rounded text-xs text-stone-700">
            <span className="font-semibold block text-stone-900 mb-0.5">Prototype State Notice:</span>
            Password recovery requires an operational transactional mail delivery backend. In this preview interface, mock recovery feedback is provided below.
          </div>

          {submitted ? (
            <div className="space-y-4">
              <div className="p-3 bg-[#EBF2EC] border border-[#163323]/20 rounded text-xs text-[#163323]">
                <span className="font-semibold block mb-1">Recovery Link Dispatched (Demo):</span>
                If an account exists for <strong className="font-mono">{email}</strong>, a one-time cryptographic reset token has been generated.
              </div>
              <Link
                to="/login"
                className="block text-center py-2 bg-[#163323] text-white font-semibold rounded text-xs hover:bg-[#1f4530]"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#163323] text-white font-semibold rounded text-xs hover:bg-[#1f4530] transition-colors"
              >
                Dispatch Recovery Instructions
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="text-xs text-stone-600 hover:text-stone-900">
                  ← Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};
