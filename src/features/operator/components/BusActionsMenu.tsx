import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'

import type { Bus } from '@/types/bus'

type BusActionsMenuProps = {
  bus: Bus
  onEdit: (bus: Bus) => void
  onDelete: (bus: Bus) => void
}

function BusActionsMenu({
  bus,
  onEdit,
  onDelete,
}: BusActionsMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F7F3EA] hover:text-[#111827]"
        aria-label={`Actions for ${bus.busNumber}`}
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-36 rounded-xl border border-[#E7DFD0] bg-[#FFFCF5] p-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onEdit(bus)
            }}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-[#F7F3EA]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onDelete(bus)
            }}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default BusActionsMenu