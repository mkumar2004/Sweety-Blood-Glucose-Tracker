import { Sunrise, Coffee, Utensils, Moon, Plus } from 'lucide-react';
import { ReadingStatus } from './ReadingStatus';

const slotIcons = {
  morning: Sunrise,
  after_breakfast: Coffee,
  after_lunch: Utensils,
  after_dinner: Moon,
};

export function ReadingCard({
  slot,
  title,
  value,
  time,
  status = 'In range',
  isEmpty = false,
  onAdd,
}) {
  const IconComponent = slotIcons[slot] || Sunrise;

  if (isEmpty) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-[#111111] p-5 flex flex-col justify-between h-[152px] transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
        <div>
          <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800/60 border border-neutral-300 dark:border-neutral-700/60 flex items-center justify-center text-neutral-500 dark:text-neutral-400 mb-3">
            <IconComponent className="w-4 h-4" />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{title}</p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-3.5 h-3.5" />
          Add reading
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-[#111111] p-5 flex flex-col justify-between h-[152px] transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-neutral-200 dark:bg-neutral-800/60 border border-neutral-300 dark:border-neutral-700/60 flex items-center justify-center text-neutral-500 dark:text-neutral-300">
          <IconComponent className="w-4 h-4" />
        </div>
        <ReadingStatus status={status} value={value} />
      </div>

      <div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">{value}</span>
          <span className="text-xs text-neutral-400 dark:text-neutral-500">mg/dl</span>
        </div>
        {time && <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">{time}</p>}
      </div>
    </div>
  );
}
