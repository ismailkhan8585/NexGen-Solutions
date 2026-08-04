'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Star, X } from 'lucide-react';

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string | null;
  clientCompany: string | null;
  clientCountry: string | null;
  reviewEn: string;
  rating: number;
  isApproved: boolean;
  isFeatured: boolean;
  isVerified: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => { loadTestimonials(); }, []);

  async function loadTestimonials() {
    const res = await fetch('/api/admin/testimonials');
    if (res.ok) setTestimonials(await res.json());
  }

  async function toggleField(id: string, field: 'isApproved' | 'isFeatured' | 'isVerified', value: boolean) {
    await fetch(`/api/admin/testimonials/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: value }) });
    loadTestimonials();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Testimonials</h1>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-surface-card border border-surface-border rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white text-sm font-medium">{t.clientName}</p>
                <p className="text-ink-muted text-xs">{t.clientRole} · {t.clientCompany}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleField(t.id, 'isFeatured', !t.isFeatured)} title="Toggle featured">
                  <Star className={`w-4 h-4 ${t.isFeatured ? 'text-gold-400' : 'text-ink-muted'}`} fill={t.isFeatured ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => toggleField(t.id, 'isApproved', !t.isApproved)} className={`px-2 py-0.5 rounded-full text-xs ${t.isApproved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-surface-hover text-ink-muted'}`}>
                  {t.isApproved ? 'Approved' : 'Hidden'}
                </button>
                <button onClick={() => toggleField(t.id, 'isVerified', !t.isVerified)} className={`px-2 py-0.5 rounded-full text-xs ${t.isVerified ? 'bg-cyan-500/20 text-cyan-300' : 'bg-amber-500/15 text-amber-300'}`}>
                  {t.isVerified ? 'Verified' : 'Unverified'}
                </button>
                <button onClick={() => setEditing(t)} className="text-ink-muted hover:text-brand-purple-400"><Pencil className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-ink-secondary text-sm line-clamp-3">&ldquo;{t.reviewEn}&rdquo;</p>
            <div className="flex gap-0.5 mt-2">
              {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 text-gold-400" fill="currentColor" />)}
            </div>
          </div>
        ))}
      </div>

      {(editing || creating) && (
        <TestimonialForm testimonial={editing} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { setEditing(null); setCreating(false); loadTestimonials(); }} />
      )}
    </div>
  );
}

function TestimonialForm({ testimonial, onClose, onSaved }: { testimonial: Testimonial | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    clientName: testimonial?.clientName ?? '',
    clientRole: testimonial?.clientRole ?? '',
    clientCompany: testimonial?.clientCompany ?? '',
    clientCountry: testimonial?.clientCountry ?? '',
    reviewEn: testimonial?.reviewEn ?? '',
    rating: testimonial?.rating ?? 5,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (testimonial) {
      await fetch(`/api/admin/testimonials/${testimonial.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/admin/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-card border border-surface-border rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white text-lg">{testimonial ? 'Edit Testimonial' : 'New Testimonial'}</h2>
          <button onClick={onClose} className="text-ink-muted hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} placeholder="Client Name" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.clientRole} onChange={(e) => setForm({ ...form, clientRole: e.target.value })} placeholder="Role" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.clientCompany} onChange={(e) => setForm({ ...form, clientCompany: e.target.value })} placeholder="Company" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.clientCountry} onChange={(e) => setForm({ ...form, clientCountry: e.target.value })} placeholder="Country" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <textarea required value={form.reviewEn} onChange={(e) => setForm({ ...form, reviewEn: e.target.value })} placeholder="Review" rows={4} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 resize-none" />
          <input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} placeholder="Rating (1-5)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <button type="submit" className="w-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl py-2.5 font-semibold text-sm hover:shadow-lg transition-all">
            {testimonial ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
