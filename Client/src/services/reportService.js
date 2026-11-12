import { API } from "./authservices";

// Format helper
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function formatDateFull(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.slice(0, 10).split('-').map(Number);
  const dateObj = new Date(Date.UTC(y, m - 1, d));
  const day = dateObj.getUTCDate();
  const month = MONTH_NAMES[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function computeReportRanges(selectedDate = '2026-11-12') {
  const [y, m, d] = selectedDate.split('-').map(Number);
  const currDate = new Date(Date.UTC(y, m - 1, d));

  const day = currDate.getUTCDate();
  const monthName = MONTH_NAMES[currDate.getUTCMonth()];
  const year = currDate.getUTCFullYear();

  // Daily: Selected date
  const dailyRange = `${day} ${monthName} ${year}`;

  // Month-to-date: 1st of the month to the selected date
  const mtdRange = `1 ${monthName} – ${day} ${monthName} ${year}`;

  // Monthly: The whole previous month
  const prevMonthStart = new Date(Date.UTC(year, currDate.getUTCMonth() - 1, 1));
  const prevMonthEnd = new Date(Date.UTC(year, currDate.getUTCMonth(), 0));

  const prevStartDay = prevMonthStart.getUTCDate();
  const prevEndDay = prevMonthEnd.getUTCDate();
  const prevMonthName = MONTH_NAMES[prevMonthStart.getUTCMonth()];
  const prevYear = prevMonthStart.getUTCFullYear();

  const monthlyRange = `${prevStartDay} ${prevMonthName} – ${prevEndDay} ${prevMonthName} ${prevYear}`;

  return {
    dailyRange,
    mtdRange,
    monthlyRange,
  };
}

// ── API Calls ────────────────────────────────────────────────────────

export const fetchDailyReportAPI = async (date) => {
  const response = await API.get(`/api/reports/daily?date=${date}`);
  return response.data;
};

export const fetchMonthToDateReportAPI = async (date) => {
  const response = await API.get(`/api/reports/month-to-date?date=${date}`);
  return response.data;
};

export const fetchMonthlyReportAPI = async (date) => {
  const response = await API.get(`/api/reports/monthly?date=${date}`);
  return response.data;
};
