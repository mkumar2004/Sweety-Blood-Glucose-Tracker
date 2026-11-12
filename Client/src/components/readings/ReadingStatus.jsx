import { Check, ArrowUp, ArrowDown } from 'lucide-react';

export function ReadingStatus({ status, value, className = '' }) {
  // Determine status if not explicitly given
  let finalStatus = status;
  if (!finalStatus && value !== undefined) {
    if (value < 70) finalStatus = 'Low';
    else if (value <= 180) finalStatus = 'In range';
    else finalStatus = 'High';
  }

  if (finalStatus === 'Low') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-rose-500/30 bg-rose-500/10 text-rose-400 ${className}`}
      >
        <ArrowDown className="w-3 h-3 text-rose-400" />
        Low
      </span>
    );
  }

  if (finalStatus === 'High') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-amber-500/30 bg-amber-500/10 text-amber-400 ${className}`}
      >
        <ArrowUp className="w-3 h-3 text-amber-400" />
        High
      </span>
    );
  }

  // Default: In range
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border border-neutral-700/80 bg-neutral-900/90 text-neutral-300 ${className}`}
    >
      <Check className="w-3 h-3 text-neutral-400" />
      In range
    </span>
  );
}

