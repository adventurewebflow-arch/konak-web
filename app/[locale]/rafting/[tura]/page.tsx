import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaButton } from "@/components/CtaButton";
import { ImageSlot } from "@/components/ImageSlot";
import { TourCard } from "@/components/TourCard";
import { Breadcrumbs, breadcrumbListLd } from "@/components/Breadcrumbs";

const SITE = "https://www.raftingkampkonak.com";
const WHATSAPP_NUM = "38765848110";
const EMAIL = "konakraftingkamp@gmail.com";
const HERO_IMG = "/images/hero-slike-konak";
const RAFTING_IMG = "/images/rafting";

interface ProgramItem {
  broj: number;
  label?: string;
  naslov: string;
  tekst: string;
}

interface PriceOption {
  label: string;
  price: string;
}

interface MenuItem {
  label?: string;
  tekst: string;
}

interface SimilarCard {
  href: string;
  naslov: string;
  opis: string;
  kicker: string;
  cijena: string;
  tag?: string;
  slika?: { src: string; alt: string };
  fakti?: { tekst: string }[];
}

interface TuraData {
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  priceOptions: PriceOption[];
  unit: number;
  durationFact: string;
  stayFact: string;
  mealsFact: string;
  intro: string;
  introExtra?: string;
  program: ProgramItem[];
  menuTitle: string;
  menuItems: MenuItem[];
  menuNote?: string;
  canyonStay?: string;
  included: string[];
  notIncluded: string[];
  notesExtra: string[];
  similar: SimilarCard[];
  cardKicker: string;
  cardCijena: string;
  metaTitle: string;
  metaDescription: string;
}

/** Zajedničke napomene — rafting-ture-obogacene.md */
const NOTES_SHARED = [
  "Iskustvo nije potrebno — Tara je idealna i za one koji prvi put sjedaju u čamac.",
  "Dolazak u kamp nije vezan za sat — dođite kad vam odgovara, dobrodošli ste.",
  "Djeca do 6 godina besplatno, od 6 do 12 godina pola cijene.",
  "Obavezno ponesite ličnu kartu ili pasoš — rijeka na dijelu toka prolazi kroz dvije države.",
  "Ponesite kupaći, peškir, suvu odjeću i obuću koja smije da se pokvasi. Sve ostalo dobijate od nas.",
  "Do kampa gosti dolaze sami. Za grupe od 6 i više osoba možemo organizovati prevoz — plaća se posebno, javite se da dogovorimo.",
  "Za veće grupe imamo dobar popust — pozovite nas i dogovorićemo se.",
  "Plaćanje je isključivo u gotovini, u kampu. Kartice ne primamo.",
  "Sezona: maj–oktobar. Zadržavamo pravo procjene vremenskih uslova radi sigurnosti gostiju.",
];

const NOT_INCLUDED_BASE = [
  "Piće u restoranu i na vodi",
  "Lični troškovi",
];

