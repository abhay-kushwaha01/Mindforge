import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AppLayout } from '../components/layout/AppLayout';
import {
  Bell,
  CheckCheck,
  Flame,
  Award,
  Vote,
  ShieldAlert,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.isRead;
    return n.type === filterType;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'challenge':
        return <Bell className="w-4 h-4 text-[#163323]" />;
      case 'feedback':
        return <Award className="w-4 h-4 text-[#4E7A5D]" />;
      case 'streak':
        return <Flame className="w-4 h-4 text-[#997A3D]" />;
      case 'reward':
        return <Award className="w-4 h-4 text-[#997A3D]" />;
      case 'vote':
        return <Vote className="w-4 h-4 text-[#2D5A43]" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <AppLayout pageTitle="In-App Notification Center">
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#4E7A5D] uppercase tracking-wider">
              Communication & Platform Events
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#163323] tracking-tight mt-1">
              Notification Center
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Real-time workspace notifications. Clearly distinguished from external push/email delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="px-3.5 py-1.5 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-md text-xs overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Alerts' },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'challenge', label: 'Challenges' },
            { id: 'feedback', label: 'Evaluations' },
            { id: 'streak', label: 'Streaks' },
            { id: 'reward', label: 'Rewards' },
            { id: 'vote', label: 'Voting' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 font-medium rounded transition-colors whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="bg-white border border-stone-300 rounded-lg overflow-hidden divide-y divide-stone-200">
          {filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-5 transition-colors flex items-start justify-between gap-4 cursor-pointer ${
                notif.isRead ? 'bg-white hover:bg-stone-50' : 'bg-[#FAF8F5] hover:bg-[#F2EFE9]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 p-2 rounded bg-stone-100 border border-stone-200 shrink-0">
                  {getTypeIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-semibold text-stone-900 text-sm">
                      {notif.title}
                    </h3>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#163323]" />
                    )}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                    {notif.message}
                  </p>
                  <span className="text-[11px] text-stone-400 block pt-0.5">
                    {notif.timestamp} · In-App Broadcast
                  </span>
                </div>
              </div>

              {notif.link && (
                <Link
                  to={notif.link}
                  className="px-3 py-1 border border-stone-300 rounded text-xs font-semibold text-stone-700 hover:bg-stone-100 shrink-0 inline-flex items-center gap-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}

          {filteredNotifs.length === 0 && (
            <div className="p-12 text-center text-xs text-stone-500">
              No notifications matching this filter criteria.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
