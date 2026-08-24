import { Search } from 'lucide-react'
import Card from '@/components/ui/Card'
import { mockBookings } from '@/data/mockOperator'

function BookingManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a7b42]">
          Bookings
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Booking Management
        </h1>

        <p className="mt-2 text-slate-600">
          View and manage passenger bookings.
        </p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-[#e8e1d5] p-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-slate-900">
            All Bookings
          </h2>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search booking..."
              className="w-full rounded-xl border border-[#ddd5c8] bg-[#fffdf8] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#9a7b42] sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead className="bg-[#f8f5ef]">
              <tr className="text-sm text-slate-500">
                <th className="px-6 py-4 font-medium">Booking</th>
                <th className="px-6 py-4 font-medium">Passenger</th>
                <th className="px-6 py-4 font-medium">Bus</th>
                <th className="px-6 py-4 font-medium">Travel Date</th>
                <th className="px-6 py-4 font-medium">Seats</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {mockBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t border-[#eee8de] text-sm"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {booking.id}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">
                      {booking.passengerName}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {booking.phone}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {booking.busNumber}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {booking.travelDate}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {booking.seats}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ₹{booking.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : booking.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default BookingManagementPage