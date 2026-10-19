import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BusFront,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  IndianRupee,
  Ticket,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
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
      return 'bg-slate-100 text-slate-700'
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
      return 'bg-slate-100 text-slate-700'
  }
}

function getAttentionIcon(type: string) {
  switch (type) {
    case 'verification':
      return CheckCircle2

    case 'document':
      return AlertTriangle

    case 'subscription':
      return CreditCard

    default:
      return AlertTriangle
  }
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

function DashboardPage() {
  const {
    operator,
    summary,
    today,
    subscriptionUsage,
    attentionItems,
    bookingTrend,
    revenueTrend,
    recentBookings,
  } = mockDashboard

  const busUsagePercentage = Math.round(
    (subscriptionUsage.buses.used / subscriptionUsage.buses.limit) * 100,
  )

  const bookingUsagePercentage = Math.round(
    (subscriptionUsage.bookings.used /
      subscriptionUsage.bookings.limit) *
      100,
  )

  return (
    <div className="min-h-full bg-[#f5f1e8] p-4 sm:p-6 lg:p-8">
      {/* =========================================================
          PAGE HEADER
      ========================================================= */}
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#9a8060] sm:text-sm">
            Operator Portal
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-[#1c1917] sm:text-3xl lg:text-4xl">
            Operator Dashboard
          </h1>

          <p className="mt-2 text-sm text-[#6b6257] sm:text-base">
            Welcome back, {operator.name}. Here&apos;s what&apos;s happening
            with your operations today.
          </p>
        </div>

        <Link
          to="/operator/buses"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Manage Buses
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* =========================================================
          SUMMARY KPI CARDS
      ========================================================= */}
      <section aria-labelledby="summary-heading">
        <div className="mb-4">
          <h2
            id="summary-heading"
            className="text-lg font-semibold text-[#1c1917]"
          >
            Business Summary
          </h2>

          <p className="mt-1 text-sm text-[#8a7a68]">
            Overall performance across your operator account.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Buses */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#8a7a68]">
                  Total Buses
                </p>

                <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
                  {summary.totalBuses}
                </p>

                <p className="mt-2 text-xs text-[#8a7a68]">
                  {summary.activeBuses} currently active
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
                  {summary.activeBuses}
                </p>

                <p className="mt-2 text-xs text-[#8a7a68]">
                  Ready for operations
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <CheckCircle2 size={21} />
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
                  {summary.totalBookings.toLocaleString('en-IN')}
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

          {/* Revenue */}
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#8a7a68]">
                  Total Revenue
                </p>

                <p className="mt-3 text-3xl font-semibold text-[#1c1917]">
                  {formatCurrency(summary.totalRevenue)}
                </p>

                <p className="mt-2 text-xs text-[#8a7a68]">
                  Booking revenue
                </p>
              </div>

              <div className="rounded-xl bg-[#f1e8d7] p-3 text-[#9a7b42]">
                <IndianRupee size={21} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================
          TODAY'S OPERATIONS
      ========================================================= */}
      <section className="mt-8" aria-labelledby="today-heading">
        <div className="mb-4">
          <h2
            id="today-heading"
            className="text-lg font-semibold text-[#1c1917]"
          >
            Today&apos;s Operations
          </h2>

          <p className="mt-1 text-sm text-[#8a7a68]">
            A quick view of today&apos;s scheduled activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Scheduled Trips */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-[#8a7a68]">
                  Scheduled Trips
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#1c1917]">
                  {today.scheduledTrips}
                </p>
              </div>
            </div>
          </Card>

          {/* Today's Bookings */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-700">
                <Ticket size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-[#8a7a68]">
                  Today&apos;s Bookings
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#1c1917]">
                  {today.todaysBookings}
                </p>
              </div>
            </div>
          </Card>

          {/* Available Seats */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <Users size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-[#8a7a68]">
                  Available Seats
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#1c1917]">
                  {today.availableSeats}
                </p>
              </div>
            </div>
          </Card>

          {/* Active Trips */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                <BusFront size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-[#8a7a68]">
                  Active Trips
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#1c1917]">
                  {today.activeTrips}
                </p>
              </div>
            </div>
          </Card>

          {/* Completed Trips */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                <CheckCircle2 size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-[#8a7a68]">
                  Completed
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#1c1917]">
                  {today.completedTrips}
                </p>
              </div>
            </div>
          </Card>

          {/* Cancelled Trips */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-50 p-3 text-red-700">
                <AlertTriangle size={20} />
              </div>

              <div>
                <p className="text-xs font-medium text-[#8a7a68]">
                  Cancelled
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#1c1917]">
                  {today.cancelledTrips}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================
          CHARTS
      ========================================================= */}
      <section className="mt-8" aria-labelledby="performance-heading">
        <div className="mb-4">
          <h2
            id="performance-heading"
            className="text-lg font-semibold text-[#1c1917]"
          >
            Performance
          </h2>

          <p className="mt-1 text-sm text-[#8a7a68]">
            Booking and revenue activity for the current period.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {/* Booking Trend */}
          <Card className="overflow-hidden">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                    <BarChart3 size={18} />
                  </div>

                  <h3 className="font-semibold text-[#1c1917]">
                    Booking Trend
                  </h3>
                </div>

                <p className="mt-2 text-sm text-[#8a7a68]">
                  Bookings by day
                </p>
              </div>

              <TrendingUp
                size={19}
                className="text-emerald-600"
              />
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bookingTrend}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e8e1d6"
                  />

                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: '#8a7a68',
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: '#8a7a68',
                    }}
                  />

                  <Tooltip
                    cursor={{ fill: '#f7f2e9' }}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e5ddd0',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    }}
                  />

                  <Bar
                    dataKey="bookings"
                    radius={[5, 5, 0, 0]}
                    fill="#334155"
                    name="Bookings"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Revenue Trend */}
          <Card className="overflow-hidden">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                    <IndianRupee size={18} />
                  </div>

                  <h3 className="font-semibold text-[#1c1917]">
                    Revenue Trend
                  </h3>
                </div>

                <p className="mt-2 text-sm text-[#8a7a68]">
                  Revenue by day
                </p>
              </div>

              <TrendingUp
                size={19}
                className="text-emerald-600"
              />
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueTrend}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 5,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e8e1d6"
                  />

                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: '#8a7a68',
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: '#8a7a68',
                    }}
                    tickFormatter={(value: number) =>
                      `₹${value / 1000}k`
                    }
                  />

                  <Tooltip
                    cursor={{ fill: '#f7f2e9' }}
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      'Revenue',
                    ]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e5ddd0',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    }}
                  />

                  <Bar
                    dataKey="revenue"
                    radius={[5, 5, 0, 0]}
                    fill="#059669"
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================
          SUBSCRIPTION + ATTENTION
      ========================================================= */}
      <section className="mt-8" aria-labelledby="account-heading">
        <div className="mb-4">
          <h2
            id="account-heading"
            className="text-lg font-semibold text-[#1c1917]"
          >
            Account Overview
          </h2>

          <p className="mt-1 text-sm text-[#8a7a68]">
            Monitor your subscription usage and account items that need
            attention.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {/* Subscription Usage */}
          <Card>
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-[#f1e8d7] p-2 text-[#9a7b42]">
                      <CreditCard size={18} />
                    </div>

                    <h3 className="font-semibold text-[#1c1917]">
                      Subscription Usage
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-[#8a7a68]">
                    Current plan
                  </p>
                </div>

                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  {subscriptionUsage.plan}
                </span>
              </div>

              {/* Bus Usage */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#1c1917]">
                      Buses
                    </p>

                    <p className="text-xs text-[#8a7a68]">
                      {subscriptionUsage.buses.used} of{' '}
                      {subscriptionUsage.buses.limit} used
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-[#1c1917]">
                    {busUsagePercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e8e1d6]">
                  <div
                    className="h-full rounded-full bg-slate-900 transition-all"
                    style={{
                      width: `${Math.min(busUsagePercentage, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Booking Usage */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#1c1917]">
                      Bookings
                    </p>

                    <p className="text-xs text-[#8a7a68]">
                      {subscriptionUsage.bookings.used.toLocaleString(
                        'en-IN',
                      )}{' '}
                      of{' '}
                      {subscriptionUsage.bookings.limit.toLocaleString(
                        'en-IN',
                      )}{' '}
                      used
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-[#1c1917]">
                    {bookingUsagePercentage}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e8e1d6]">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{
                      width: `${Math.min(
                        bookingUsagePercentage,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="border-t border-[#e5ddd0] pt-4">
                <Link
                  to="/operator/subscription"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9a7b42] transition hover:text-[#7d6334]"
                >
                  View subscription
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Card>

          {/* Attention Required */}
          <Card>
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                      <AlertTriangle size={18} />
                    </div>

                    <h3 className="font-semibold text-[#1c1917]">
                      Attention Required
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-[#8a7a68]">
                    Items that may require your attention.
                  </p>
                </div>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  {attentionItems.length}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {attentionItems.map((item) => {
                  const Icon = getAttentionIcon(item.type)

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-[#e5ddd0] bg-[#faf8f3] p-4"
                    >
                      <div className="mt-0.5 shrink-0 rounded-lg bg-white p-2 text-[#9a7b42] shadow-sm">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1c1917]">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#8a7a68]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================
          QUICK ACTIONS
      ========================================================= */}
      <section className="mt-8" aria-labelledby="quick-actions-heading">
        <div className="mb-4">
          <h2
            id="quick-actions-heading"
            className="text-lg font-semibold text-[#1c1917]"
          >
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-[#8a7a68]">
            Common operator tasks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            to="/operator/buses"
            className="group rounded-2xl border border-[#ded7c9] bg-[#fbfaf7] p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-[#f1e8d7] p-3 text-[#9a7b42]">
                <BusFront size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
              />
            </div>

            <h3 className="mt-4 font-semibold text-[#1c1917]">
              Manage Buses
            </h3>

            <p className="mt-1 text-sm text-[#8a7a68]">
              Add, update and manage your buses.
            </p>
          </Link>

          <Link
            to="/operator/bookings"
            className="group rounded-2xl border border-[#ded7c9] bg-[#fbfaf7] p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <CalendarCheck size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
              />
            </div>

            <h3 className="mt-4 font-semibold text-[#1c1917]">
              View Bookings
            </h3>

            <p className="mt-1 text-sm text-[#8a7a68]">
              Review passenger bookings and payments.
            </p>
          </Link>

          <Link
            to="/operator/subscription"
            className="group rounded-2xl border border-[#ded7c9] bg-[#fbfaf7] p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-700">
                <CreditCard size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
              />
            </div>

            <h3 className="mt-4 font-semibold text-[#1c1917]">
              Subscription
            </h3>

            <p className="mt-1 text-sm text-[#8a7a68]">
              Manage plan, billing and usage.
            </p>
          </Link>

          <Link
            to="/operator/profile"
            className="group rounded-2xl border border-[#ded7c9] bg-[#fbfaf7] p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <Users size={21} />
              </div>

              <ArrowRight
                size={18}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
              />
            </div>

            <h3 className="mt-4 font-semibold text-[#1c1917]">
              Operator Profile
            </h3>

            <p className="mt-1 text-sm text-[#8a7a68]">
              Update your operator account details.
            </p>
          </Link>
        </div>
      </section>

      {/* =========================================================
          RECENT BOOKINGS
      ========================================================= */}
      <section className="mt-8" aria-labelledby="recent-bookings-heading">
        <Card className="overflow-hidden p-0">
          {/* Section Header */}
          <div className="flex flex-col gap-4 border-b border-[#e5ddd0] px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                id="recent-bookings-heading"
                className="text-lg font-semibold text-[#1c1917]"
              >
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
                        <IndianRupee
                          size={15}
                          className="text-[#9a7b42]"
                        />

                        {booking.amount.toLocaleString('en-IN')}
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
      </section>
    </div>
  )
}

export default DashboardPage