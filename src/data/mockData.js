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
  { name: 'B. W.', role: 'Real Estate Agent, Houston TX' },
  { name: 'A. T.', role: 'Real Estate Broker, Houston TX' },
  { name: 'D. C.', role: 'Property Developer, Houston TX' },
]

// Three done-for-you packages — graduated by scope + price.
// In-Location is Houston-only cinema crew; Signature + Light are remote worldwide.
export const pricingMeta = [
  {
    key: 'inLocation',
    name: 'In-Location',
    price: 1200,
    priceLabel: 'from',
    highlight: false,
    isHouston: true,
    isPremium: true,
    ctaType: 'mailto', // opens info@unreelestate.com
    addonPrices: [],
  },
  {
    key: 'signature',
    name: 'Signature',
    price: 599,
    highlight: true,
    ctaType: 'anchor', // scroll to #contact
    addonPrices: [29, 49, 99], // extra video, rush 12h, add-on reel cuts
  },
  {
    key: 'light',
    name: 'Light',
    price: 199,
    highlight: false,
    ctaType: 'anchor',
    addonPrices: [29, 19], // extra video, rush 12h
  },
]

// Studio self-serve — credits-based pricing for DIY agents.
export const studioPacks = [
  { key: 'starter', price: 9,  credits: 100  },
  { key: 'std',     price: 29, credits: 350  },
  { key: 'pro',     price: 99, credits: 1250 },
]
export const studioSubs = [
  { key: 'pro',    price: 39, credits: 500,  popular: true },
  { key: 'agency', price: 89, credits: 1500, popular: false },
]
// Spend rates (display only — authoritative rates live in the app)
export const studioSpend = [
  { key: 'photoEnhance', credits: 3 },
  { key: 'aiDescription', credits: 1 },
  { key: 'story',        credits: 5 },
  { key: 'reel',         credits: 20 },
  { key: 'videoFast',    credits: '20–40' },
  { key: 'videoHd',      credits: '50–110' },
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
