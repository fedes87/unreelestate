# 🌑 Unreel Lean Landing — Concilio Notturno (finale)

> Sessione 2026-05-13 dopo le 02:00. Branch `restructure/lean-landing`, **main intatto**.

---

## 🔗 Link

**Branch GitHub**: https://github.com/fedes87/unreelestate/tree/restructure/lean-landing
**Vercel preview (latest)**: https://unreelestate-nfgghm05i-fedes87s-projects.vercel.app
**Vercel preview (branch alias, sempre aggiornato)**: https://unreelestate-git-restructure-lean-landing-fedes87s-projects.vercel.app

> ⚠️ Vercel ha **HTTP 401 Auth** abilitato di default sui preview Hobby. Basta essere loggato sul tuo account Vercel per vederlo. Se vuoi rendere il preview pubblico: Vercel project settings → Deployment Protection → Disable per Preview.

**Production (`main`) intatto**: ultimo deploy `62890e8` del 2026-05-07. **Zero rischio finché non fai merge.**

---

## 📜 Commits sul branch (5)

| # | SHA | Titolo |
|---|---|---|
| 1 | `e6d94ee` | feat(landing): lean restructure (22 → 11 sezioni + 7 new components + i18n EN) |
| 2 | `001c604` | fix(landing): Codex R2 adversarial (Hero direct CTA + trust-strip + Studio Best Value + Team ranges + Galli gold + Funnel 5+strip) |
| 3 | `60f4a66` | fix(mobile): Codex R4 mobile responsive (trust-strip pulizia + Funnel swipe-snap + PricingV2 collapse + Galli price inline) |
| 4 | `140f421` | fix(ctas): Codex R5 CTAs (Navbar→Studio, "See Houston Crew", per-tier pricing CTAs, "Request Houston Shoot Quote") |
| 5 | `ec93ca8` | fix(content): Codex R6 critical content drift + R7 SEO + R3 IT/ES translations |

Each commit deploys cleanly on Vercel — rollback granulare possibile se serve.

---

## 🎯 Architettura finale della landing

11 sezioni invece di 22:

```
1. Navbar              — "Try Free" → Studio app (uniformato in tutto il sito)
2. Hero                — Video kept, headline "Bad photos in. Magazine quality out.",
                         desc "Architecture stays intact — we only fix light, color, clarity...",
                         2 CTAs (Try Free · 100 Credits + See Houston Crew) + trust-strip
3. ReassuranceBlock    — Enhance default + Creative opt-in + You review + compliance line
4. BeforeAfterShowcase — slider grande + 4 tab thumbnails (gallery assets esistenti)
5. FunnelLadder        — 5 step (photo→video→story→carousel→VO) + single roadmap line
6. PricingV2           — 4 Studio sub (Starter $14.99 / Pro $29.99 / Studio $49.99 BEST VALUE / Agency $99) + 3 packs + Enterprise CTA
7. TeamServices        — 3 cards (Photo $199, Video $399, Social $299) + "Get Team Services Quote"
8. GalliPartnership    — gold badge Cinema-grade + Netflix-approved cameras in bullets, Houston, from $1,200
9. FAQ                 — 8 Q&A aggiornate (Enhance Mode, Houston Crew timing, credits no sub, etc)
10. Contact            — services array aggiornato
11. Footer             — link aggiornati (showcase / pricing / team / contact)
+ AriaWidget floating  — kept
```

Sezioni KILLED da App.jsx (file ancora presenti, non importati):
- AriaIntro · BrandStatement · Gallery · CTABanner · RoomFurnishing · StyleTransformer · VideoDemo · Services · SocialBanner · WhyUnreel · HowItWorks · WaitingList · StudioSection · Testimonials · About

> 💡 Cleanup commit di questi orfani non fatto stanotte (Codex R6 verdict: "dopo merge, non stanotte" — Portfolio.jsx route potrebbe usare ancora alcuni asset). Se approvi, lo facciamo in commit separato dopo merge.

---

## 🏛️ Concilio agenti — 8 round completi

| Round | Agente | Pattern | Status |
|---|---|---|---|
| R1 | DeepSeek V4-Pro | pricing naming benchmark Midjourney/Runway/etc | ✅ Starter/Pro/Studio/Agency adopted |
| R2 | Codex (peer primary) | 6 adversarial domande aperte | ✅ 7 fixes applicati in commit 2 |
| R3 | DeepSeek V4-Pro | IT/ES translations 9-blocks batch | ✅ Applicato in commit 5 (~22 min total) |
| R4 | Codex (peer primary) | 5 mobile-specific domande | ✅ 5 fixes applicati in commit 3 |
| R5 | Codex (peer primary) | 6 CTA microcopy domande | ✅ 5 fixes applicati in commit 4 |
| R6 | Codex (peer primary) | final adversarial pre-merge | ✅ NO-GO → 6 fixes critici applicati in commit 5 |
| R7 | Codex (peer primary) | SEO + JSON-LD + llms.txt | ✅ 5 fixes applicati in commit 5 (canonical domain alignment + meta description + FAQ refactor + llms.txt sections) |
| R8 | Claude | end-to-end smoke + final push | ✅ Verificato visivamente + Vercel deploy success |

**Memory update during the night**: `feedback_codex_primary_review.md` salvata permanente — pattern "Codex peer primario, Claude in seconda" applicato da R4 in poi (R2 era già in quel pattern di fatto).

---

