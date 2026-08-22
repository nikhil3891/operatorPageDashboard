import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="text-xl font-bold text-slate-900">
            BusBooking
          </div>

          <div className="text-sm text-slate-600">
            Operator Portal
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="min-h-[calc(100vh-4rem)] w-64 border-r bg-white p-4">
          <nav className="space-y-2">
            <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium">
              Dashboard
            </div>

            <div className="rounded-lg px-3 py-2 text-sm">
              Subscription
            </div>

            <div className="rounded-lg px-3 py-2 text-sm">
              Buses
            </div>

            <div className="rounded-lg px-3 py-2 text-sm">
              Bookings
            </div>

            <div className="rounded-lg px-3 py-2 text-sm">
              Profile
            </div>

            <div className="rounded-lg px-3 py-2 text-sm">
              Change Password
            </div>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout