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
      <div className="rounded-2xl border border-neutral-800/80 bg-[#111111] p-4 flex flex-col justify-between h-[136px] transition-all hover:border-neutral-700">
        <div>
          <div className="w-7 h-7 rounded-lg bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-center text-neutral-400 mb-2.5">
            <IconComponent className="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] text-neutral-400">{title}</p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-3.5 h-3.5" />
          Add reading
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-800/80 bg-[#111111] p-4 flex flex-col justify-between h-[136px] transition-all hover:border-neutral-700">
      <div className="flex items-start justify-between">
        <div className="w-7 h-7 rounded-lg bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-center text-neutral-300">
          <IconComponent className="w-3.5 h-3.5" />
        </div>
        <ReadingStatus status={status} value={value} />
      </div>

      <div>
        <p className="text-[11px] text-neutral-400 mb-0.5">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold tracking-tight text-white">{value}</span>
          <span className="text-[11px] text-neutral-500">mg/dl</span>
        </div>
        {time && <p className="text-[10px] text-neutral-500 mt-0.5">{time}</p>}
      </div>
    </div>
  );
}
