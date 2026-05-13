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
**Vercel preview (branch alias)**: https://unreelestate-git-restructure-lean-landing-fedes87s-projects.vercel.app

> ⚠️ Vercel deployment ha **HTTP 401 Auth** abilitato di default per i preview Hobby. Ti basterà essere loggato sul tuo account Vercel per vederlo. Se vuoi rendere pubblico il preview senza login, vai su Vercel project settings → Deployment Protection → set "Disable" per Preview environments.

**Commits sul branch** (in ordine):
1. `e6d94ee` — feat(landing): lean restructure (7 new components + i18n EN + $399 sweep)
2. `001c604` — fix(landing): Codex R2 adversarial fixes (Hero CTA direct + trust-strip + Studio "Best Value" + Team Services ranges + Galli gold badge + Funnel 5+strip)
3. `60f4a66` — fix(mobile): Codex R4 mobile responsive (trust-strip pulizia + Funnel swipe-snap + PricingV2 mobile collapse + Galli price inline)

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

### R2 — Codex adversarial review ✅
**Pattern**: 6 domande aperte a Codex come peer primario, Claude sintetizza dopo.
**Verdetti applicati nel commit `001c604`**:
1. Hero primary CTA → direct link Studio app (non scroll a pricing)
2. Hero copy desc riscritto: "Architecture stays intact — we only fix light, color, and clarity..."
3. Trust-strip pill aggiunto in Hero (Same architecture · Creative opt-in · You review every output)
4. Pricing badge da "Most Popular" su Pro → "Best Value" su Studio
5. Team Services: aggiunti price ranges pubblici (Photo $199, Video $399, Social $299)
6. Galli badge ricolorato da Netflix red → brand gold + label cambiato a "Cinema-grade equipment"
7. Funnel tagliato da 7 a 5 step + "Shipping next" micro-strip per Music + Native App

### R3 — DeepSeek IT/ES translations 🔄 IN VOLO
Sta traducendo 9 blocchi i18n (nav, hero, reassurance, beforeAfter, funnel, pricingV2, teamServices, galli, footer). Output ~27 righe a check (di transcript). Prompt molto lungo, response time tipico DeepSeek 5-10min per task così.

### R4 — Codex mobile responsive critique ✅
**Pattern**: 5 domande mobile-specific a Codex peer primario.
**Verdetti applicati nel commit `60f4a66`**:
1. Hero trust-strip mobile: tolto pill+dots, stack vertical with top border
2. Hero buttons <390px: font-size 12px + tighter padding (no copy butchering)
3. FunnelLadder: scroll-snap-x mandatory + scroll-snap-align start + gradient fade + "‹ SWIPE ›" gold hint
4. PricingV2 mobile: features collapsed dietro toggle "See what's included ▾" per tier (4 cards stacked altrimenti = catalog non decisione)
5. Galli: visual block hidden su mobile + price "From $1,200" inline near CTA (era aria-hidden decorativo)

### R5 — Codex peer review CTAs + microcopy 🔄 IN VOLO
**Pattern**: 6 domande aperte a Codex come peer primario (per nuovo feedback Federico — Codex parere primario, Claude in seconda).
Domande:
1. Doppio CTA Hero crea ambivalenza?
2. "Start Free Trial →" ridondante su 4 tier diversi?
3. Navbar "Try Free" punta a #contact ≠ Hero "Try Free" che va a Studio app — inconsistenza?
4. "Request the Full Menu →" mailto = friction problem?
5. "Book Houston Crew" Hero porta a anchor — meglio mailto diretto?
6. Quale CTA OVERALL più debole?

### R6 — Codex final adversarial pre-deploy
Pending — last pass adversarial prima di merge to main, dopo aver applicato R5.

### R7 — Codex SEO + JSON-LD + llms.txt final pass
Pending — verifica meta tags + schema markup. Codex peer primario.

### R8 — Claude end-to-end smoke + final push
Pending — last commit notte + Vercel preview final.

---

## 🔥 Codex R2 verdict (sintesi)

Codex ha riscontrato 7 issue critici. Top 3 priority applicati:

1. **Hero primary CTA**: "Try Free · 100 Credits" → direct link Studio app (era anchor `#pricing`). Reasoning: click ad alta intenzione deve aprire la trial, non una sezione informativa.
2. **Reassurance**: trust-strip compatta dentro Hero + block completo sotto (alleggerimento percepito).
3. **Pulizia pricing/copy incoerente**: "Best Value" su Studio (era "Most Popular" su Pro) + Team Services con range pubblici + Galli badge gold (era Netflix-red lawsuit-shaped). Nota Codex: "$399 ancora in IT/ES, da pulire" → in R3.

Codex ha anche segnalato: "*"Zero" è lawsuit-shaped — meglio "Architecture intact" che non promettere "zero changes"*". Già applicato.

---

## 🌐 R3 translations (sintesi quando completato)

[ancora in volo — DeepSeek traduce 9 blocchi i18n verso IT e ES. Quando arriva, applico in commit 4]

---

## 🔥 Codex R4 mobile verdict (sintesi)

5 issue mobile-specific. Tutti applicati nel commit `60f4a66`:

1. **Hero trust-strip**: a 375px era "borderline amateurish" come pill → tolto pill+dots, stack vertical pulito.
2. **Hero buttons <390px**: tagliare a "Try Free →" avrebbe buttato via il value prop. Soluzione: font/padding ridotti, keep "100 Credits".
3. **FunnelLadder**: scroll-snap-x mandatory + "‹ SWIPE ›" hint + gradient fade — scroll lock chiaro su iOS.
4. **PricingV2 mobile**: 4 tier full feature lists = "catalog, not decision" → features collapsed dietro toggle, CTA visibile entro 2° tier.
5. **GalliPartnership**: $1,200 era aria-hidden decorativo → inline near CTA + visual block hidden su mobile.

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
