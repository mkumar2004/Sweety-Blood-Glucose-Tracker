import { ReadingTableRow } from './ReadingTableRow';

export function ReadingsTable({ readings = [], onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[620px]">
        <thead>
          <tr className="border-b border-neutral-800 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase">
            <th className="py-2 px-3 font-medium w-[22%]">Slot</th>
            <th className="py-2 px-3 font-medium w-[22%]">Date</th>
            <th className="py-2 px-3 font-medium w-[24%]">Value</th>
            <th className="py-2 px-3 font-medium w-[20%]">Status</th>
            <th className="py-2 px-3 text-right font-medium w-[12%]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/40">
          {readings.map((reading, index) => (
            <ReadingTableRow
              key={reading.id || index}
              reading={reading}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
