'use client';

import { useEffect, useState } from 'react';

interface ReportData {
  totalInquiries: number;
  convertedInquiries: number;
  byService: { service: string; count: number }[];
  byCountry: { country: string; count: number }[];
  byStatus: { status: string; count: number }[];
  blogViews: { title: string; views: number }[];
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/admin/reports');
      if (res.ok) setData(await res.json());
    }
    load();
  }, []);

  if (!data) return <p className="text-ink-secondary">Loading...</p>;

  const conversionRate = data.totalInquiries > 0 ? ((data.convertedInquiries / data.totalInquiries) * 100).toFixed(1) : '0';

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-8">Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
          <p className="text-ink-muted text-xs mb-1">Total Inquiries</p>
          <p className="font-display font-bold text-3xl text-white">{data.totalInquiries}</p>
        </div>
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
          <p className="text-ink-muted text-xs mb-1">Converted</p>
          <p className="font-display font-bold text-3xl text-emerald-400">{data.convertedInquiries}</p>
        </div>
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
          <p className="text-ink-muted text-xs mb-1">Conversion Rate</p>
          <p className="font-display font-bold text-3xl text-brand-purple-400">{conversionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Most Requested Services</h2>
          <div className="space-y-3">
            {data.byService.length === 0 ? <p className="text-ink-muted text-sm">No data.</p> : data.byService.map((item) => {
              const max = Math.max(...data.byService.map((s) => s.count), 1);
              return (
                <div key={item.service} className="flex items-center gap-3">
                  <span className="text-ink-secondary text-sm w-24 capitalize">{item.service}</span>
                  <div className="flex-1 h-6 rounded-lg bg-surface-hover overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 rounded-lg flex items-center justify-end pr-2" style={{ width: `${(item.count / max) * 100}%` }}>
                      <span className="text-white text-xs font-mono">{item.count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Client Countries</h2>
          <div className="space-y-3">
            {data.byCountry.length === 0 ? <p className="text-ink-muted text-sm">No data.</p> : data.byCountry.map((item) => (
              <div key={item.country} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                <span className="text-ink-secondary text-sm">{item.country}</span>
                <span className="text-white font-mono text-sm">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Inquiry Status Breakdown</h2>
          <div className="space-y-3">
            {data.byStatus.map((item) => (
              <div key={item.status} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                <span className="text-ink-secondary text-sm">{item.status}</span>
                <span className="text-white font-mono text-sm">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Blog Post Views</h2>
          <div className="space-y-3">
            {data.blogViews.length === 0 ? <p className="text-ink-muted text-sm">No data.</p> : data.blogViews.map((item) => (
              <div key={item.title} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                <span className="text-ink-secondary text-sm truncate mr-2">{item.title}</span>
                <span className="text-white font-mono text-sm shrink-0">{item.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
