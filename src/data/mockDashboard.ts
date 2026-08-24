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

  recentBookings: [
    {
      id: 'BK-1001',
      passengerName: 'Rahul Sharma',
      busNumber: 'DL-01-AB-1234',
      route: 'Delhi → Jaipur',
      amount: 850,
      status: 'Confirmed',
    },
    {
      id: 'BK-1002',
      passengerName: 'Priya Singh',
      busNumber: 'UP-16-CD-5678',
      route: 'Noida → Lucknow',
      amount: 1200,
      status: 'Confirmed',
    },
    {
      id: 'BK-1003',
      passengerName: 'Amit Kumar',
      busNumber: 'DL-05-EF-9012',
      route: 'Delhi → Agra',
      amount: 650,
      status: 'Pending',
    },
    {
      id: 'BK-1004',
      passengerName: 'Neha Verma',
      busNumber: 'UP-14-GH-3456',
      route: 'Greater Noida → Delhi',
      amount: 450,
      status: 'Cancelled',
    },
  ],
} as const