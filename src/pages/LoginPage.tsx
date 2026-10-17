import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { Logo } from '../components/common/Logo';
import { Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sarah.chen@mindforge.internal');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    // Demo authentication simulation
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <PublicLayout>
      <div className="py-16 px-6 max-w-md mx-auto">
        <div className="bg-white border border-stone-300 rounded-lg p-8 shadow-xs">
          <div className="text-center mb-6">
            <Logo size="md" className="justify-center" />
            <h1 className="mt-4 text-2xl font-serif font-bold text-stone-900">
              Sign In to MindForge
            </h1>
            <p className="mt-1 text-xs text-stone-600">
              Access your daily challenge workspace and reasoning analytics
            </p>
          </div>

          {/* Demo credential notice */}
          <div className="mb-6 p-3 bg-[#FAF8F5] border border-stone-200 rounded text-xs text-stone-700">
            <span className="font-semibold block text-stone-900 mb-0.5">Demo Mode Notice:</span>
            Default test account pre-filled below. Click "Sign In" to enter the authenticated workspace.
          </div>

          {errorMessage && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#163323] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 bg-[#163323] text-white font-semibold rounded text-xs hover:bg-[#1f4530] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-200 text-center text-xs text-stone-600">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#163323] font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
