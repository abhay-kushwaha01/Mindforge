import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  Flame,
  Layers,
  Trophy,
  BarChart3,
  User,
  CreditCard,
  Vote,
  Bell,
  Settings,
  Shield,
  Menu,
  X,
  LogOut,
  Sparkles,
  ChevronRight,
  Search,
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, pageTitle }) => {
  const { currentUser, toggleRole, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const userNavLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/challenges/ch-daily-hospital-power', label: 'Daily Challenge', icon: Flame, special: true },
    { to: '/challenges', label: 'All Challenges', icon: Layers },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/progress', label: 'My Progress', icon: BarChart3 },
    { to: '/profile', label: 'My Profile', icon: User },
    { to: '/subscription', label: 'Subscription', icon: CreditCard },
    { to: '/voting', label: 'Voting', icon: Vote },
    { to: '/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const adminNavLinks = [
    { to: '/admin', label: 'Admin Overview', icon: Shield },
    { to: '/admin/challenges', label: 'Challenge Ops' },
    { to: '/admin/users', label: 'User Directory' },
    { to: '/admin/subscriptions', label: 'Billing & Rewards' },
    { to: '/admin/votes', label: 'Ballot Manager' },
    { to: '/admin/analytics', label: 'Curriculum Metrics' },
    { to: '/admin/settings', label: 'Platform Config' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-[#163323] text-white'
        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
    }`;

  const adminNavItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-[#997A3D] text-white font-semibold'
        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
    }`;

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col md:flex-row font-sans-body text-[#1C201D]">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#F2EFE9] border-b border-stone-300">
        <Logo size="sm" showTagline to="/dashboard" />
        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="p-1.5 text-stone-700 relative hover:text-stone-900"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8B3A3A]" />
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-stone-700 rounded-md hover:bg-stone-200"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Persistent Left Desktop Sidebar (approx 260px wide) & Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#F2EFE9] border-r border-stone-300 flex flex-col z-50 transition-transform duration-200 ease-in-out shrink-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header: Wordmark & Brand mark */}
        <div className="p-5 border-b border-stone-300/80 flex items-center justify-between shrink-0">
          <Logo size="md" showTagline to="/dashboard" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1 text-stone-500 hover:text-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links Scroll Container */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Main User Navigation */}
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider px-3 mb-2">
              Workspace
            </div>
            <nav className="space-y-1">
              {userNavLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={navItemClass}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0 text-stone-500 group-hover:text-stone-900" />
                      <span>{item.label}</span>
                    </div>
                    {item.special && (
                      <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#997A3D]/20 text-[#61491E]">
                        DAILY
                      </span>
                    )}
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#8B3A3A] text-white tabular-nums">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Admin Navigation (Shown when authorized administrator) */}
          <div className="pt-2 border-t border-stone-300/70">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-semibold text-[#61491E] uppercase tracking-wider">
                Admin Panel
              </span>
              <span className="text-[10px] text-stone-500">
                {currentUser.role === 'admin' ? 'Active' : 'Restricted'}
              </span>
            </div>

            {currentUser.role === 'admin' ? (
              <nav className="space-y-0.5">
                {adminNavLinks.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={adminNavItemClass}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </NavLink>
                ))}
              </nav>
            ) : (
              <div className="px-3 py-2 bg-stone-200/50 rounded text-xs text-stone-600">
                <p className="mb-2">Admin controls restricted.</p>
                <button
                  type="button"
                  onClick={toggleRole}
                  className="text-xs text-[#163323] underline font-semibold hover:text-[#2d5a43]"
                >
                  Switch to Admin View (Demo)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer: Account Section */}
        <div className="p-3.5 border-t border-stone-300/80 bg-[#EAE6DE]/60 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#163323] text-stone-100 flex items-center justify-center font-serif font-bold text-xs shrink-0">
                SC
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-900 truncate">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-stone-600 truncate">
                  Role: <span className="font-semibold">{currentUser.role}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleRole}
              title="Toggle between regular user and administrator view"
              className="text-[11px] px-2 py-1 border border-stone-300 rounded bg-white text-stone-700 hover:bg-stone-50"
            >
              {currentUser.role === 'admin' ? 'To User' : 'To Admin'}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-300/60">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-600 hover:text-stone-900 font-medium"
            >
              Account
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Compact Desktop Top Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-[#FAF8F5] border-b border-stone-300/70 shrink-0">
          <div>
            <span className="text-xs font-medium text-stone-500">
              MindForge Platform · {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <h1 className="text-base font-semibold text-stone-900 tracking-tight">
              {pageTitle || 'Workspace'}
            </h1>
          </div>

          <div className="flex items-center gap-6 text-xs">
            {/* Quick stats with tabular numerals */}
            <div className="flex items-center gap-4 text-stone-600 border-r border-stone-300 pr-5">
              <div className="flex items-center gap-1.5" title="Daily Streak">
                <Flame className="w-4 h-4 text-[#997A3D]" />
                <span className="font-semibold text-stone-900 tabular-nums">
                  {currentUser.currentStreak}
                </span>
                <span className="text-stone-500 text-[11px]">day streak</span>
              </div>

              <div className="flex items-center gap-1.5" title="Total XP">
                <Sparkles className="w-4 h-4 text-[#4E7A5D]" />
                <span className="font-semibold text-stone-900 tabular-nums">
                  {currentUser.totalXp.toLocaleString()}
                </span>
                <span className="text-stone-500 text-[11px]">XP</span>
              </div>

              <div className="flex items-center gap-1.5" title="Leaderboard Position">
                <Trophy className="w-4 h-4 text-[#163323]" />
                <span className="font-semibold text-stone-900 tabular-nums">
                  #{currentUser.leaderboardRank}
                </span>
                <span className="text-stone-500 text-[11px]">Rank</span>
              </div>
            </div>

            {/* Notification trigger */}
            <Link
              to="/notifications"
              className="relative p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#8B3A3A]" />
              )}
            </Link>

            {/* Subscription badge */}
            <Link
              to="/subscription"
              className="px-2.5 py-1 text-[11px] font-medium border border-stone-300 rounded bg-white text-stone-800 hover:bg-stone-50 transition-colors"
            >
              {currentUser.subscription.status === 'Trial' ? 'Trial Period' : 'Member'}
            </Link>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
