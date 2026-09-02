export type BookingStatus =
  | 'Confirmed'
  | 'Pending'
  | 'Cancelled'

export type PaymentStatus =
  | 'Paid'
  | 'Pending'
  | 'Failed'
  | 'Refunded'

export interface Booking {
  id: string
  pnr: string

  passengerName: string
  phone: string
  email?: string

  busNumber: string
  busName?: string

  route: string
  travelDate: string
  departureTime?: string
  arrivalTime?: string

  seats: number
  seatNumbers?: string[]

  amount: number

  bookingStatus: BookingStatus
  paymentStatus: PaymentStatus

  bookedAt?: string
}