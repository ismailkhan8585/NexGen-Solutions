'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, X } from 'lucide-react';

interface TeamMember {
  id: string;
  nameEn: string;
  nameAr: string | null;
  role: string;
  roleAr: string | null;
  bio: string | null;
  photo: string | null;
  skills: string[];
  isActive: boolean;
  sortOrder: number;
}

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => { loadMembers(); }, []);

  async function loadMembers() {
    const res = await fetch('/api/admin/team');
    if (res.ok) setMembers(await res.json());
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Team Members</h1>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.id} className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
            <div className="flex gap-4 p-4">
              {member.photo && <Image src={member.photo} alt={member.nameEn} width={64} height={64} className="h-16 w-16 rounded-xl object-cover" />}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-medium text-white text-sm">{member.nameEn}</h3>
                <p className="text-brand-purple-400 text-xs">{member.role}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {member.skills.slice(0, 3).map((s) => <span key={s} className="px-1.5 py-0.5 rounded bg-surface-hover text-ink-muted text-xs font-mono">{s}</span>)}
                </div>
              </div>
              <button onClick={() => setEditing(member)} className="text-ink-muted hover:text-brand-purple-400 shrink-0"><Pencil className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {(editing || creating) && (
        <TeamForm member={editing} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { setEditing(null); setCreating(false); loadMembers(); }} />
      )}
    </div>
  );
}

function TeamForm({ member, onClose, onSaved }: { member: TeamMember | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    nameEn: member?.nameEn ?? '',
    nameAr: member?.nameAr ?? '',
    role: member?.role ?? '',
    roleAr: member?.roleAr ?? '',
    bio: member?.bio ?? '',
    photo: member?.photo ?? '',
    skills: member?.skills.join(', ') ?? '',
    sortOrder: member?.sortOrder ?? 99,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...form, skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean) };
    if (member) {
      await fetch(`/api/admin/team/${member.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/admin/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-card border border-surface-border rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white text-lg">{member ? 'Edit Member' : 'New Member'}</h2>
          <button onClick={onClose} className="text-ink-muted hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} placeholder="Name (English)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} placeholder="Name (Arabic)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Role" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.roleAr} onChange={(e) => setForm({ ...form, roleAr: e.target.value })} placeholder="Role (Arabic)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" rows={2} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 resize-none" />
          <input value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} placeholder="Photo URL" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="Skills (comma separated)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <button type="submit" className="w-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl py-2.5 font-semibold text-sm hover:shadow-lg transition-all">
            {member ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
