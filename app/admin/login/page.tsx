'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GradientButton } from '@/components/ui/gradient-button';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else if (result?.ok) {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-brand-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-brand-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple-500 to-brand-cyan-500 mb-4">
            <span className="font-display font-bold text-white text-2xl">NG</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">NexGen Admin</h1>
          <p className="text-ink-secondary text-sm">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface-card border border-surface-border rounded-2xl p-8 space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-rose-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-ink-secondary text-sm mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nexgensolutions.agency"
                className="w-full rounded-xl bg-surface border border-surface-border pl-10 pr-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-ink-secondary text-sm mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-surface border border-surface-border pl-10 pr-4 py-2.5 text-white placeholder:text-ink-muted text-sm focus:outline-none focus:border-brand-purple-500 transition-colors"
              />
            </div>
          </div>

          <GradientButton type="submit" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </GradientButton>
        </form>

        <p className="text-center text-ink-muted text-xs mt-6">
          Demo: admin@nexgensolutions.agency / Admin@123456
        </p>
      </div>
    </div>
  );
}
