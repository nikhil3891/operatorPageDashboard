export type SubscriptionPlan = 'Starter' | 'Growth' | 'Pro' | 'Enterprise'

export type BillingCycle =
  | 'Monthly'
  | 'Quarterly'
  | 'Half-Yearly'
  | 'Annual'

export type SubscriptionStatus = 'Active' | 'Pending' | 'Expired'

export type SubscriptionRequestType =
  | 'Upgrade'
  | 'Downgrade'
  | 'Billing Change'
  | 'Enterprise Quote'

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan
  name: SubscriptionPlan
  description: string
  busRange: string
  maxBuses: number | null
  monthlyPrice: number | null
  quarterlyPrice: number | null
  halfYearlyPrice: number | null
  annualPrice: number | null
  commissionPerTicket: number
  features: string[]
  recommended?: boolean
}

export interface CurrentSubscription {
  plan: SubscriptionPlan
  status: SubscriptionStatus
  billingCycle: BillingCycle
  startDate: string
  nextBillingDate: string
  busesUsed: number
  busesAllowed: number | null
  bookingsUsed: number
  bookingsAllowed: number | null
  commissionPerTicket: number
}

export interface SubscriptionChangeRequest {
  id: string
  type: SubscriptionRequestType
  requestedPlan: SubscriptionPlan
  requestedBillingCycle: BillingCycle
  requestedAt: string
  status: 'Pending'
}

export const billingCycles: BillingCycle[] = [
  'Monthly',
  'Quarterly',
  'Half-Yearly',
  'Annual',
]

export const billingCycleSavings: Record<
  BillingCycle,
  {
    percentage: number
    label: string
  }
> = {
  Monthly: {
    percentage: 0,
    label: 'No savings',
  },
  Quarterly: {
    percentage: 5,
    label: 'Save 5%',
  },
  'Half-Yearly': {
    percentage: 10,
    label: 'Save 10%',
  },
  Annual: {
    percentage: 18,
    label: 'Save 18%',
  },
}

export const subscriptionPlans: SubscriptionPlanDetails[] = [
  {
    id: 'Starter',
    name: 'Starter',
    description: 'For small operators starting their bus booking business.',
    busRange: '1–3 buses',
    maxBuses: 3,
    monthlyPrice: 999,
    quarterlyPrice: 2847,
    halfYearlyPrice: 5395,
    annualPrice: 9830,
    commissionPerTicket: 50,
    features: [
      'Up to 3 buses',
      'Operator dashboard',
      'Bus management',
      'Booking management',
      'Passenger booking details',
      'Booking and payment status',
      'Basic support',
    ],
  },

  {
    id: 'Growth',
    name: 'Growth',
    description: 'For growing operators managing multiple buses and routes.',
    busRange: '4–15 buses',
    maxBuses: 15,
    monthlyPrice: 2999,
    quarterlyPrice: 8547,
    halfYearlyPrice: 16195,
    annualPrice: 29510,
    commissionPerTicket: 35,
    recommended: true,
    features: [
      'Up to 15 buses',
      'Everything in Starter',
      'Advanced booking management',
      'Route and schedule management',
      'Enhanced operator insights',
      'Priority support',
    ],
  },

  {
    id: 'Pro',
    name: 'Pro',
    description: 'For established operators with a larger bus network.',
    busRange: '16–50 buses',
    maxBuses: 50,
    monthlyPrice: 7999,
    quarterlyPrice: 22797,
    halfYearlyPrice: 43195,
    annualPrice: 78679,
    commissionPerTicket: 15,
    features: [
      'Up to 50 buses',
      'Everything in Growth',
      'Advanced operator reporting',
      'Larger booking capacity',
      'Priority operational support',
      'Designed for high-volume operators',
    ],
  },

  {
    id: 'Enterprise',
    name: 'Enterprise',
    description: 'For large operators requiring a custom commercial arrangement.',
    busRange: '50+ buses',
    maxBuses: null,
    monthlyPrice: null,
    quarterlyPrice: null,
    halfYearlyPrice: null,
    annualPrice: null,
    commissionPerTicket: 5,
    features: [
      '50+ buses',
      'Everything in Pro',
      'Custom commercial terms',
      'Custom operational requirements',
      'Dedicated support arrangement',
      'Enterprise onboarding',
    ],
  },
]

export const mockCurrentSubscription: CurrentSubscription = {
  plan: 'Growth',
  status: 'Active',
  billingCycle: 'Monthly',
  startDate: '22 Aug 2026',
  nextBillingDate: '22 Sep 2026',
  busesUsed: 4,
  busesAllowed: 15,
  bookingsUsed: 1248,
  bookingsAllowed: 5000,
  commissionPerTicket: 35,
}

export const mockSubscriptionRequests: SubscriptionChangeRequest[] = []

export function getPlanByName(
  plan: SubscriptionPlan,
): SubscriptionPlanDetails {
  return (
    subscriptionPlans.find((item) => item.name === plan) ??
    subscriptionPlans[0]
  )
}

export function getPlanPrice(
  plan: SubscriptionPlanDetails,
  billingCycle: BillingCycle,
): number | null {
  switch (billingCycle) {
    case 'Monthly':
      return plan.monthlyPrice

    case 'Quarterly':
      return plan.quarterlyPrice

    case 'Half-Yearly':
      return plan.halfYearlyPrice

    case 'Annual':
      return plan.annualPrice

    default:
      return null
  }
}

export function getBillingCycleSavings(
  billingCycle: BillingCycle,
): number {
  return billingCycleSavings[billingCycle].percentage
}