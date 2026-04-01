# Design System: Unreel Estate
**Version:** 2.0 — Modern Prestige
**Site:** unreelestate.com
**Stack:** React + Vite (migrazione in corso)

---

## 1. Visual Theme & Atmosphere

**Cinematic Noir con anima calda.** UnreelEstate vive nello spazio tra il lusso silenzioso di un hotel five-star e la tensione visiva di un trailer cinematografico. Il background è quasi nero — ma non freddo: è un nero caldo e organico (`#0D0B09`) che evoca lino scuro e legno tostato, non metallo. Su questa base si poggia l'oro ramato (`#C4956A`) — non il giallo-oro dei gioiellieri, ma il bronzo caldo di un tramonto su pietra calcarea. Il rosso accento (`#E8342A`) appare solo dove il brand grida il suo nome: nel logo, in piccoli dettagli interattivi, mai come colore di massa.

Il tono è **aspirazionale ma diretto** — parla a professionisti del real estate che apprezzano la qualità senza fronzoli. Non è mai kitsch, mai sovraccarico.

---

## 2. Color Palette & Roles

| Nome descrittivo | Hex | Ruolo |
|---|---|---|
| **Obsidian Warm** | `#0D0B09` | Background primario — mai neutro, sempre con anima |
| **Charcoal Depth** | `#131110` | Background sezioni alternate |
| **Ink Card** | `#1A1714` | Card backgrounds, contenitori elevati |
| **Ink Card Hover** | `#1F1C19` | Stato hover delle card |
| **Copper Gold** | `#C4956A` | Colore principale brand — CTA, accenti, titoli em, icone |
| **Pale Copper** | `#E0BF99` | Gold chiaro — hover states, highlights |
| **Dark Bronze** | `#8B6914` | Gold scuro — ombre, stati pressati |
| **Ember Red** | `#E8342A` | Accento logo e microdettagli — usare con parsimonia |
| **Ivory Cream** | `#FAF7F2` | Testo primario — caldo, mai bianco puro |
| **Sandstone Muted** | `#7A6A5A` | Testo secondario — descrizioni, subtitle |
| **Ash Dim** | `#4A3F35` | Testo disabilitato, placeholder |
| **Border Whisper** | `rgba(196,149,106,0.12)` | Bordi sottili — quasi invisibili, solo percettibili |
| **Gold Glow** | `rgba(196,149,106,0.08)` | Background icon containers, badge fill |

---

## 3. Typography Rules

### Headlines — Bodoni Moda
- **Font:** `Bodoni Moda` (Google Fonts)
- **Pesi usati:** 400 (italic displays), 700 (headlines standard)
- **Carattere:** Alto contrasto tra tratti spessi e sottili. Eleganza editoriale. Evoca copertine di riviste di architettura.
- **Uso:** H1, H2, section titles, numeri decorativi grandi
- **Letter spacing:** `-0.01em` sui titoli grandi, `0` su quelli piccoli
- **Italic:** Usato per le parole emotive chiave (es. *Unreal.*, *Irresistible.*) — sempre in `color: Copper Gold`

### Body — DM Sans
- **Font:** `DM Sans` (Google Fonts)
- **Pesi usati:** 300 (body copy), 400 (UI labels), 500 (nav, button labels), 700 (section labels, badge text)
- **Carattere:** Geometrico ma umano. Leggibile a qualsiasi dimensione. Funziona bene su sfondi scuri.
- **Uso:** Tutto il testo non-titolo: paragrafi, label, nav, form, badge
- **Letter spacing:** `0.12em` sulle label uppercase piccole (`11px`), `0` sul body

### Scale tipografica
```
H1 hero:        clamp(44px, 6vw, 76px) — Bodoni Moda 700
H2 sezioni:     clamp(32px, 5vw, 52px) — Bodoni Moda 700
H3 card:        22px — Bodoni Moda 700
Section label:  11px — DM Sans 700, uppercase, ls 4px, Copper Gold
Body large:     18px — DM Sans 300, lh 1.75
Body standard:  15px — DM Sans 300, lh 1.75
Body small:     13-14px — DM Sans 400, lh 1.7
Caption/meta:   11-12px — DM Sans 700, uppercase, ls 2-3px
```

---

## 4. Component Stylings

### Buttons
- **Primary:** Background Copper Gold (`#C4956A`), testo Obsidian Warm, `border-radius: 2px` (quasi sharp), DM Sans 700, uppercase, `letter-spacing: 1.5px`, padding `14px 32px`. Hover: Pale Copper + `translateY(-2px)` + gold glow shadow.
- **Secondary/Ghost:** Border 1px Border Whisper, testo Ivory Cream, background trasparente. Hover: border diventa Copper Gold, testo Copper Gold.
- **Destructive/Accent:** Solo per microinterazioni — Ember Red, mai come button primario.

### Cards
- **Background:** Ink Card (`#1A1714`)
- **Border:** 1px Border Whisper — sottile, quasi invisibile
- **Corner radius:** `border-radius: 12px` — "Corners gently rounded" — non aggressivo, non pill
- **Hover accent:** Linea orizzontale di 2px in Copper Gold che appare in top della card al hover (gradient: transparent → gold → transparent)
- **Shadow:** Assente in stato normale. Al hover: `translateY(-4px)` senza shadow — il movimento comunica l'elevazione
- **Padding:** 40-44px su tutti i lati

