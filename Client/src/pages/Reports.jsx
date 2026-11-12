import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportProvider } from '@/context/ReportContext';
import { ReportsHeader } from '@/components/reports/ReportsHeader';
import { ReportTabs } from '@/components/reports/ReportTabs';
import { ReportSummary } from '@/components/reports/ReportSummary';
import { DailyReportTable } from '@/components/reports/DailyReportTable';

export function Reports() {
  return (
    <ReportProvider>
      <DashboardLayout>
        <div className="space-y-6 pb-8">
          {/* Header & Date Picker */}
          <ReportsHeader />

          {/* Daily / Month-to-date / Monthly Tabs */}
          <ReportTabs />

          {/* 4 Summary Stat Cards */}
          <ReportSummary />

          {/* Table of Readings / Slots */}
          <DailyReportTable />
        </div>
      </DashboardLayout>
    </ReportProvider>
  );
}

export default Reports;

