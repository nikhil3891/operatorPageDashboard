import { useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, Eye, EyeOff, LockKeyhole } from 'lucide-react'

type PasswordField = 'current' | 'new' | 'confirm'

interface PasswordErrors {
  current?: string
  new?: string
  confirm?: string
  form?: string
}

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [errors, setErrors] = useState<PasswordErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validate = (): boolean => {
    const nextErrors: PasswordErrors = {}

    if (!currentPassword.trim()) {
      nextErrors.current = 'Current password is required.'
    }

    if (!newPassword) {
      nextErrors.new = 'New password is required.'
    } else if (newPassword.length < 8) {
      nextErrors.new =
        'New password must contain at least 8 characters.'
    } else if (newPassword === currentPassword) {
      nextErrors.new =
        'New password must be different from the current password.'
    }

    if (!confirmPassword) {
      nextErrors.confirm = 'Please confirm your new password.'
    } else if (newPassword !== confirmPassword) {
      nextErrors.confirm = 'Passwords do not match.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSuccessMessage('')

    const isValid = validate()

    if (!isValid) {
      return
    }

    setIsSubmitting(true)

    try {
      /*
       * API-ready placeholder.
       *
       * Later this can be replaced with:
       *
       * await changePassword({
       *   currentPassword,
       *   newPassword,
       * })
       *
       * No real password is changed in the current frontend-only demo.
       */

      await new Promise((resolve) => {
        setTimeout(resolve, 800)
      })

      setSuccessMessage(
        'Password change request submitted successfully.',
      )

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setErrors({})
    } catch {
      setErrors({
        form: 'Unable to update password. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearFieldError = (field: PasswordField) => {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      form: undefined,
    }))

    setSuccessMessage('')
  }

  const getInputClasses = (error?: string) => {
    return `w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
      error
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-[#E7DFD0] focus:border-[#B08D57] focus:ring-[#B08D57]/20'
    }`
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Change Password
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update your account password to keep your operator
          account secure.
        </p>
      </div>

      {/* Password Card */}
      <section className="rounded-2xl border border-[#E7DFD0] bg-[#FFFCF5] p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#B08D57]/10 text-[#9a7b42]">
            <LockKeyhole size={21} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Update your password
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Use a password with at least 8 characters. Do not
              reuse your current password.
            </p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <div>
              <p className="text-sm font-semibold text-emerald-800">
                Success
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.form && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errors.form}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Current Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value)
                  clearFieldError('current')
                }}
                placeholder="Enter current password"
                autoComplete="current-password"
                className={getInputClasses(errors.current)}
              />

              <button
                type="button"
                onClick={() => setShowCurrent((value) => !value)}
                aria-label={
                  showCurrent
                    ? 'Hide current password'
                    : 'Show current password'
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showCurrent ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.current && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.current}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              New Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value)
                  clearFieldError('new')
                }}
                placeholder="Enter new password"
                autoComplete="new-password"
                className={getInputClasses(errors.new)}
              />

              <button
                type="button"
                onClick={() => setShowNew((value) => !value)}
                aria-label={
                  showNew
                    ? 'Hide new password'
                    : 'Show new password'
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showNew ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.new && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.new}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Confirm New Password{' '}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                  clearFieldError('confirm')
                }}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className={getInputClasses(errors.confirm)}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm((value) => !value)
                }
                aria-label={
                  showConfirm
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.confirm && (
              <p className="mt-1.5 text-xs text-red-600">
                {errors.confirm}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="rounded-xl border border-[#E7DFD0] bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-800">
              Password requirements
            </p>

            <ul className="mt-2 space-y-1.5 text-xs text-slate-500">
              <li>• At least 8 characters</li>
              <li>• Must be different from your current password</li>
              <li>• Confirmation must match the new password</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#E7DFD0] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                setErrors({})
                setSuccessMessage('')
              }}
              disabled={isSubmitting}
              className="rounded-xl border border-[#E7DFD0] bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#B08D57] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9a7b42] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Updating...'
                : 'Update Password'}
            </button>
          </div>
        </form>
      </section>

      {/* Security Note */}
      <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm leading-6 text-blue-800">
          <span className="font-semibold">Security note:</span>{' '}
          In the production application, the password will be
          changed through the authenticated backend API. The
          current frontend demo only validates the form and
          simulates the request.
        </p>
      </section>
    </div>
  )
}