// Static metadata (non-translatable) — text content lives in src/i18n/locales/

export const servicesMeta = [
  { number: '01', image: '/img/service-photo.png' },
  { number: '02', image: '/img/service-staging.png' },
  { number: '03', image: '/img/service-land.png' },
  { number: '04', image: '/img/service-social.png' },
]

export const whyStats = ['100%', '10×', '$399', '∞']

export const howSteps = ['01', '02', '03']

export const testimonialMeta = [
  { name: 'Brandon Whitfield', role: 'Luxury Real Estate Agent, Houston TX', avatar: '/img/testimonial-brandon.png' },
  { name: 'Ashley Tran',       role: 'Real Estate Broker, Houston TX',       avatar: '/img/testimonial-ashley.png'  },
  { name: 'Derek Calloway',    role: 'Property Developer, Houston TX',        avatar: '/img/testimonial-derek.png'   },
]

export const pricingMeta = [
  { name: 'Listing',   price: 399, highlight: false, addonPrices: [20, 50, 20] },
  { name: 'Signature', price: 599, highlight: true,  addonPrices: [20]         },
]

export const galleryPairs = [
  { before: '/gallery/before/living.png',   after: '/gallery/after/living.png'   },
  { before: '/gallery/before/kitchen.png',  after: '/gallery/after/kitchen.png'  },
  { before: '/gallery/before/exterior.png', after: '/gallery/after/exterior.png' },
  { before: '/gallery/before/backyard.png', after: '/gallery/after/backyard.png' },
]

export const portfolioPairs = [
  { before: '/gallery/before/living.png',   after: '/gallery/after/living.png'   },
  { before: '/gallery/before/kitchen.png',  after: '/gallery/after/kitchen.png'  },
  { before: '/gallery/before/bedroom.png',  after: '/gallery/after/bedroom.png'  },
  { before: '/gallery/before/bathroom.png', after: '/gallery/after/bathroom.png' },
  { before: '/gallery/before/exterior.png', after: '/gallery/after/exterior.png' },
  { before: '/gallery/before/backyard.png', after: '/gallery/after/backyard.png' },
  { before: '/gallery/before/pool.png',     after: '/gallery/after/pool.png'     },
  { before: '/gallery/before/townhome.png', after: '/gallery/after/townhome.png' },
  { before: '/gallery/before/office.png',   after: '/gallery/after/office.png'   },
  { before: '/gallery/before/dining.png',   after: '/gallery/after/dining.png'   },
  { before: '/gallery/before/entryway.png', after: '/gallery/after/entryway.png' },
]

export const navHrefs = [
  { key: 'services', href: '#services' },
  { key: 'portfolio', href: '#gallery'   },
  { key: 'about',    href: '#about'     },
]
