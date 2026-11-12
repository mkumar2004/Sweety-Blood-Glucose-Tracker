import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export function AddReadingDialog({
  isOpen,
  onClose,
  defaultSlot = 'morning',
  onSave,
  editingReading = null,
}) {
  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState(defaultSlot);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const isEditing = !!editingReading;

  // Sync form when dialog opens or editingReading changes
  useEffect(() => {
    if (editingReading) {
      // Populate form from existing reading
      const rDate = (editingReading.reading_date || editingReading.date || '').slice(0, 10);
      setDate(rDate || today);
      setTimeSlot(editingReading.time_slot || editingReading.timeSlot || defaultSlot);
      setValue(String(editingReading.value || ''));
    } else {
      setDate(today);
      setTimeSlot(defaultSlot);
      setValue('');
    }
    setError('');
  }, [editingReading, defaultSlot, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ── Client-side validation ──
    const valNum = Number(value);
    if (!value || isNaN(valNum) || !Number.isInteger(valNum)) {
      setError('Glucose value must be an integer.');
      return;
    }

    if (valNum < 40 || valNum > 600) {
      setError('Value must be between 40 and 600 mg/dl.');
      return;
    }

    if (date > today) {
      setError('Date cannot be in the future.');
      return;
    }

    // ── Call API via parent handler ──
    setSaving(true);
    try {
      const result = await onSave?.({
        date,
        timeSlot,
        value: valNum,
      });

      if (result && !result.success) {
        setError(result.message || 'Failed to save reading.');
        setSaving(false);
        return;
      }

      setSaving(false);
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 relative animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={saving}
          className="absolute right-4 top-4 p-1 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
          {isEditing ? 'Edit glucose reading' : 'Add glucose reading'}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5">
          {isEditing ? 'Update your blood sugar measurement.' : 'Record your blood sugar measurement.'}
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reading Date */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Date</label>
            <input
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
              disabled={saving}
              className="w-full h-10 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#1a1a1a] text-xs text-neutral-900 dark:text-white outline-none focus:border-neutral-500 disabled:opacity-50"
            />
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Time slot</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              disabled={saving}
              className="w-full h-10 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#1a1a1a] text-xs text-neutral-900 dark:text-white outline-none focus:border-neutral-500 disabled:opacity-50"
            >
              <option value="morning">Morning (fasting)</option>
              <option value="after_breakfast">After breakfast</option>
              <option value="after_lunch">After lunch</option>
              <option value="after_dinner">After dinner</option>
            </select>
          </div>

          {/* Glucose Value */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Glucose value (mg/dl)
            </label>
            <input
              type="number"
              placeholder="e.g. 120"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={saving}
              className="w-full h-10 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-[#1a1a1a] text-xs text-neutral-900 dark:text-white outline-none focus:border-neutral-500 disabled:opacity-50"
            />
            <p className="text-[11px] text-neutral-500">Between 40 and 600 mg/dl.</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-[#1c1c1c] text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isEditing ? 'Update reading' : 'Save reading'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
