export type BusStatus = 'Active' | 'Inactive'

export interface Bus {
  id: string
  busNumber: string
  busName: string
  busType: string
  route: string
  totalSeats: number
  availableSeats: number
  departureTime: string
  arrivalTime: string
  status: BusStatus
}