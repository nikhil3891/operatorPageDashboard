import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  BarChart3,
  Bus,
  CalendarCheck,
  // ChevronLeft,
  // ChevronRight,
  CreditCard,
  KeyRound,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  X,
} from 'lucide-react'

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed((current) => !current)
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8] text-slate-900">
      {/* =========================================================
          TOP HEADER
      ========================================================= */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-[#ded7c9] bg-[#fbfaf7]">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            to="/operator"
            className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
              BB
            </div>

            <div>
              <p className="text-base font-bold tracking-tight text-slate-950">
                BusBooking
              </p>

              <p className="text-xs text-slate-500">
                Operator Portal
              </p>
            </div>
          </Link>

          {/* Desktop operator information */}
          <div className="hidden items-center gap-3 lg:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                Demo Bus Operator
              </p>

              <p className="text-xs text-slate-500">
                Operator Account
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eee7d9] text-sm font-semibold text-slate-800">
              DO
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#ded7c9] bg-[#fbfaf7] text-slate-700 transition hover:bg-[#eee7d9] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 lg:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 bg-slate-950/20 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-y-0 left-0 w-[min(320px,85vw)] border-r border-[#ded7c9] bg-[#fbfaf7] shadow-xl">
            <nav className="flex h-full flex-col p-4">
              <div className="mb-4">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Workspace
                </p>
              </div>

              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/operator'}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                          isActive
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-600 hover:bg-[#eee7d9] hover:text-slate-950',
                        ].join(' ')
                      }
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  )
                })}
              </div>

              <div className="mt-auto border-t border-[#ded7c9] pt-4">
                <div className="mb-3 flex items-center gap-3 px-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eee7d9] text-sm font-semibold text-slate-800">
                    DO
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      Demo Bus Operator
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      operator@example.com
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* =========================================================
          DESKTOP SIDEBAR
      ========================================================= */}
      <aside
        className={[
          'fixed bottom-0 left-0 top-16 z-40 hidden border-r border-[#ded7c9] bg-[#fbfaf7] lg:flex lg:flex-col',
          'transition-[width] duration-300 ease-in-out',
          sidebarCollapsed ? 'w-[72px]' : 'w-64',
        ].join(' ')}
      >
        {/* Sidebar header / collapse button */}
        <div
          className={[
            'flex h-16 items-center border-b border-[#ded7c9]',
            sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4',
          ].join(' ')}
        >
          {!sidebarCollapsed && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
              </p>

              <p className="mt-0.5 text-sm font-semibold text-slate-900">
                Operator
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-[#eee7d9] hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            aria-label={
              sidebarCollapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar'
            }
            aria-expanded={!sidebarCollapsed}
            title={
              sidebarCollapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar'
            }
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={[
            'flex-1 space-y-1 overflow-y-auto',
            sidebarCollapsed ? 'p-2' : 'p-4',
          ].join(' ')}
        >
          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/operator'}
                title={sidebarCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  [
                    'group flex items-center rounded-xl text-sm font-medium transition',
                    sidebarCollapsed
                      ? 'justify-center px-0 py-3'
                      : 'gap-3 px-3 py-2.5',
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-[#eee7d9] hover:text-slate-950',
                  ].join(' ')
                }
              >
                <Icon className="h-5 w-5 shrink-0" />

                {!sidebarCollapsed && (
                  <span className="truncate">
                    {item.label}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-[#ded7c9] p-3">
          {/* Operator profile */}
          <div
            className={[
              'mb-3 flex items-center',
              sidebarCollapsed
                ? 'justify-center'
                : 'gap-3 px-1',
            ].join(' ')}
            title={
              sidebarCollapsed
                ? 'Demo Bus Operator'
                : undefined
            }
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eee7d9] text-sm font-semibold text-slate-800">
              DO
            </div>

            {!sidebarCollapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  Demo Bus Operator
                </p>

                <p className="truncate text-xs text-slate-500">
                  operator@example.com
                </p>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            type="button"
            title={sidebarCollapsed ? 'Logout' : undefined}
            className={[
              'flex w-full items-center rounded-xl text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-700',
              sidebarCollapsed
                ? 'justify-center px-0 py-2.5'
                : 'gap-3 px-3 py-2.5',
            ].join(' ')}
          >
            <LogOut className="h-5 w-5 shrink-0" />

            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <main
        className={[
          'min-h-screen pt-16',
          'transition-[margin] duration-300 ease-in-out',
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64',
        ].join(' ')}
      >
        {/*
          Important:
          No padding here.

          Individual pages control their own spacing.
          This prevents duplicate padding between the layout
          and DashboardPage / other pages.
        */}
        <div className="mx-auto w-full max-w-[1600px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout