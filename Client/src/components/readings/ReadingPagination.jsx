import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ReadingPagination({
  currentPage = 1,
  totalPages = 4,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800/60 text-xs text-neutral-400">
      {/* Status Legend (Bottom-left from screenshot) */}
      <div className="flex items-center gap-4 text-[11px] text-neutral-500">
        <span className="flex items-center gap-1">
          <span className="text-rose-400 font-medium">↓ Low</span> &lt; 70
        </span>
        <span className="flex items-center gap-1">
          <span className="text-neutral-300 font-medium">✓ In range</span> 70–180
        </span>
        <span className="flex items-center gap-1">
          <span className="text-amber-400 font-medium">↑ High</span> &gt; 180 mg/dl
        </span>
      </div>

      {/* Page controls */}
      <div className="flex items-center gap-3">
        <span className="text-neutral-400 text-xs">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevious}
            disabled={currentPage <= 1}
            className="p-1.5 rounded-lg border border-neutral-800 bg-[#141414] text-neutral-400 hover:text-white hover:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onNext}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded-lg border border-neutral-800 bg-[#141414] text-neutral-400 hover:text-white hover:border-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

