import {
  Armchair,
  BusFront,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from 'lucide-react'
import type { Booking } from '@/types/booking'

interface BookingDetailsModalProps {
  booking: Booking | null
  open: boolean
  onClose: () => void
}

function getBookingStatusClasses(status: Booking['bookingStatus']) {
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

function getPaymentStatusClasses(status: Booking['paymentStatus']) {
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

function BookingDetailsModal({
  booking,
  open,
  onClose,
}: BookingDetailsModalProps) {
  if (!open || !booking) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#fffdf8] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e7dfd0] bg-[#fffdf8] px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9a7b42]">
              Booking Details
            </p>

            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {booking.id}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-[#f3eee5] hover:text-slate-900"
            aria-label="Close booking details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Booking summary */}
          <div className="rounded-xl border border-[#e7dfd0] bg-[#faf8f3] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">PNR / Booking Reference</p>

                <p className="mt-1 text-2xl font-bold tracking-wide text-slate-900">
                  {booking.pnr}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getBookingStatusClasses(
                    booking.bookingStatus,
                  )}`}
                >
                  {booking.bookingStatus}
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getPaymentStatusClasses(
                    booking.paymentStatus,
                  )}`}
                >
                  Payment: {booking.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Passenger */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Passenger Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<User size={17} />}
                label="Passenger Name"
                value={booking.passengerName}
              />

              <InfoItem
                icon={<Phone size={17} />}
                label="Phone"
                value={booking.phone}
              />

              <InfoItem
                icon={<Mail size={17} />}
                label="Email"
                value={booking.email || 'Not provided'}
              />
            </div>
          </section>

          {/* Trip */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Trip Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<BusFront size={17} />}
                label="Bus Number"
                value={booking.busNumber}
              />

              <InfoItem
                icon={<BusFront size={17} />}
                label="Bus Name"
                value={booking.busName || 'Not available'}
              />

              <InfoItem
                icon={<MapPin size={17} />}
                label="Route"
                value={booking.route}
              />

              <InfoItem
                icon={<CalendarDays size={17} />}
                label="Travel Date"
                value={booking.travelDate}
              />

              <InfoItem
                icon={<CalendarDays size={17} />}
                label="Departure"
                value={booking.departureTime || 'Not available'}
              />

              <InfoItem
                icon={<CalendarDays size={17} />}
                label="Arrival"
                value={booking.arrivalTime || 'Not available'}
              />
            </div>
          </section>

          {/* Seat & payment */}
          <section>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
              Booking & Payment
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<Armchair size={17} />}
                label="Seats"
                value={String(booking.seats)}
              />

              <InfoItem
                icon={<Armchair size={17} />}
                label="Seat Numbers"
                value={
                  booking.seatNumbers?.join(', ') || 'Not available'
                }
              />

              <InfoItem
                icon={<CreditCard size={17} />}
                label="Total Amount"
                value={`₹${booking.amount.toLocaleString('en-IN')}`}
              />

              <InfoItem
                icon={<CreditCard size={17} />}
                label="Payment Status"
                value={booking.paymentStatus}
              />

              <InfoItem
                icon={<CalendarDays size={17} />}
                label="Booked At"
                value={booking.bookedAt || 'Not available'}
              />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e7dfd0] bg-[#faf8f3] px-6 py-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#d9d0c1] bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-[#f3eee5]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="rounded-xl border border-[#e7dfd0] bg-[#fffdf8] p-4">
      <div className="flex items-center gap-2 text-[#9a7b42]">
        {icon}

        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  )
}

export default BookingDetailsModal