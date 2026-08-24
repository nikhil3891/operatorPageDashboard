import { CheckCircle2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import { mockSubscription } from '@/data/mockOperator'

function SubscriptionPage() {
  const subscription = mockSubscription

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a7b42]">
          Billing
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Subscription
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your operator subscription and usage.
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="bg-slate-900 p-8 text-white">
          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#d7bd87]">
                Current Plan
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                {subscription.plan}
              </h2>

              <p className="mt-2 text-slate-300">
                ₹{subscription.price.toLocaleString('en-IN')} /{' '}
                {subscription.billingCycle}
              </p>
            </div>

            <span className="inline-flex h-fit items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
              <CheckCircle2 size={16} />
              {subscription.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Next billing date
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {subscription.nextBillingDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Buses
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {subscription.busesUsed} / {subscription.busesAllowed}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Bookings
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {subscription.bookingsUsed.toLocaleString('en-IN')} /{' '}
              {subscription.bookingsAllowed.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div className="border-t border-[#e8e1d5] p-8">
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Manage Subscription
          </button>
        </div>
      </Card>
    </div>
  )
}

export default SubscriptionPage