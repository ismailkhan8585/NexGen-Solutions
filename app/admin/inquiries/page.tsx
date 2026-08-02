'use client';

import { useEffect, useState } from 'react';
import { Mail, Search, Eye } from 'lucide-react';

interface Inquiry {
  id: string;
  refNumber: string;
  clientName: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  budget: string | null;
  timeline: string | null;
  description: string;
  preferredLanguage: string | null;
  consentAt: string | null;
  estimatorData: { summary?: string } | null;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  NEW: 'bg-brand-purple-500/20 text-brand-purple-300',
  READ: 'bg-surface-hover text-ink-secondary',
  REPLIED: 'bg-brand-cyan-500/20 text-brand-cyan-300',
  IN_PROGRESS: 'bg-gold-500/20 text-gold-300',
  CONVERTED: 'bg-emerald-500/20 text-emerald-300',
  CLOSED: 'bg-rose-500/20 text-rose-300',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Inquiry | null>(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  async function loadInquiries() {
    const res = await fetch('/api/admin/inquiries');
    if (res.ok) setInquiries(await res.json());
  }

  const filtered = inquiries.filter((inq) => {
    const matchStatus = filter === 'ALL' || inq.status === filter;
    const matchSearch = !search || inq.clientName.toLowerCase().includes(search.toLowerCase()) || inq.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    loadInquiries();
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-8">Inquiries</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-surface-card border border-surface-border pl-10 pr-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl bg-surface-card border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500"
        >
          <option value="ALL">All Status</option>
          <option value="NEW">New</option>
          <option value="READ">Read</option>
          <option value="REPLIED">Replied</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="CONVERTED">Converted</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase tracking-wider">Ref</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase tracking-wider">Service</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase tracking-wider">Budget</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <tr key={inq.id} className="border-b border-surface-border last:border-0 hover:bg-surface-hover transition-colors">
                  <td className="p-4 text-ink-secondary text-sm font-mono">{inq.refNumber}</td>
                  <td className="p-4">
                    <p className="text-white text-sm font-medium">{inq.clientName}</p>
                    <p className="text-ink-muted text-xs">{inq.email}</p>
                  </td>
                  <td className="p-4 text-ink-secondary text-sm">{inq.service}</td>
                  <td className="p-4 text-ink-secondary text-sm">{inq.budget ?? '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[inq.status] ?? ''}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-4 text-ink-muted text-sm">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button onClick={() => setSelected(inq)} className="text-ink-secondary hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-surface-card border border-surface-border rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-white text-lg">{selected.refNumber}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selected.status] ?? ''}`}>
                {selected.status}
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-ink-muted">Name:</span> <span className="text-white">{selected.clientName}</span></div>
              <div><span className="text-ink-muted">Email:</span> <span className="text-white">{selected.email}</span></div>
              {selected.phone && <div><span className="text-ink-muted">Phone:</span> <span className="text-white">{selected.phone}</span></div>}
              {selected.company && <div><span className="text-ink-muted">Company:</span> <span className="text-white">{selected.company}</span></div>}
              <div><span className="text-ink-muted">Service:</span> <span className="text-white">{selected.service}</span></div>
              {selected.budget && <div><span className="text-ink-muted">Budget:</span> <span className="text-white">{selected.budget}</span></div>}
              {selected.timeline && <div><span className="text-ink-muted">Timeline:</span> <span className="text-white">{selected.timeline}</span></div>}
              {selected.preferredLanguage && <div><span className="text-ink-muted">Preferred language:</span> <span className="text-white">{selected.preferredLanguage === 'ar' ? 'Arabic' : 'English'}</span></div>}
              {selected.consentAt && <div><span className="text-ink-muted">Consent recorded:</span> <span className="text-white">{new Date(selected.consentAt).toLocaleString()}</span></div>}
              {selected.estimatorData?.summary && <div><span className="text-ink-muted">Estimator:</span> <pre className="mt-1 whitespace-pre-wrap rounded-lg bg-surface p-3 font-sans text-ink-secondary">{selected.estimatorData.summary}</pre></div>}
              <div><span className="text-ink-muted">Description:</span> <p className="text-ink-secondary mt-1">{selected.description}</p></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 rounded-xl bg-brand-purple-500/20 text-brand-purple-300 px-4 py-2 text-sm font-medium hover:bg-brand-purple-500/30 transition-colors">
                <Mail className="w-4 h-4" /> Reply
              </a>
              {['NEW', 'READ', 'REPLIED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'].map((s) => (
                <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${selected.status === s ? 'bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white' : 'bg-surface-hover text-ink-secondary hover:text-white'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
