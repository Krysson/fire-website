export default function PresentersLoading() {
  return (
    <div className="min-h-screen bg-fire-black">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Page Header Skeleton */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-12 w-96 max-w-full animate-pulse rounded-lg bg-fire-charcoal" />
          <div className="mx-auto h-6 w-full max-w-2xl animate-pulse rounded bg-fire-charcoal" />
        </div>

        {/* Presenters Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-fire-dark bg-fire-charcoal"
            >
              {/* Image Skeleton */}
              <div className="aspect-square w-full animate-pulse bg-fire-dark" />

              {/* Content Skeleton */}
              <div className="p-6 space-y-3">
                <div className="h-7 w-3/4 animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-fire-dark" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full animate-pulse rounded bg-fire-dark" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-fire-dark" />
                  <div className="h-4 w-4/6 animate-pulse rounded bg-fire-dark" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
