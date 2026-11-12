export function GlucosePreview({ variant = 'login', className = '' }) {
  if (variant === 'signup') {
    return (
      <div
        className={`w-full max-w-[420px] rounded-3xl border border-neutral-200/80 dark:border-[#1E1E1E] bg-[#FAFAFA] dark:bg-[#111111] p-6 shadow-sm select-none ${className}`}
      >
        <div className="grid grid-cols-3 gap-4 text-left">
          {/* Highest (Teal / Cyan accent) */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Highest
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              187
            </div>
          </div>

          {/* Lowest (Amber / Orange accent) */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-amber-600 dark:text-amber-400/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Lowest
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              64
            </div>
          </div>

          {/* Average (Sky Blue / Cyan accent) */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-sky-600 dark:text-sky-400/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              Average
            </div>
            <div className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              126.4
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login variant (matches reference screenshot with exact wave & 3 dots)
  return (
    <div
      className={`w-full max-w-[420px] rounded-3xl border border-neutral-200/80 dark:border-[#1E1E1E] bg-[#FAFAFA] dark:bg-[#111111] p-6 shadow-sm select-none ${className}`}
    >
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
          Today
        </span>
        <span className="text-xs font-medium text-neutral-500 dark:text-[#8E8E8E]">
          Avg 132.0 mg/dl
        </span>
      </div>

      {/* SVG Wave Graph matching reference (Left lower, peaks at morning/breakfast, dips slightly, lunch peak) */}
      <div className="w-full h-14 my-2 relative">
        <svg
          viewBox="0 0 340 60"
          className="w-full h-full overflow-visible"
          fill="none"
        >
          {/* Subtle dotted baseline */}
          <line
            x1="10"
            y1="36"
            x2="330"
            y2="36"
            stroke="currentColor"
            strokeDasharray="2 3"
            className="text-neutral-300 dark:text-neutral-800"
          />

          {/* Smooth glucose wave line */}
          <path
            d="M 15 48 C 45 42, 60 22, 90 20 C 130 18, 160 30, 205 32 C 240 33, 275 22, 325 36"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="text-neutral-900 dark:text-neutral-100"
          />

          {/* Point 1: Morning (98) at x=90, y=20 */}
          <circle
            cx="90"
            cy="20"
            r="3.5"
            className="fill-neutral-900 dark:fill-white stroke-white dark:stroke-[#111111] stroke-[2px]"
          />

          {/* Point 2: Breakfast (142) at x=205, y=32 */}
          <circle
            cx="205"
            cy="32"
            r="3.5"
            className="fill-neutral-900 dark:fill-white stroke-white dark:stroke-[#111111] stroke-[2px]"
          />

          {/* Point 3: Lunch (156) at x=290, y=26 */}
          <circle
            cx="280"
            cy="27"
            r="3.5"
            className="fill-neutral-900 dark:fill-white stroke-white dark:stroke-[#111111] stroke-[2px]"
          />
        </svg>
      </div>

      {/* Reading Chips with pill shape and subtle borders */}
      <div className="flex items-center gap-2 pt-2 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="px-3 py-1.5 rounded-xl bg-neutral-200/60 dark:bg-[#1A1A1A] border border-neutral-300/40 dark:border-neutral-800 flex items-center gap-1.5">
          <span className="text-neutral-500 dark:text-[#8E8E8E]">Morning</span>
          <span className="font-bold text-neutral-900 dark:text-white">98</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-neutral-200/60 dark:bg-[#1A1A1A] border border-neutral-300/40 dark:border-neutral-800 flex items-center gap-1.5">
          <span className="text-neutral-500 dark:text-[#8E8E8E]">Breakfast</span>
          <span className="font-bold text-neutral-900 dark:text-white">142</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-neutral-200/60 dark:bg-[#1A1A1A] border border-neutral-300/40 dark:border-neutral-800 flex items-center gap-1.5">
          <span className="text-neutral-500 dark:text-[#8E8E8E]">Lunch</span>
          <span className="font-bold text-neutral-900 dark:text-white">156</span>
        </div>
      </div>
    </div>
  );
}
