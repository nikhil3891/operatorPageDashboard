import { createBrowserRouter } from 'react-router-dom'

import PublicLayout from '../components/layout/PublicLayout'
import HomePage from '../features/home/pages/HomePage'
import PricingPage from '../features/pricing/pages/PricingPage'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'

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
])

export default router