import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { useReports } from '@/hooks/useReports';
import { Activity } from 'lucide-react';

const SLOT_SHORT = {
  morning: 'Morning',
  after_breakfast: 'Breakfast',
  after_lunch: 'Lunch',
  after_dinner: 'Dinner',
};

// Custom tooltip matching the clean SaaS dark/light palette
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-3 shadow-xl text-xs space-y-1">
        <p className="font-semibold text-neutral-900 dark:text-white">
          {data.displayDate} {data.slotName ? `• ${data.slotName}` : ''}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-neutral-900 dark:text-white">
            {data.value}
          </span>
          <span className="text-[10px] text-neutral-500">mg/dl</span>
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              data.value < 70
                ? 'bg-rose-500/10 text-rose-400'
                : data.value > 180
                ? 'bg-amber-500/10 text-amber-400'
                : 'bg-emerald-500/10 text-emerald-400'
            }`}
          >
            {data.value < 70 ? 'Low' : data.value > 180 ? 'High' : 'In range'}
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export function ReportChart() {
  const { reportData, reportType } = useReports();
  const rawReadings = reportData.rawReadings || [];

  // Prepare chart series from readings
  const chartData = useMemo(() => {
    if (!rawReadings || rawReadings.length === 0) return [];

    return rawReadings.map((r, idx) => {
      const dStr = (r.reading_date || '').slice(0, 10);
      const parts = dStr.split('-');
      const day = parts[2] ? parseInt(parts[2], 10) : idx + 1;
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const month = parts[1] ? monthNames[parseInt(parts[1], 10) - 1] : '';

      return {
        key: `${dStr}-${r.time_slot || idx}`,
        dateLabel: `${day} ${month}`,
        displayDate: `${day} ${month}`,
        slotName: SLOT_SHORT[r.time_slot] || r.time_slot || '',
        value: Number(r.value),
      };
    });
  }, [rawReadings]);

  // If there are no readings or only 0 items, don't show an empty broken chart
  if (!chartData || chartData.length === 0) {
    return null;
  }

  const chartTitle =
    reportType === 'daily'
      ? `Glucose Trend – ${reportData.dateRange}`
      : reportType === 'mtd'
      ? `Readings over the Month-to-date (${reportData.dateRange})`
      : `Readings over the Previous Month (${reportData.dateRange})`;

  return (
    <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#111111] p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
              {chartTitle}
            </h2>
            <p className="text-[11px] text-neutral-500">
              Target in-range band: 70 – 180 mg/dl
            </p>
          </div>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            Glucose line
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-neutral-400 dark:bg-neutral-600 inline-block" />
            Target range (70–180)
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 15, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-800"
            />

            <XAxis
              dataKey="dateLabel"
              tickLine={false}
              axisLine={{ stroke: 'currentColor', className: 'text-neutral-200 dark:text-neutral-800' }}
              tick={{ fill: '#737373', fontSize: 11 }}
            />

            <YAxis
              domain={[40, 'auto']}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#737373', fontSize: 11 }}
              unit=" "
            />

            <Tooltip content={<CustomTooltip />} />

            {/* In-range reference lines */}
            <ReferenceLine
              y={70}
              stroke="#f43f5e"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
            />
            <ReferenceLine
              y={180}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeOpacity={0.6}
            />

            {/* Main Trend Line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#10b981', strokeWidth: 1, stroke: '#ffffff' }}
              activeDot={{ r: 5, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

