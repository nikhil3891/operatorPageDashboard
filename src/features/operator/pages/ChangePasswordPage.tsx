import { LockKeyhole } from 'lucide-react'
import Card from '@/components/ui/Card'

function ChangePasswordPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a7b42]">
          Security
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Change Password
        </h1>

        <p className="mt-2 text-slate-600">
          Update your account password to keep your account secure.
        </p>
      </div>

      <Card>
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-xl bg-[#f3eee4] p-3 text-[#9a7b42]">
            <LockKeyhole size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Update Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Use a strong password that you don't use elsewhere.
            </p>
          </div>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-slate-600"
            >
              Current Password
            </label>

            <input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none focus:border-[#9a7b42]"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-slate-600"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none focus:border-[#9a7b42]"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-slate-600"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none focus:border-[#9a7b42]"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Update Password
          </button>
        </form>
      </Card>
    </div>
  )
}

export default ChangePasswordPage