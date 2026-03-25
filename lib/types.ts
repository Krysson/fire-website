/**
 * Type definitions for FIRE website content structure
 */

/**
 * Venue information for an event
 */
export interface Venue {
  /** Venue name */
  name: string;
  /** Full street address */
  address: string;
  /** City */
  city?: string;
  /** State */
  state?: string;
  /** ZIP code */
  zip?: string;
  /** Google Maps URL */
  mapUrl?: string;
}

/**
 * Social media links for a presenter
 */
export interface SocialLinks {
  /** FetLife profile URL(s) - can be single or multiple */
  fetlife?: string | string[];
  /** Instagram profile URL(s) - can be single or multiple */
  instagram?: string | string[];
  /** Twitter/X profile URL(s) - can be single or multiple */
  twitter?: string | string[];
  /** Personal website URL(s) - can be single or multiple */
  website?: string | string[];
  /** Other social media or contact links - can be single or multiple */
  [key: string]: string | string[] | undefined;
}

/**
 * Event ticket information
 */
export interface TicketInfo {
  /** URL to ticket purchase page */
  url: string;
  /** Date when tickets go on sale */
  onSaleDate: string;
  /** Whether tickets are sold as pairs */
  soldAsPairs?: boolean;
  /** Note about pair ticketing */
  pairsNote?: string;
}

/**
 * Event date information
 */
export interface EventDates {
  /** Human-readable date range (e.g., "April 17-19, 2026") */
  display: string;
  /** ISO start date */
  start: string;
  /** ISO end date */
  end: string;
}

/**
 * Event information
 */
export interface Event {
  /** Event ID/slug */
  id: string;
  /** Event name (e.g., "BLAZE", "FLARE", "FIRE") */
  name: string;
  /** Event year */
  year: number;
  /** Event tagline/slogan */
  tagline: string;
  /** Full event description */
  description: string;
  /** Event dates */
  dates: EventDates;
  /** Primary focus/skill level (e.g., "Beginner to Intermediate") */
  focus: string;
  /** Event size description */
  size?: string;
  /** Venue details */
  venue: Venue;
  /** Ticket information */
  tickets: TicketInfo;
  /** Social media links */
  social?: {
    fetlife?: string;
    hashtag?: string;
  };
  /** Path to event logo */
  logo?: string;
  /** Theme colors */
  theme?: {
    primary: string;
    secondary: string;
  };
}

/**
 * Presenter/instructor information
 */
export interface Presenter {
  /** Display name */
  name: string;
  /** URL-friendly slug identifier */
  slug: string;
  /** Pronouns (e.g., "he/him", "she/her", "they/them") - can be string or array */
  pronouns?: string | string[];
  /** Path to presenter photo (relative to /public) */
  photo?: string;
  /** Social media links */
  social?: SocialLinks;
  /** Custom display labels for social links — keys match SocialLinks keys, values are label string(s) */
  social_labels?: { [key: string]: string | string[] | undefined };
  /** Markdown bio content */
  content?: string;
}

/**
 * Class/workshop information
 */
export interface Class {
  /** Class title */
  title: string;
  /** URL-friendly slug identifier */
  slug: string;
  /** Presenter slug reference — single slug or array for co-taught classes */
  presenter: string | string[];
  /** Skill level (e.g., "Beginner", "Intermediate", "Advanced", "All Levels") */
  level: string;
  /** Class duration (e.g., "90 minutes", "2 hours") */
  duration: string;
  /** Markdown class description/content */
  content?: string;
}

/**
 * Individual schedule time slot
 */
export interface ScheduleSlot {
  /** Time of day (e.g., "7:00 PM", "2:30 PM") */
  time: string;
  /** Event/class title */
  title: string;
  /** Presenter slug(s) — single slug or array for co-taught classes */
  presenter?: string | string[];
  /** Class slug for linking to the class detail page (optional) */
  classSlug?: string;
  /** Room/location name (optional) */
  room?: string;
  /** Slot type */
  type: 'class' | 'general' | 'social';
}

/**
 * Single day in the event schedule
 */
export interface ScheduleDay {
  /** ISO date string (e.g., "2026-04-17") */
  date: string;
  /** Human-readable day label (e.g., "Friday", "Saturday") */
  label: string;
  /** Array of time slots for this day */
  slots: ScheduleSlot[];
}

/**
 * Full event schedule
 */
export interface Schedule {
  /** Array of days in the event */
  days: ScheduleDay[];
}
