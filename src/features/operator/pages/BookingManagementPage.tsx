import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Eye,
  Search,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import BookingDetailsModal from '@/features/operator/components/BookingDetailsModal'
import { mockBookings } from '@/data/mockOperator'
import type {
  Booking,
  BookingStatus,
  PaymentStatus,
} from '@/types/booking'

function getBookingStatusClasses(status: BookingStatus) {
  switch (status) {
    case 'Confirmed':
      return 'bg-emerald-100 text-emerald-700'

    case 'Pending':
      return 'bg-amber-100 text-amber-700'

    case 'Cancelled':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-slate-100 text-slate-700'
  }
}

function getPaymentStatusClasses(status: PaymentStatus) {
  switch (status) {
    case 'Paid':
      return 'bg-emerald-100 text-emerald-700'

    case 'Pending':
      return 'bg-amber-100 text-amber-700'

    case 'Failed':
      return 'bg-red-100 text-red-700'

    case 'Refunded':
      return 'bg-purple-100 text-purple-700'

    default:
      return 'bg-slate-100 text-slate-700'
  }
}

function BookingManagementPage() {
  const bookings = mockBookings

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'All' | BookingStatus
  >('All')

  const [paymentFilter, setPaymentFilter] = useState<
    'All' | PaymentStatus
  >('All')

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null)

  const filteredBookings = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return bookings.filter((booking) => {
      const matchesSearch =
        searchValue === '' ||
        booking.id.toLowerCase().includes(searchValue) ||
        booking.pnr.toLowerCase().includes(searchValue) ||
        booking.passengerName.toLowerCase().includes(searchValue) ||
        booking.phone.toLowerCase().includes(searchValue) ||
        booking.busNumber.toLowerCase().includes(searchValue) ||
        booking.route.toLowerCase().includes(searchValue)

      const matchesBookingStatus =
        statusFilter === 'All' ||
        booking.bookingStatus === statusFilter

      const matchesPaymentStatus =
        paymentFilter === 'All' ||
        booking.paymentStatus === paymentFilter

      return (
        matchesSearch &&
        matchesBookingStatus &&
        matchesPaymentStatus
      )
    })
  }, [bookings, search, statusFilter, paymentFilter])

  return (
    <>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a7b42]">
            Bookings
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Booking Management
          </h1>

          <p className="mt-2 text-slate-600">
            View passenger bookings, booking status and payment status.
          </p>
        </div>

        {/* Booking Table Card */}
        <Card className="overflow-hidden p-0">
          {/* Toolbar */}
          <div className="border-b border-[#e8e1d5] p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  All Bookings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredBookings.length}{' '}
                  {filteredBookings.length === 1
                    ? 'booking'
                    : 'bookings'}{' '}
                  found
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-3 lg:flex-row">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search booking, PNR, passenger..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    className="w-full rounded-xl border border-[#ddd5c8] bg-[#fffdf8] py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#9a7b42] focus:ring-1 focus:ring-[#9a7b42] lg:w-72"
                  />
                </div>

                {/* Booking Status */}
                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target.value as 'All' | BookingStatus,
                    )
                  }
                  className="rounded-xl border border-[#ddd5c8] bg-[#fffdf8] px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-1 focus:ring-[#9a7b42]"
                >
                  <option value="All">
                    All Booking Status
                  </option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Payment Status */}
                <select
                  value={paymentFilter}
                  onChange={(event) =>
                    setPaymentFilter(
                      event.target.value as 'All' | PaymentStatus,
                    )
                  }
                  className="rounded-xl border border-[#ddd5c8] bg-[#fffdf8] px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-1 focus:ring-[#9a7b42]"
                >
                  <option value="All">
                    All Payment Status
                  </option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] text-left">
              <thead className="bg-[#f8f5ef]">
                <tr className="text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">
                    Booking
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Passenger
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Bus / Route
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Travel Date
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Seats
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Amount
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Booking Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-center font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-[#eee8de] text-sm transition hover:bg-[#fcfaf5]"
                  >
                    {/* Booking */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {booking.id}
                      </p>

                      <p className="mt-1 text-xs font-medium tracking-wide text-[#9a7b42]">
                        PNR: {booking.pnr}
                      </p>
                    </td>

                    {/* Passenger */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">
                        {booking.passengerName}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {booking.phone}
                      </p>
                    </td>

                    {/* Bus / Route */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">
                        {booking.busNumber}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {booking.route}
                      </p>
                    </td>

                    {/* Travel Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CalendarDays
                          size={15}
                          className="text-[#9a7b42]"
                        />

                        <span>{booking.travelDate}</span>
                      </div>

                      <p className="mt-1 pl-5 text-xs text-slate-400">
                        {booking.departureTime}
                      </p>
                    </td>

                    {/* Seats */}
                    <td className="px-6 py-4 text-slate-600">
                      <p>{booking.seats}</p>

                      {booking.seatNumbers &&
                        booking.seatNumbers.length > 0 && (
                          <p className="mt-1 text-xs text-slate-400">
                            {booking.seatNumbers.join(', ')}
                          </p>
                        )}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      ₹{booking.amount.toLocaleString('en-IN')}
                    </td>

                    {/* Booking Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBookingStatusClasses(
                          booking.bookingStatus,
                        )}`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClasses(
                          booking.paymentStatus,
                        )}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-[#d9d0c1] bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#b08d57] hover:bg-[#f8f3e9] hover:text-slate-900"
                      >
                        <Eye size={15} />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-16 text-center"
                    >
                      <div className="mx-auto max-w-md">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eee5]">
                          <Search
                            size={20}
                            className="text-[#9a7b42]"
                          />
                        </div>

                        <h3 className="mt-4 font-semibold text-slate-900">
                          No bookings found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Try changing your search or filter
                          criteria.
                        </p>

                        {(search ||
                          statusFilter !== 'All' ||
                          paymentFilter !== 'All') && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearch('')
                              setStatusFilter('All')
                              setPaymentFilter('All')
                            }}
                            className="mt-4 text-sm font-semibold text-[#9a7b42] hover:underline"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        open={selectedBooking !== null}
        onClose={() => setSelectedBooking(null)}
      />
    </>
  )
}

export default BookingManagementPage