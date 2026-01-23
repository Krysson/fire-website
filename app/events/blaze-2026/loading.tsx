export default function BlazeLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fire-charcoal to-fire-black">
      {/* Hero Skeleton */}
      <section className="relative overflow-hidden bg-fire-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-fire-red/20 to-fire-orange/10" />
        <div className="container relative mx-auto px-4 py-16 sm:py-24">
          <div className="flex flex-col items-center text-center">
            {/* Logo Skeleton */}
            <div className="mb-8 w-full max-w-md">
              <div className="aspect-[5/3] w-full animate-pulse rounded-lg bg-fire-charcoal" />
            </div>

            {/* Tagline Skeleton */}
            <div className="mb-4 h-10 w-3/4 animate-pulse rounded-lg bg-fire-charcoal sm:h-12" />

            {/* Description Skeleton */}
            <div className="mb-8 space-y-2">
              <div className="h-6 w-96 max-w-full animate-pulse rounded bg-fire-charcoal" />
              <div className="h-6 w-80 max-w-full animate-pulse rounded bg-fire-charcoal" />
            </div>

            {/* Button Skeleton */}
            <div className="h-14 w-48 animate-pulse rounded-lg bg-fire-charcoal" />

            {/* Date Skeleton */}
            <div className="mt-4 h-4 w-56 animate-pulse rounded bg-fire-charcoal" />
          </div>
        </div>
      </section>

      {/* Quick Stats Skeleton */}
      <section className="border-y border-fire-dark/50 bg-fire-charcoal/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-3 h-8 w-8 animate-pulse rounded bg-fire-dark" />
                <div className="mb-2 h-4 w-20 animate-pulse rounded bg-fire-dark" />
                <div className="h-6 w-32 animate-pulse rounded bg-fire-dark" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Cards Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex justify-center">
            <div className="h-10 w-64 animate-pulse rounded-lg bg-fire-charcoal" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-fire-dark bg-fire-charcoal p-6"
              >
                <div className="mb-4 h-12 w-12 animate-pulse rounded-lg bg-fire-dark" />
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-fire-dark" />
                <div className="h-4 w-full animate-pulse rounded bg-fire-dark" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