// Sadržaj iz rafting-ture-obogacene.md
const TURE: Record<string, TuraData> = {
  jednodnevni: {
    badge: "1 dan · bez noćenja · 18 km",
    title: "Jednodnevni rafting",
    subtitle:
      "Osamnaest kilometara i osamnaest bukova kroz najljepši dio kanjona Tare. Bez noćenja, bez komplikacija — jedan dan koji se pamti godinama.",
    price: "od 50€",
    priceNote: "po osobi",
    priceOptions: [
      { label: "Bez ručka", price: "50€" },
      { label: "Sa domaćim ručkom", price: "65€" },
      { label: "Vikend bez ručka", price: "60€" },
      { label: "Vikend sa ručkom", price: "75€" },
    ],
    unit: 50,
    durationFact: "5–6 sati",
    stayFact: "bez noćenja",
    mealsFact: "ručak opciono",
    intro:
      "Ovo je spust koji svi traže. Osamnaest kilometara od Brštanovice do Huma, kroz najuzbudljiviji dio kanjona — bukovi se nižu jedan za drugim, a između njih rijeka umiri i pusti vas da pogledate gore, u zidove koji se dižu i po hiljadu metara. Ne treba vam iskustvo: u čamcu je skiper koji Taru vozi preko dvadeset godina i zna svaki buk po imenu. Vi veslate kad kaže, i uživate ostalo vrijeme.",
    program: [
      {
        broj: 1,
        label: "DOLAZAK",
        naslov: "Doček u kampu",
        tekst:
          "Dočekujemo vas u kampu u Humu, na sastavu Tare i Pive. Rakija dobrodošlice i kratak dogovor oko dana. Nema fiksnog sata — dođite kad vam odgovara.",
      },
      {
        broj: 2,
        label: "OPREMA",
        naslov: "Oprema i brifing",
        tekst:
          "Birate opremu: neopren, čizme, prsluk, kacigu i veslo. Skiper drži brifing — kako se vesla, kako se sjedi, šta ako neko upadne u vodu. Kratko, jasno, i tek kad su svi spremni — krećemo.",
      },
      {
        broj: 3,
        label: "PREVOZ",
        naslov: "Do Brštanovice",
        tekst:
          "Našim vozilima do startne tačke. Vožnja uz kanjon je i sama dio doživljaja — pogled na Taru odozgo priprema vas za ono što slijedi.",
      },
      {
        broj: 4,
        label: "SPUST",
        naslov: "18 km, 18 bukova",
        tekst:
          "Najatraktivnija dionica Tare. Stajemo za kupanje na smaragdnoj vodi i za fotografije na mjestima koja se ne mogu vidjeti ni sa jednog puta. U maju je voda brza pa spust traje oko sat i po; u avgustu je mirnija i toplija, pa se rastegne i do tri i po sata.",
      },
      {
        broj: 5,
        label: "POVRATAK",
        naslov: "Tuš i ručak",
        tekst:
          "Čamci pristaju kod kampa. Topla voda, tuširanje, suva odjeća — a onda, ako ste uzeli aranžman sa ručkom, ono zbog čega nam se ljudi vraćaju.",
      },
    ],
    menuTitle: "Jelovnik (uz aranžman od 65 €)",
    menuItems: [
      {
        tekst:
          "Kremasta domaća čorba za početak. Zatim teletina ispod sača — od domaćeg teleta, ne od onog što je dva mjeseca putovalo iz Argentine — sa domaćim hljebom koji se peče na isti način, pod žarom. Uz to sveže salate od povrća iz okolnih bašta i kajmak i sir porodice Spasojević sa Zavaita, sa 1600 metara. Za desert domaći kolači po starim receptima.",
      },
      {
        tekst:
          "Sač kod nas pravi Brane — kuvar od svoje devetnaeste, izučen po nekada najelitnijim konobama bivše Jugoslavije. Ono što on izvadi ispod žara ne uči se na brzinu.",
      },
    ],
    menuNote: "Ručak nije obavezan — ali je razlog zbog kojeg nam se mnogi vrate.",
    included: [
      "Kompletna rafting oprema (neopren, čizme, prsluk, kaciga, veslo)",
      "Licencirani skiper u svakom čamcu",
      "Sigurnosni brifing prije polaska",
      "Prevoz našim vozilima do startne tačke i nazad",
      "Vodootporne barele za sitnice",
      "Rakija dobrodošlice",
      "Besplatan parking pod video nadzorom",
      "Sve takse i osiguranje",
      "Ručak (samo u aranžmanu od 65 €)",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    notesExtra: [
      "Nema minimalnog broja učesnika — vodimo i parove i pojedince. Možete se priključiti postojećoj grupi.",
    ],
    similar: [
      {
        href: "/rafting/dvodnevni",
        naslov: "Dvodnevni aranžman",
        opis: "Jedno veče u kampu i jedan dan na rijeci.",
        kicker: "2 DANA · 1 noćenje",
        cijena: "100€",
        slika: {
          src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`,
          alt: "Dvodnevni rafting na Tari",
        },
        fakti: [{ tekst: "2 dana" }, { tekst: "3 obroka" }],
      },
      {
        href: "/rafting/trodnevni",
        naslov: "Trodnevni aranžman",
        opis: "Aranžman koji gosti najčešće biraju — i zbog kojeg se vraćaju.",
        kicker: "3 DANA · 2 noćenja",
        cijena: "140€",
        tag: "Najtraženije",
        slika: {
          src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`,
          alt: "Trodnevni rafting na Tari",
        },
        fakti: [{ tekst: "3 dana" }, { tekst: "5 obroka" }],
      },
      {
        href: "/kanjoning/hrcavka",
        naslov: "Kanjoning Hrčavka",
        opis: "Pitomiji kanjon u NP Sutjeska — idealan za prvi susret sa kanjoningom.",
        kicker: "HRČAVKA · pola dana",
        cijena: "120€",
        fakti: [{ tekst: "Pola dana" }, { tekst: "NP Sutjeska" }],
      },
    ],
    cardKicker: "1 DAN · bez noćenja",
    cardCijena: "50€",
    metaTitle: "Jednodnevni rafting na Tari — od 50€ | Rafting kamp Konak",
    metaDescription:
      "Jednodnevni rafting Tarom: 18 km i 18 bukova, oprema, skiper i prevoz. 50 € bez ručka ili 65 € sa domaćim ručkom. Vikend 60 € / 75 €.",
  },

  dvodnevni: {
    badge: "2 dana · 1 noćenje · 18 km",
    title: "Dvodnevni aranžman",
    subtitle:
      "Jedno veče u kampu i jedan dan na rijeci. Za one koji ne žele da avantura prođe u trku — nego da se u nju uđe polako, sa večerom kraj vatre.",
    price: "od 100€",
    priceNote: "po osobi",
    priceOptions: [
      { label: "Radni dan", price: "100€" },
      { label: "Vikend", price: "120€" },
    ],
    unit: 100,
    durationFact: "2 dana",
    stayFact: "1 noćenje · lux bungalov",
    mealsFact: "3 obroka",
    intro:
      "Dolazite bez žurbe, smjestite se u lux bungalov, i prvo veče provedete onako kako se na Tari i treba — uz rakiju dobrodošlice, domaću večeru i zvuk rijeke koji vas uspava. Sutradan, odmorni i siti, sjedate u čamac i spuštate se osamnaest kilometara niz najljepši dio kanjona.",
    program: [
      {
        broj: 1,
        label: "DAN 1",
        naslov: "Dolazak i veče u kampu",
        tekst:
          "Dočekujemo vas rakijom dobrodošlice i smještamo u lux bungalov sa sopstvenim kupatilom. Ostatak dana je vaš — rijeka je na korak, obala je vaša, žurbe nema. Uveče večera iz naše kuhinje, uz vatru i priču koja se otegne do kasno.",
      },
      {
        broj: 2,
        label: "DAN 2",
        naslov: "Doručak, oprema i spust",
        tekst:
          "Doručak u kampu — pite, uštipci, kajmak i sir Spasojevića. Zatim oprema, brifing i prevoz kombijem do Brštanovice. Slijedi spust: osamnaest kilometara niz Taru i Drinu, osamnaest bukova, kupanje na smaragdnoj vodi.",
      },
      {
        broj: 2,
        label: "DAN 2",
        naslov: "Ručak i odjava",
        tekst:
          "Povratak u kamp, topla voda i ručak — teletina ispod sača, čorba, domaći hljeb. Poslije ručka aranžman se završava, ali niko vas ne tjera — ostanite koliko vam duša želi.",
      },
    ],
    menuTitle: "Jelovnik",
    menuItems: [
      {
        label: "Večera (dan 1)",
        tekst:
          "Roštilj od mesa sa lokalnih farmi, sveže salate od povrća iz okolnih bašta. Uz vatru, uz čašu vina.",
      },
      {
        label: "Doručak (dan 2)",
        tekst:
          "Domaće pite i topli uštipci, suhomesnati proizvodi, kajmak i sir porodice Spasojević sa Zavaita, omleti i kobasice.",
      },
      {
        label: "Ručak (dan 2)",
        tekst:
          "Kremasta domaća čorba, teletina ispod sača od domaćeg teleta, hljeb ispod sača, salate. Za desert domaći kolači.",
      },
      {
        tekst:
          "Sve iz ruku Braneta — kuvara od svoje devetnaeste, izučenog po nekada najelitnijim konobama bivše Jugoslavije.",
      },
    ],
    included: [
      "1 noćenje u lux bungalovu sa sopstvenim kupatilom",
      "3 obroka (večera, doručak, ručak)",
      "Kompletna rafting oprema",
      "Licencirani skiper i sigurnosni brifing",
      "Prevoz do startne tačke i nazad",
      "Rakija dobrodošlice",
      "Besplatan parking pod video nadzorom",
      "Sve takse i osiguranje",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    notesExtra: [],
    similar: [
      {
        href: "/rafting/jednodnevni",
        naslov: "Jednodnevni rafting",
        opis: "18 km i 18 bukova — jedan dan koji se pamti.",
        kicker: "1 DAN · bez noćenja",
        cijena: "50€",
        slika: {
          src: `${HERO_IMG}/raftingtarom-jednodnevni.jpg`,
          alt: "Jednodnevni rafting na Tari",
        },
        fakti: [{ tekst: "5–6 sati" }, { tekst: "18 km" }],
      },
      {
        href: "/rafting/trodnevni",
        naslov: "Trodnevni aranžman",
        opis: "Aranžman koji gosti najčešće biraju — i zbog kojeg se vraćaju.",
        kicker: "3 DANA · 2 noćenja",
        cijena: "140€",
        tag: "Najtraženije",
        slika: {
          src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`,
          alt: "Trodnevni rafting na Tari",
        },
        fakti: [{ tekst: "3 dana" }, { tekst: "5 obroka" }],
      },
      {
        href: "/rafting/cijela-tara",
        naslov: "Rafting cijelim tokom Tare",
        opis: "76 km — cijeli plovni tok, pećine, vodopadi i noć u kanjonu.",
        kicker: "4 DANA · 76 km",
        cijena: "300€",
        slika: {
          src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`,
          alt: "Rafting cijelim tokom Tare",
        },
        fakti: [{ tekst: "4 dana" }, { tekst: "8 obroka" }],
      },
    ],
    cardKicker: "2 DANA · 1 noćenje · pun pansion",
    cardCijena: "100€",
    metaTitle: "Dvodnevni rafting aranžman na Tari — od 100€ | Rafting kamp Konak",
    metaDescription:
      "Dvodnevni rafting: noćenje u lux bungalovu, 3 obroka i spust 18 km. Radni dan od 100 €, vikend 120 €.",
  },

  trodnevni: {
    badge: "Najtraženije · 3 dana · 18 km",
    title: "Trodnevni aranžman",
    subtitle:
      "Aranžman koji gosti najčešće biraju — i zbog kojeg se vraćaju. Rafting, dvije večeri u kampu, i još jedan dan da vidite ono što se sa rijeke ne vidi.",
    price: "od 140€",
    priceNote: "po osobi",
    priceOptions: [
      { label: "Radni dan", price: "140€" },
      { label: "Vikend", price: "160€" },
    ],
    unit: 140,
    durationFact: "3 dana",
    stayFact: "2 noćenja · lux bungalov",
    mealsFact: "5 obroka",
    intro:
      "Tri dana su taman. Prvo veče se smjestite i upoznate kamp. Drugi dan je rijeka — osamnaest kilometara, osamnaest bukova. A treći dan, kad ste već umorni na onaj dobar način, birate kako ćete ga provesti: aktivnost u Nacionalnom parku Sutjeska, ili prosto još jedno mirno jutro uz rijeku prije nego krenete kući.",
    program: [
      {
        broj: 1,
        label: "DAN 1",
        naslov: "Dolazak, rakija, večera",
        tekst:
          "Doček uz rakiju dobrodošlice i smještaj u lux bungalov. Veče u kampu — večera iz naše kuhinje, vatra, rijeka, priča. Bez rasporeda, bez žurbe.",
      },
      {
        broj: 2,
        label: "DAN 2",
        naslov: "Cjelodnevni rafting",
        tekst:
          "Doručak, pa oprema i brifing. Kombijem do Brštanovice, i onda spust — osamnaest kilometara niz Taru i Drinu, kroz najuzbudljiviji dio kanjona. Pauze za kupanje i fotografije. Povratak u kamp, topla voda i ručak ispod sača. Uveče druga večera, i onaj razgovor koji se otegne dok vatra ne dogori.",
      },
      {
        broj: 3,
        label: "DAN 3",
        naslov: "Izlet ili mirno jutro",
        tekst:
          "Poslije doručka birate: cjelodnevna aktivnost u Nacionalnom parku Sutjeska (dogovaramo se prema vašim željama), ili mirno jutro uz rijeku prije nego krenete. Kako vam duša kaže.",
      },
    ],
    menuTitle: "Jelovnik (5 obroka)",
    menuItems: [
      {
        label: "Večera (dan 1)",
        tekst:
          "Roštilj sa lokalnih farmi, sveže salate iz okolnih bašta, uz vatru i čašu vina.",
      },
      {
        label: "Doručak (dan 2)",
        tekst:
          "Domaće pite, uštipci, suhomesnato, kajmak i sir Spasojevića sa 1600 metara.",
      },
      {
        label: "Ručak (dan 2)",
        tekst:
          "Kremasta čorba, teletina ispod sača od domaćeg teleta, hljeb ispod sača, salate, domaći kolači.",
      },
      {
        label: "Večera (dan 2)",
        tekst: "Još jedno veče uz vatru — roštilj, salate, priča.",
      },
      {
        label: "Doručak (dan 3)",
        tekst: "Balkanski doručak prije puta.",
      },
      {
        tekst:
          "Sve pravi Brane — kuvar sa četrdeset godina staža, izučen po nekada najelitnijim konobama bivše Jugoslavije.",
      },
    ],
    included: [
      "2 noćenja u lux bungalovu sa sopstvenim kupatilom",
      "5 obroka",
      "Kompletna rafting oprema",
      "Licencirani skiper i sigurnosni brifing",
      "Prevoz do startne tačke i nazad",
      "Rakija dobrodošlice",
      "Besplatan parking pod video nadzorom",
      "Sve takse i osiguranje",
    ],
    notIncluded: [
      ...NOT_INCLUDED_BASE,
      "Aktivnost u NP Sutjeska (3. dan) — na upit",
    ],
    notesExtra: [],
    similar: [
      {
        href: "/rafting/dvodnevni",
        naslov: "Dvodnevni aranžman",
        opis: "Jedno veče u kampu i jedan dan na rijeci.",
        kicker: "2 DANA · 1 noćenje",
        cijena: "100€",
        slika: {
          src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`,
          alt: "Dvodnevni rafting na Tari",
        },
        fakti: [{ tekst: "2 dana" }, { tekst: "3 obroka" }],
      },
      {
        href: "/rafting/cijela-tara",
        naslov: "Rafting cijelim tokom Tare",
        opis: "76 km — cijeli plovni tok i noć u najdubljoj tački kanjona.",
        kicker: "4 DANA · 76 km",
        cijena: "300€",
        slika: {
          src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`,
          alt: "Rafting cijelim tokom Tare",
        },
        fakti: [{ tekst: "4 dana" }, { tekst: "8 obroka" }],
      },
      {
        href: "/kanjoning/hrcavka",
        naslov: "Kanjoning Hrčavka",
        opis: "Pitomiji kanjon u NP Sutjeska — idealan za prvi susret sa kanjoningom.",
        kicker: "HRČAVKA · pola dana",
        cijena: "120€",
        fakti: [{ tekst: "Pola dana" }, { tekst: "NP Sutjeska" }],
      },
    ],
    cardKicker: "3 DANA · 2 noćenja · 5 obroka",
    cardCijena: "140€",
    metaTitle: "Trodnevni rafting aranžman na Tari — od 140€ | Rafting kamp Konak",
    metaDescription:
      "Najtraženiji trodnevni rafting: cjelodnevni spust, 2 noćenja, 5 obroka. Radni dan od 140 €, vikend 160 €.",
  },

  "cijela-tara": {
    badge: "4 dana · cijeli tok · 76 km",
    title: "Rafting cijelim tokom Tare",
    subtitle:
      "Cijeli plovni tok Tare — sedamdeset šest kilometara, od Đurđevića mosta do Huma. Pećine, vodopadi, i jedna noć u najdubljoj tački kanjona, daleko od svega.",
    price: "od 300€",
    priceNote: "po osobi",
    priceOptions: [
      { label: "Radni dan", price: "300€" },
      { label: "Vikend", price: "340€" },
    ],
    unit: 300,
    durationFact: "4 dana",
    stayFact: "3 noćenja (1 u kanjonu)",
    mealsFact: "8 obroka · pun pansion",
    intro:
      "Ovo je ekspedicija, ne izlet. Prelazimo cijeli plovni tok Tare, kroz najdublji kanjon Evrope — hiljadu i tri stotine metara stijene iznad glave. Do startne tačke se vozimo Durmitorskim prstenom, jednim od najljepših puteva na Balkanu, koji je i sam vrijedan putovanja. A jednu noć spavamo tamo gdje je kanjon najdublji, u malom motelu uz rijeku — daleko od puta, daleko od signala, pod zvijezdama.",
    introExtra: "Na ovoj dionici je Tara 2009. bila domaćin Svjetskog prvenstva u raftingu.",
    program: [
      {
        broj: 1,
        label: "DAN 1",
        naslov: "Dolazak u kamp",
        tekst:
          "Doček uz rakiju dobrodošlice, smještaj u lux bungalov, veče u kampu uz domaću večeru. Priprema za ono što slijedi.",
      },
      {
        broj: 2,
        label: "DAN 2",
        naslov: "Durmitorski prsten i početak ekspedicije",
        tekst:
          "Poslije doručka krećemo Durmitorskim prstenom — put koji se penje preko planine i otvara poglede kakve ne zaboravljate. Stižemo do mjesta gdje je Tara plovna i spuštamo čamce. Prvi dan na vodi: pećine, vodopadi, netaknuta divljina. Spavamo u motelu u najdubljoj tački kanjona.",
      },
      {
        broj: 3,
        label: "DAN 3",
        naslov: "Kroz srce kanjona",
        tekst:
          "Nastavljamo nizvodno, kroz najdublji dio kanjona. Rijeka mijenja lice iz sata u sat — mirni bazeni, pa bukovi, pa vodopadi koji padaju pravo u vodu. Povratak u kamp, večera i odmor.",
      },
      {
        broj: 4,
        label: "DAN 4",
        naslov: "Doručak i odlazak",
        tekst: "Doručak u kampu i mirno jutro prije puta kući.",
      },
    ],
    canyonStay:
      "Noć u kanjonu provodimo u malom motelu u najdubljoj tački Tare — čist, uređen, sa dušom. Hrana je švedski sto. Ovo je mjesto do kojeg se skoro i ne može doći drugačije nego rijekom.",
    menuTitle: "Jelovnik (8 obroka, pun pansion)",
    menuItems: [
      {
        tekst:
          "Doručci i večere u kampu — domaće pite, uštipci, kajmak Spasojevića, roštilj sa lokalnih farmi, teletina ispod sača iz Branovih ruku. U kanjonu, u motelu, hrana je švedski sto. Svaki obrok je uključen u cijenu.",
      },
    ],
    included: [
      "3 noćenja (lux bungalov + noć u motelu u kanjonu)",
      "8 obroka, pun pansion",
      "Kompletna rafting oprema",
      "Licencirani skiper i sigurnosni brifing",
      "Sav prevoz i transferi (uključujući Durmitorski prsten)",
      "Rakija dobrodošlice",
      "Besplatan parking pod video nadzorom",
      "Sve takse i osiguranje",
    ],
    notIncluded: NOT_INCLUDED_BASE,
    notesExtra: [],
    similar: [
      {
        href: "/rafting/trodnevni",
        naslov: "Trodnevni aranžman",
        opis: "Aranžman koji gosti najčešće biraju — i zbog kojeg se vraćaju.",
        kicker: "3 DANA · 2 noćenja",
        cijena: "140€",
        tag: "Najtraženije",
        slika: {
          src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`,
          alt: "Trodnevni rafting na Tari",
        },
        fakti: [{ tekst: "3 dana" }, { tekst: "5 obroka" }],
      },
      {
        href: "/kanjoning/nevidio",
        naslov: "Kanjoning Nevidio",
        opis: "Najzahtjevniji kanjon Crne Gore — skokovi, spustovi i plivanje.",
        kicker: "NEVIDIO · cijeli dan",
        cijena: "130€",
        fakti: [{ tekst: "Cijeli dan" }, { tekst: "Durmitor" }],
      },
      {
        href: "/rafting/dvodnevni",
        naslov: "Dvodnevni aranžman",
        opis: "Jedno veče u kampu i jedan dan na rijeci.",
        kicker: "2 DANA · 1 noćenje",
        cijena: "100€",
        slika: {
          src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`,
          alt: "Dvodnevni rafting na Tari",
        },
        fakti: [{ tekst: "2 dana" }, { tekst: "3 obroka" }],
      },
    ],
    cardKicker: "4 DANA · 76 km · cijeli tok",
    cardCijena: "300€",
    metaTitle: "Rafting cijelim tokom Tare — 4 dana, od 300€ | Rafting kamp Konak",
    metaDescription:
      "Četvorodnevna ekspedicija cijelim tokom Tare: 76 km, 3 noćenja (1 u kanjonu), 8 obroka. Od 300 €, vikend 340 €.",
  },
};

const FAQ = [
  {
    pitanje: "Da li je tura bezbjedna i za neiskusne?",
    odgovor:
      "Jeste. U svakom čamcu je licencirani skiper, oprema je nova, a prije spusta svi prolaze obuku. Tara je idealna i za one koji prvi put veslaju.",
  },
  {
    pitanje: "Šta je uključeno u cijenu?",
    odgovor:
      "Kompletna oprema, licencirani vodič, prevoz do startne tačke, obrok(i) po aranžmanu, osiguranje i sve takse. Kod višednevnih tura i noćenje i pun pansion. Plaćanje je isključivo u gotovini.",
  },
  {
    pitanje: "Kako se primjenjuje vikend cijena?",
    odgovor:
      "Vikend cijena važi za subotu i nedjelju (a kod višednevnih aranžmana i za petak). Cijena se automatski prilagodi datumu koji izaberete u rezervaciji.",
  },
  {
    pitanje: "Mogu li dodati Sutjesku ili druge aktivnosti?",
    odgovor:
      "Da — uz turu možete dodati NP Sutjeska, kanjoning Hrčavka ili jahanje konja. Sve ide na upit, samo ih označite u rezervaciji.",
  },
  {
    pitanje: "Imamo nekoga sa posebnom ishranom — je li to problem?",
    odgovor:
      "Nije. Upišite to u polje za posebnu ishranu pri rezervaciji (vegetarijanski, bez glutena i sl.) i prilagodićemo obroke.",
  },
];

const TURA_IMAGES: Record<
  string,
  { hero: { src: string; alt: string }; gallery: { src: string; alt: string }[] }
> = {
  jednodnevni: {
    hero: {
      src: `${HERO_IMG}/raftingtarom-jednodnevni.jpg`,
      alt: "Jednodnevni rafting na Tari",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija1.jpg`,
        alt: "Jednodnevni rafting — spust kroz kanjon Tare",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija2.jpg`,
        alt: "Jednodnevni rafting — čamac na Tari",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija3.jpg`,
        alt: "Jednodnevni rafting — kupanje u smaragdnoj vodi",
      },
    ],
  },
  dvodnevni: {
    hero: {
      src: `${HERO_IMG}/raftingtarom-dvodnevni.jpg`,
      alt: "Dvodnevni rafting na Tari",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija4.jpg`,
        alt: "Dvodnevni rafting — kamp i noćenje uz Taru",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija5.jpg`,
        alt: "Dvodnevni rafting — spust niz bukove",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija6.jpg`,
        alt: "Dvodnevni rafting — druženje u kampu",
      },
    ],
  },
  trodnevni: {
    hero: {
      src: `${HERO_IMG}/raftingtarom-trodnevni.jpg`,
      alt: "Trodnevni rafting na Tari",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija7.jpg`,
        alt: "Trodnevni rafting — dionica Brštanovica",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija8.jpg`,
        alt: "Trodnevni rafting — grupa na Tari",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija9.jpg`,
        alt: "Trodnevni rafting — večer u kampu Konak",
      },
    ],
  },
  "cijela-tara": {
    hero: {
      src: `${HERO_IMG}/raftingtarom-cetverodnevni.jpg`,
      alt: "Rafting cijelim tokom Tare",
    },
    gallery: [
      {
        src: `${RAFTING_IMG}/rafting-galerija12.jpg`,
        alt: "Cijela Tara — gornji tok i kanjon",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija14.jpg`,
        alt: "Cijela Tara — ekspedicija niz rijeku",
      },
      {
        src: `${RAFTING_IMG}/rafting-galerija16.jpg`,
        alt: "Cijela Tara — dolazak u Hum",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(TURE).map((tura) => ({ tura }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tura: string }>;
}): Promise<Metadata> {
  const { tura } = await params;
  const t = TURE[tura];
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: [
      "rafting Tara",
      "rafting na Tari",
      t.title.toLowerCase(),
      "rafting cijena",
      "rafting kamp Konak",
    ],
    alternates: { canonical: `${SITE}/rafting/${tura}` },
    openGraph: {
      title: t.title,
      description: t.subtitle,
      type: "website",
    },
  };
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBed() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7v11M3 12h18v6M21 12v-1a3 3 0 0 0-3-3h-7v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="10.5" r="1.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconMeal() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M17 3c-1.7 0-3 2-3 4.5S15.3 12 17 12v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function TuraDetaljPage({
  params,
}: {
  params: Promise<{ locale: string; tura: string }>;
}) {
  const { locale, tura } = await params;
  const t = TURE[tura];
  if (!t) notFound();
  setRequestLocale(locale);

  const images = TURA_IMAGES[tura];
  const notes = [...NOTES_SHARED, ...t.notesExtra];

  const crumbs = [
    { label: "Naslovna", href: "/" },
    { label: "Ponuda", href: "/ponuda" },
    { label: t.title, href: `/rafting/${tura}` },
  ];

  const waText = encodeURIComponent(
    `Zdravo! Zanima me ${t.title} (${t.price}). Molim vas slobodne termine i detalje.`,
  );
  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${waText}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Upit: ${t.title}`,
  )}`;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t.title,
    description: t.subtitle,
    brand: { "@type": "Organization", name: "Rafting kamp Konak" },
    offers: {
      "@type": "Offer",
      price: t.unit,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/rafting/${tura}`,
      description:
        tura === "jednodnevni"
          ? "50 EUR bez ručka / 65 EUR sa domaćim ručkom (po osobi)"
          : undefined,
    },
  };

  const crumbsLd = breadcrumbListLd(crumbs, SITE);

  return (
    <>
      <Breadcrumbs items={crumbs} />

      <Hero
        variant="b"
        eyebrow={t.badge}
        naslov={t.title}
        lead={t.subtitle}
        nazadLink={{ href: "/rafting", label: "Sve rafting ture" }}
        slika={images.hero}
      />

      <section className="kon-section">
        <div className="kon-container kon-td-grid">
          <div>
            <div className="kon-td-facts">
              {[
                { label: "TRAJANJE", value: t.durationFact, icon: <IconClock /> },
                { label: "SMEŠTAJ", value: t.stayFact, icon: <IconBed /> },
                { label: "OBROCI", value: t.mealsFact, icon: <IconMeal /> },
              ].map((f) => (
                <div
                  key={f.label}
                  className="rounded-card border border-line bg-surface p-6"
                >
                  <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-md bg-mint-surface text-teal">
                    {f.icon}
                  </span>
                  <span className="block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-terracotta">
                    {f.label}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold text-ink">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="mt-8 font-sans text-body"
              style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.7 }}
            >
              {t.intro}
            </p>
            {t.introExtra && (
              <p
                className="mt-4 font-sans font-semibold text-ink"
                style={{ fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.65 }}
              >
                {t.introExtra}
              </p>
            )}

            <h2 className="mt-10 font-display text-2xl font-extrabold text-pine">
              Vremenski plan
            </h2>
            <ol className="mt-6">
              {t.program.map((p, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine font-display text-base font-bold text-white">
                      {p.broj}
                    </span>
                    {i < t.program.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-line" aria-hidden="true" />
                    )}
                  </div>
                  <div className={i < t.program.length - 1 ? "pb-7" : ""}>
                    {p.label && (
                      <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-teal">
                        {p.label}
                      </span>
                    )}
                    <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
                      {p.naslov}
                    </h3>
                    <p className="mt-1.5 max-w-xl font-sans text-[15px] leading-[1.65] text-text-secondary">
                      {p.tekst}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {t.canyonStay && (
              <div className="mt-10 rounded-card border border-mint-border bg-mint-surface p-6">
                <h3 className="font-display text-lg font-extrabold text-pine">
                  Smještaj u kanjonu
                </h3>
                <p className="mt-3 font-sans text-[15px] leading-[1.65] text-body">
                  {t.canyonStay}
                </p>
              </div>
            )}

            <div className="mt-10 rounded-card-lg border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold text-pine">
                {t.menuTitle}
              </h2>
              <div className="mt-5 flex flex-col gap-5">
                {t.menuItems.map((item, i) => (
                  <div key={i}>
                    {item.label && (
                      <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
                        {item.label}
                      </span>
                    )}
                    <p
                      className={`font-sans text-[15px] leading-[1.65] text-body ${
                        item.label ? "mt-1.5" : ""
                      }`}
                    >
                      {item.tekst}
                    </p>
                  </div>
                ))}
              </div>
              {t.menuNote && (
                <p className="mt-5 font-sans text-sm italic text-text-secondary">
                  {t.menuNote}
                </p>
              )}
            </div>
          </div>

          <aside className="kon-td-side">
            <div className="rounded-card-lg bg-pine p-7 text-on-dark">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-teal-light">
                Cijena / osobi
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-extrabold text-white">
                  {t.price}
                </span>
              </div>
              <p className="mt-1 font-sans text-sm text-on-dark-muted">
                {t.priceNote}
              </p>

              <ul className="mt-4 flex flex-col gap-2 rounded-input bg-white/8 p-3.5">
                {t.priceOptions.map((opt) => (
                  <li
                    key={opt.label}
                    className="flex items-baseline justify-between gap-3 font-sans text-sm"
                  >
                    <span className="text-on-dark-muted">{opt.label}</span>
                    <span className="font-display text-base font-bold text-white">
                      {opt.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-6 h-px bg-white/12" />

              <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-teal-light">
                U cijenu uključeno
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {t.included.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-start gap-2.5 font-sans text-sm text-on-dark"
                  >
                    <span className="mt-0.5 text-teal-light">
                      <IconCheck />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>

              <span className="mt-6 block font-sans text-xs font-bold uppercase tracking-[0.16em] text-on-dark-muted">
                Nije uključeno
              </span>
              <ul className="mt-3 flex flex-col gap-2.5">
                {t.notIncluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 font-sans text-sm text-on-dark-muted"
                  >
                    <span className="mt-0.5 opacity-70">
                      <IconX />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2.5">
                <CtaButton href={waHref} variant="primary" className="w-full">
                  Pošalji upit na WhatsApp
                </CtaButton>
                <CtaButton href={mailHref} variant="ghost" className="w-full">
                  Ili pošalji e-mailom
                </CtaButton>
              </div>

              <p className="mt-4 font-sans text-xs leading-relaxed text-on-dark-muted">
                Okvirna cijena. Plaćanje isključivo u gotovini. Tačan termin
                potvrđujemo na upit.
              </p>

              <div className="mt-4 text-center">
                <Link
                  href="/rezervacija"
                  className="font-sans text-sm font-bold text-amber-light transition-colors hover:text-white"
                >
                  Rezerviši online →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="kon-section pt-0">
        <div className="kon-container">
          <div className="rounded-card-lg border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-display text-xl font-extrabold text-pine sm:text-2xl">
              Napomene
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {notes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2.5 font-sans text-[15px] leading-relaxed text-body"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                    aria-hidden="true"
                  />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Sa rijeke"
            naslov="Trenuci sa Tare"
            link={{ href: "/galerija", label: "Cijela galerija" }}
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {images.gallery.map((g) => (
              <ImageSlot
                key={g.src}
                src={g.src}
                alt={g.alt}
                className="aspect-[4/3] rounded-card"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section">
        <div className="kon-container">
          <SectionHeader
            eyebrow="Istraži dalje"
            naslov="Slične ponude"
            link={{ href: "/rafting", label: "Sve rafting ture" }}
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.similar.map((card) => (
              <TourCard
                key={card.href}
                href={card.href}
                naslov={card.naslov}
                opis={card.opis}
                kicker={card.kicker}
                cijena={card.cijena}
                cijenaLabel="od"
                tag={card.tag}
                slika={card.slika}
                fakti={card.fakti}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="kon-section bg-sand">
        <div className="kon-container" style={{ maxWidth: "var(--container-narrow)" }}>
          <SectionHeader
            eyebrow="Česta pitanja"
            naslov="Sve što vas zanima."
            className="items-center text-center"
          />
          <div className="mt-8">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }}
      />
    </>
  );
}
