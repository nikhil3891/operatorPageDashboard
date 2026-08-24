import { NavLink, Outlet } from 'react-router-dom'
import {
  BarChart3,
  Bus,
  CalendarCheck,
  CreditCard,
  KeyRound,
  Menu,
  User,
  X,
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
      {/* Header */}
      <header className="border-b border-[#ded7c9] bg-[#fbfaf7]">
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="text-xl font-bold tracking-tight">
            BusBooking
          </div>

          {/* Desktop portal text */}
          <div className="hidden text-sm font-medium text-slate-600 sm:block">
            Operator Portal
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-[#eee7d9] lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-[#ded7c9] bg-[#fbfaf7] lg:hidden">
          <nav className="space-y-1 px-4 py-3 sm:px-6">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/operator'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-[#eee7d9] text-slate-950'
                        : 'text-slate-700 hover:bg-[#f3eee5]',
                    ].join(' ')
                  }
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      )}

      {/* Desktop Application Area */}
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#ded7c9] bg-[#fbfaf7] lg:block">
          <nav className="space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/operator'}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition',
                      isActive
                        ? 'bg-[#eee7d9] text-slate-950'
                        : 'text-slate-600 hover:bg-[#f3eee5] hover:text-slate-950',
                    ].join(' ')
                  }
                >
                  <Icon size={19} strokeWidth={1.8} />

                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 bg-[#f5f1e8] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout