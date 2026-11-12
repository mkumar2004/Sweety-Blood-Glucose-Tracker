import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReadingsHeader } from '@/components/readings/ReadingsHeader';
import { TodaySummary } from '@/components/readings/TodaySummary';
import { RecentReadings } from '@/components/readings/RecentReadings';
import { AddReadingDialog } from '@/components/readings/AddReadingDialog';

export function Readings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState('morning');

  const handleOpenAddDialog = (slot = 'morning') => {
    setActiveSlot(slot);
    setIsDialogOpen(true);
  };

  const handleSaveReading = (newReading) => {
    // UI-only demo interaction
    console.log('New reading saved (UI demo):', newReading);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <ReadingsHeader onAddReading={() => handleOpenAddDialog('morning')} />

        {/* Today 4 Slots Section */}
        <TodaySummary onAddReading={handleOpenAddDialog} />

        {/* Recent Readings Table & Filters */}
        <RecentReadings />

        {/* Add Reading Dialog */}
        <AddReadingDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          defaultSlot={activeSlot}
          onSave={handleSaveReading}
        />
      </div>
    </DashboardLayout>
  );
}

export default Readings;
