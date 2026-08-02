'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Eye, EyeOff, X } from 'lucide-react';

interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  category: string;
  isPublished: boolean;
  author: string;
  readTime: number;
}

const categories = ['WEB_DEV', 'MOBILE', 'AI', 'DESIGN', 'BUSINESS', 'CLOUD', 'SECURITY', 'GENERAL'];

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    const res = await fetch('/api/admin/blog');
    if (res.ok) setPosts(await res.json());
  }

  async function togglePublish(id: string, value: boolean) {
    await fetch(`/api/admin/blog/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublished: value }) });
    loadPosts();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Blog Posts</h1>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:shadow-lg transition-all">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase">Title</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase">Category</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase">Author</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase">Status</th>
                <th className="text-left p-4 text-ink-muted text-xs font-medium uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-surface-border last:border-0 hover:bg-surface-hover">
                  <td className="p-4">
                    <p className="text-white text-sm font-medium">{post.titleEn}</p>
                    {post.titleAr && <p className="text-ink-muted text-xs">{post.titleAr}</p>}
                  </td>
                  <td className="p-4 text-ink-secondary text-sm">{post.category.replace('_', ' ')}</td>
                  <td className="p-4 text-ink-secondary text-sm">{post.author}</td>
                  <td className="p-4">
                    <button onClick={() => togglePublish(post.id, !post.isPublished)} className={`px-2 py-1 rounded-full text-xs font-medium ${post.isPublished ? 'bg-emerald-500/20 text-emerald-300' : 'bg-surface-hover text-ink-muted'}`}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button onClick={() => setEditing(post)} className="text-ink-muted hover:text-brand-purple-400"><Pencil className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || creating) && (
        <BlogForm post={editing} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { setEditing(null); setCreating(false); loadPosts(); }} />
      )}
    </div>
  );
}

function BlogForm({ post, onClose, onSaved }: { post: BlogPost | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    slug: post?.slug ?? '',
    titleEn: post?.titleEn ?? '',
    titleAr: post?.titleAr ?? '',
    category: post?.category ?? 'WEB_DEV',
    author: post?.author ?? '',
    readTime: post?.readTime ?? 5,
    excerptEn: '',
    contentEn: '',
    isPublished: post?.isPublished ?? false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (post) {
      await fetch(`/api/admin/blog/${post.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch('/api/admin/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, publishedAt: form.isPublished ? new Date().toISOString() : null }) });
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface-card border border-surface-border rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-white text-lg">{post ? 'Edit Post' : 'New Post'}</h2>
          <button onClick={onClose} className="text-ink-muted hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input required value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} placeholder="Title (English)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} placeholder="Title (Arabic)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500">
            {categories.map((c) => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
          </select>
          <input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <input type="number" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: parseInt(e.target.value) || 5 })} placeholder="Read time (min)" className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500" />
          <textarea value={form.excerptEn} onChange={(e) => setForm({ ...form, excerptEn: e.target.value })} placeholder="Excerpt" rows={2} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 resize-none" />
          <textarea value={form.contentEn} onChange={(e) => setForm({ ...form, contentEn: e.target.value })} placeholder="Content (Markdown)" rows={5} className="w-full rounded-xl bg-surface border border-surface-border px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-purple-500 resize-none" />
          <label className="flex items-center gap-2 text-ink-secondary text-sm">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="accent-brand-purple-500" />
            Published
          </label>
          <button type="submit" className="w-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl py-2.5 font-semibold text-sm hover:shadow-lg transition-all">
            {post ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
