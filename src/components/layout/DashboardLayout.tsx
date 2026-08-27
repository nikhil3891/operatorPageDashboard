import { NavLink, Outlet } from 'react-router-dom'
import {
  BarChart3,
  Bus,
  CalendarCheck,
  KeyRound,
  Menu,
  User,
  X,
  CreditCard,
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  {
    label: 'Dashboard',
    to: '/operator',
    icon: BarChart3,
  },
  {
    label: 'Subscription',
    to: '/operator/subscription',
    icon: CreditCard,
  },
  {
    label: 'Buses',
    to: '/operator/buses',
    icon: Bus,
  },
  {
    label: 'Bookings',
    to: '/operator/bookings',
    icon: CalendarCheck,
  },
  {
    label: 'Profile',
    to: '/operator/profile',
    icon: User,
  },
  {
    label: 'Change Password',
    to: '/operator/change-password',
    icon: KeyRound,
  },
]

function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-slate-900">
      {/* Fixed Header */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[#ded7c9] bg-[#fbfaf7]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold tracking-tight">
            BusBooking
          </div>

          <div className="hidden text-sm text-slate-600 sm:block">
            Operator Portal
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-[#ded7c9] bg-[#fbfaf7] lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/operator'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                      isActive
                        ? 'bg-[#eee7d9] text-slate-950'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed bottom-0 left-0 top-16 hidden w-64 border-r border-[#ded7c9] bg-[#fbfaf7] lg:block">
        <nav className="space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/operator'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#eee7d9] text-slate-950'
                      : 'text-slate-600 hover:bg-[#f3eee5] hover:text-slate-950'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen pt-16 lg:ml-64">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout