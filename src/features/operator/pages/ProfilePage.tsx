import { useState } from 'react'
import {
  CheckCircle2,
  FileText,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  User,
  X,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import { mockOperatorProfile } from '@/data/mockOperator'

type DocumentStatus = 'Uploaded' | 'Pending Verification' | 'Not Uploaded'

interface VerificationDocument {
  id: string
  name: string
  description: string
  required: boolean
  status: DocumentStatus
}

const initialDocuments: VerificationDocument[] = [
  {
    id: 'pan',
    name: 'PAN Card',
    description: 'Business or proprietor PAN card',
    required: true,
    status: 'Uploaded',
  },
  {
    id: 'gst',
    name: 'GST Registration Certificate',
    description: 'Required if applicable to the business',
    required: false,
    status: 'Uploaded',
  },
  {
    id: 'registration',
    name: 'Business Registration Proof',
    description: 'COI, Partnership Deed, Shop & Establishment or Proprietorship proof',
    required: true,
    status: 'Pending Verification',
  },
  {
    id: 'address',
    name: 'Business Address Proof',
    description: 'Utility bill, rent agreement or property document',
    required: true,
    status: 'Not Uploaded',
  },
  {
    id: 'bank',
    name: 'Bank Account Proof',
    description: 'Cancelled cheque or bank passbook first page',
    required: true,
    status: 'Not Uploaded',
  },
  {
    id: 'signatory',
    name: 'Authorized Signatory ID + Photo',
    description: 'Government-issued photo identification',
    required: true,
    status: 'Not Uploaded',
  },
]

function getDocumentStatusClasses(status: DocumentStatus) {
  switch (status) {
    case 'Uploaded':
      return 'bg-emerald-100 text-emerald-700'

    case 'Pending Verification':
      return 'bg-amber-100 text-amber-700'

    case 'Not Uploaded':
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-slate-100 text-slate-700'
  }
}

function ProfilePage() {
  const [formData, setFormData] = useState({
    businessName: mockOperatorProfile.businessName,
    ownerName: mockOperatorProfile.ownerName,
    email: mockOperatorProfile.email,
    phone: mockOperatorProfile.phone,
    address: mockOperatorProfile.address,
    gstNumber: mockOperatorProfile.gstNumber,
  })

  const [documents, setDocuments] =
    useState<VerificationDocument[]>(initialDocuments)

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Profile saved:', formData);

    setIsEditing(false);

    window.alert('Profile changes saved successfully.')
  }

  const handleCancel = () => {
    setFormData({
      businessName: mockOperatorProfile.businessName,
      ownerName: mockOperatorProfile.ownerName,
      email: mockOperatorProfile.email,
      phone: mockOperatorProfile.phone,
      address: mockOperatorProfile.address,
      gstNumber: mockOperatorProfile.gstNumber,
    });

    setIsEditing(false)
  }

  const handleUpload = (documentId: string) => {
    setDocuments((currentDocuments) =>
      currentDocuments.map((document) =>
        document.id === documentId
          ? {
              ...document,
              status: 'Pending Verification',
            }
          : document,
      ),
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a7b42]">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Profile & Verification
        </h1>

        <p className="mt-2 text-slate-600">
          Manage your operator account information and verification
          documents.
        </p>
      </div>

      {/* Verification Notice */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex gap-3">
          <CheckCircle2
            size={26}
            className="mt-0.5 shrink-0 text-amber-700"
          />

          <div>
            <h2 className="font-semibold text-amber-900">
              Verification status: Pending Review
            </h2>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              You can continue using the Operator Portal while your
              business verification is being reviewed. Buses and
              drivers may require verification before they become
              available for booking.
            </p>
          </div>
        </div>
      </div>

      {/* Business Profile */}
      <Card>
        <div className="flex flex-col gap-4 border-b border-[#e8e1d5] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-slate-900 p-4 text-white">
              <User size={28} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Business Profile
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Operator account information
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Business Name */}
            <div>
              <label
                htmlFor="businessName"
                className="text-sm font-medium text-slate-700"
              >
                Business Name <span className="text-red-600">*</span>
              </label>

              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={(event) =>
                  handleChange('businessName', event.target.value)
                }
                disabled={!isEditing}
                required
                className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-2 focus:ring-[#9a7b42]/10 disabled:cursor-not-allowed disabled:opacity-80"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label
                htmlFor="ownerName"
                className="text-sm font-medium text-slate-700"
              >
                Owner / Authorized Signatory Name{' '}
                <span className="text-red-600">*</span>
              </label>

              <input
                id="ownerName"
                name="ownerName"
                type="text"
                value={formData.ownerName}
                onChange={(event) =>
                  handleChange('ownerName', event.target.value)
                }
                disabled={!isEditing}
                required
                className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-2 focus:ring-[#9a7b42]/10 disabled:cursor-not-allowed disabled:opacity-80"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Mail size={15} />
                Email <span className="text-red-600">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) =>
                  handleChange('email', event.target.value)
                }
                disabled={!isEditing}
                required
                className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-2 focus:ring-[#9a7b42]/10 disabled:cursor-not-allowed disabled:opacity-80"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <Phone size={15} />
                Phone <span className="text-red-600">*</span>
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(event) =>
                  handleChange('phone', event.target.value)
                }
                disabled={!isEditing}
                required
                className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-2 focus:ring-[#9a7b42]/10 disabled:cursor-not-allowed disabled:opacity-80"
              />
            </div>

            {/* GST */}
            <div>
              <label
                htmlFor="gstNumber"
                className="text-sm font-medium text-slate-700"
              >
                GST Number
                <span className="ml-2 text-xs font-normal text-slate-400">
                  Optional / Conditional
                </span>
              </label>

              <input
                id="gstNumber"
                name="gstNumber"
                type="text"
                value={formData.gstNumber}
                onChange={(event) =>
                  handleChange('gstNumber', event.target.value)
                }
                disabled={!isEditing}
                className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm uppercase text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-2 focus:ring-[#9a7b42]/10 disabled:cursor-not-allowed disabled:opacity-80"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
              >
                <MapPin size={15} />
                Business Address <span className="text-red-600">*</span>
              </label>

              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={(event) =>
                  handleChange('address', event.target.value)
                }
                disabled={!isEditing}
                required
                className="mt-2 w-full rounded-xl border border-[#ddd5c8] bg-[#f8f5ef] px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#9a7b42] focus:ring-2 focus:ring-[#9a7b42]/10 disabled:cursor-not-allowed disabled:opacity-80"
              />
            </div>
          </div>

          {/* Form Actions */}
          {isEditing && (
            <div className="mt-8 flex flex-col gap-3 border-t border-[#e8e1d5] pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd5c8] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <X size={17} />
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </Card>

      {/* Verification Documents */}
      <Card>
        <div className="border-b border-[#e8e1d5] pb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#f4ede1] p-3 text-[#9a7b42]">
              <FileText size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Verification Documents
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload the required documents for operator verification.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {documents.map((document) => (
            <div
              key={document.id}
              className="rounded-2xl border border-[#e8e1d5] bg-[#fffdf8] p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                  <div className="rounded-xl bg-[#f5f1e8] p-3 text-slate-600">
                    <IdCard size={22} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {document.name}
                      </h3>

                      {document.required ? (
                        <span className="text-xs font-semibold text-red-600">
                          Required
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          Conditional
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {document.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getDocumentStatusClasses(
                      document.status,
                    )}`}
                  >
                    {document.status}
                  </span>

                  {document.status === 'Uploaded' && (
                    <button
                      type="button"
                      className="rounded-lg border border-[#ddd5c8] bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      View
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleUpload(document.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <Upload size={16} />
                    {document.status === 'Not Uploaded'
                      ? 'Upload'
                      : 'Replace'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-[#e8e1d5] bg-[#f8f5ef] p-4">
          <p className="text-sm leading-6 text-slate-600">
            Documents are shown here for demonstration. Actual secure
            storage, signed URLs and verification APIs will be connected
            when the backend document-upload service is implemented.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ProfilePage