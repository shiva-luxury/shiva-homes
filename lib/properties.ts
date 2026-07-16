export type Property = {
  id: string
  address: string
  city: string
  price: string
  beds: number
  baths: number
  sqft: string
  status: 'Active' | 'Pending' | 'Coming Soon'
}

export const FEATURED_PROPERTIES: Property[] = [
  { id: 'p1', address: '4521 Woodley Ave', city: 'Encino, CA', price: '$1,895,000', beds: 4, baths: 3, sqft: '2,940', status: 'Active' },
  { id: 'p2', address: '14200 Dickens St', city: 'Sherman Oaks, CA', price: '$2,150,000', beds: 4, baths: 4, sqft: '3,100', status: 'Active' },
  { id: 'p3', address: '21800 Pacific Coast Hwy', city: 'Malibu, CA', price: '$6,450,000', beds: 5, baths: 5, sqft: '4,800', status: 'Coming Soon' },
  { id: 'p4', address: '520 Amoroso Pl', city: 'Venice, CA', price: '$3,295,000', beds: 3, baths: 3, sqft: '2,200', status: 'Active' },
  { id: 'p5', address: '2100 5th St', city: 'Santa Monica, CA', price: '$3,795,000', beds: 4, baths: 4, sqft: '3,050', status: 'Pending' },
  { id: 'p6', address: '918 N Beverly Dr', city: 'Beverly Hills, CA', price: '$7,900,000', beds: 6, baths: 7, sqft: '6,200', status: 'Active' },
]
