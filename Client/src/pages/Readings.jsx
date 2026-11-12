import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReadingsHeader } from '@/components/readings/ReadingsHeader';
import { TodaySummary } from '@/components/readings/TodaySummary';
import { RecentReadings } from '@/components/readings/RecentReadings';
import { AddReadingDialog } from '@/components/readings/AddReadingDialog';
import { useReadings } from '@/hooks/useReadings';

export function Readings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState('morning');
  const [editingReading, setEditingReading] = useState(null);

  const { addReading, editReading, removeReading, loading } = useReadings();

  const handleOpenAddDialog = (slot = 'morning') => {
    setEditingReading(null);
    setActiveSlot(slot);
    setIsDialogOpen(true);
  };

  const handleEditReading = (reading) => {
    setEditingReading(reading);
    setActiveSlot(reading.time_slot || reading.timeSlot || 'morning');
    setIsDialogOpen(true);
  };

  const handleDeleteReading = async (reading) => {
    if (!window.confirm('Are you sure you want to delete this reading?')) return;
    await removeReading(reading.id);
  };

  const handleSaveReading = async (readingData) => {
    if (editingReading) {
      const result = await editReading(editingReading.id, readingData);
      return result;
    } else {
      const result = await addReading(readingData);
      return result;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8">
        {/* Header */}
        <ReadingsHeader onAddReading={() => handleOpenAddDialog('morning')} />

        {/* Today 4 Slots Section */}
        <TodaySummary onAddReading={handleOpenAddDialog} />

        {/* Recent Readings Table & Filters */}
        <RecentReadings
          onEditReading={handleEditReading}
          onDeleteReading={handleDeleteReading}
        />

        {/* Add / Edit Reading Dialog */}
        <AddReadingDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingReading(null);
          }}
          defaultSlot={activeSlot}
          onSave={handleSaveReading}
          editingReading={editingReading}
        />
      </div>
    </DashboardLayout>
  );
}

export default Readings;
