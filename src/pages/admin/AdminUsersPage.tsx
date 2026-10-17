import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppLayout } from '../../components/layout/AppLayout';
import { Search, Shield, Ban, CheckCircle2 } from 'lucide-react';

interface MockUserEntry {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'Active' | 'Suspended' | 'Trial';
  solvedCount: number;
  xp: number;
  joined: string;
}

export const AdminUsersPage: React.FC = () => {
  const { currentUser, toggleRole } = useApp();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<MockUserEntry[]>([
    {
      id: 'usr_sarah_chen',
      name: 'Sarah Chen',
      email: 'sarah.chen@mindforge.internal',
      role: currentUser.role,
      status: 'Active',
      solvedCount: 24,
      xp: 3840,
      joined: 'Mar 14, 2026',
    },
    {
      id: 'usr-elena',
      name: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      role: 'user',
      status: 'Active',
      solvedCount: 34,
      xp: 7280,
      joined: 'Jan 10, 2026',
    },
    {
      id: 'usr-kaito',
      name: 'Kaito Tanaka',
      email: 'kaito.tanaka@example.com',
      role: 'user',
      status: 'Active',
      solvedCount: 27,
      xp: 6840,
      joined: 'Feb 02, 2026',
    },
    {
      id: 'usr-marcus',
      name: 'Marcus Vance',
      email: 'marcus.vance@example.com',
      role: 'user',
      status: 'Active',
      solvedCount: 19,
      xp: 5910,
      joined: 'Apr 18, 2026',
    },
    {
      id: 'usr-test-flagged',
      name: 'Spam Bot Probe',
      email: 'bot@unverified.domain',
      role: 'user',
      status: 'Suspended',
      solvedCount: 0,
      xp: 0,
      joined: 'Oct 02, 2026',
    },
  ]);

  const [feedback, setFeedback] = useState('');

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        setFeedback(`User ${u.name} status updated to ${newStatus}.`);
        setTimeout(() => setFeedback(''), 2500);
        return { ...u, status: newStatus };
      })
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout pageTitle="User Directory & Moderation">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-300">
          <div>
            <span className="text-xs font-semibold text-[#997A3D] uppercase tracking-wider">
              Administration · Member Directory
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight mt-1">
              Member Governance & Moderation
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Audit scholar accounts, inspect submission velocity, and manage role authorizations.
            </p>
          </div>

          <div className="text-xs text-stone-500">
            Total Indexed Scholars: <strong className="text-stone-900">{users.length}</strong>
          </div>
        </div>

        {feedback && (
          <div className="p-3 bg-[#EBF2EC] text-[#163323] rounded border border-[#163323]/20 text-xs">
            {feedback}
          </div>
        )}

        {/* Search */}
        <div className="p-4 bg-white border border-stone-300 rounded-lg">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name or email address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#163323]"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-stone-300 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-stone-300 text-stone-600 uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Scholar</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Problems Solved</th>
                  <th className="py-3 px-4 text-right">XP</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50">
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">
                      {user.email}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-semibold text-stone-700">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          user.status === 'Active'
                            ? 'bg-[#EBF2EC] text-[#163323]'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center tabular-nums text-stone-800">
                      {user.solvedCount}
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums font-mono font-bold text-[#163323]">
                      {user.xp.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded border ${
                          user.status === 'Active'
                            ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
                            : 'border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Reactivate'}
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
