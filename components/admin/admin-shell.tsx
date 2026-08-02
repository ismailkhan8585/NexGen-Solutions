'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, FolderKanban, Briefcase, Users, FileText,
  Mail, Star, Settings, BarChart3, LogOut, Menu, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Mail },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-ink-secondary">Loading...</p>
      </div>
    );
  }

  if (!session && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-surface flex">
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-surface-card border-r border-surface-border z-50 transition-transform',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-6 border-b border-surface-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple-500 to-brand-cyan-500 flex items-center justify-center font-display font-bold text-white text-lg">
              NG
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm">NexGen Admin</p>
              <p className="text-ink-muted text-xs">{(session?.user as { name?: string })?.name ?? 'Admin'}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-brand-purple-500/20 to-brand-cyan-500/20 text-white border border-brand-purple-500/30'
                    : 'text-ink-secondary hover:text-white hover:bg-surface-hover'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-border">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-secondary hover:text-white hover:bg-surface-hover transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-30 h-14 bg-surface-card border-b border-surface-border flex items-center px-4">
          <button onClick={() => setSidebarOpen(true)} className="text-ink-secondary hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-3 font-display font-semibold text-white">Admin</span>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
