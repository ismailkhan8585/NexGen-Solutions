'use client';

import { useEffect, useState } from 'react';
import { Mail, FolderKanban, Users, FileText, TrendingUp, Star } from 'lucide-react';

interface DashboardData {
  newInquiries: number;
  projectsLive: number;
  teamMembers: number;
  blogPosts: number;
  recentInquiries: { id: string; refNumber: string; clientName: string; service: string; status: string; createdAt: string }[];
  inquiriesByMonth: { month: string; count: number }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin/dashboard');
      if (res.ok) setData(await res.json());
    }
    load();
  }, []);

  if (!data) {
    return <p className="text-ink-secondary">Loading...</p>;
  }

  const stats = [
    { label: 'New Inquiries', value: data.newInquiries, icon: Mail, classes: 'border-l-purple-500 bg-purple-100 text-purple-700' },
    { label: 'Projects Live', value: data.projectsLive, icon: FolderKanban, classes: 'border-l-cyan-500 bg-cyan-100 text-cyan-700' },
    { label: 'Team Members', value: data.teamMembers, icon: Users, classes: 'border-l-emerald-500 bg-green-100 text-green-700' },
    { label: 'Blog Posts', value: data.blogPosts, icon: FileText, classes: 'border-l-gold-500 bg-amber-100 text-amber-700' },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-2xl border-l-4 p-5 ${stat.classes}`}>
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 opacity-70" />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-sm font-medium opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Recent Inquiries</h2>
          <div className="space-y-3">
            {data.recentInquiries.length === 0 ? (
              <p className="text-ink-muted text-sm">No inquiries yet.</p>
            ) : (
              data.recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{inq.clientName}</p>
                    <p className="text-ink-muted text-xs">{inq.service} · {inq.refNumber}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    inq.status === 'NEW' ? 'bg-brand-purple-500/20 text-brand-purple-300' :
                    inq.status === 'READ' ? 'bg-surface-hover text-ink-secondary' :
                    'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {inq.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Inquiries by Month</h2>
          <div className="space-y-3">
            {data.inquiriesByMonth.length === 0 ? (
              <p className="text-ink-muted text-sm">No data yet.</p>
            ) : (
              data.inquiriesByMonth.map((item) => {
                const maxCount = Math.max(...data.inquiriesByMonth.map((m) => m.count), 1);
                const width = (item.count / maxCount) * 100;
                return (
                  <div key={item.month} className="flex items-center gap-3">
                    <span className="text-ink-muted text-xs w-20">{item.month}</span>
                    <div className="flex-1 h-6 rounded-lg bg-surface-hover overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 rounded-lg flex items-center justify-end pr-2" style={{ width: `${width}%` }}>
                        <span className="text-white text-xs font-mono">{item.count}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
