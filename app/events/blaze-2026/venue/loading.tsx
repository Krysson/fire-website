export default function VenueLoading() {
  return (
    <div className="min-h-screen bg-fire-black">
      {/* Page Header Skeleton */}
      <div className="bg-gradient-fire-horizontal py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mx-auto mb-4 h-12 w-48 animate-pulse rounded-lg bg-fire-dark/50" />
            <div className="mx-auto h-8 w-64 animate-pulse rounded bg-fire-dark/50" />
          </div>
        </div>
      </div>

      {/* Venue Information Skeleton */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Venue Name and Address Skeleton */}
          <div className="rounded-xl border border-fire-dark bg-fire-charcoal p-6 space-y-4">
            <div className="h-8 w-64 animate-pulse rounded bg-fire-dark" />
            <div className="space-y-2">
              <div className="h-5 w-80 max-w-full animate-pulse rounded bg-fire-dark" />
              <div className="h-5 w-60 animate-pulse rounded bg-fire-dark" />
            </div>
          </div>

          {/* Map Skeleton */}
          <div className="aspect-video w-full animate-pulse rounded-xl bg-fire-charcoal" />

          {/* Info Sections Skeleton */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-xl border border-fire-dark bg-fire-charcoal p-6 space-y-3">
              <div className="h-6 w-32 animate-pulse rounded bg-fire-dark" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-fire-dark" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
