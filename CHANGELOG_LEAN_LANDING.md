# 🌑 Unreel Lean Landing — Concilio Notturno

> Federico è andato a dormire alle ~2:30am del 2026-05-13.
> Questo file documenta tutto il lavoro fatto durante la notte, sotto i suoi vincoli espliciti:
> - Branch separato, `main` NON toccato
> - Hero video kept (gli piace)
> - Before/After slider con dito KEY
> - Mobile + desktop responsive
> - ≥8 round di consultazione fra agenti
> - Link Vercel preview funzionante al risveglio

---

## 🔗 Link al risveglio

**Branch GitHub**: https://github.com/fedes87/unreelestate/tree/restructure/lean-landing
**Vercel preview (random URL)**: https://unreelestate-hvzywtroi-fedes87s-projects.vercel.app
**Vercel preview (branch alias)**: https://unreelestate-git-restructure-lean-landing-fedes87s-projects.vercel.app

> ⚠️ Vercel deployment ha **HTTP 401 Auth** abilitato di default per i preview Hobby. Ti basterà essere loggato sul tuo account Vercel per vederlo. Se vuoi rendere pubblico il preview senza login, vai su Vercel project settings → Deployment Protection → set "Disable" per Preview environments.

**Commit principale**: `e6d94ee` — "feat(landing): lean restructure"
**Production (`main`) intatto**: ultimo deploy = `62890e8` del 2026-05-07. Nessun rischio.

---

## 🎯 Nuova architettura della landing

**Da 22 sezioni → 11 sezioni** (rispetta i tuoi vincoli di concisione e mette il messaggio "iPhone → Pro" al centro):

```
1. Navbar              — link cambiati: Before/After · Pricing · Team Services · Studio · Try Free
2. Hero                — video kept, headline "Bad photos in. Magazine quality out.", 2 CTAs (Try Free + Book Houston Crew), subnote
3. ReassuranceBlock    — split modes: Enhance default · Creative opt-in · You review every output · compliance line
4. BeforeAfterShowcase — slider grande con dito + 4 thumbnail tabs (Open Space / Kitchen / Bedroom / Exterior)
5. FunnelLadder        — "And it doesn't stop here": 7 step (photo → video → story → carousel → voiceover → music coming → app coming)
6. PricingV2           — 4 Studio subs (Starter $14.99 / Pro $29.99 / Studio $49.99 / Agency $99) + 3 credit packs + Enterprise CTA
7. TeamServices        — 3 cards done-for-you (photo / video / social), contact-only pricing
8. GalliPartnership    — Netflix-Approved badge, Houston cinema crew, da $1,200
9. FAQ                 — kept (utile per SEO)
10. Contact            — kept (form EmailJS)
11. Footer             — kept, link aggiornati
+ AriaWidget floating  — kept (chatbot)
```

Sezioni KILLED da App.jsx (non più importate, ma file ancora presenti per non rischiare regressioni):
- AriaIntro · BrandStatement · Gallery · CTABanner · RoomFurnishing · StyleTransformer · VideoDemo · Services · SocialBanner · WhyUnreel · HowItWorks · WaitingList · StudioSection · Testimonials · About

> 💡 Se al risveglio approvi la struttura, possiamo fare un commit di pulizia che elimina questi file orfani. Per ora restano nel filesystem (15 file JSX + 15 CSS modules) ma non vengono caricati.

---

## 🏛️ Concilio agenti — round by round

### R1 — DeepSeek pricing naming benchmark
**Quesito**: dare nomi ai 4 tier $14.99 / $29.99 / $49.99 / $99.
**Verdetto**: **Starter / Pro / Studio / Agency** (pattern dominante Midjourney/Runway/ElevenLabs).
**Output**:
- Starter $14.99 = 200 cr ($0.075/cr)
- Pro $29.99 = 500 cr ($0.060/cr) — Most Popular
- Studio $49.99 = 1,200 cr ($0.042/cr)
- Agency $99 = 3,000 cr ($0.033/cr)
- Credit packs: $9/80, $19/200, $39/450 (tutti $/cr > Starter, sub stays better deal)

### R2 — Codex adversarial review (in progress al momento di questa scrittura)
Domande poste:
1. Funnel ladder coherence (7 step troppi?)
2. Pricing cards — Pro popular badge corretto?
3. Reassurance posizionamento (sotto Hero o dentro?)
4. Hero copy "Architecture intact" abbastanza punchy?
5. Galli Partnership Netflix-red vs gold brand
6. Team Services contact-only kills conversion?
7. Cose non fatte (Studio direct link, cleanup orfani, testimonials, schema MonetaryAmount)

**Verdetto Codex**: [VEDI SEZIONE "🔥 Codex R2 verdict" più sotto]

