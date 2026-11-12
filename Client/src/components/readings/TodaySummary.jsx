import { ReadingProgress } from './ReadingProgress';
import { ReadingCard } from './ReadingCard';

export function TodaySummary({ onAddReading }) {
  const slots = [
    {
      slot: 'morning',
      title: 'Morning (fasting)',
      value: 98,
      time: '6:45 AM',
      status: 'In range',
      isEmpty: false,
    },
    {
      slot: 'after_breakfast',
      title: 'After breakfast',
      value: 142,
      time: '9:30 AM',
      status: 'In range',
      isEmpty: false,
    },
    {
      slot: 'after_lunch',
      title: 'After lunch',
      value: 156,
      time: '2:15 PM',
      status: 'In range',
      isEmpty: false,
    },
    {
      slot: 'after_dinner',
      title: 'After dinner',
      isEmpty: true,
    },
  ];

  return (
    <div className="space-y-2.5">
      {/* Header of Today Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-neutral-900 dark:text-white">Today</h2>
        <ReadingProgress current={3} total={4} />
      </div>

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
