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
    <div className="rounded-3xl border border-neutral-800/80 bg-[#111111] p-4 sm:p-5 space-y-3">
      {/* Header of Recent Readings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-center text-neutral-400">
            <History className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-white leading-tight">Recent readings</h2>
            <span className="text-[9px] font-mono uppercase text-neutral-500">
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
