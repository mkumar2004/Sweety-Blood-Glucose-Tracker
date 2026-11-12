import { Inbox } from 'lucide-react';

export function EmptyState({ title = 'No readings yet', description = 'Add your first reading to get started.' }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-3">
        <Inbox className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-neutral-300">{title}</h3>
      <p className="text-xs text-neutral-500 mt-1 max-w-xs">{description}</p>
    </div>
  );
}

