'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Star, StarOff, Eye, EyeOff, X } from 'lucide-react';

interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  category: string;
  coverImage: string | null;
  featured: boolean;
  isActive: boolean;
}

const categories = ['WEB', 'MOBILE', 'ECOMMERCE', 'SAAS', 'AI', 'DESIGN', 'CLOUD', 'BLOCKCHAIN', 'SOFTWARE', 'MARKETING'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const res = await fetch('/api/admin/projects');
    if (res.ok) setProjects(await res.json());
  }

  async function toggleField(id: string, field: 'featured' | 'isActive', value: boolean) {
    await fetch(`/api/admin/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
    loadProjects();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Projects</h1>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:shadow-lg hover:shadow-brand-purple-500/30 transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
            {project.coverImage && (
              <div className="relative aspect-video overflow-hidden">
                <Image src={project.coverImage} alt={project.titleEn} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-full bg-brand-purple-500/20 text-brand-purple-300 text-xs">{project.category}</span>
                <div className="flex gap-1">
                  <button onClick={() => toggleField(project.id, 'featured', !project.featured)} className="text-ink-muted hover:text-gold-400 transition-colors" title="Toggle featured">
                    {project.featured ? <Star className="w-4 h-4 text-gold-400" fill="currentColor" /> : <StarOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => toggleField(project.id, 'isActive', !project.isActive)} className="text-ink-muted hover:text-white transition-colors" title="Toggle active">
                    {project.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setEditing(project)} className="text-ink-muted hover:text-brand-purple-400 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="font-display font-medium text-white text-sm">{project.titleEn}</h3>
              {project.titleAr && <p className="text-ink-muted text-xs mt-1">{project.titleAr}</p>}
            </div>
          </div>
        ))}
      </div>

      {(editing || creating) && (
        <ProjectForm
          project={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { setEditing(null); setCreating(false); loadProjects(); }}
        />
      )}
    </div>
  );
}

function ProjectForm({ project, onClose, onSaved }: { project: Project | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    slug: project?.slug ?? '',
    titleEn: project?.titleEn ?? '',
    titleAr: project?.titleAr ?? '',
    category: project?.category ?? 'WEB',
    coverImage: project?.coverImage ?? '',
    descriptionEn: '',
    techStack: '',
    liveUrl: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (project) {
      await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-card border border-surface-border rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white text-lg">{project ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose} className="text-ink-muted hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input required value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} placeholder="Title (English)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} placeholder="Title (Arabic)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder="Cover Image URL" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <textarea value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })} placeholder="Description (English)" rows={3} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 resize-none" />
          <input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder="Tech Stack (comma separated)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="Live URL" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <button type="submit" className="w-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl py-2.5 font-semibold text-sm hover:shadow-lg transition-all">
            {project ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
