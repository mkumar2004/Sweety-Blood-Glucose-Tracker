import { useState, useMemo } from 'react';
import { History, Loader2 } from 'lucide-react';
import { useReadings } from '@/hooks/useReadings';
import { ReadingFilters } from './ReadingFilters';
import { ReadingsTable } from './ReadingsTable';
import { ReadingPagination } from './ReadingPagination';

// Map DB time_slot key → display name
const SLOT_LABELS = {
  morning: 'Morning (fasting)',
  after_breakfast: 'After breakfast',
  after_lunch: 'After lunch',
  after_dinner: 'After dinner',
};

function getStatus(value) {
  if (value === undefined || value === null) return 'In range';
  if (value < 70) return 'Low';
  if (value > 180) return 'High';
  return 'In range';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

const ROWS_PER_PAGE = 5;

export function RecentReadings({ onEditReading, onDeleteReading }) {
  const { readings, loading, error } = useReadings();
  const [selectedSlot, setSelectedSlot] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Transform DB readings → table-friendly shape and apply slot filter
  const filteredReadings = useMemo(() => {
    const mapped = readings.map((r) => {
      const slotKey = r.time_slot || r.timeSlot || 'morning';
      return {
        ...r,
        slot: SLOT_LABELS[slotKey] || slotKey,
        slotKey,
        date: formatDate(r.reading_date || r.date),
        time: formatTime(r.created_at),
        status: getStatus(r.value),
      };
    });

    if (selectedSlot === 'all') return mapped;
    return mapped.filter((item) => item.slotKey === selectedSlot);
  }, [readings, selectedSlot]);

  // Reset to page 1 when filter changes
  const totalPages = Math.max(1, Math.ceil(filteredReadings.length / ROWS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedReadings = useMemo(() => {
    const start = (safeCurrentPage - 1) * ROWS_PER_PAGE;
    return filteredReadings.slice(start, start + ROWS_PER_PAGE);
  }, [filteredReadings, safeCurrentPage]);

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
    setCurrentPage(1);
  };

  const handleExport = () => {
    // Build CSV from all filtered readings
    const headers = ['Slot', 'Date', 'Time', 'Value (mg/dl)', 'Status'];
    const rows = filteredReadings.map((r) => [
      r.slot,
      r.date,
      r.time,
      r.value,
      r.status,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'readings.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

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
          onSelectSlot={handleSlotChange}
          onExport={handleExport}
        />
      </div>

      {/* Error banner */}
      {error && (
        <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && readings.length === 0 && (
        <div className="flex items-center justify-center gap-2 py-10 text-xs text-neutral-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading readings…
        </div>
      )}

      {/* Empty state */}
      {!loading && readings.length === 0 && (
        <div className="text-center py-10 text-xs text-neutral-500">
          No readings yet. Add your first glucose reading above.
        </div>
      )}

      {/* Table */}
      {readings.length > 0 && (
        <>
          <ReadingsTable
            readings={paginatedReadings}
            onEdit={onEditReading}
            onDelete={onDeleteReading}
          />

          {/* Pagination & Legend */}
          <ReadingPagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          />
        </>
      )}
    </div>
  );
}
