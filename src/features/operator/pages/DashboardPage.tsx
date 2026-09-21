import {
  ArrowRight,
  BusFront,
  CalendarDays,
  CreditCard,
  IndianRupee,
  Ticket,
} from 'lucide-react'
import { Link } from 'react-router-dom'

import Card from '@/components/ui/Card'
import { mockDashboard } from '@/data/mockDashboard'

function getBookingStatusClass(status: string) {
  switch (status) {
    case 'Confirmed':
      return 'bg-emerald-100 text-emerald-700'

    case 'Pending':
      return 'bg-amber-100 text-amber-700'

    case 'Cancelled':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function getPaymentStatusClass(status: string) {
  switch (status) {
    case 'Paid':
      return 'bg-emerald-100 text-emerald-700'

    case 'Pending':
      return 'bg-amber-100 text-amber-700'

    case 'Failed':
      return 'bg-red-100 text-red-700'

    case 'Refunded':
      return 'bg-slate-100 text-slate-700'

    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function DashboardPage() {
  const { operator, stats, recentBookings } = mockDashboard

  return (
    <div className="min-h-full bg-[#f5f1e8] p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#9a8060] sm:text-sm">
          Operator Portal
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-[#1c1917] sm:text-3xl">
          Operator Dashboard
        </h1>

        <p className="mt-2 text-sm text-[#6b6257] sm:text-base">
          Welcome back, {operator.name}.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Total Buses */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#8a7a68]">
                Total Buses
              </p>

              <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
                {stats.totalBuses}
              </p>

              <p className="mt-2 text-xs text-[#8a7a68]">
                Buses registered
              </p>
            </div>

            <div className="rounded-xl bg-[#f1e8d7] p-3 text-[#9a7b42]">
              <BusFront size={21} />
            </div>
          </div>
        </Card>

        {/* Active Buses */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#8a7a68]">
                Active Buses
              </p>

              <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
                {stats.activeBuses}
              </p>

              <p className="mt-2 text-xs text-[#8a7a68]">
                Currently active
              </p>
            </div>

            <div className="rounded-xl bg-[#f1e8d7] p-3 text-[#9a7b42]">
              <BusFront size={21} />
            </div>
          </div>
        </Card>

        {/* Total Bookings */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#8a7a68]">
                Total Bookings
              </p>

              <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
                {stats.totalBookings.toLocaleString('en-IN')}
              </p>

              <p className="mt-2 text-xs text-[#8a7a68]">
                All-time bookings
              </p>
            </div>

            <div className="rounded-xl bg-[#f1e8d7] p-3 text-[#9a7b42]">
              <Ticket size={21} />
            </div>
          </div>
        </Card>

        {/* Total Revenue */}
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#8a7a68]">
                Total Revenue
              </p>

              <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
                ₹{stats.totalRevenue.toLocaleString('en-IN')}
              </p>

              <p className="mt-2 text-xs text-[#8a7a68]">
                Total booking revenue
              </p>
            </div>

            <div className="rounded-xl bg-[#f1e8d7] p-3 text-[#9a7b42]">
              <IndianRupee size={21} />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="mt-5 overflow-hidden p-0 sm:mt-6">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-[#e5ddd0] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-xl font-semibold text-[#1c1917]">
              Recent Bookings
            </h2>

            <p className="mt-1 text-sm text-[#8a7a68]">
              Latest bookings made through your buses.
            </p>
          </div>

          <Link
            to="/operator/bookings"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#d9ccb9] bg-[#fffcf5] px-4 py-2.5 text-sm font-medium text-[#5f513f] transition hover:bg-[#f6efe3]"
          >
            View All Bookings
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-[#e5ddd0] bg-[#faf8f3] text-left">
                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Booking
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Passenger
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Route
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Travel Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Amount
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Booking Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Payment
                </th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-[#eee8dd] last:border-b-0"
                >
                  {/* Booking */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#1c1917]">
                        {booking.id}
                      </p>

                      <p className="mt-1 text-xs text-[#8a7a68]">
                        PNR: {booking.pnr}
                      </p>
                    </div>
                  </td>

                  {/* Passenger */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-[#1c1917]">
                        {booking.passengerName}
                      </p>

                      <p className="mt-1 text-xs text-[#8a7a68]">
                        {booking.phone}
                      </p>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-[#5f574e]">
                        {booking.route}
                      </p>

                      <p className="mt-1 text-xs text-[#8a7a68]">
                        {booking.busNumber}
                      </p>
                    </div>
                  </td>

                  {/* Travel Date */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={15}
                        className="text-[#9a7b42]"
                      />

                      <span className="text-sm text-[#5f574e]">
                        {booking.travelDate}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm font-semibold text-[#1c1917]">
                      <CreditCard
                        size={15}
                        className="text-[#9a7b42]"
                      />

                      ₹{booking.amount.toLocaleString('en-IN')}
                    </div>
                  </td>

                  {/* Booking Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBookingStatusClass(
                        booking.bookingStatus,
                      )}`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClass(
                        booking.paymentStatus,
                      )}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Link */}
        <div className="flex justify-end border-t border-[#e5ddd0] px-4 py-4 sm:px-6">
          <Link
            to="/operator/bookings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9a7b42] transition hover:text-[#7d6334]"
          >
            Manage all bookings
            <ArrowRight size={16} />
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default DashboardPage