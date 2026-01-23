import Image from 'next/image';
import Link from 'next/link';
import type { Presenter } from '@/lib/types';

interface PresenterCardProps {
  presenter: Presenter;
  eventSlug: string;
}

export default function PresenterCard({ presenter, eventSlug }: PresenterCardProps) {
  // Create bio excerpt (first 150 characters or to end of sentence)
  const getExcerpt = (content?: string): string => {
    if (!content) return 'Bio coming soon...';

    const stripped = content.trim();
    if (stripped.length <= 150) return stripped;

    // Try to cut at sentence end within 150 chars
    const sentenceEnd = stripped.substring(0, 150).lastIndexOf('.');
    if (sentenceEnd > 80) {
      return stripped.substring(0, sentenceEnd + 1);
    }

    // Otherwise cut at word boundary
    const lastSpace = stripped.substring(0, 150).lastIndexOf(' ');
    return stripped.substring(0, lastSpace) + '...';
  };

  // Format pronouns - handle both string and array
  const formatPronouns = (pronouns?: string | string[]): string => {
    if (!pronouns) return '';
    if (Array.isArray(pronouns)) {
      return pronouns.join(' & ');
    }
    return pronouns;
  };

  const excerpt = getExcerpt(presenter.content);
  const pronounsText = formatPronouns(presenter.pronouns);

  return (
    <div className="group bg-fire-charcoal rounded-lg overflow-hidden border-2 border-fire-dark transition-all duration-300 hover:border-fire-orange hover:shadow-lg hover:shadow-fire-orange/20 hover:scale-105 hover:-translate-y-1">
      {/* Presenter photo */}
      <div className="relative w-full aspect-square bg-fire-dark flex items-center justify-center overflow-hidden">
        {presenter.photo ? (
          <Image
            src={presenter.photo}
            alt={presenter.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg
              className="w-24 h-24 text-fire-orange/30 transition-all duration-300 group-hover:scale-110 group-hover:text-fire-orange/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Presenter info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white transition-colors duration-200 group-hover:text-fire-orange">{presenter.name}</h3>
          {pronounsText && (
            <p className="text-fire-orange text-sm mt-1">{pronounsText}</p>
          )}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
          {excerpt}
        </p>

        <Link
          href={`/events/${eventSlug}/presenters/${presenter.slug}`}
          className="inline-block w-full text-center bg-fire-red hover:bg-fire-orange text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
