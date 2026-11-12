import { useMemo } from 'react';
import { useReadings } from '@/hooks/useReadings';
import { ReadingProgress } from './ReadingProgress';
import { ReadingCard } from './ReadingCard';
import { Loader2 } from 'lucide-react';

// Slot definitions — order matches the 4-card grid
const SLOT_DEFS = [
  { key: 'morning', title: 'Morning (fasting)' },
  { key: 'after_breakfast', title: 'After breakfast' },
  { key: 'after_lunch', title: 'After lunch' },
  { key: 'after_dinner', title: 'After dinner' },
];

/**
 * Format a time_slot key into the value the DB stores, then look up
 * the matching reading from today's entries.
 */
function getStatus(value) {
  if (value === undefined || value === null) return 'In range';
  if (value < 70) return 'Low';
  if (value > 180) return 'High';
  return 'In range';
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function TodaySummary({ onAddReading }) {
  const { readings, loading, getTodayReadings } = useReadings();

  const todayReadings = useMemo(() => getTodayReadings(), [readings]);

  // Build the 4 card slots using today's readings
  const slots = useMemo(() => {
    return SLOT_DEFS.map((def) => {
      const reading = todayReadings.find(
        (r) => (r.time_slot || r.timeSlot) === def.key
      );

      if (reading) {
        return {
          slot: def.key,
          title: def.title,
          value: reading.value,
          time: formatTime(reading.created_at) || '',
          status: getStatus(reading.value),
          isEmpty: false,
        };
      }

      return {
        slot: def.key,
        title: def.title,
        isEmpty: true,
      };
    });
  }, [todayReadings]);

  const filledCount = slots.filter((s) => !s.isEmpty).length;

  return (
    <div className="space-y-2.5">
      {/* Header of Today Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-neutral-900 dark:text-white">Today</h2>
        <ReadingProgress current={filledCount} total={4} />
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Loading readings…
        </div>
      )}

      {/* 4 Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {slots.map((item, index) => (
          <ReadingCard
            key={index}
            {...item}
            onAdd={() => onAddReading?.(item.slot)}
          />
        ))}
      </div>
    </div>
  );
}
