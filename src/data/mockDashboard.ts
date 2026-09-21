import { mockBookings } from '@/data/mockOperator'

export const mockDashboard = {
  operator: {
    name: 'Demo Bus Operator',
  },

  stats: {
    totalBuses: 24,
    activeBuses: 18,
    totalBookings: 1248,
    totalRevenue: 245000,
  },

  recentBookings: mockBookings.slice(0, 4),
} as const