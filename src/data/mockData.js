// Static metadata (non-translatable) — text content lives in src/i18n/locales/

// ─────────────────────────────────────────────────────────────────
// BeforeAfter showcase — pairs from existing /public/gallery/
// (Re-used across HeroProof, BeforeAfterShowcase, and /portfolio route.)
// ─────────────────────────────────────────────────────────────────
export const galleryPairs = [
  { key: 'exterior',  before: '/gallery/before/exterior.webp',  after: '/gallery/after/exterior.webp'  },
  { key: 'entryway',  before: '/gallery/before/entryway.webp',  after: '/gallery/after/entryway.webp'  },
  { key: 'openspace', before: '/gallery/before/openspace.webp', after: '/gallery/after/openspace.webp' },
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

// ─────────────────────────────────────────────────────────────────
// BeforeAfterShowcase — tabs to switch the prominent slider scene.
// Keys reference i18n labels at `beforeAfter.tabs`.
// ─────────────────────────────────────────────────────────────────
// Codex R9 verdict: Federico said exterior is the most legible before/after — move it first.
// Exterior reads in 1 second (curb appeal swap) and is most aligned with "architecture intact" claim.
export const showcaseScenes = [
  { key: 'exterior',  before: '/gallery/before/exterior.webp',  after: '/gallery/after/exterior.webp'  },
  { key: 'openspace', before: '/gallery/before/openspace.webp', after: '/gallery/after/openspace.webp' },
  { key: 'kitchen',   before: '/gallery/before/kitchen.webp',   after: '/gallery/after/kitchen.webp'   },
  { key: 'bedroom',   before: '/gallery/before/bedroom.webp',   after: '/gallery/after/bedroom.webp'   },
]

// ─────────────────────────────────────────────────────────────────
// FunnelLadder — "It doesn't stop here." Each step is one capability,
// stepping the user from a single photo to the full content stack.
// `comingSoon: true` shows the soft-launch badge.
// Labels live at `funnel.steps[i]`.
// ─────────────────────────────────────────────────────────────────
// Codex R2 feedback: cut from 7 to 5 to avoid two Coming Soon dragging the value chain.
// "Custom Music" + "Native App" demoted to a coming-soon micro-strip after the ladder.
export const funnelSteps = [
  { key: 'enhance',   icon: 'photo',  available: true },
  { key: 'video',     icon: 'play',   available: true },
  { key: 'story',     icon: 'square', available: true },
  { key: 'carousel',  icon: 'layers', available: true },
  { key: 'voiceover', icon: 'wave',   available: true },
]

// Codex R6 follow-up: the 2-card "Coming Soon" strip was killed (shouted "product incomplete").
// Now lives as a single roadmap line under the Funnel CTA. Array kept exported in case we ever
// want the visual band back; currently unused by App.
export const funnelComingSoon = []

// ─────────────────────────────────────────────────────────────────
// ReassuranceBlock — split modes + compliance copy.
// Labels at `reassurance.points[i]`.
// ─────────────────────────────────────────────────────────────────
export const reassurancePoints = [
  { key: 'enhance',    icon: 'shield' },
  { key: 'creative',   icon: 'palette' },
  { key: 'compliance', icon: 'check' },
]

// ─────────────────────────────────────────────────────────────────
// PRICING V2 — 4 monthly subscription tiers + 3 credit packs.
// All labels at `pricingV2.tiers[i]` / `pricingV2.packs[i]`.
// Naming source: DeepSeek R1 benchmark (Midjourney / Runway / ElevenLabs / Leonardo).
// Math:
//   $14.99 /  200 cr = $0.075/cr (Starter)
//   $29.99 /  500 cr = $0.060/cr (Pro)        -20%
//   $49.99 / 1200 cr = $0.042/cr (Studio)     -44%
//   $99.00 / 3000 cr = $0.033/cr (Agency)     -56%
//   Recharges: $9/80 = $0.113/cr · $19/200 = $0.095/cr · $39/450 = $0.087/cr
//   ALL recharges > $0.075/cr Starter → sub stays the better deal.
// ─────────────────────────────────────────────────────────────────
// Codex R2 feedback: moved the highlight from Pro to Studio.
// Studio is the natural step where the full content stack unlocks (Reels + Carousels + Brand Kit).
export const subscriptionTiers = [
  { key: 'starter', price: 14.99, credits: 200,  popular: false, ctaType: 'app' },
  { key: 'pro',     price: 29.99, credits: 500,  popular: false, ctaType: 'app' },
  { key: 'studio',  price: 49.99, credits: 1200, popular: true,  ctaType: 'app' },
  { key: 'agency',  price: 99,    credits: 3000, popular: false, ctaType: 'app' },
]

export const creditPacks = [
  { key: 'pack1', price: 9,  credits: 80  },
  { key: 'pack2', price: 19, credits: 200 },
  { key: 'pack3', price: 39, credits: 450 },
]

// Credit spend rates (display-only, authoritative rates live in the Studio app).
export const studioSpend = [
  { key: 'photoEnhance',  credits: 3   },
  { key: 'aiDescription', credits: 1   },
  { key: 'story',         credits: 5   },
  { key: 'carousel',      credits: 8   },
  { key: 'voiceover',     credits: 4   },
  { key: 'videoFast',     credits: 20  },
  { key: 'videoHd',       credits: 50  },
  { key: 'reel',          credits: 20  },
]

// ─────────────────────────────────────────────────────────────────
// TeamServices — done-for-you dedicated team, contact-only pricing.
// Labels at `teamServices.cards[i]`.
// ─────────────────────────────────────────────────────────────────
export const teamServices = [
  { key: 'photo',   icon: 'photo' },
  { key: 'video',   icon: 'film'  },
  { key: 'social',  icon: 'grid'  },
]

// ─────────────────────────────────────────────────────────────────
// Navigation — anchor IDs the page exposes. Updated for v2.
// ─────────────────────────────────────────────────────────────────
export const navHrefs = [
  { key: 'showcase', href: '#showcase' },
  { key: 'pricing',  href: '#pricing'  },
  { key: 'team',     href: '#team'     },
]
