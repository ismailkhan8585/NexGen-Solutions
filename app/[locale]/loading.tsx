function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface-card">
      <div className="aspect-[16/10] animate-pulse bg-white/[0.06]" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-20 animate-pulse rounded-full bg-white/[0.08]" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-white/[0.08]" />
        <div className="h-3 w-full animate-pulse rounded bg-white/[0.05]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-surface px-4 pb-20 pt-32 sm:px-6 lg:px-8" aria-busy="true">
      <div className="container-max">
        <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
          <div className="mx-auto h-7 w-28 animate-pulse rounded-full bg-brand-purple-500/15" />
          <div className="mx-auto h-10 w-4/5 animate-pulse rounded-lg bg-white/[0.08] sm:h-12" />
          <div className="mx-auto h-4 w-3/5 animate-pulse rounded bg-white/[0.05]" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)}
        </div>
      </div>
    </main>
  );
}
