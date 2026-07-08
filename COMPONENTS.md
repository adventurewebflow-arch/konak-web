# Kamp Konak — Handoff: Zajedničke komponente

Komponente koje se ponavljaju na više stranica. **Napravi ih prve** — sve stranice ih koriste. Vrijednosti tokena (boje, fontovi, razmaci, radius, sjenke) su u `DESIGN_SYSTEM.md`; ovdje je struktura, varijante/stanja i ponašanje na mobilnom.

Redoslijed izrade (zavisnosti): **Tokens → CTA dugme → Nav → Footer → Hero → kartice (Tura/Recenzija/Blog) → Forma → Galerija → FAQ → Trust brojke**.

Legenda: 🔀 = ima varijante · 📱 = posebno ponašanje na mobilnom · ⚠️ PROVJERITI = potvrditi podatak.

---

## 1. NAV (header) 🔀 📱

Sticky header, prisutan na svakoj stranici.

**Struktura**
- Kontejner `max-width 1280px`, padding `14px 28px`, `display:flex; justify-content:space-between; align-items:center`.
- **Logo** (lijevo): ikona 40×40 (`bg pine`, radius 11px, SVG veslo/rijeka) + kolona `KONAK` (Bricolage 22px 800) i eyebrow `RAFTING KAMP · TARA` (9px, `.32em`, teal).
- **Nav linkovi** (centar, desktop): Početna · Ponuda · Rafting · Aktivnosti · Kamp · Galerija · Blog · Kontakt. ⚠️ PROVJERITI finalni red linkova (dodate su stranice: Hrana, Smještaj, Kanjoning, Izleti, Teambuilding, Kako do nas, Oprema i sigurnost, Česta pitanja — odluči koje idu u glavni meni a koje u footer/„više").
- **Desno**: prebacivač jezika + CTA „Rezerviši" + (mobilni) hamburger.

**Prebacivač jezika** 🔀
- Trenutno u dizajnu: **SR / EN / DE** (aktivni `#17231c` bold, ostali sivi `#a89b80`, klik).
- ⚠️ PROVJERITI: traženo je **SR / EN / DE / RU** — RU treba dodati (4. opcija). Prevodi nisu urađeni; prekidač je trenutno vizuelni. U Next.js veži na i18n rute (`/`, `/en`, `/de`, `/ru`).

**CTA „Rezerviši"**
- Pill terracotta `#c75b39`, tekst `#fff` 700, padding `12px 24px`, sjenka `0 10px 22px -8px rgba(199,91,57,.7)`, hover `#b04d2e` + `translateY(-1px)`. Vodi na `/rezervacija`.

**Stanja**
- **Scroll**: na vrhu poluprozirno; nakon skrola `background` neprozirniji + `box-shadow 0 8px 30px rgba(0,0,0,.25)` (u dizajnu nav već ima `rgba(246,239,224,.9)` + `backdrop-filter: blur(16px)`).
- **Aktivni link**: boja `#2e8b74`, weight 700 (prop `active` = ime stranice).
- **Hover link**: boja `#2e8b74`.

**📱 Mobilni (< 960px)**
- Desktop linkovi i jezik se sakrivaju; pojavljuje se **hamburger** (42×42, border `#e2d8c2`).
- Klik → vertikalni meni preko cijele širine: svaki link `padding 13px 0`, `border-bottom 1px #ece2cd`.
- Logo i „Rezerviši" ostaju vidljivi.

---

## 2. FOOTER 📱

Prisutan na svakoj stranici. Pozadina **pine `#0f3d32`**, tekst `#cfe0d6`.

**Struktura**
- Topografski SVG dekor u pozadini (konturne linije, `stroke #2e8b74/#6fbfa6`, niska opacity).
- Kontejner `max-width 1280px`, padding `clamp(60px,9vh,104px) 28px 36px`.
- **Gornji dio** (grid `1.3fr 1fr`, gap `clamp(36px,6vw,90px)`):
  - **Lijevo**: eyebrow „SPREMNI ZA TARU?" + H2 (Bricolage 700, do 58px, bijelo) + tekst + CTA „Rezerviši turu".
  - **Desno** (kontakt kolona): Telefon/WhatsApp/Viber `+387 65 848 110` · E-mail `konakraftingkamp@gmail.com` · Lokacija `Hum, Foča 73300, BiH` (link na Google Maps). Ispod: social ikone IG/TikTok/FB (44×44, radius 13px, `bg rgba(255,255,255,.08)`, hover amber).
- **Donji red** (border-top `rgba(255,255,255,.13)`): mini-nav linkovi + `© 2026 Rafting kamp Konak · Hum, Foča`.

**Mapa**
- ⚠️ U footeru je trenutno **nema**; Google mapa (iframe) je na **Kontakt** i **Kamp** stranici. Ako želiš mapu i u footeru — dodati embed (`maps.google.com/maps?q=Konak%20kamp%20Hum%20Foča&output=embed`).

**📱 Mobilni (< 860px)**: grid → 1 kolona, gap 40px. Sve kolone pune širine.

---

## 3. HERO 🔀 📱

Dvije varijante.

**Varijanta A — velika (Početna)**
- `min-height: 92vh`, `display:flex; flex-direction:column`.
- Slojevi (odozdo): gradijent pine → slika (`<Image>` `object-fit:cover`, blagi zoom `konHeroZoom` na učitavanju) → overlay (180deg + 90deg, vidi DS) → topografski SVG.
- **Trust traka** (vrh, border-bottom `rgba(255,255,255,.1)`): Google 5.0 · Licencirani skiperi · Hum, Foča (ikone + tekst 12.5px).
- **Sadržaj** (centar): eyebrow pill „NAJDUBLJI KANJON EVROPE · 1.300 m" + H1 (Bricolage 800, `clamp(56px,9vw,128px)`, line-height .9) + lead (`clamp(18px,1.8vw,23px)`) + 2 CTA (terracotta + ghost).
- **Scroll indikator** (dno): animirana tačka.

**Varijanta B — manja (podstranice)**
- `min-height: 48–60vh` (ili kompaktni band bez slike na Ponuda/Rezervacija/Kontakt).
- Isti gradijent + (opciono) slika + topografski SVG + overlay.
- eyebrow + H1 (`clamp(34px,5vw,68px)`) + lead. Bez trust trake i scroll indikatora. Često sa „nazad" linkom (stranice ture).

**📱 Mobilni**
- H1 hero override na `56px` (< 600px) da se ne prelomi ružno.
- Trust traka prelama u više redova (`flex-wrap`).
- Slika ostaje cover; overlay osigurava čitljivost.
- `prefers-reduced-motion`: gasi zoom slike i lebdeće dekoracije.

---

## 4. KARTICA TURE 🔀 📱

Koristi se na: **Rafting, Kanjoning, Izleti, Ponuda, Početna**. Vodi na `TuraDetalj` stranicu.

**Struktura (grid varijanta — Ponuda/Početna)**
- `bg #fff`, `border 1px #ece2cd`, `radius 20px`, `overflow:hidden`.
- **Slika** (aspect 5/4): `<Image>` cover + gradijent overlay pri dnu; preko nje broj/oznaka (Bricolage 42px, npr. „3 DANA") i naziv ture (bijelo).
- **Tijelo** (padding 16–22px): red od 3 **ikon-fakta** (trajanje / noćenja / obroci ili km) → separator `1px #ece2cd` → red: cijena („od €", Bricolage 700 ~22px) + „Detaljnije →" (terracotta).

**Varijante** 🔀
- **Standardna** — kako gore.
- **NAJTRAŽENIJE (istaknuta)** — `border 2px #e0913b`, badge „NAJTRAŽENIJE" (amber pill), dno kartice `bg #fdf7ea`, ikone u terracotta umjesto teal.
- **Red varijanta (Rafting stranica)** — horizontalno, slika lijevo/desno naizmjenično (`.92fr/1.08fr`), širi opis, „Pogledaj program →".
- **Tamna varijanta (4 dana, Početna grid)** — `bg #17231c`, tekst bijeli/mint.

**Stanja**: hover `translateY(-5–7px)` + sjenka pine + zoom slike (`scale(1.05)`); strelica „Detaljnije" pomjeri se udesno na hover.

**Props (preporuka)**: `slika, kicker, naslov, opis, fakti[], cijena, cijenaLabel, href, tag?(NAJTRAŽENIJE), varijanta(grid|red|tamna)`.

**📱 Mobilni**: grid 4→2→1 kolona (980/600px). Red varijanta → slika gore (`order:-1`, aspect 16/10), tekst ispod.

---

## 5. KARTICA RECENZIJE 🔀

Na **Početnoj** (sekcija „Utisci gostiju"). ⚠️ PROVJERITI: prave Google recenzije (trenutne su reprezentativne).

**Struktura**
- `bg #fff`, `border 1px #ece2cd`, `radius 20px`, padding 26px.
- **5 zvjezdica** (amber `#e0913b` SVG) na vrhu.
- **Citat** (15px, line-height 1.65, `#3a463a`).
- Separator `1px #f0e8d7`.
- **Autor**: avatar-inicijal u krugu (40×40, `bg` rotira pine/terracotta/teal) + ime (700) + grad (muted).

**Varijanta zastavice** 🔀
- Traženo „država/zastavica" — trenutno se prikazuje **grad** (Beograd, Sarajevo, Podgorica). ⚠️ PROVJERITI: ako želiš zastavicu, dodati `emoji/SVG zastavu` uz grad (npr. 🇷🇸 🇧🇦 🇲🇪). Lako se doda u red sa imenom.

**Okolna sekcija**: header sa Google 5.0 badge + na dnu dugme „Pogledaj sve recenzije na Google-u" (vodi na Google Maps profil).

**📱 Mobilni**: grid 3 → 1 kolona (< 860px).

---

## 6. CTA 🔀 📱

**Glavno dugme (primarno)**
- Pill `999px`, `bg #c75b39`, tekst `#fff` 700–800, padding `16–18px 30–34px`, sjenka `0 14px 30px -12px rgba(199,91,57,.8)`, hover `#b04d2e` + `translateY(-2px)`, često sa SVG strelicom.

**Sekundarno / ghost** 🔀
- Na tamnom: prozirno + `border 1px rgba(255,255,255,.35)`, hover `bg rgba(255,255,255,.2)`.
- Na svijetlom: pine `#0f3d32` puni, hover `#0a2a23`.

**📱 Sticky mobilni CTA bar (< 720px)**
- Fiksiran dno (`position:fixed; bottom:0`), `z-index 5500`, `bg rgba(246,239,224,.95)` + blur, `border-top 1px #e2d8c2`, sjenka `0 -8px 24px -12px rgba(15,61,50,.3)`.
- 3 elementa: **telefon** (ikon-dugme 54px, pine) · **WhatsApp** (ikon-dugme 54px, bijelo+border) · **„Rezerviši turu"** (terracotta, `flex:1`).
- `body` dobija `padding-bottom: 72px` da sadržaj ne bude prekriven.
- Telefon → `tel:+38765848110`; WhatsApp → `wa.me/38765848110`; Rezerviši → `/rezervacija`.

---

## 7. FORMA ZA UPIT / REZERVACIJU 📱

Dvije pojave: **Kalkulator** (`/rezervacija`) i **Kontakt forma** (`/kontakt`). Iste osnovne stilove.

**Polja (kalkulator)**
- Izbor ture (chip/dugme grupa, aktivno `border 2px #2e8b74` + `bg rgba(46,139,116,.1)`).
- Dodaci (NP Sutjeska / Hrčavka / jahanje — na upit), checkbox/toggle stil.
- Broj osoba — **stepper** (− / broj / +, dugmad 30×30 `bg #e6dcc8`).
- Datum (`<input type=date>`).
- Posebna ishrana (tekst polje) ⚠️ PROVJERITI da li ostaje.
- **Živi sažetak** (desni stub, tamni `#17231c`): stavke + ukupno (mint, Bricolage 800).

**Polja (kontakt)**: Ime · Telefon · E-mail · Tema (select) · Poruka (textarea).

**Stilovi inputa**: `bg #f6efe0`, `border 1px #e2dac9`, `radius 12px`, padding 13px, fokus `outline 2px #2e8b74`.

**Slanje**: trenutno gradi poruku i otvara **WhatsApp** (`wa.me/...?text=`) ili **e-mail** (`mailto:`). ⚠️ U Next.js: dodati pravi backend/endpoint (npr. API route + slanje mejla / Telegram), zadržati WhatsApp kao opciju.

**🔒 UTM praćenje (NOVO — dodati u Cursoru)**
- Dodati **skrivena polja** u formu, popunjena iz URL query parametara na mountu:
  `utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, referrer, landing_page`.
- Vrijednosti čitati iz `window.location.search` (i `document.referrer`), upisati u hidden inpute i slati uz upit (i u WhatsApp/mejl tekst kao repove, npr. „Izvor: google/cpc/ljeto2026").
- ⚠️ PROVJERITI: gdje se upiti sakupljaju (mejl, CRM, Google Sheet) da se UTM vrijednosti tamo proslijede.

**📱 Mobilni**: kalkulator grid (1.45fr/1fr) → 1 kolona (< 900px); desni sažetak prestaje biti sticky i ide ispod.

---

## 8. GALERIJA 🔀 📱

Stranica **Galerija**; sekcije galerije i na Kamp/Aktivnosti/Rafting.

**Struktura**
- **Filter chip-ovi** (`.kon-chip`): Sve · Rafting · Kamp · Hrana · Priroda i kanjon · Aktivnosti. Neaktivan `bg #fff border #ddd2b8 #55624f`; aktivan `.act` → `bg #0f3d32 #fff`.
  - ⚠️ **Bitno**: aktivno stanje **preko CSS klase**, ne inline stila (inline `style` holes se ne re-render-uju u izvornom runtime-u; u React/Next.js ovo nije problem ali zadrži klasni pristup radi jasnoće).
- **Masonry grid** (`columns: 3`): svaka pločica = `<button>` sa `background-image` (placeholder gradijent dok nema slike) + labela preko gradijenta pri dnu. Aspect varira (3/4, 4/3, 1/1).
- **Lightbox** 🔀: klik na pločicu → full-screen overlay (`bg rgba(8,20,16,.92)`), velika slika (`min(900px,92vw)`), dugmad **prethodna (‹) / sljedeća (›) / zatvori (×)**, labela pri dnu. Klik na pozadinu zatvara; klik na sliku ne (stopPropagation).

**Kategorije** (filter `id`): `rafting, kamp, hrana, priroda, aktivnosti`. Svaka pločica ima `cat` + `label` + `img`(placeholder).

**📱 Mobilni**: `columns` 3 → 2 (< 820px) → 1 (< 520px). Lightbox dugmad ostaju, slika puni širinu.

---

## 9. FAQ AKORDEON 📱

Na **Početnoj** (13 pitanja), **Česta pitanja** stranici, i 5 po stranici (ture, aktivnosti, kamp).

**Struktura**
- Nativni `<details>`/`<summary>`, kartica `bg #fff`, `border 1px #ece2cd`, `radius 16px`, padding `4px 22px`.
- `<summary>`: pitanje (Manrope 700 16px) + ikona „+" desno; bez nativnog markera (`list-style:none`).
- Otvoreno: odgovor (15px, line-height 1.65, `#55624f`), ikona rotira `+` → `×` (`details[open] .ico { transform: rotate(45deg) }`).

**Stanja**: zatvoreno / otvoreno (više može biti otvoreno istovremeno). Schema: `FAQPage` JSON-LD.

**📱 Mobilni**: puna širina, isto ponašanje.

---

## 10. TRUST BROJKE 🔀

Dvije pojave.

**Varijanta A — stat traka (Početna intro)**
- Kartica `bg #fff border #ece2cd radius 22px`, 3 brojke odvojene vertikalnim linijama: `55` jedinica · `18` bukova · `1300m` dubina ⚠️ PROVJERITI (na nekim verzijama zamijenjeno).
- Brojka Bricolage 800 (34–46px, teal `#2e8b74`) + labela ispod (muted).

**Varijanta B — „Zašto Konak" (tamna sekcija)** 🔀
- 4 kartice (`bg rgba(255,255,255,.06)`, border `rgba(255,255,255,.12)`): ikona + brojka (Bricolage 800 30px, bijelo) + opis (mint-muted).
- Vrijednosti: `20+ god.` iskustva skipera · `1 kamp` uređen · `Nova` oprema · `6 god.` bez loše recenzije.

**Google ocjena**: badge `5.0` + 5 zvjezdica + „Google recenzije" (logo Google u boji). ⚠️ PROVJERITI tačan broj recenzija/ocjenu.

**📱 Mobilni**: stat traka — gap manji (< 600px); „Zašto Konak" 2×2 grid.

---

## 11. BLOG KARTICA 🔀 📱

Na **Blog** stranici i teaser na Početnoj. Vodi na `BlogClanak`.

**Struktura**
- `bg #fff`, `border 1px #ece2cd`, `radius 20px`, `overflow:hidden`.
- Slika (aspect 16/10) + tijelo (padding 22px): kicker/kategorija (teal 700 `.14em`) + naslov (Bricolage 600 20px) + opis + „Pročitaj →".

**Varijanta featured** 🔀
- Tamna (`bg #17231c`), 2 kolone (slika `1.1fr` / tekst `.9fr`), veći naslov, kicker mint. Koristi se za istaknuti članak na vrhu Bloga.

**Stanja**: hover lift + zoom slike.

**📱 Mobilni**: grid 3 → 1 kolona (< 940px); featured → slika gore, tekst ispod.

---

## Globalne napomene

- **Tokeni prvo**: prije komponenti postavi boje/fontove/spacing iz `DESIGN_SYSTEM.md` (Tailwind config + CSS vars).
- **Slike**: svuda su placeholderi (gradijent) — zamijeni `next/image` komponentom; aspect-ratio zadrži kako je naveden.
- **Animacije**: suptilne (fade-up hero, hover lift/zoom, scroll indikator); poštuj `prefers-reduced-motion`.
- **Veslo-kursor**: opcioni custom kursor (desktop, gasi se na touch i reduced-motion) — nije kritičan za prvu fazu.
- **Aktivna stanja preko klasa**, ne inline stilova.
- **⚠️ PROVJERITI lista**: finalni red nav linkova; RU jezik + svi prevodi; prave Google recenzije + ocjena/broj; zastavice u recenzijama; cijene 2026 (rafting 60/90/120/300€ iz dizajna, kanjoning 130/120€ za potvrdu); kapaciteti smještaja/teambuilding; kilometraže „Kako do nas"; gdje se sakupljaju upiti (za UTM); da li „posebna ishrana" polje ostaje.