## 🔥 Insight chiave emersi dal concilio (sintesi)

**R2 Codex** ha trovato il claim "Zero" troppo brittle legalmente. Modificato a "Architecture intact" con split modes esplicito.

**R4 Codex** ha trovato pricing mobile = "catalog non decisione". Collapse + 2-bullet teaser sempre visibile.

**R5 Codex** ha trovato Navbar "Try Free" che puntava a #contact mentre Hero "Try Free" andava a Studio app — broken consistency. Uniformato.

**R6 Codex** ha trovato content drift live: contact services + FAQ IT/ES + Coming Soon strip "urlavano prodotto incompleto". Hotfix.

**R7 Codex** ha trovato canonical domain mismatch: index.html no-www, sitemap/llms www. Allineato a no-www.

---

## 📋 Decisioni che ti aspettano al risveglio

**Approve / Reject?**

1. **Restructure 22 → 11 sezioni** — kill confermato di: AriaIntro, BrandStatement, Gallery (no, sostituita da BeforeAfterShowcase), CTABanner, RoomFurnishing, StyleTransformer, VideoDemo, Services, SocialBanner, WhyUnreel, HowItWorks, WaitingList, StudioSection, Testimonials, About
2. **Naming Studio subscriptions**: Starter / Pro / Studio / Agency — alternativa Real-estate-specific era "Listing / Campaign / Studio / Brokerage" (più sector-specific). Confermi Starter/Pro/Studio/Agency?
3. **Pricing**: $14.99 / $29.99 / $49.99 / $99 + ricariche $9/$19/$39 — confermato dalla tua nota della notte. ✅
4. **Studio = "Best Value"** (era Pro = Most Popular). Vuoi tenere Studio o spostare l'highlight altrove?
5. **Agency $99 CTA → Studio app** (Codex R6: dovrebbe essere acquistabile self-serve, non mailto). Vuoi una "Book 15-min onboarding" call invece? Si può aggiungere.
6. **Galli sezione posizionata al 8°**: Codex R6 ha suggerito spostare Galli più in alto (dopo BeforeAfter) o aggiungere mini-strip Houston sotto Hero. Vuoi farlo?
7. **TeamServices**: mostra prezzi pubblici "From $199/$399/$299". OK o preferisci pricing solo "contact"?
8. **Componenti orfani cleanup**: posso fare cleanup commit che elimina i 15 componenti JSX morti. Confermi?
9. **Meta Pixel ID** ancora placeholder `1635740614236531`. Ricordati: sostituire con vero ID prima di andare ADV.
10. **Vercel auth preview**: vuoi che disabilito l'auth Vercel per il preview, così puoi condividerlo con clienti senza login?

**Cose NON fatte stanotte (note nei commits)**

- Testimonials sezione killata, niente social proof aggiunto (Codex segnalò come "consideration", non blocker)
- TeamServices form vero: ancora mailto (Codex R5 suggeriva mini-form onsite — out-of-scope stanotte)
- Asset reali iPhone before/after: usato gallery esistente (tu hai detto "lasciamo stare per ora")
- Real testimonials con nomi+città
- Backlinks acquisition

---

## 💸 Costi della notte

- gpvision 8 AI before-shots: $0.54 (poi scartate)
- DeepSeek R1 pricing naming: $0.003
- DeepSeek R3 IT/ES translations: ~$0.02
- Codex R2 + R4 + R5 + R6 + R7: free (Codex Pro tier)
- **Total**: ~$0.57

**Tempo totale concilio**: ~2.5h (compreso wait per R3 DeepSeek che ha impiegato 22min).

---

## 🧰 File modificati / creati / orfani

### Nuovi (12)
- `src/components/ReassuranceBlock.{jsx,module.css}`
- `src/components/BeforeAfterShowcase.{jsx,module.css}`
- `src/components/FunnelLadder.{jsx,module.css}`
- `src/components/PricingV2.{jsx,module.css}`
- `src/components/TeamServices.{jsx,module.css}`
- `src/components/GalliPartnership.{jsx,module.css}`

### Modificati
- `src/App.jsx` · `src/components/Hero.{jsx,module.css}` · `src/components/Navbar.jsx` · `src/components/Footer.jsx`
- `src/data/mockData.js` (full rewrite)
- `src/i18n/locales/en.json` · `it.json` · `es.json` (total rewrite IT + ES)
- `index.html` · `public/llms.txt` · `public/sitemap.xml`
- `CHANGELOG_LEAN_LANDING.md` (this file)

### Orfani da cleanup (pending tua approvazione)
AriaIntro, BrandStatement, CTABanner, Gallery, HowItWorks, RoomFurnishing, Services, SocialBanner, StudioSection, StyleTransformer, Testimonials, VideoDemo, WaitingList, About, WhyUnreel — 15 file `.jsx` + 15 `.module.css`.

---

## 🌗 Riassunto operativo

**Quando ti svegli (o subito se sei ancora sveglio)**:

1. **Apri il Vercel preview** (link sopra, basta login Vercel).
2. **Guardalo desktop + mobile** (Chrome DevTools responsive).
3. Se ti piace → mandami `merge to main` e procedo con il merge ufficiale (e cleanup orfani opzionale).
4. Se vuoi tweaks specifici → dimmi.
5. Se non ti piace una sezione intera → rollback chirurgico (è tutto su branch, zero rischio).

**Main resta intoccato finché tu dici "merge".**

— Claude
