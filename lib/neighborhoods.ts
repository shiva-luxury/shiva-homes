export type Neighborhood = {
  slug: string
  name: string
  medianPrice: string
  pricePerSqft: string
  daysOnMarket: string
  lifestyle: string
  description: string
  schools: string[]
  recentSales: { address: string; price: string; beds: number }[]
}

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: 'encino',
    name: 'Encino',
    medianPrice: '$1.4M',
    pricePerSqft: '$620',
    daysOnMarket: '32',
    lifestyle: 'Quiet, tree-lined streets minutes from the Valley’s best schools and shopping.',
    description: 'Encino blends suburban calm with easy access to both the Westside and Downtown via the 101 and 405. Wide, tree-lined streets, generous lot sizes, and a mix of mid-century ranch homes and new construction make it a favorite for families who want space without leaving the city. Ventura Boulevard anchors the neighborhood with restaurants, boutique fitness studios, and everyday conveniences.',
    schools: ['Lanai Road Elementary', 'Portola Highly Gifted Magnet', 'Birmingham Community Charter High School'],
    recentSales: [
      { address: '5122 Ostrom Ave', price: '$1,320,000', beds: 4 },
      { address: '4890 Genesta Ave', price: '$1,610,000', beds: 5 },
      { address: '17230 Rayen St', price: '$1,180,000', beds: 3 },
    ],
  },
  {
    slug: 'sherman-oaks',
    name: 'Sherman Oaks',
    medianPrice: '$1.5M',
    pricePerSqft: '$655',
    daysOnMarket: '29',
    lifestyle: 'Walkable village energy on Ventura Blvd with easy canyon access to the Westside.',
    description: 'Sherman Oaks pairs walkable village energy with quick canyon access to the Westside and Hollywood. The stretch of Ventura Boulevard here is denser and trendier than neighboring Encino, drawing a younger buyer pool alongside longtime families in the hillside pockets north of Ventura.',
    schools: ['Sherman Oaks Elementary Charter', 'Van Nuys/Sherman Oaks Charter', 'Notre Dame High School'],
    recentSales: [
      { address: '14522 Valley Vista Blvd', price: '$1,750,000', beds: 4 },
      { address: '4210 Nagle Ave', price: '$1,395,000', beds: 3 },
      { address: '13520 Killion St', price: '$1,590,000', beds: 4 },
    ],
  },
  {
    slug: 'malibu',
    name: 'Malibu',
    medianPrice: '$3.8M',
    pricePerSqft: '$1,450',
    daysOnMarket: '61',
    lifestyle: 'Coastal privacy, surf culture, and some of the most exclusive beachfront in the country.',
    description: 'Malibu remains the benchmark for coastal privacy in Southern California — 21 miles of coastline ranging from gated beachfront compounds to canyon retreats in the Santa Monica Mountains. Inventory is thin and demand is constant, especially for direct beach access and unobstructed ocean views.',
    schools: ['Webster Elementary', 'Malibu Middle School', 'Malibu High School'],
    recentSales: [
      { address: '21500 Pacific Coast Hwy', price: '$5,200,000', beds: 4 },
      { address: '6400 Zuma Bay Way', price: '$4,650,000', beds: 5 },
      { address: '3900 Malibu Country Dr', price: '$3,100,000', beds: 4 },
    ],
  },
  {
    slug: 'venice',
    name: 'Venice',
    medianPrice: '$2.1M',
    pricePerSqft: '$1,020',
    daysOnMarket: '35',
    lifestyle: 'Creative energy, canals, and boardwalk culture steps from the sand.',
    description: 'Venice has evolved from bohemian enclave to one of LA’s most sought-after creative-class neighborhoods, home to tech offices along Abbot Kinney and the historic Venice Canals. Architecturally distinctive homes — from restored Craftsman bungalows to sharp new-construction builds — command a premium for walkability to the beach.',
    schools: ['Broadway Elementary', 'Nora Sterry Elementary', 'Venice High School'],
    recentSales: [
      { address: '531 Amoroso Pl', price: '$2,890,000', beds: 3 },
      { address: '1234 5th Ave', price: '$2,050,000', beds: 2 },
      { address: '822 Cabrillo Ave', price: '$3,150,000', beds: 4 },
    ],
  },
  {
    slug: 'santa-monica',
    name: 'Santa Monica',
    medianPrice: '$2.4M',
    pricePerSqft: '$1,080',
    daysOnMarket: '33',
    lifestyle: 'Walkable beach-town living with top-tier dining, schools, and ocean air.',
    description: 'Santa Monica offers dense, walkable beach-town living with some of LA’s strongest public schools, a lively downtown/Third Street Promenade core, and consistently strong resale demand. North of Montana remains the city’s premier single-family enclave.',
    schools: ['Franklin Elementary', 'Lincoln Middle School', 'Santa Monica High School'],
    recentSales: [
      { address: '2145 California Ave', price: '$2,700,000', beds: 4 },
      { address: '1020 20th St', price: '$3,450,000', beds: 5 },
      { address: '415 Marguerita Ave', price: '$2,150,000', beds: 3 },
    ],
  },
  {
    slug: 'beverly-hills',
    name: 'Beverly Hills',
    medianPrice: '$5.2M',
    pricePerSqft: '$1,600',
    daysOnMarket: '55',
    lifestyle: 'The gold standard in LA prestige, privacy, and architectural pedigree.',
    description: 'Beverly Hills remains the gold standard for LA prestige — the Flats, Trousdale Estates, and the Beverly Hills Post Office area each offer a distinct flavor of privacy and architectural pedigree, from classic traditionals to ultra-modern view estates.',
    schools: ['Hawthorne Elementary', 'Beverly Vista Middle School', 'Beverly Hills High School'],
    recentSales: [
      { address: '918 N Beverly Dr', price: '$7,900,000', beds: 6 },
      { address: '1206 Loma Linda Dr', price: '$6,200,000', beds: 5 },
      { address: '512 N Bedford Dr', price: '$5,450,000', beds: 4 },
    ],
  },
  {
    slug: 'calabasas',
    name: 'Calabasas',
    medianPrice: '$2.6M',
    pricePerSqft: '$720',
    daysOnMarket: '40',
    lifestyle: 'Gated-community luxury with top schools and mountain-view estates.',
    description: 'Calabasas is defined by its guard-gated communities — The Oaks, Mountain View Estates, Monte Nido — offering privacy, top-rated schools, and mountain-view estates within a short drive of the Valley and the 101. It’s a magnet for families and entertainment-industry buyers alike.',
    schools: ['Bay Laurel Elementary', 'A.C. Stelle Middle School', 'Calabasas High School'],
    recentSales: [
      { address: '5231 Park Granada', price: '$2,850,000', beds: 5 },
      { address: '23500 Park Sorrento', price: '$3,400,000', beds: 6 },
      { address: '4120 Park Paseo', price: '$2,200,000', beds: 4 },
    ],
  },
  {
    slug: 'woodland-hills',
    name: 'Woodland Hills',
    medianPrice: '$1.3M',
    pricePerSqft: '$540',
    daysOnMarket: '30',
    lifestyle: 'Family-friendly Valley living with golf courses and spacious lots.',
    description: 'Woodland Hills offers some of the Valley’s most spacious lots at relatively accessible prices, anchored by Warner Center’s ongoing redevelopment, El Caballero and Woodland Hills Country Clubs, and strong public schools south of Ventura Boulevard.',
    schools: ['Welby Way Elementary', 'Hale Charter Academy', 'El Camino Real Charter High School'],
    recentSales: [
      { address: '5100 Quakertown Ave', price: '$1,250,000', beds: 4 },
      { address: '23430 Hatteras St', price: '$1,410,000', beds: 4 },
      { address: '5460 Jed Smith Rd', price: '$1,050,000', beds: 3 },
    ],
  },
]

export function getNeighborhood(slug: string) {
  return NEIGHBORHOODS.find((n) => n.slug === slug)
}
