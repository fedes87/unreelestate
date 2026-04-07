// Static metadata (non-translatable) — text content lives in src/i18n/locales/

export const servicesMeta = [
  { number: '01', image: '/img/service-photo.webp' },
  { number: '02', image: '/img/service-staging.webp' },
  { number: '03', image: '/img/service-land.webp' },
  { number: '04', image: '/img/service-social.webp' },
]

export const whyStats = ['100%', '10×', '$399', '∞']

export const howSteps = ['01', '02', '03']

export const testimonialMeta = [
  { name: 'Brandon Whitfield', role: 'Luxury Real Estate Agent, Houston TX', avatar: '/img/testimonial-brandon.webp' },
  { name: 'Ashley Tran',       role: 'Real Estate Broker, Houston TX',       avatar: '/img/testimonial-ashley.webp'  },
  { name: 'Derek Calloway',    role: 'Property Developer, Houston TX',        avatar: '/img/testimonial-derek.webp'   },
]

export const pricingMeta = [
  { name: 'Listing',   price: 399, highlight: false, addonPrices: [20, 50, 20] },
  { name: 'Signature', price: 599, highlight: true,  addonPrices: [20]         },
]

export const galleryPairs = [
  { before: '/gallery/before/exterior.webp',  after: '/gallery/after/exterior.webp'  },
  { before: '/gallery/before/entryway.webp',  after: '/gallery/after/entryway.webp'  },
  { before: '/gallery/before/openspace.webp', after: '/gallery/after/openspace.webp' },
]

export const portfolioPairs = [
  { before: '/gallery/before/exterior.webp',   after: '/gallery/after/exterior.webp'   },
  { before: '/gallery/before/entryway.webp',   after: '/gallery/after/entryway.webp'   },
  { before: '/gallery/before/openspace.webp',  after: '/gallery/after/openspace.webp'  },
  { before: '/gallery/before/living.webp',     after: '/gallery/after/living.webp'     },
  { before: '/gallery/before/kitchen.webp',    after: '/gallery/after/kitchen.webp'    },
  { before: '/gallery/before/masterbath.webp', after: '/gallery/after/masterbath.webp' },
  { before: '/gallery/before/rooftop.webp',    after: '/gallery/after/rooftop.webp'    },
  { before: '/gallery/before/bedroom.webp',    after: '/gallery/after/bedroom.webp'    },
  { before: '/gallery/before/bathroom.webp',   after: '/gallery/after/bathroom.webp'   },
  { before: '/gallery/before/backyard.webp',   after: '/gallery/after/backyard.webp'   },
  { before: '/gallery/before/pool.webp',       after: '/gallery/after/pool.webp'       },
  { before: '/gallery/before/townhome.webp',   after: '/gallery/after/townhome.webp'   },
  { before: '/gallery/before/office.webp',     after: '/gallery/after/office.webp'     },
  { before: '/gallery/before/dining.webp',     after: '/gallery/after/dining.webp'     },
]

export const navHrefs = [
  { key: 'services', href: '#services' },
  { key: 'portfolio', href: '#gallery'   },
  { key: 'about',    href: '#about'     },
]
