import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Event, Schedule, Presenter, Class } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Get event data from event.json
 * @param eventSlug - Event identifier (e.g., 'blaze-2026', 'flare-2026')
 * @returns Event data or null if not found
 */
export function getEventData(eventSlug: string): Event | null {
  try {
    const eventPath = path.join(CONTENT_DIR, eventSlug, 'event.json');

    if (!fs.existsSync(eventPath)) {
      console.error(`Event file not found: ${eventPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(eventPath, 'utf8');
    const eventData = JSON.parse(fileContents) as Event;

    return eventData;
  } catch (error) {
    console.error(`Error loading event data for ${eventSlug}:`, error);
    return null;
  }
}

/**
 * Get schedule data from schedule.json
 * @param eventSlug - Event identifier (e.g., 'blaze-2026', 'flare-2026')
 * @returns Schedule data or null if not found
 */
export function getSchedule(eventSlug: string): Schedule | null {
  try {
    const schedulePath = path.join(CONTENT_DIR, eventSlug, 'schedule.json');

    if (!fs.existsSync(schedulePath)) {
      console.error(`Schedule file not found: ${schedulePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(schedulePath, 'utf8');
    const scheduleData = JSON.parse(fileContents) as Schedule;

    return scheduleData;
  } catch (error) {
    console.error(`Error loading schedule for ${eventSlug}:`, error);
    return null;
  }
}

/**
 * Get all presenters for an event
 * @param eventSlug - Event identifier (e.g., 'blaze-2026', 'flare-2026')
 * @returns Array of presenters or empty array if none found
 */
export function getPresenters(eventSlug: string): Presenter[] {
  try {
    const presentersDir = path.join(CONTENT_DIR, eventSlug, 'presenters');

    if (!fs.existsSync(presentersDir)) {
      console.error(`Presenters directory not found: ${presentersDir}`);
      return [];
    }

    const files = fs.readdirSync(presentersDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const presenters = markdownFiles.map(filename => {
      const filePath = path.join(presentersDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        name: data.name,
        slug: data.slug,
        pronouns: data.pronouns,
        photo: data.photo,
        social: data.social,
        content,
      } as Presenter;
    });

    return presenters;
  } catch (error) {
    console.error(`Error loading presenters for ${eventSlug}:`, error);
    return [];
  }
}

/**
 * Get a single presenter by slug
 * @param eventSlug - Event identifier (e.g., 'blaze-2026', 'flare-2026')
 * @param slug - Presenter slug identifier
 * @returns Presenter data or null if not found
 */
export function getPresenterBySlug(eventSlug: string, slug: string): Presenter | null {
  try {
    const presentersDir = path.join(CONTENT_DIR, eventSlug, 'presenters');

    if (!fs.existsSync(presentersDir)) {
      console.error(`Presenters directory not found: ${presentersDir}`);
      return null;
    }

    const files = fs.readdirSync(presentersDir);
    const targetFile = files.find(file => {
      if (!file.endsWith('.md')) return false;

      const filePath = path.join(presentersDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return data.slug === slug;
    });

    if (!targetFile) {
      console.error(`Presenter not found: ${slug}`);
      return null;
    }

    const filePath = path.join(presentersDir, targetFile);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      name: data.name,
      slug: data.slug,
      pronouns: data.pronouns,
      photo: data.photo,
      social: data.social,
      content,
    } as Presenter;
  } catch (error) {
    console.error(`Error loading presenter ${slug} for ${eventSlug}:`, error);
    return null;
  }
}

/**
 * Get all classes for an event
 * @param eventSlug - Event identifier (e.g., 'blaze-2026', 'flare-2026')
 * @returns Array of classes or empty array if none found
 */
export function getClasses(eventSlug: string): Class[] {
  try {
    const classesDir = path.join(CONTENT_DIR, eventSlug, 'classes');

    if (!fs.existsSync(classesDir)) {
      console.error(`Classes directory not found: ${classesDir}`);
      return [];
    }

    const files = fs.readdirSync(classesDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const classes = markdownFiles.map(filename => {
      const filePath = path.join(classesDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        title: data.title,
        slug: data.slug,
        presenter: data.presenter,
        level: data.level,
        duration: data.duration,
        content,
      } as Class;
    });

    return classes;
  } catch (error) {
    console.error(`Error loading classes for ${eventSlug}:`, error);
    return [];
  }
}

/**
 * Get a single class by slug
 * @param eventSlug - Event identifier (e.g., 'blaze-2026', 'flare-2026')
 * @param slug - Class slug identifier
 * @returns Class data or null if not found
 */
export function getClassBySlug(eventSlug: string, slug: string): Class | null {
  try {
    const classesDir = path.join(CONTENT_DIR, eventSlug, 'classes');

    if (!fs.existsSync(classesDir)) {
      console.error(`Classes directory not found: ${classesDir}`);
      return null;
    }

    const files = fs.readdirSync(classesDir);
    const targetFile = files.find(file => {
      if (!file.endsWith('.md')) return false;

      const filePath = path.join(classesDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return data.slug === slug;
    });

    if (!targetFile) {
      console.error(`Class not found: ${slug}`);
      return null;
    }

    const filePath = path.join(classesDir, targetFile);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      slug: data.slug,
      presenter: data.presenter,
      level: data.level,
      duration: data.duration,
      content,
    } as Class;
  } catch (error) {
    console.error(`Error loading class ${slug} for ${eventSlug}:`, error);
    return null;
  }
}

/**
 * Get organization page content from markdown files
 * @param filename - Name of the markdown file (e.g., 'about.md', 'faq.md')
 * @returns Object with content and optional frontmatter data
 */
export function getOrganizationContent(filename: string): { content: string; data?: any } | null {
  try {
    const filePath = path.join(CONTENT_DIR, 'organization', filename);

    if (!fs.existsSync(filePath)) {
      console.error(`Organization content not found: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return { content, data };
  } catch (error) {
    console.error(`Error loading organization content ${filename}:`, error);
    return null;
  }
}
