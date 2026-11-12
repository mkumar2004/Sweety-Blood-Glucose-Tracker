import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useReports } from '@/hooks/useReports';

export function ReportDatePicker() {
  const { selectedDate, setSelectedDate, displayDateString, setDisplayDateString } = useReports();
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#111111] text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors cursor-pointer select-none"
      >
        <CalendarIcon className="w-3.5 h-3.5 text-neutral-400" />
        <span>{displayDateString}</span>
      </button>

      {showDatePicker && (
        <div className="absolute right-0 mt-2 p-3 rounded-xl bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 w-60">
          <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mb-2">Select Date</p>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              if (e.target.value) {
                const [y, m, d] = e.target.value.split('-');
                const dateObj = new Date(y, m - 1, d);
                const formatted = dateObj.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                });
                setSelectedDate(e.target.value);
                setDisplayDateString(formatted);
              }
              setShowDatePicker(false);
            }}
            className="w-full bg-neutral-100 dark:bg-[#1c1c1c] border border-neutral-300 dark:border-neutral-700 rounded-lg p-2 text-xs text-neutral-900 dark:text-white outline-none"
          />
        </div>
      )}
    </div>
  );
}

