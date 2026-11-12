import { useState } from 'react';
import { History } from 'lucide-react';
import { ReadingFilters } from './ReadingFilters';
import { ReadingsTable } from './ReadingsTable';
import { ReadingPagination } from './ReadingPagination';

const initialMockReadings = [
  {
    id: 1,
    slot: 'After lunch',
    slotKey: 'after_lunch',
    date: '12 Nov 2026',
    time: '2:15 PM',
    value: 156,
    status: 'In range',
  },
  {
    id: 2,
    slot: 'After breakfast',
    slotKey: 'after_breakfast',
    date: '12 Nov 2026',
    time: '9:30 AM',
    value: 142,
    status: 'In range',
  },
  {
    id: 3,
    slot: 'Morning (fasting)',
    slotKey: 'morning',
    date: '12 Nov 2026',
    time: '6:45 AM',
    value: 98,
    status: 'In range',
  },
  {
    id: 4,
    slot: 'After dinner',
    slotKey: 'after_dinner',
    date: '11 Nov 2026',
    time: '8:40 PM',
    value: 187,
    status: 'High',
  },
  {
    id: 5,
    slot: 'Morning (fasting)',
    slotKey: 'morning',
    date: '11 Nov 2026',
    time: '6:50 AM',
    value: 64,
    status: 'Low',
  },
];

export function RecentReadings({ onEditReading, onDeleteReading }) {
  const [selectedSlot, setSelectedSlot] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReadings = initialMockReadings.filter((item) => {
    if (selectedSlot === 'all') return true;
    return item.slotKey === selectedSlot;
  });

  return (
    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#111111] p-5 sm:p-6 space-y-4">
      {/* Header of Recent Readings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Recent readings</h2>
            <span className="text-[10px] font-mono uppercase text-neutral-500">
              GET /readings
            </span>
          </div>
        </div>

        <ReadingFilters
          activeSlot={selectedSlot}
          onSelectSlot={(slot) => setSelectedSlot(slot)}
          onExport={() => alert('Exporting readings CSV... (UI Demo)')}
        />
      </div>

      {/* Table */}
      <ReadingsTable
        readings={filteredReadings}
        onEdit={onEditReading}
        onDelete={onDeleteReading}
      />

      {/* Pagination & Legend */}
      <ReadingPagination
        currentPage={currentPage}
        totalPages={4}
        onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, 4))}
      />
    </div>
  );
}
