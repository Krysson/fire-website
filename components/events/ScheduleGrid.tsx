'use client';

import { useState } from 'react';
import type { Schedule, ScheduleSlot } from '@/lib/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ScheduleGridProps {
  schedule: Schedule | null;
}

export default function ScheduleGrid({ schedule }: ScheduleGridProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  if (!schedule || !schedule.days || schedule.days.length === 0) {
    return (
      <div className="bg-fire-charcoal border-2 border-fire-dark rounded-lg p-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Schedule Coming Soon</h3>
        <p className="text-gray-300">
          The full event schedule will be published closer to the event date.
          Check back soon for class times, presenters, and room assignments.
        </p>
      </div>
    );
  }

  const currentDay = schedule.days[selectedDay];

  return (
    <div className="space-y-6">
      {/* Day Tabs */}
      <Tabs
        value={selectedDay.toString()}
        onValueChange={(value) => setSelectedDay(parseInt(value))}
        className="w-full"
      >
        <TabsList className="w-full bg-fire-charcoal border-2 border-fire-dark flex flex-wrap gap-2 p-2">
          {schedule.days.map((day, index) => (
            <TabsTrigger
              key={index}
              value={index.toString()}
              className="flex-1 min-w-[120px] data-[state=active]:bg-fire-red data-[state=active]:text-white hover:bg-fire-dark transition-colors"
            >
              <div className="text-center">
                <div className="font-bold">{day.label}</div>
                <div className="text-xs opacity-75">
                  {new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {schedule.days.map((day, index) => (
          <TabsContent key={index} value={index.toString()} className="mt-6">
            <div className="space-y-3">
              {day.slots && day.slots.length > 0 ? (
                day.slots.map((slot, slotIndex) => (
                  <ScheduleSlotCard key={slotIndex} slot={slot} />
                ))
              ) : (
                <div className="bg-fire-charcoal border-2 border-fire-dark rounded-lg p-6 text-center">
                  <p className="text-gray-300">No schedule items for this day yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface ScheduleSlotCardProps {
  slot: ScheduleSlot;
}

function ScheduleSlotCard({ slot }: ScheduleSlotCardProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'class':
        return 'border-fire-orange bg-fire-charcoal';
      case 'social':
        return 'border-fire-yellow bg-fire-charcoal';
      case 'general':
      default:
        return 'border-fire-dark bg-fire-charcoal';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'class':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-fire-orange/20 text-fire-orange border border-fire-orange/30">
            Class
          </span>
        );
      case 'social':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-fire-yellow/20 text-fire-yellow border border-fire-yellow/30">
            Social
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`rounded-lg border-2 ${getTypeStyles(
        slot.type
      )} p-4 md:p-6 transition-all duration-200 hover:border-fire-orange hover:shadow-lg hover:shadow-fire-orange/10`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Time */}
        <div className="flex-shrink-0">
          <div className="text-fire-orange font-bold text-lg md:text-xl">{slot.time}</div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <h3 className="text-white font-semibold text-base md:text-lg flex-1 min-w-0">
              {slot.title}
            </h3>
            {getTypeBadge(slot.type)}
          </div>

          <div className="space-y-1">
            {slot.presenter && (
              <p className="text-gray-300 text-sm">
                <span className="text-gray-400">Presenter:</span>{' '}
                <span className="text-fire-yellow">{formatPresenterName(slot.presenter)}</span>
              </p>
            )}
            {slot.room && (
              <p className="text-gray-300 text-sm">
                <span className="text-gray-400">Room:</span> {slot.room}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatPresenterName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
