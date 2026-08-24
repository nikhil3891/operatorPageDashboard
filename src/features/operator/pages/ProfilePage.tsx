import { User } from 'lucide-react'
import Card from '@/components/ui/Card'
import { mockOperatorProfile } from '@/data/mockOperator'

function ProfilePage() {
  const profile = mockOperatorProfile

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a7b42]">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Profile
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your operator account information.
        </p>
      </div>

      <Card>
        <div className="flex items-center gap-4 border-b border-[#e8e1d5] pb-6">
          <div className="rounded-full bg-slate-900 p-4 text-white">
            <User size={28} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {profile.businessName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Operator Account
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-500">
              Business Name
            </label>

            <input
              value={profile.businessName}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-500">
              Owner Name
            </label>

            <input
              value={profile.ownerName}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-500">
              Email
            </label>

            <input
              value={profile.email}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-500">
              Phone
            </label>

            <input
              value={profile.phone}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-500">
              GST Number
            </label>

            <input
              value={profile.gstNumber}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-500">
              Address
            </label>

            <input
              value={profile.address}
              readOnly
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700"
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Edit Profile
          </button>
        </div>
      </Card>
    </div>
  )
}

export default ProfilePage