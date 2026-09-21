import {  useState } from 'react'
import {
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Crown,
  Info,
  Send,
} from 'lucide-react'

import {
  billingCycles,
  billingCycleSavings,
  getPlanByName,
  getPlanPrice,
  mockCurrentSubscription,
  subscriptionPlans,
  type BillingCycle,
  type SubscriptionPlan,
} from '@/data/mockSubscription'

const formatCurrency = (amount: number | null) => {
  if (amount === null) {
    return 'Custom'
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

const getPlanOrder = (plan: SubscriptionPlan) => {
  return subscriptionPlans.findIndex((item) => item.name === plan)
}

const getUsagePercentage = (
  used: number,
  allowed: number | null,
) => {
  if (allowed === null || allowed === 0) {
    return 0
  }

  return Math.min((used / allowed) * 100, 100)
}

export default function SubscriptionPage() {
  const [selectedCycle, setSelectedCycle] =
    useState<BillingCycle>(mockCurrentSubscription.billingCycle)

  const [requestMessage, setRequestMessage] = useState<string | null>(null)

  const [requestedPlan, setRequestedPlan] =
    useState<SubscriptionPlan | null>(null)

  const currentPlan = getPlanByName(mockCurrentSubscription.plan)

  // const selectedPlanPrice = useMemo(() => {
  //   return getPlanPrice(currentPlan, selectedCycle)
  // }, [currentPlan, selectedCycle])

  const busUsagePercentage = getUsagePercentage(
    mockCurrentSubscription.busesUsed,
    mockCurrentSubscription.busesAllowed,
  )

  const bookingUsagePercentage = getUsagePercentage(
    mockCurrentSubscription.bookingsUsed,
    mockCurrentSubscription.bookingsAllowed,
  )

  const handlePlanRequest = (
    plan: SubscriptionPlan,
  ) => {
    setRequestedPlan(plan)

    if (plan === 'Enterprise') {
      setRequestMessage(
        'Enterprise quote request has been submitted for review.',
      )
      return
    }

    const selectedPlan = getPlanByName(plan)

    const currentOrder = getPlanOrder(
      mockCurrentSubscription.plan,
    )

    const requestedOrder = getPlanOrder(plan)

    if (
      plan === mockCurrentSubscription.plan &&
      selectedCycle === mockCurrentSubscription.billingCycle
    ) {
      setRequestMessage(
        'You are already using this plan and billing cycle.',
      )
      return
    }

    if (
      plan === mockCurrentSubscription.plan &&
      selectedCycle !== mockCurrentSubscription.billingCycle
    ) {
      setRequestMessage(
        `Billing cycle change request submitted for ${selectedPlan.name}.`,
      )
      return
    }

    if (requestedOrder > currentOrder) {
      setRequestMessage(
        `Upgrade request submitted for the ${selectedPlan.name} plan.`,
      )
      return
    }

    setRequestMessage(
      `Downgrade request submitted for the ${selectedPlan.name} plan.`,
    )
  }

  const getActionLabel = (
    plan: SubscriptionPlan,
  ) => {
    if (plan === 'Enterprise') {
      return 'Request Quote'
    }

    if (plan === mockCurrentSubscription.plan) {
      if (
        selectedCycle !==
        mockCurrentSubscription.billingCycle
      ) {
        return 'Request Billing Change'
      }

      return 'Current Plan'
    }

    const currentOrder = getPlanOrder(
      mockCurrentSubscription.plan,
    )

    const requestedOrder = getPlanOrder(plan)

    return requestedOrder > currentOrder
      ? 'Request Upgrade'
      : 'Request Downgrade'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Subscription
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your operator subscription, billing cycle,
          usage and plan requests.
        </p>
      </div>

      {/* Current Subscription */}
      <section className="rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] p-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#B08D57]/10 text-[#9a7b42]">
              <Crown size={23} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  {currentPlan.name} Plan
                </h2>

                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  {mockCurrentSubscription.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {currentPlan.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-slate-500">
                Billing
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {mockCurrentSubscription.billingCycle}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Plan Price
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {formatCurrency(
                  getPlanPrice(
                    currentPlan,
                    mockCurrentSubscription.billingCycle,
                  ),
                )}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Next Billing
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                {mockCurrentSubscription.nextBillingDate}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Commission
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                ₹{mockCurrentSubscription.commissionPerTicket}
                <span className="font-normal text-slate-500">
                  {' '}
                  / ticket
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="grid gap-5 lg:grid-cols-2">
        {/* Bus Usage */}
        <div className="rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Bus Usage
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Active buses under your subscription.
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {mockCurrentSubscription.busesUsed} /{' '}
              {mockCurrentSubscription.busesAllowed}
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#B08D57] transition-all"
              style={{
                width: `${busUsagePercentage}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {Math.max(
              (mockCurrentSubscription.busesAllowed ?? 0) -
                mockCurrentSubscription.busesUsed,
              0,
            )}{' '}
            bus slots remaining
          </p>
        </div>

        {/* Booking Usage */}
        <div className="rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">
                Booking Usage
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Bookings included in the current plan.
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {mockCurrentSubscription.bookingsUsed.toLocaleString(
                'en-IN',
              )}{' '}
              /{' '}
              {mockCurrentSubscription.bookingsAllowed?.toLocaleString(
                'en-IN',
              )}
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#B08D57] transition-all"
              style={{
                width: `${bookingUsagePercentage}%`,
              }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {Math.max(
              (mockCurrentSubscription.bookingsAllowed ?? 0) -
                mockCurrentSubscription.bookingsUsed,
              0,
            ).toLocaleString('en-IN')}{' '}
            bookings remaining
          </p>
        </div>
      </section>

      {/* Billing Cycle */}
      <section className="rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">
              Choose Billing Cycle
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the billing tenure you want to use for
              plan comparison.
            </p>
          </div>

          <div className="relative w-full sm:w-56">
            <select
              value={selectedCycle}
              onChange={(event) =>
                setSelectedCycle(
                  event.target.value as BillingCycle,
                )
              }
              className="w-full appearance-none rounded-xl border border-[#E7DFD0] bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20"
            >
              {billingCycles.map((cycle) => (
                <option
                  key={cycle}
                  value={cycle}
                >
                  {cycle} —{' '}
                  {billingCycleSavings[cycle].label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </section>

      {/* Request Message */}
      {requestMessage && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <Check
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="text-sm font-semibold">
              Request submitted
            </p>

            <p className="mt-1 text-sm">
              {requestMessage}
            </p>
          </div>
        </div>
      )}

      {/* Plan Cards */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Available Plans
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Subscription changes are submitted as requests.
            No payment or proration is performed in this demo.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-4">
          {subscriptionPlans.map((plan) => {
            const price = getPlanPrice(
              plan,
              selectedCycle,
            )

            const isCurrent =
              plan.name === mockCurrentSubscription.plan

            const isRequested =
              plan.name === requestedPlan

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-[#FFFCF5] p-5 shadow-sm transition ${
                  isCurrent
                    ? 'border-[#B08D57] ring-1 ring-[#B08D57]/30'
                    : 'border-[#E7DFD0]'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute right-4 top-4 rounded-full bg-[#B08D57]/10 px-2.5 py-1 text-xs font-semibold text-[#8b6d38]">
                    Recommended
                  </div>
                )}

                {isCurrent && (
                  <div className="mb-3 w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Current Plan
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {plan.name}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-3xl font-bold text-slate-900">
                    {formatCurrency(price)}
                  </p>

                  {price !== null && (
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedCycle}
                    </p>
                  )}

                  {price === null && (
                    <p className="mt-1 text-xs text-slate-500">
                      Custom pricing
                    </p>
                  )}
                </div>

                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Bus capacity
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {plan.busRange}
                  </p>
                </div>

                <div className="mt-3 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Per-ticket commission
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    ₹{plan.commissionPerTicket}
                  </p>
                </div>

                <div className="mt-5 flex-1">
                  <p className="mb-3 text-sm font-semibold text-slate-900">
                    Included
                  </p>

                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-emerald-600"
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  disabled={
                    isCurrent &&
                    selectedCycle ===
                      mockCurrentSubscription.billingCycle
                  }
                  onClick={() =>
                    handlePlanRequest(plan.name)
                  }
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isCurrent &&
                    selectedCycle ===
                      mockCurrentSubscription.billingCycle
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                      : isRequested
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#B08D57] text-white hover:bg-[#9a7b42]'
                  }`}
                >
                  {isRequested ? (
                    <>
                      <Check size={16} />
                      Request Submitted
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {getActionLabel(plan.name)}
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Plan Comparison */}
      <section className="rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] shadow-sm">
        <div className="border-b border-[#E7DFD0] p-5">
          <h2 className="font-semibold text-slate-900">
            Plan Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare pricing, bus capacity and commission
            across the available plans.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[850px] w-full border-collapse">
            <thead>
              <tr className="border-b border-[#E7DFD0] bg-slate-50/70">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Feature
                </th>

                {subscriptionPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className="px-5 py-4 text-left text-sm font-semibold text-slate-900"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-[#E7DFD0]">
                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                  Bus capacity
                </td>

                {subscriptionPlans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-sm text-slate-600"
                  >
                    {plan.busRange}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-[#E7DFD0]">
                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                  {selectedCycle} price
                </td>

                {subscriptionPlans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-sm font-semibold text-slate-900"
                  >
                    {formatCurrency(
                      getPlanPrice(
                        plan,
                        selectedCycle,
                      ),
                    )}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-[#E7DFD0]">
                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                  Billing saving
                </td>

                {subscriptionPlans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-sm text-slate-600"
                  >
                    {billingCycleSavings[
                      selectedCycle
                    ].percentage === 0
                      ? '—'
                      : `${billingCycleSavings[selectedCycle].percentage}%`}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-[#E7DFD0]">
                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                  Commission / ticket
                </td>

                {subscriptionPlans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-sm font-semibold text-slate-900"
                  >
                    ₹{plan.commissionPerTicket}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="px-5 py-4 text-sm font-medium text-slate-700">
                  Support
                </td>

                {subscriptionPlans.map((plan) => (
                  <td
                    key={plan.id}
                    className="px-5 py-4 text-sm text-slate-600"
                  >
                    {plan.name === 'Starter'
                      ? 'Basic'
                      : plan.name === 'Growth'
                        ? 'Priority'
                        : plan.name === 'Pro'
                          ? 'Priority operational'
                          : 'Dedicated arrangement'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Commission Information */}
      <section className="rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B08D57]/10 text-[#9a7b42]">
            <CreditCard size={19} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              Subscription Fee & Ticket Commission
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              The subscription fee and per-ticket commission
              are separate charges. The commission is applied
              to successful ticket bookings according to the
              operator's applicable commercial configuration.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl border border-[#E7DFD0] bg-white p-3"
                >
                  <p className="text-xs text-slate-500">
                    {plan.name}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    ₹{plan.commissionPerTicket} / successful
                    ticket
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo / Request Information */}
      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex items-start gap-3">
          <Info
            size={19}
            className="mt-0.5 shrink-0 text-blue-600"
          />

          <div>
            <h3 className="font-semibold text-blue-900">
              Subscription change requests
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              In this demo, changing a subscription does not
              process payment, proration or cancellation.
              The operator submits a request that can later be
              connected to the backend subscription workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Billing Note */}
      <section className="flex items-start gap-3 rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] p-4">
        <Clock3
          size={18}
          className="mt-0.5 shrink-0 text-[#9a7b42]"
        />

        <p className="text-sm leading-6 text-slate-600">
          Current subscription started on{' '}
          <span className="font-semibold text-slate-900">
            {mockCurrentSubscription.startDate}
          </span>
          . The next billing date is{' '}
          <span className="font-semibold text-slate-900">
            {mockCurrentSubscription.nextBillingDate}
          </span>
          .
        </p>
      </section>
    </div>
  )
}