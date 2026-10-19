import { mockBookings } from '@/data/mockOperator'

export const mockDashboard = {
  operator: {
    name: 'Demo Bus Operator',
  },

  summary: {
    totalBuses: 4,
    activeBuses: 3,
    totalBookings: 1248,
    totalRevenue: 245000,
  },

  today: {
    scheduledTrips: 8,
    todaysBookings: 42,
    availableSeats: 186,
    activeTrips: 3,
    completedTrips: 2,
    cancelledTrips: 1,
  },

  subscriptionUsage: {
    plan: 'Growth',
    buses: {
      used: 4,
      limit: 15,
    },
    bookings: {
      used: 1248,
      limit: 5000,
    },
  },

  attentionItems: [
    {
      id: 'verification-1',
      type: 'verification',
      title: 'Documents pending verification',
      description: '2 operator documents are waiting for verification.',
    },
    {
      id: 'document-1',
      type: 'document',
      title: 'Document expiry approaching',
      description: '1 bus document will expire soon.',
    },
    {
      id: 'subscription-1',
      type: 'subscription',
      title: 'Subscription usage',
      description: 'Your current plan is being actively used.',
    },
  ],

  bookingTrend: [
    { label: 'Mon', bookings: 28 },
    { label: 'Tue', bookings: 34 },
    { label: 'Wed', bookings: 31 },
    { label: 'Thu', bookings: 42 },
    { label: 'Fri', bookings: 38 },
    { label: 'Sat', bookings: 45 },
    { label: 'Sun', bookings: 40 },
  ],

  revenueTrend: [
    { label: 'Mon', revenue: 18500 },
    { label: 'Tue', revenue: 22400 },
    { label: 'Wed', revenue: 19800 },
    { label: 'Thu', revenue: 27600 },
    { label: 'Fri', revenue: 25100 },
    { label: 'Sat', revenue: 31200 },
    { label: 'Sun', revenue: 28900 },
  ],

  recentBookings: mockBookings.slice(0, 4),
} as const