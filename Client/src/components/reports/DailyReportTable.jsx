import { useReports } from '@/hooks/useReports';
import { DailyReportRow } from './DailyReportRow';
import { ReportEmptyState } from './ReportEmptyState';
import { Loader2 } from 'lucide-react';

export function DailyReportTable() {
  const { reportData, reportType, loading, error } = useReports();
  const rows = reportData.slots || [];

  // Month-to-date and Monthly aggregate view
  if (reportType !== 'daily') {
    return (
      <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#111111] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
            {reportType === 'mtd' ? 'Month-to-date Summary' : 'Previous Month Summary'}
          </h2>
          <span className="text-[11px] text-neutral-500 font-medium">
            {reportData.dateDescription}
          </span>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-10 flex items-center justify-center gap-2 text-xs text-neutral-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading period statistics…
          </div>
        ) : !reportData.hasReadings ? (
          <ReportEmptyState message={`No readings logged for ${reportData.dateRange}.`} />
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-1">
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Period: {reportData.dateRange}
            </p>
            <p className="text-[11px] text-neutral-500 max-w-sm">
              Statistics are calculated across all {reportData.readingsCount} readings in this timeframe. Switch to the Daily tab to view individual slots.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Daily View: shows 4 slots table as in screenshot
  return (
    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#111111] p-5 sm:p-6 space-y-4">
      {/* Table Header Row */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
          Readings on {reportData.dateRange}
        </h2>
        <span className="text-[11px] text-neutral-500 font-medium">
          Listed by slot
        </span>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-10 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading readings…
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
                <th className="py-2.5 px-4 font-medium w-[30%]">Slot</th>
                <th className="py-2.5 px-4 font-medium w-[22%]">Time</th>
                <th className="py-2.5 px-4 font-medium w-[24%]">Value</th>
                <th className="py-2.5 px-4 font-medium w-[24%]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/40 dark:divide-neutral-800/40">
              {rows.map((row, idx) => (
                <DailyReportRow key={row.slotKey || idx} row={row} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
