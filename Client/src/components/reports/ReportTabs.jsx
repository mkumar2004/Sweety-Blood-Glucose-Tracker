import { useReports } from '@/hooks/useReports';

export function ReportTabs() {
  const { reportType, setReportType, reportData } = useReports();

  const tabs = [
    { id: 'daily', label: 'Daily' },
    { id: 'mtd', label: 'Month-to-date' },
    { id: 'monthly', label: 'Monthly' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
      {/* Tab Switcher */}
      <div className="inline-flex p-1 rounded-xl bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800/80 w-fit">
        {tabs.map((tab) => {
          const isActive = reportType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Right meta tag (e.g. "12 Nov 2026 GET /reports/daily?date=2026-11-12") */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-neutral-900 dark:text-white">
          {reportData.dateRange}
        </span>
        <span className="font-mono text-[11px] text-neutral-500">
          {reportData.apiEndpoint}
        </span>
      </div>
    </div>
  );
}
