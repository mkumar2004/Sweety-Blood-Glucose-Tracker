import { Filter, Download } from 'lucide-react';

export function ReadingFilters({ activeSlot = 'all', onSelectSlot, onExport }) {
  const slotOptions = [
    { id: 'all', label: 'All slots' },
    { id: 'morning', label: 'Morning' },
    { id: 'after_breakfast', label: 'After breakfast' },
    { id: 'after_lunch', label: 'After lunch' },
    { id: 'after_dinner', label: 'After dinner' },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* Slot Filter Button */}
      <div className="relative group">
        <select
          value={activeSlot}
          onChange={(e) => onSelectSlot?.(e.target.value)}
          className="appearance-none flex items-center gap-1.5 px-3 py-1.5 pl-8 pr-6 rounded-xl border border-neutral-800 bg-[#141414] text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer outline-none"
        >
          {slotOptions.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-[#141414] text-neutral-200">
              {opt.label}
            </option>
          ))}
        </select>
        <Filter className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-800 bg-[#141414] text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-neutral-400" />
        <span>Export</span>
      </button>
    </div>
  );
}