### Forms & Inputs
- **Background:** Obsidian Warm (`#0D0B09`) — più scuro del background sezione
- **Border:** 1px Border Whisper in stato default
- **Focus border:** Copper Gold — immediato, no shadow aggiuntivo
- **Border radius:** `6px` — leggermente più arrotondato delle card
- **Label:** DM Sans 700, 11px, uppercase, letter-spacing 2px, Ash Dim color
- **Placeholder:** Ash Dim (`#4A3F35`)

### Navigation
- **Background:** `rgba(13,11,9,0.88)` con `backdrop-filter: blur(20px)`
- **Border bottom:** 1px Border Whisper
- **Logo:** "UN" in Ember Red, "REEL" in Ivory Cream, "ESTATE" in Copper Gold — con icona SVG
- **Nav links:** DM Sans 500, 13px, uppercase, Sandstone Muted. Hover: Copper Gold
- **CTA button:** Stile Primary button, `border-radius: 6px`

### Badge / Section pill
- **Shape:** `border-radius: 50px` — pill shape
- **Background:** Gold Glow (`rgba(196,149,106,0.08)`)
- **Border:** 1px Border Whisper
- **Text:** DM Sans 700, 11px, uppercase, ls 2px, Copper Gold
- **Dot decorativo:** 6px cerchio Copper Gold con animazione pulse

### Section label (sopra i titoli)
- DM Sans 700, 11px, uppercase, letter-spacing 4px
- Color: Copper Gold
- Margin bottom: 16px

---

## 5. Layout Principles

### Grid & Container
- Max-width container: `1200px`, padding laterale `24px`
- Section padding verticale: `120px 0` (sezioni principali), `100px 0` (sezioni secondarie)
- Card grid: `repeat(3, 1fr)` con gap `24px` su desktop
- Why/About grid: `repeat(2, 1fr)` con gap `32-80px`

### Whitespace Philosophy
Generoso e intenzionale. Il bianco (nero) tra gli elementi non è vuoto — è respiro. Ogni sezione ha una separazione verticale che permette all'occhio di "atterrare" prima di partire. Non si comprime mai lo spazio per aggiungere contenuto.

### Separatori di sezione
Linea orizzontale di 1px in Border Whisper — o come gradient (trasparente → gold → trasparente) per le transizioni importanti. Mai bordi pieni o separatori pesanti.

### Noise texture
`opacity: 0.03` SVG fractal noise sovrapposto a tutto il sito come `position: fixed, z-index: 9999`. Aggiunge profondità percepita alle superfici senza essere visibile consciamente.

### Scroll behavior
`scroll-behavior: smooth`. Le animazioni di entrata usano `fadeInUp` e `fadeInDown` con `ease`, delay progressivi tra elementi dello stesso gruppo (`0s`, `0.2s`, `0.4s`).

### Responsive breakpoints
- Desktop: ≥ 1024px — layout a 3 colonne, griglia completa
- Tablet: 768-1023px — layout a 2 colonne
- Mobile: < 768px — layout single column, font scale ridotta, buttons full-width

---

## 6. Sezioni del sito (struttura React)

```
<App>
  ├── <Navbar />
  ├── <Hero />              ← video background + overlay
  ├── <BrandStatement />    ← manifesto del brand
  ├── <Services />          ← 5 service cards con numero
  ├── <WhyUnreel />         ← 4 differenziatori in 2x2 grid
  ├── <Gallery />           ← before/after foto reali
  ├── <HowItWorks />        ← 3 step processo
  ├── <Pricing />           ← pacchetti (NUOVO)
  ├── <Testimonials />
  ├── <About />
  ├── <MidCTA />
  ├── <Contact />
  └── <Footer />
```

---

## 7. Pricing Structure (nuovo)

### Pacchetto LISTING — $399
- 10 foto inviate dal cliente (anche da cellulare)
- AI Enhancement: ogni foto elevata a livello professionale (luce, dettagli, atmosfera)
- **OPPURE** Virtual Remodel: stessa proprietà, stile completamente trasformato
- Ogni foto animata in clip video da 4 secondi
- Tutte le clip montate in un unico reel da ~40 secondi
- Consegna in formato orizzontale (16:9) E verticale (9:16)
- **Add-on:** +$20 per foto aggiuntiva oltre le 10 (include enhancement + video clip)

---

## 8. Asset & Media

### Video Hero
- `hero.webm` — primary (Chrome/Firefox) — ~13MB
- `hero.mp4` — fallback (Safari) — ~18MB
- Autoplay, muted, loop, playsinline
- Overlay gradient: `rgba(13,11,9,0.55)` → `rgba(13,11,9,0.45)` → `rgba(13,11,9,0.75)`

### Logo
- File: `logo copia.png`
- SVG inline preferito per scalabilità
- "UN" → Ember Red `#E8342A`
- "REEL" → Ivory Cream `#FAF7F2`
- "ESTATE" → Copper Gold `#C4956A`

### Immagini Gallery
- Placeholder: immagini AI generate (gpvision-output)
- Target: foto reali clienti con before/after
- Formato: 16:9, WebP ottimizzato

---

*Questo DESIGN.md è la fonte di verità per tutta la generazione React. Ogni componente, ogni colore, ogni scelta tipografica deve rispettare questo sistema.*
