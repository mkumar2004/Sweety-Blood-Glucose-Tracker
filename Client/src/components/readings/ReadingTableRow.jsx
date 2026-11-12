import { Sunrise, Coffee, Utensils, Moon, Pencil, Trash2 } from 'lucide-react';
import { ReadingStatus } from './ReadingStatus';

const slotIcons = {
  morning: Sunrise,
  'Morning (fasting)': Sunrise,
  after_breakfast: Coffee,
  'After breakfast': Coffee,
  after_lunch: Utensils,
  'After lunch': Utensils,
  after_dinner: Moon,
  'After dinner': Moon,
};

export function ReadingTableRow({ reading, onEdit, onDelete }) {
  const { slot, date, time, value, status } = reading;
  const IconComponent = slotIcons[slot] || Sunrise;

  const barWidth = Math.min(Math.max(((value - 40) / (250 - 40)) * 100, 10), 100);

  return (
    <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-100/60 dark:hover:bg-neutral-900/40 transition-colors group">
      {/* Slot */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shrink-0">
            <IconComponent className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">{slot}</span>
        </div>
      </td>

      {/* Date & Time */}
      <td className="py-3 px-4">
        <div>
          <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{date}</div>
          {time && <div className="text-[11px] text-neutral-500 mt-0.5">{time}</div>}
        </div>
      </td>

      {/* Value & Indicator Bar */}
      <td className="py-3 px-4">
        <div className="space-y-1 max-w-[130px]">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-neutral-900 dark:text-white">{value}</span>
            <span className="text-[11px] text-neutral-500">mg/dl</span>
          </div>
          <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                status === 'Low'
                  ? 'bg-rose-500'
                  : status === 'High'
                  ? 'bg-amber-500'
                  : 'bg-neutral-200'
              }`}
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <ReadingStatus status={status} value={value} />
      </td>

      {/* Actions */}
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(reading)}
            className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Edit reading"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete?.(reading)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Delete reading"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
