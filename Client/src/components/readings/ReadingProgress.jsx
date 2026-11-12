export function ReadingProgress({ current = 3, total = 4 }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="flex items-center gap-3">
      {/* Progress pill track */}
      <div className="w-16 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-neutral-400">
        {current} of {total} readings
      </span>
    </div>
  );
}

