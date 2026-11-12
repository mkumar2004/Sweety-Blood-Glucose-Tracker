import { useReports } from '@/hooks/useReports';
import { ReportStatCard } from './ReportStatCard';
import { Loader2 } from 'lucide-react';

export function ReportSummary() {
  const { reportData, loading } = useReports();

  return (
    <div className="space-y-3">
      {loading && (
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Updating statistics…
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Highest */}
        <ReportStatCard
          label="Highest"
          value={reportData.highest}
          unit={reportData.highest !== '—' ? 'mg/dl' : ''}
        />

        {/* 2. Lowest */}
        <ReportStatCard
          label="Lowest"
          value={reportData.lowest}
          unit={reportData.lowest !== '—' ? 'mg/dl' : ''}
        />

        {/* 3. Average (Highlighted light card) */}
        <ReportStatCard
          label="Average"
          value={reportData.average}
          unit={reportData.average !== '—' ? 'mg/dl' : ''}
          isHighlight={true}
        />

        {/* 4. Readings Count */}
        <ReportStatCard
          label="Readings"
          value={reportData.readingsCount}
          unit=""
          subtitle={
            reportData.type === 'daily'
              ? `of ${reportData.totalSlots}`
              : `readings logged`
          }
        />
      </div>
    </div>
  );
}
