export default function ClassesLoading() {
  return (
    <div className="min-h-screen bg-fire-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header Skeleton */}
        <header className="mb-12 text-center">
          <div className="mx-auto mb-4 h-12 w-80 max-w-full animate-pulse rounded-lg bg-fire-charcoal" />
          <div className="mx-auto h-6 w-full max-w-2xl animate-pulse rounded bg-fire-charcoal" />
        </header>

        {/* Classes Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-fire-dark bg-fire-charcoal p-6 space-y-4"
            >
              {/* Title Skeleton */}
              <div className="h-7 w-5/6 animate-pulse rounded bg-fire-dark" />

              {/* Metadata Skeleton */}
              <div className="flex gap-4">
                <div className="h-4 w-24 animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-32 animate-pulse rounded bg-fire-dark" />
              </div>

              {/* Presenter Skeleton */}
              <div className="h-4 w-40 animate-pulse rounded bg-fire-dark" />

              {/* Description Skeleton */}
              <div className="space-y-2 pt-2">
                <div className="h-4 w-full animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-full animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-fire-dark" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
