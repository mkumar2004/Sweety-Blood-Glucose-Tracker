import { FileX2 } from 'lucide-react';

export function ReportEmptyState({ message = 'No reading logs available for this period.' }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
      <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
        <FileX2 className="w-5 h-5" />
      </div>
      <p className="text-xs text-neutral-500">{message}</p>
    </div>
  );
}

