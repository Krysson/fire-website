import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

/**
 * Custom 404 page for presenter not found
 */
export default function PresenterNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fire-charcoal to-fire-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-fire-orange mb-4">404</h1>
          <h2 className="text-3xl font-bold text-fire-yellow mb-6">Presenter Not Found</h2>
          <p className="text-gray-300 text-lg mb-8">
            We couldn't find the presenter you're looking for. They may have been removed or the URL
            might be incorrect.
          </p>
          <Link href="/events/blaze-2026/presenters">
            <Button size="lg" className="gap-2">
              <ArrowLeft className="size-5" />
              Back to All Presenters
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
