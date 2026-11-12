import { Link } from 'react-router-dom';
import { ReadingStatus } from '@/components/readings/ReadingStatus';

export function DailyReportRow({ row }) {
  const { slot, time, value, status, isLogged } = row;

  return (
    <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/30 transition-colors">
      {/* Slot */}
      <td className="py-3.5 px-4 text-xs font-medium text-neutral-800 dark:text-neutral-200">
        {slot}
      </td>

      {/* Time */}
      <td className="py-3.5 px-4 text-xs text-neutral-600 dark:text-neutral-400">
        {time}
      </td>

      {/* Value */}
      <td className="py-3.5 px-4 text-xs font-semibold text-neutral-900 dark:text-white">
        {isLogged ? (
          <span className="flex items-baseline gap-1">
            <span>{value}</span>
            <span className="text-[11px] font-normal text-neutral-500">mg/dl</span>
          </span>
        ) : (
          <span className="text-neutral-500 font-normal">Not logged yet</span>
        )}
      </td>

      {/* Status or Add Reading */}
      <td className="py-3.5 px-4 text-xs">
        {isLogged ? (
          <ReadingStatus status={status} value={value} />
        ) : (
          <Link
            to="/dashboard"
            className="font-semibold text-neutral-900 dark:text-white hover:underline inline-flex items-center gap-1 group"
          >
            Add reading
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        )}
      </td>
    </tr>
  );
}

