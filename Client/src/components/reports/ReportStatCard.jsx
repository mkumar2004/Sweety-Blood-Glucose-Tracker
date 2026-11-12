export function ReportStatCard({
  label,
  value,
  unit = 'mg/dl',
  subtitle,
  isHighlight = false,
}) {
  if (isHighlight) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-white bg-white text-neutral-950 p-5 flex flex-col justify-between h-[116px] shadow-sm">
        <p className="text-xs font-medium text-neutral-600">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold tracking-tight text-neutral-950">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-medium text-neutral-600">{unit}</span>
          )}
          {subtitle && (
            <span className="text-xs font-medium text-neutral-600">{subtitle}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800/80 bg-neutral-50 dark:bg-[#111111] p-5 flex flex-col justify-between h-[116px] transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {value}
        </span>
        {unit && (
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{unit}</span>
        )}
        {subtitle && (
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{subtitle}</span>
        )}
      </div>
    </div>
  );
}

