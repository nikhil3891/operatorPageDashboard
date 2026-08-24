import Card from '@/components/ui/Card'
import { mockDashboard } from '@/data/mockDashboard'

function DashboardPage() {
  const { operator, stats, recentBookings } = mockDashboard

  return (
    <div className="min-h-full bg-[#f5f1e8] p-6">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#9a8060]">
          Operator Portal
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-[#1c1917]">
          Operator Dashboard
        </h1>

        <p className="mt-2 text-[#6b6257]">
          Welcome back, {operator.name}.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm font-medium text-[#8a7a68]">
            Total Buses
          </p>

          <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
            {stats.totalBuses}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-[#8a7a68]">
            Active Buses
          </p>

          <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
            {stats.activeBuses}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-[#8a7a68]">
            Total Bookings
          </p>

          <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
            {stats.totalBookings.toLocaleString('en-IN')}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-[#8a7a68]">
            Total Revenue
          </p>

          <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
            ₹{stats.totalRevenue.toLocaleString('en-IN')}
          </p>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="mt-6 overflow-hidden p-0">
        <div className="border-b border-[#e5ddd0] px-6 py-5">
          <h2 className="text-xl font-semibold text-[#1c1917]">
            Recent Bookings
          </h2>

          <p className="mt-1 text-sm text-[#8a7a68]">
            Latest bookings made through your buses.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#e5ddd0] bg-[#faf8f3] text-left">
                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Booking ID
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Passenger
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Bus
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Route
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Amount
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#6b6257]">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-[#eee8dd] last:border-b-0"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-[#1c1917]">
                    {booking.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#5f574e]">
                    {booking.passengerName}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#5f574e]">
                    {booking.busNumber}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#5f574e]">
                    {booking.route}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-[#1c1917]">
                    ₹{booking.amount.toLocaleString('en-IN')}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
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

export default DashboardPage