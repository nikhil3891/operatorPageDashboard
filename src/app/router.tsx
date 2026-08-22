import { createBrowserRouter } from 'react-router-dom'

import DashboardLayout from '../components/layout/DashboardLayout'
import PublicLayout from '../components/layout/PublicLayout'

import HomePage from '../features/home/pages/HomePage'
import PricingPage from '../features/pricing/pages/PricingPage'

import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'

import DashboardPage from '../features/operator/pages/DashboardPage'
import SubscriptionPage from '../features/operator/pages/SubscriptionPage'
import BusManagementPage from '../features/operator/pages/BusManagementPage'
import BookingManagementPage from '../features/operator/pages/BookingManagementPage'
import ProfilePage from '../features/operator/pages/ProfilePage'
import ChangePasswordPage from '../features/operator/pages/ChangePasswordPage'

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/pricing',
        element: <PricingPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: '/operator',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'subscription',
        element: <SubscriptionPage />,
      },
      {
        path: 'buses',
        element: <BusManagementPage />,
      },
      {
        path: 'bookings',
        element: <BookingManagementPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      },
    ],
  },
])

export default router