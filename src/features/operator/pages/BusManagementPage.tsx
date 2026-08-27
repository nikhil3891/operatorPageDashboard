import { useMemo, useState } from 'react'
import { Search, Plus } from 'lucide-react'

import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import BusForm from '@/features/operator/components/BusForm'
import BusActionsMenu from '@/features/operator/components/BusActionsMenu'
import { mockBuses } from '@/data/mockBuses'
import type { Bus } from '@/types/bus'

function BusManagementPage() {
  const [buses, setBuses] = useState<Bus[]>([...mockBuses])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBus, setEditingBus] = useState<Bus | null>(null)

  const filteredBuses = useMemo(() => {
    return buses.filter((bus) => {
      const searchTerm = search.toLowerCase()

      const matchesSearch =
        bus.busNumber.toLowerCase().includes(searchTerm) ||
        bus.busName.toLowerCase().includes(searchTerm) ||
        bus.route.toLowerCase().includes(searchTerm)

      const matchesStatus =
        statusFilter === 'All' || bus.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [buses, search, statusFilter])

  const activeBuses = buses.filter(
    (bus) => bus.status === 'Active',
  ).length

  const openAddModal = () => {
    setEditingBus(null)
    setIsModalOpen(true)
  }

  const handleEditBus = (bus: Bus) => {
    setEditingBus(bus)
    setIsModalOpen(true)
  }

  const handleDeleteBus = (bus: Bus) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${bus.busNumber}?`,
    )

    if (!confirmed) {
      return
    }

    setBuses((currentBuses) =>
      currentBuses.filter((currentBus) => currentBus.id !== bus.id),
    )
  }

  const handleSaveBus = (data: Omit<Bus, 'id'>) => {
    if (editingBus) {
      setBuses((currentBuses) =>
        currentBuses.map((bus) =>
          bus.id === editingBus.id
            ? {
                ...editingBus,
                ...data,
              }
            : bus,
        ),
      )
    } else {
      const newBus: Bus = {
        id: `BUS-${String(buses.length + 1).padStart(3, '0')}`,
        ...data,
      }

      setBuses((currentBuses) => [...currentBuses, newBus])
    }

    closeModal()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingBus(null)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#B08D57]">
            Fleet Management
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#111827]">
            Buses
          </h1>

          <p className="mt-2 text-base text-[#6B7280]">
            Manage your buses, routes and availability.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1F2937]"
        >
          <Plus size={18} />
          Add Bus
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="bg-[#FFFCF5]">
          <p className="text-sm text-[#6B7280]">Total Buses</p>

          <p className="mt-2 text-3xl font-semibold text-[#111827]">
            {buses.length}
          </p>
        </Card>

        <Card className="bg-[#FFFCF5]">
          <p className="text-sm text-[#6B7280]">Active Buses</p>

          <p className="mt-2 text-3xl font-semibold text-[#111827]">
            {activeBuses}
          </p>
        </Card>
      </div>

      {/* Bus List */}
      <Card className="overflow-hidden bg-[#FFFCF5] p-0">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-[#E7DFD0] p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#111827]">
              All Buses
            </h2>

            <p className="mt-1 text-sm text-[#6B7280]">
              {filteredBuses.length} buses found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />

              <input
                type="text"
                placeholder="Search buses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-[#E7DFD0] bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#B08D57] sm:w-64"
              />
            </div>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-[#E7DFD0] bg-white px-4 py-2.5 text-sm text-[#374151] outline-none focus:border-[#B08D57]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-[#E7DFD0] bg-[#F7F3EA]">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Bus
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Route
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Seats
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredBuses.map((bus) => (
                <tr
                  key={bus.id}
                  className="border-b border-[#E7DFD0] last:border-b-0"
                >
                  <td className="px-5 py-5">
                    <p className="font-semibold text-[#111827]">
                      {bus.busNumber}
                    </p>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      {bus.busName}
                    </p>
                  </td>

                  <td className="px-5 py-5 text-sm text-[#374151]">
                    {bus.route}
                  </td>

                  <td className="px-5 py-5">
                    <p className="text-sm font-medium text-[#111827]">
                      {bus.availableSeats} available
                    </p>

                    <p className="mt-1 text-xs text-[#9CA3AF]">
                      {bus.totalSeats} total
                    </p>
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={
                        bus.status === 'Active'
                          ? 'inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700'
                          : 'inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600'
                      }
                    >
                      {bus.status}
                    </span>
                  </td>

                  <td className="px-5 py-5 text-right">
                    {/* Three-dot actions menu */}
                    <BusActionsMenu
                      bus={bus}
                      onEdit={handleEditBus}
                      onDelete={handleDeleteBus}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredBuses.length === 0 && (
          <div className="p-10 text-center">
            <p className="font-medium text-[#111827]">
              No buses found
            </p>

            <p className="mt-1 text-sm text-[#6B7280]">
              Try changing your search or status filter.
            </p>
          </div>
        )}
      </Card>

      {/* Add / Edit Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingBus ? 'Edit Bus' : 'Add Bus'}
      >
        <BusForm
          initialData={editingBus ?? undefined}
          onSubmit={handleSaveBus}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  )
}

export default BusManagementPage