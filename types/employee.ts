export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  gender?: string
  image: string
  address?: {
    address?: string
    city?: string
    state?: string
    postalCode?: string
  }
  phone?: string
  department: string
  performanceRating: number
}
