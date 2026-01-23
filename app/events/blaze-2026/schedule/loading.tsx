export default function ScheduleLoading() {
  return (
    <div className="min-h-screen bg-fire-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 md:mb-12">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-fire-charcoal" />
            <div className="h-4 w-1 animate-pulse rounded bg-fire-charcoal" />
            <div className="h-4 w-24 animate-pulse rounded bg-fire-charcoal" />
            <div className="h-4 w-1 animate-pulse rounded bg-fire-charcoal" />
            <div className="h-4 w-20 animate-pulse rounded bg-fire-charcoal" />
          </div>

          <div className="mb-4 h-12 w-96 max-w-full animate-pulse rounded-lg bg-fire-charcoal" />
          <div className="space-y-2 mb-6">
            <div className="h-6 w-full max-w-2xl animate-pulse rounded bg-fire-charcoal" />
            <div className="h-6 w-3/4 max-w-2xl animate-pulse rounded bg-fire-charcoal" />
          </div>

          <div className="h-12 w-40 animate-pulse rounded-md bg-fire-charcoal" />
        </div>

        {/* Schedule Skeleton */}
        <div className="mb-12 space-y-6">
          {/* Day Tabs Skeleton */}
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 w-32 animate-pulse rounded-lg bg-fire-charcoal" />
            ))}
          </div>

          {/* Time Slots Skeleton */}
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-fire-dark bg-fire-charcoal p-4"
              >
                <div className="mb-2 h-5 w-24 animate-pulse rounded bg-fire-dark" />
                <div className="mb-2 h-6 w-64 animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-40 animate-pulse rounded bg-fire-dark" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
