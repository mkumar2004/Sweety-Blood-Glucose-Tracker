import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  fetchDailyReportAPI,
  fetchMonthToDateReportAPI,
  fetchMonthlyReportAPI,
  computeReportRanges,
  formatDateFull,
} from '@/services/reportService';

export const ReportContext = createContext(null);

const DEFAULT_SLOTS = [
  { slot: 'Morning (fasting)', slotKey: 'morning' },
  { slot: 'After breakfast', slotKey: 'after_breakfast' },
  { slot: 'After lunch', slotKey: 'after_lunch' },
  { slot: 'After dinner', slotKey: 'after_dinner' },
];

function getStatus(value) {
  if (value === undefined || value === null) return 'Not logged';
  if (value < 70) return 'Low';
  if (value > 180) return 'High';
  return 'In range';
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

export function ReportProvider({ children }) {
  const { isAuthenticated, token } = useAuth();

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [reportType, setReportType] = useState('daily'); // 'daily' | 'mtd' | 'monthly'
  const [selectedDate, setSelectedDate] = useState('2026-11-12');
  const [displayDateString, setDisplayDateString] = useState('Thu, 12 Nov 2026');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);

  const fetchReport = useCallback(async () => {
    if (!isAuthenticated || !token || !selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      let data;
      if (reportType === 'mtd') {
        data = await fetchMonthToDateReportAPI(selectedDate);
      } else if (reportType === 'monthly') {
        data = await fetchMonthlyReportAPI(selectedDate);
      } else {
        data = await fetchDailyReportAPI(selectedDate);
      }
      setApiData(data);
    } catch (err) {
      console.error('Fetch Report Error:', err);
      setError(err.response?.data?.message || 'Failed to load report.');
      setApiData(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token, selectedDate, reportType]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  // Derived structured report data for UI consumption
  const reportData = useMemo(() => {
    const ranges = computeReportRanges(selectedDate);

    let dateRange = ranges.dailyRange;
    let apiEndpoint = `GET /reports/daily?date=${selectedDate}`;
    let dateDescription = 'The selected date';

    if (reportType === 'mtd') {
      dateRange = ranges.mtdRange;
      apiEndpoint = `GET /reports/month-to-date?date=${selectedDate}`;
      dateDescription = '1st of the month to the selected date';
    } else if (reportType === 'monthly') {
      dateRange = ranges.monthlyRange;
      apiEndpoint = `GET /reports/monthly?date=${selectedDate}`;
      dateDescription = 'The whole previous month';
    }

    if (!apiData) {
      return {
        type: reportType,
        date: selectedDate,
        dateRange,
        dateDescription,
        apiEndpoint,
        highest: '—',
        lowest: '—',
        average: '—',
        readingsCount: 0,
        totalSlots: reportType === 'daily' ? 4 : 0,
        hasReadings: false,
        slots: DEFAULT_SLOTS.map((s) => ({
          ...s,
          time: '—',
          value: null,
          status: 'Not logged',
          isLogged: false,
        })),
      };
    }

    const highest = apiData.highest !== null && apiData.highest !== undefined ? apiData.highest : '—';
    const lowest = apiData.lowest !== null && apiData.lowest !== undefined ? apiData.lowest : '—';
    const average = apiData.average !== null && apiData.average !== undefined ? Number(apiData.average).toFixed(1) : '—';
    const readingsCount = apiData.totalReadings || 0;

    // Build the 4 slot rows for daily report
    const dbReadings = apiData.readings || [];
    const slots = DEFAULT_SLOTS.map((def) => {
      const found = dbReadings.find((r) => r.time_slot === def.slotKey);
      if (found) {
        return {
          slot: def.slot,
          slotKey: def.slotKey,
          time: formatTime(found.created_at) || 'Logged',
          value: found.value,
          status: getStatus(found.value),
          isLogged: true,
        };
      }
      return {
        slot: def.slot,
        slotKey: def.slotKey,
        time: '—',
        value: null,
        status: 'Not logged',
        isLogged: false,
      };
    });

    return {
      type: reportType,
      date: selectedDate,
      dateRange,
      dateDescription,
      apiEndpoint,
      highest,
      lowest,
      average,
      readingsCount,
      totalSlots: reportType === 'daily' ? 4 : (apiData.totalSlots || readingsCount),
      hasReadings: readingsCount > 0,
      slots,
    };
  }, [selectedDate, reportType, apiData]);

  return (
    <ReportContext.Provider
      value={{
        reportType,
        setReportType,
        selectedDate,
        setSelectedDate,
        displayDateString,
        setDisplayDateString,
        reportData,
        loading,
        error,
        fetchReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export default ReportContext;
