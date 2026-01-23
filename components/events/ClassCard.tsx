import Link from 'next/link';
import type { Class } from '@/lib/types';

interface ClassCardProps {
  class_: Class;
  eventSlug: string;
}

/**
 * Get color classes for skill level badges
 */
function getLevelBadgeClasses(level: string): string {
  const normalizedLevel = level.toLowerCase();

  if (normalizedLevel.includes('beginner')) {
    return 'bg-emerald-600/20 text-emerald-400 border-emerald-600/30';
  }
  if (normalizedLevel.includes('intermediate')) {
    return 'bg-fire-orange/20 text-fire-orange border-fire-orange/30';
  }
  if (normalizedLevel.includes('advanced')) {
    return 'bg-fire-red/20 text-fire-red border-fire-red/30';
  }

  // Default for "All Levels" or other variations
  return 'bg-fire-yellow/20 text-fire-yellow border-fire-yellow/30';
}

/**
 * Truncate description to approximately 150 characters
 */
function truncateDescription(content: string | undefined, maxLength: number = 150): string {
  if (!content) return '';

  // Remove markdown formatting for cleaner preview
  const plainText = content
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) return plainText;

  // Truncate at word boundary
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

export default function ClassCard({ class_, eventSlug }: ClassCardProps) {
  const levelBadgeClasses = getLevelBadgeClasses(class_.level);
  const description = truncateDescription(class_.content);

  return (
    <article className="group relative bg-fire-charcoal border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-fire-orange/50 hover:shadow-lg hover:shadow-fire-orange/10 hover:scale-105 hover:-translate-y-1">
      {/* Header Section */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-fire-orange transition-colors duration-200">
          {class_.title}
        </h3>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {/* Level Badge */}
          <span className={`px-2.5 py-1 rounded-full border font-medium transition-all duration-200 ${levelBadgeClasses}`}>
            {class_.level}
          </span>

          {/* Duration */}
          <span className="text-gray-400">
            {class_.duration}
          </span>
        </div>
      </div>

      {/* Presenter Link */}
      <div className="mb-3">
        <span className="text-sm text-gray-400">Taught by: </span>
        <Link
          href={`/events/${eventSlug}/presenters/${class_.presenter}`}
          className="text-sm text-fire-orange hover:text-fire-yellow transition-colors duration-200 font-medium"
        >
          View Presenter
        </Link>
      </div>

      {/* Description */}
      {description && (
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {description}
        </p>
      )}

      {/* Learn More Button */}
      <div className="mt-auto pt-4 border-t border-white/5">
        <Link
          href={`/events/${eventSlug}/classes/${class_.slug}`}
          className="inline-flex items-center text-sm font-medium text-fire-orange hover:text-fire-yellow transition-all duration-200 group/link"
        >
          Learn More
          <svg
            className="ml-1.5 w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
