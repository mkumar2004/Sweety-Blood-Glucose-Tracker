import { ReportDatePicker } from './ReportDatePicker';

export function ReportsHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
          Reports
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Highest, lowest and average of your readings.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <ReportDatePicker />
      </div>
    </div>
  );
}

