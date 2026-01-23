import Link from 'next/link';
import { Home, Flame } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-fire-charcoal to-fire-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Flame Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Flame className="h-32 w-32 text-fire-orange animate-pulse" />
            <div className="absolute inset-0 blur-xl opacity-50">
              <Flame className="h-32 w-32 text-fire-red" />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="mb-4 text-8xl font-bold text-fire-red">404</h1>

        {/* Message */}
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
          This page seems to have untied itself...
        </h2>

        <p className="mb-8 text-lg text-gray-300 max-w-lg mx-auto">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-fire-red hover:bg-fire-orange transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>

          <Link
            href="/events/blaze-2026"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-fire-orange border-2 border-fire-orange hover:bg-fire-orange hover:text-fire-black transition-all duration-200 rounded-lg hover:scale-105"
          >
            <Flame className="h-5 w-5" />
            View Events
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-fire-charcoal/50 border border-fire-dark rounded-lg">
          <p className="text-sm text-gray-400">
            If you believe this is an error, please contact us at{' '}
            <a
              href="mailto:fireeventproducer@gmail.com"
              className="text-fire-yellow hover:text-fire-orange transition-colors underline"
            >
              fireeventproducer@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