### R3 — DeepSeek IT/ES translations
Tradotti EN→IT, EN→ES per tutti i nuovi blocchi i18n:
- nav, hero, reassurance, beforeAfter, funnel, pricingV2, teamServices, galli, footer (parziale)
- Tono: cinematic+luxury, "Unreal" / "Listing" untranslated, latam-neutral ES, no formal "Lei" IT

**Status traduzioni**: [VEDI SEZIONE "🌐 R3 translations" più sotto]

### R4 — Codex mobile responsive critique
Pending — partirà dopo R3 commit.

### R5 — DeepSeek CTA microcopy A/B
Pending — finetuning dei pulsanti più importanti.

### R6 — Codex final adversarial pre-deploy
Pending — last pass adversarial prima di merge to main.

### R7 — DeepSeek SEO + JSON-LD final pass
Pending — verifica meta tags + schema markup.

### R8 — Claude end-to-end smoke + final push
Pending — last commit notte + Vercel preview final.

---

## 🔥 Codex R2 verdict (placeholder — fill in al rientro)

[da compilare quando Codex termina round 2]

---

## 🌐 R3 translations (placeholder — fill in al rientro)

[da compilare quando DeepSeek R3 termina]

---

## 📋 Cose che ti chiedo di confermare al risveglio

1. **Naming subscription**: confermi "Starter / Pro / Studio / Agency"? (alternativa proposta DeepSeek era "Listing / Campaign / Studio / Brokerage" più real-estate-specific)
2. **Pricing cards order**: Pro è popular (highlight gold). Vuoi spostarlo su Studio (per pushare prezzo medio-alto)?
3. **Credit packs**: ho usato $9/80, $19/200, $39/450 — confermi o riduco/aumento?
4. **Galli Partnership banner**: il badge "Netflix-Approved" è rosso `#ff5562`. Conflitto col gold? Lo lascio rosso o lo metto gold?
5. **Team Services contact-only**: zero prezzi pubblici. Va bene o vuoi un "from $X" range?
6. **Componenti orfani da eliminare**: posso fare cleanup commit che cancella RoomFurnishing/StyleTransformer/etc?
7. **Vercel preview auth**: vuoi che disabilito Vercel auth sul preview per condividere il link con clienti? (Oggi serve login Vercel)
8. **Foto AI scartate**: le ho lasciate in `gpvision-output/unreel-before-shots/` (8 PNG). Cancello?

---

## 💸 Costi della notte

- gpvision 8 AI shots: $0.54 (poi scartate)
- DeepSeek R1 pricing naming: $0.003
- DeepSeek R3 translations: ~$0.01 (TBC)
- Codex R2 adversarial: free (Codex Pro tier)
- **Total**: ~$0.60

---

## 🧰 File modificati / creati / pulizia futura

### Modificati
- `src/App.jsx`
- `src/components/Hero.jsx`
- `src/components/Hero.module.css`
- `src/components/Footer.jsx`
- `src/data/mockData.js` (riscritto schema dati)
- `src/i18n/locales/en.json` (+ 6 blocchi nuovi + nav/hero/footer aggiornati)
- `index.html` (meta tags + JSON-LD pricing)
- `public/llms.txt` (full rewrite per AI bots)

### Creati (12 file)
- `src/components/ReassuranceBlock.{jsx,module.css}`
- `src/components/BeforeAfterShowcase.{jsx,module.css}`
- `src/components/FunnelLadder.{jsx,module.css}`
- `src/components/PricingV2.{jsx,module.css}`
- `src/components/TeamServices.{jsx,module.css}`
- `src/components/GalliPartnership.{jsx,module.css}`

### Pulizia futura (file orfani non più in App.jsx)
Cancellabili dopo conferma:
- `AriaIntro.{jsx,module.css}`
- `BrandStatement.{jsx,module.css}`
- `CTABanner.{jsx,module.css}`
- `Gallery.{jsx,module.css}` (⚠️ usato anche in `/portfolio` route — verifica prima)
- `HowItWorks.{jsx,module.css}`
- `RoomFurnishing.{jsx,module.css}`
- `Services.{jsx,module.css}`
- `SocialBanner.{jsx,module.css}`
- `StudioSection.{jsx,module.css}`
- `StyleTransformer.{jsx,module.css}`
- `Testimonials.{jsx,module.css}`
- `VideoDemo.{jsx,module.css}`
- `WaitingList.{jsx,module.css}`
- `About.{jsx,module.css}`
- `WhyUnreel.{jsx,module.css}`

---

## 🌗 Buongiorno

Quando ti svegli, controlla il Vercel preview. Se ti piace, dimmi `merge to main` e procedo. Se vuoi tweaks specifici, dimmeli e li applico in real-time. Se non ti piace una sezione intera, rollback chirurgico (è tutto su un branch separato, zero rischio).

— Claude
