# Kamp Konak — Design System

Dizajn sistem izvučen iz postojećeg HTML dizajna. Sve vrijednosti su tačne (kako su korištene u dizajnu). Stavke označene **PROVJERITI** treba potvrditi.

Estetika: avanturističko-domaćinski, svijetlo i prozračno u bojama prirode. Duboka riječna/borova zelena + topla terakota za CTA + krem papir. Smjenjuju se svijetle i tamne sekcije za ritam.

---

## 1. Boje

### Semantička paleta

| Ime | HEX | Upotreba |
|---|---|---|
| `primary` (pine) | `#0f3d32` | glavna tamna zelena — tamne sekcije, dugmad sekundarna, ikon-pozadine |
| `primary-700` | `#13443a` | gornji ton gradijenta tamnih sekcija |
| `primary-900` | `#0a2a23` | najtamniji ton gradijenta (dno hero/kanjon) |
| `primary-hover` | `#0a2a23` | hover za pine dugmad |
| `secondary` (teal) | `#2e8b74` | akcenat zelena — linkovi, ikone, aktivna stanja, brojke |
| `secondary-light` (mint) | `#7fd0b5` | svijetli teal na tamnim podlogama (naslovi, cijene) |
| `secondary-contour` | `#6fbfa6` | topografske linije (dekor, niska opacity) |
| `accent` (terracotta) | `#c75b39` | **CTA dugmad**, eyebrow linije, „Detaljnije" akcenti |
| `accent-hover` | `#b04d2e` | hover za CTA dugmad |
| `amber` | `#e0913b` | badge „NAJTRAŽENIJE", zvjezdice recenzija, sekundarni naglasak |
| `amber-light` | `#f0c084` | eyebrow tekst na tamnim sekcijama |
| `background` (paper) | `#f6efe0` | glavna pozadina stranice |
| `background-alt` (sand) | `#efe7d4` | naizmjenične svijetle sekcije |
| `surface` | `#ffffff` | kartice |
| `surface-warm` | `#fdf7ea` | topli krem (dno istaknute „NAJTRAŽENIJE" kartice) |
| `text` (ink) | `#17231c` | glavni tekst, naslovi |
| `text-body` | `#3a463a` | tijelo teksta (članci) |
| `text-secondary` | `#48543f` / `#55624f` | sekundarni tekst, opisi |
| `text-muted` | `#7d8975` | prigušeni tekst (meta, labele) |
| `text-faint` | `#9aa493` | najprigušeniji (placeholder labele, „od") |
| `text-on-dark` | `#dbe7e0` | tijelo teksta na tamnim sekcijama |
| `text-on-dark-muted` | `#9fb6aa` | prigušeni tekst na tamnim sekcijama |
| `border` | `#ece2cd` | borderi kartica |
| `border-strong` | `#e2dac9` / `#ddd2b8` | borderi inputa / chip-ova |
| `border-nav` | `#e2d8c2` | border navigacije |
| `mint-surface` | `#eef3ef` | svijetla teal pozadina (ikon-čipovi, info trake) |
| `mint-border` | `#cfe4dc` | border mint čipova |

> Napomena: tekst na tamnim sekcijama u nav-u koristi `#3a463a` (neaktivno) i `#2e8b74` (aktivno/hover).

### Tailwind config (`theme.extend.colors`)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        pine: { DEFAULT: '#0f3d32', 700: '#13443a', 900: '#0a2a23' },
        teal: { DEFAULT: '#2e8b74', light: '#7fd0b5', contour: '#6fbfa6' },
        terracotta: { DEFAULT: '#c75b39', hover: '#b04d2e' },
        amber: { DEFAULT: '#e0913b', light: '#f0c084' },
        paper: '#f6efe0',
        sand: '#efe7d4',
        surface: { DEFAULT: '#ffffff', warm: '#fdf7ea' },
        ink: '#17231c',
        body: '#3a463a',
        muted: '#7d8975',
        faint: '#9aa493',
        'on-dark': '#dbe7e0',
        'on-dark-muted': '#9fb6aa',
        line: { DEFAULT: '#ece2cd', strong: '#e2dac9', chip: '#ddd2b8', nav: '#e2d8c2' },
        mint: { surface: '#eef3ef', border: '#cfe4dc' },
      },
    },
  },
};
```

### CSS varijable (`:root`)

```css
:root {
  --pine: #0f3d32;
  --pine-700: #13443a;
  --pine-900: #0a2a23;
  --teal: #2e8b74;
  --teal-light: #7fd0b5;
  --teal-contour: #6fbfa6;
  --terracotta: #c75b39;
  --terracotta-hover: #b04d2e;
  --amber: #e0913b;
  --amber-light: #f0c084;
  --paper: #f6efe0;
  --sand: #efe7d4;
  --surface: #ffffff;
  --surface-warm: #fdf7ea;
  --ink: #17231c;
  --body: #3a463a;
  --text-secondary: #55624f;
  --muted: #7d8975;
  --faint: #9aa493;
  --on-dark: #dbe7e0;
  --on-dark-muted: #9fb6aa;
  --line: #ece2cd;
  --line-strong: #e2dac9;
  --line-chip: #ddd2b8;
  --line-nav: #e2d8c2;
  --mint-surface: #eef3ef;
  --mint-border: #cfe4dc;
}
```

### Gradijenti i overlay-i (tačno kako se koriste)

```css
/* tamne sekcije */
background: linear-gradient(160deg, #13443a, #0f3d32);
/* hero / najtamnije */
background: linear-gradient(160deg, #13443a 0%, #0f3d32 42%, #0a2a23 100%);
/* slot-pozadine (placeholder za slike) — variraju */
linear-gradient(160deg, #2e8b74, #0f3d32)
linear-gradient(160deg, #3a9580, #13443a)
linear-gradient(160deg, #1c6a58, #0a2a23)

/* hero overlay preko slike (čitljivost) */
linear-gradient(180deg, rgba(10,33,27,.5) 0%, rgba(11,38,31,.22) 34%, rgba(9,28,23,.9) 100%)
linear-gradient(90deg, rgba(9,28,23,.6) 0%, rgba(9,28,23,.1) 48%, transparent 70%)
/* overlay na karticama (tekst pri dnu slike) */
linear-gradient(180deg, rgba(15,61,50,0) 45%, rgba(15,61,50,.78))
```

---

## 2. Tipografija

### Familije

```css
/* Naslovi / display */
font-family: 'Bricolage Grotesque', sans-serif;
/* Tijelo / UI */
font-family: 'Manrope', sans-serif;
```

Učitavanje (Google Fonts):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Tailwind:
```js
fontFamily: {
  display: ['"Bricolage Grotesque"', 'sans-serif'],
  sans: ['Manrope', 'system-ui', 'sans-serif'],
}
```

Fallback preporuka (ako fontovi ne učitaju): display → `'Bricolage Grotesque', 'Arial Black', sans-serif`; body → `Manrope, system-ui, -apple-system, sans-serif`.

### Skala po ulozi

Vrijednosti su tačne iz dizajna. `clamp(min, preferred, max)` = mobilni→desktop fluidno.

| Uloga | Font | Weight | Veličina (clamp) | line-height | letter-spacing |
|---|---|---|---|---|---|
| **H1 hero** | Bricolage | 800 | `clamp(56px, 9vw, 128px)` | `.9` | `-.03em` |
| **H1 hero (mobilni < 600px)** | Bricolage | 800 | override `56px` | `.9` | `-.03em` |
| **H1 stranice** (sekundarne) | Bricolage | 800 | `clamp(34px, 5vw, 68px)` | `.96–.98` | `-.025em` |
| **H2 sekcija** | Bricolage | 700 | `clamp(28px, 4vw, 52px)` | `1.0–1.06` | `-.02em` |
| **H2 manji** | Bricolage | 700 | `clamp(26px, 3.4vw, 42px)` | `1.04` | `-.01em` |
| **H3 / naslov kartice** | Bricolage | 600–700 | `20–21px` | `1.15–1.2` | `-.01em` |
| **Cijena / brojka (stat)** | Bricolage | 700–800 | `22–46px` (kontekst) | `1` | normal |
| **Eyebrow / kicker** | Manrope | 700 | `12px` | normal | `.16em–.22em` (UPPERCASE) |
| **Body (paragraf)** | Manrope | 400–500 | `16–17px` (članci `16.5px`) | `1.6–1.75` | normal |
| **Body large (hero/lead)** | Manrope | 500 | `clamp(16px, 1.8vw, 23px)` | `1.5–1.6` | normal |
| **Small / meta** | Manrope | 600 | `12–13.5px` | `1.4–1.5` | `.08em–.14em` gdje je labela |
| **Dugme (CTA)** | Manrope | 700–800 | `15–16px` | normal | normal |
| **Nav link** | Manrope | 600 (700 aktivno) | `14.5px` | normal | `.005em` |
| **Chip / filter** | Manrope | 700 | `13.5px` | normal | normal |

Boje teksta: naslovi `--ink` (svijetle sekcije) / `#fff` (tamne); body `--text-secondary`/`--body`; na tamnom `--on-dark` i `--on-dark-muted`.

---

## 3. Spacing, padding, kontejner

| Token | Vrijednost | Upotreba |
|---|---|---|
| **Container max-width** | `1280px` | glavni kontejner (`margin: 0 auto`) |
| **Container (uži, članci)** | `820px` | blog članak, FAQ |
| **Container (kalkulator desni stub)** | `min(900px, 92vw)` | lightbox |
| **Horizontalni padding** | `28px` | lijevo/desno na svim sekcijama (`px-7`) |
| **Section padding (vertikalni, veliki)** | `clamp(60px, 9vh, 108px)` | standardni razmak sekcije |
| **Section padding (srednji)** | `clamp(56px, 8vh, 96px)` | |
| **Section padding (manji)** | `clamp(40px, 6vh, 64px)` | |
| **Hero padding** | `48px 28px 64px` (sadržaj) | |
| **Card padding** | `20–26px` (kartice), `clamp(20px,3vw,34px)` (veće) | |
| **Gap (grid sekcija split)** | `clamp(32px, 5–6vw, 68–80px)` | dvije kolone |
| **Gap (kartice u gridu)** | `14–18px` | |
| **Gap (chip/dugme row)** | `10–14px` | |
| **Margin ispod naslova sekcije** | `36–46px` | |

Skala (za Tailwind, px): `7=28px`, `gap` koristi 14/16/18px → `gap-3.5 / gap-4 / gap-[18px]`.

---

## 4. Radius, sjenke, borderi

### Border-radius

| Token | Vrijednost | Upotreba |
|---|---|---|
| `rounded-pill` | `999px` | dugmad, chip-ovi, badge-evi, eyebrow |
| `rounded-card` | `20px` | kartice (ture, blog, recenzije) |
| `rounded-card-lg` | `22–24px` | veće kartice, slike, tamne trake |
| `rounded-md` | `16–18px` | manje kartice, info trake, ikon-čipovi (`11–14px`) |
| `rounded-input` | `12–13px` | inputi, dugmad u formama |

### Sjenke

```css
/* kartica hover (lift) */
box-shadow: 0 26px 50px -22px rgba(15,61,50,.4);
/* CTA terracotta */
box-shadow: 0 14px 30px -12px rgba(199,91,57,.8);   /* veliki */
box-shadow: 0 10px 22px -8px rgba(199,91,57,.7);    /* nav dugme */
/* tamna kartica (kalkulator/cijena) */
box-shadow: 0 22px 56px -28px rgba(15,61,50,.6);
/* mekana ispod kartice */
box-shadow: 0 18px 44px -28px rgba(15,61,50,.07);
/* istaknuta NAJTRAŽENIJE kartica (amber) */
box-shadow: 0 18px 40px -22px rgba(224,145,59,.7);
/* sticky nav (scroll) */
box-shadow: 0 8px 30px rgba(0,0,0,.25);
/* mobilni sticky CTA bar */
box-shadow: 0 -8px 24px -12px rgba(15,61,50,.3);
```

### Borderi

```css
border: 1px solid #ece2cd;            /* standardni border kartice */
border: 1px solid #e2dac9;            /* input */
border: 1px solid #ddd2b8;            /* chip neaktivan */
border: 2px solid #e0913b;            /* istaknuta NAJTRAŽENIJE kartica */
border: 2px solid #2e8b74;            /* aktivni izbor (kalkulator dugme) */
border-bottom: 1px solid #e2d8c2;     /* nav */
/* na tamnim sekcijama */
border: 1px solid rgba(255,255,255,.12);
```

Fokus stanje (forme): `outline: 2px solid #2e8b74; outline-offset: 1px;`

---

## 5. Breakpoints i ponašanje na mobilnom

Dizajn je „desktop-first" sa `max-width` media query-jima. Ekvivalentni Tailwind (min-width) breakpoints su obrnuti — u Next.js radije koristi min-width pristup.

| Granica (max-width) | Šta se dešava |
|---|---|
| **960px** | Nav: desktop linkovi se sakrivaju, pojavljuje se hamburger meni. Split grid-ovi (1.15fr/.85fr) → 1 kolona. Grid 4 kartice → 2 kolone. |
| **920px** | Kamp/Kontakt dvokolonski grid → 1 kolona. |
| **900px** | Kalkulator (1.45fr/1fr) → 1 kolona; desni stub prestaje biti `sticky`. Stranica ture (1.5fr/.9fr) → 1 kolona. |
| **880px** | Rafting redovi (slika/tekst) → 1 kolona, slika ide gore (`order:-1`). |
| **820px** | Galerija masonry: `columns: 3` → `2`. Footer grid → 1 kolona. |
| **720px** | **Mobilni sticky CTA bar** se prikazuje pri dnu (Pozovi / WhatsApp / Rezerviši); `body` dobija `padding-bottom: 72px`. |
| **600px** | Grid 4 kartice → 1 kolona. H1 hero override na `56px`. Stat brojke gap manji. |
| **560px** | Aktivnosti grid (3) → 1 kolona. „Uključeno" grid (4) → 1–2 kolone. |
| **520px** | Galerija `columns: 2` → `1`. Fakti ture (3) → 2 kolone. Tour-chip grid (4) → 2. |

Mobilni specifično:
- **Sticky CTA bar** (`< 720px`): fiksiran dno, 3 dugmeta — telefon (ikona), WhatsApp (ikona), „Rezerviši turu" (terracotta, flex:1). Pozadina `rgba(246,239,224,.95)` + blur.
- Hamburger meni: lista linkova preko cijele širine, svaki sa `border-bottom: 1px solid #ece2cd`.
- Hero H1 se smanjuje na 56px da ne prelomi ružno.
- `prefers-reduced-motion`: gase se animacije vesla-kursora, zoom hero slike, lebdeće dekoracije.

Reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  .kon-heroimg, [animacije] { animation: none !important; }
}
```

---

## 6. Komponente (popis koji se ponavlja)

| Komponenta | Opis / ključni stilovi |
|---|---|
| **Nav (header)** | Sticky, `background: rgba(246,239,224,.9)` + `backdrop-filter: blur(16px)`, `border-bottom: 1px solid #e2d8c2`. Logo (ikona 40×40 pine + tekst KONAK + eyebrow). Desktop linkovi (aktivni `#2e8b74` bold). Jezik prekidač SR/EN/DE (statičan). CTA „Rezerviši" pill terracotta. Na scroll postaje neprozirniji + sjenka. Hamburger < 960px. |
| **Mobilni sticky CTA bar** | < 720px, fiksiran dno: telefon + WhatsApp (ikon-dugmad 54px) + „Rezerviši turu" (terracotta, flex:1). |
| **Footer** | Pine `#0f3d32` pozadina + topografske linije (SVG dekor). Lijevo: eyebrow + veliki H2 + tekst + CTA. Desno: kontakt (telefon, e-mail, lokacija) + social ikone (IG/TikTok/FB, 44×44 rounded). Donji red: linkovi + copyright. |
| **Hero (puni)** | `min-height: 92vh`, gradijent pine + slika (`object-fit: cover` + overlay), topografski SVG, trust traka (Google 5.0, licencirani skiperi, lokacija), eyebrow + H1 (clamp do 128px) + lead + 2 CTA. Scroll indikator dole. |
| **Hero (sekundarne stranice)** | `min-height: 48–60vh` ili kompaktni band, isti gradijent + eyebrow + H1 + lead. |
| **Kartica ture** | `bg #fff`, `border 1px #ece2cd`, `radius 20px`. Slika (aspect 5/4) sa brojem dana (Bricolage 42px) i naslovom preko gradijent overlay-a. Ispod: 3 ikon-fakta (dan/noćenje/obroci), separator, cijena + „Detaljnije →". Hover: `translateY(-7px)` + zoom slike. **Varijanta NAJTRAŽENIJE**: `border 2px #e0913b`, badge amber, dno `#fdf7ea`. |
| **Kartica ture (red, na Rafting stranici)** | Naizmjenično slika lijevo/desno (`.92fr/1.08fr`), tekst + cijena + „Pogledaj program →". Hover lift. |
| **CTA dugme (primarno)** | Pill `999px`, `bg #c75b39`, tekst `#fff` 700, padding `16–18px 30–34px`, sjenka terracotta, hover `#b04d2e` + `translateY(-2px)`. Često sa strelicom SVG. |
| **CTA dugme (sekundarno/ghost)** | Pill, `border 1px rgba(255,255,255,.35)` na tamnom ili pine `#0f3d32` na svijetlom. |
| **Kartica recenzije** | `bg #fff`, radius 20px, 5 amber zvjezdica (SVG), citat, separator, avatar (inicijal u krugu, pine/terracotta/teal) + ime + grad. Sekcija ima Google 5.0 badge i dugme „Pogledaj sve recenzije na Google-u". |
| **Trust brojke (stat)** | Kartica `bg #fff` ili na tamnom `rgba(255,255,255,.06)`; velika brojka (Bricolage 30–46px, teal/mint) + labela ispod. Na „Zašto Konak": ikona + brojka (20+ god, 6 god, itd.). |
| **Forma (kalkulator/kontakt)** | Inputi `bg #f6efe0`, `border 1px #e2dac9`, `radius 12px`, padding `13px`, fokus outline teal. Numerički stepper (− / broj / +). Desni sažetak na tamnom (`#17231c`) sa živim ukupnim iznosom (mint). Dugmad: WhatsApp (terracotta) + e-mail (ghost). |
| **Kalkulator — cijene** | Radni dan / vikend logika. Vikend = subota, nedjelja; **petak takođe vikend ako je tura višednevna** (2/3/4 dana), petak ostaje radni dan za jednodnevnu. Cijena se računa uživo; oznaka „RADNI DAN" / „VIKEND". |
| **Galerija** | Masonry (`columns: 3/2/1`). Filter chip-ovi (kategorije). Tile = dugme sa `background-image` (placeholder gradijent dok nema slike) + labela preko gradijenta. Klik → **lightbox** (full-screen overlay, prethodna/sljedeća/zatvori). |
| **Filter chip** | `.kon-chip` pill, neaktivan `bg #fff border #ddd2b8 color #55624f`; aktivan `.act` → `bg #0f3d32 color #fff`. **Bitno:** aktivno stanje preko CSS klase (ne inline style — inline style holes se ne re-render-uju u izvornom runtime-u). |
| **FAQ akordeon** | `<details>`/`<summary>`, kartica `bg #fff border #ece2cd radius 16px`. Ikona „+" rotira 45° kad je otvoreno (`details[open] .ico { transform: rotate(45deg) }`). 5 pitanja po stranici (tura/aktivnosti/kamp), 13 na početnoj. |
| **Blog kartica** | `bg #fff border #ece2cd radius 20px`, slika (aspect 16/10) + kicker + naslov + opis + „Pročitaj →". Featured varijanta: tamna (`#17231c`), 2 kolone slika/tekst. Hover lift + zoom. |
| **Eyebrow (kicker)** | Mali UPPERCASE label sa kratkom linijom: `<span linija 22×1.5px bg accent> + tekst 12px .18em 700`. Boja terracotta (svijetle sekcije) / amber-light (tamne). |
| **Image slot (placeholder)** | Mjesto za pravu fotografiju — gradijent pozadina dok je prazno. U Next.js zamijeniti `<Image>` komponentom. Svuda gdje stoji slot ide prava fotka. |
| **Topografski dekor** | SVG konturne linije (`stroke #6fbfa6/#e0913b`, niska opacity) u pozadini tamnih sekcija i hero-a. |
| **Veslo-kursor** | Custom kursor u obliku vesla na desktopu (prati miš, blago se naginje); gasi se na `prefers-reduced-motion` i na touch uređajima. Opciono u Next.js. |

---

## Napomene za implementaciju (Cursor / Next.js + Tailwind)

- **Naizmjenične sekcije**: paper `#f6efe0` → sand `#efe7d4` → pine `#0f3d32` (tamna) za ritam.
- **Sve kartice** koriste isti `border #ece2cd` + radius 20px + hover lift (`translateY(-5–7px)` + sjenka pine).
- **Animacije** drži suptilne: fade-up na hero (`konUp`), zoom slike u kartici na hover, scroll indikator. Poštuj `prefers-reduced-motion`.
- **Aktivna stanja preko klasa**, ne inline stilova (vidi Filter chip).
- **PROVJERITI**: tačne cijene aranžmana za 2026 (rafting 60/90/120/300€ su iz dizajna; kanjoning Nevidio 130€ / Hrčavka 120€ označiti za potvrdu); kapaciteti smještaja i team-building sale; kilometraže „Kako do nas"; prave Google recenzije (trenutno reprezentativne); tačna sezona.
