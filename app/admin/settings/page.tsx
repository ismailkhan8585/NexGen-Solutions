'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [form, setForm] = useState({
    companyNameEn: '',
    companyNameAr: '',
    taglineEn: '',
    taglineAr: '',
    email: '',
    phone: '',
    whatsapp: '',
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: '',
    instagramUrl: '',
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings').then((r) => r.ok ? r.json() : null).then((d) => {
      if (d) setForm(d);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false); setError('');
    const response = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!response.ok) { setError('Settings were not saved. Check your permissions and required fields.'); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-white mb-8">Settings</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Company Info</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-ink-muted text-xs mb-1">Company Name (EN)</label>
              <input value={form.companyNameEn} onChange={(e) => setForm({ ...form, companyNameEn: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            </div>
            <div>
              <label className="block text-ink-muted text-xs mb-1">Company Name (AR)</label>
              <input value={form.companyNameAr} onChange={(e) => setForm({ ...form, companyNameAr: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            </div>
            <div>
              <label className="block text-ink-muted text-xs mb-1">Tagline (EN)</label>
              <input value={form.taglineEn} onChange={(e) => setForm({ ...form, taglineEn: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            </div>
            <div>
              <label className="block text-ink-muted text-xs mb-1">Tagline (AR)</label>
              <input value={form.taglineAr} onChange={(e) => setForm({ ...form, taglineAr: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Contact Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-ink-muted text-xs mb-1">Email</label>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            </div>
            <div>
              <label className="block text-ink-muted text-xs mb-1">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            </div>
            <div>
              <label className="block text-ink-muted text-xs mb-1">WhatsApp</label>
              <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <h2 className="font-display font-semibold text-white text-lg mb-4">Social Media</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} placeholder="LinkedIn URL" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="GitHub URL" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            <input value={form.twitterUrl} onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })} placeholder="Twitter URL" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
            <input value={form.instagramUrl} onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })} placeholder="Instagram URL" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          </div>
        </div>

        {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
        <button type="submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-6 py-3 font-semibold text-sm hover:shadow-lg transition-all">
          <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
