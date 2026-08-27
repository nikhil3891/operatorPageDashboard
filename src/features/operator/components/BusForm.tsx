import { useState } from 'react'

import type { Bus, BusStatus } from '@/types/bus'

type BusFormData = Omit<Bus, 'id'>

type BusFormProps = {
  initialData?: Bus
  onSubmit: (data: BusFormData) => void
  onCancel: () => void
}

function BusForm({
  initialData,
  onSubmit,
  onCancel,
}: BusFormProps) {
  const [busNumber, setBusNumber] = useState(
    initialData?.busNumber ?? '',
  )

  const [busName, setBusName] = useState(
    initialData?.busName ?? '',
  )

  const [busType, setBusType] = useState(
    initialData?.busType ?? '',
  )

  const [route, setRoute] = useState(
    initialData?.route ?? '',
  )

  const [totalSeats, setTotalSeats] = useState(
    initialData?.totalSeats.toString() ?? '',
  )

  const [availableSeats, setAvailableSeats] = useState(
    initialData?.availableSeats.toString() ?? '',
  )

  const [departureTime, setDepartureTime] = useState(
    initialData?.departureTime ?? '',
  )

  const [arrivalTime, setArrivalTime] = useState(
    initialData?.arrivalTime ?? '',
  )

  const [status, setStatus] = useState<BusStatus>(
    initialData?.status ?? 'Active',
  )

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    onSubmit({
      busNumber: busNumber.trim(),
      busName: busName.trim(),
      busType: busType.trim(),
      route: route.trim(),
      totalSeats: Number(totalSeats),
      availableSeats: Number(availableSeats),
      departureTime,
      arrivalTime,
      status,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Bus Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Bus Number
          </label>

          <input
            value={busNumber}
            onChange={(event) =>
              setBusNumber(event.target.value)
            }
            placeholder="DL-01-AB-1234"
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Bus Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Bus Name
          </label>

          <input
            value={busName}
            onChange={(event) =>
              setBusName(event.target.value)
            }
            placeholder="Volvo Multi-Axle"
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Bus Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Bus Type
          </label>

          <select
            value={busType}
            onChange={(event) =>
              setBusType(event.target.value)
            }
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          >
            <option value="">Select bus type</option>
            <option value="AC Sleeper">AC Sleeper</option>
            <option value="AC Seater">AC Seater</option>
            <option value="Non-AC Sleeper">
              Non-AC Sleeper
            </option>
            <option value="Non-AC Seater">
              Non-AC Seater
            </option>
          </select>
        </div>

        {/* Route */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Route
          </label>

          <input
            value={route}
            onChange={(event) =>
              setRoute(event.target.value)
            }
            placeholder="Delhi → Jaipur"
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Total Seats */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Total Seats
          </label>

          <input
            type="number"
            min="1"
            value={totalSeats}
            onChange={(event) =>
              setTotalSeats(event.target.value)
            }
            placeholder="40"
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Available Seats */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Available Seats
          </label>

          <input
            type="number"
            min="0"
            value={availableSeats}
            onChange={(event) =>
              setAvailableSeats(event.target.value)
            }
            placeholder="20"
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Departure */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Departure Time
          </label>

          <input
            type="time"
            value={departureTime}
            onChange={(event) =>
              setDepartureTime(event.target.value)
            }
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Arrival */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Arrival Time
          </label>

          <input
            type="time"
            value={arrivalTime}
            onChange={(event) =>
              setArrivalTime(event.target.value)
            }
            required
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as BusStatus)
            }
            className="w-full rounded-lg border border-[#E7DFD0] bg-white px-4 py-3 text-sm outline-none focus:border-[#B08D57]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-[#E7DFD0] pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#E7DFD0] px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-[#F7F3EA]"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1F2937]"
        >
          {initialData ? 'Update Bus' : 'Add Bus'}
        </button>
      </div>
    </form>
  )
}

export default BusForm