export interface BlogBlock {
  h: string;
  p: string[];
}

export interface BlogPost {
  slug: string;
  cat: string;
  title: string;
  lead: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  datePublished: string;
  gradient?: string;
  blocks: BlogBlock[];
}

const SITE = "https://www.raftingkampkonak.com";

export const BLOG_POSTS: Record<string, BlogPost> = {
  "sta-ponijeti-na-rafting": {
    slug: "sta-ponijeti-na-rafting",
    cat: "PRIPREMA · VODIČ",
    title: "Šta ponijeti na rafting na Tari?",
    excerpt:
      "Provjerena lista — šta dobijate od nas, a šta nosite sami: odjeća, obuća, zaštita od sunca i sitnice koje prave razliku na rijeci.",
    metaTitle: "Šta ponijeti na rafting na Tari — kompletna lista | Kamp Konak",
    metaDescription:
      "Šta ponijeti na rafting na Tari: odjeća, obuća, zaštita od sunca i vodootporna torba. Praktičan vodič rafting kampa Konak — šta dobijate od nas, a šta nosite sami.",
    datePublished: "2026-05-15",
    gradient: "var(--gradient-slot-1)",
    lead:
      "Rafting na Tari ne traži mnogo opreme — najveći dio dobijate od nas. Ali nekoliko sitnica može da napravi razliku između dobrog i savršenog dana na rijeci. Evo provjerene liste, iz iskustva skipera sa preko 20 godina na Tari.",
    blocks: [
      {
        h: "Šta dobijate od nas (ne morate nositi)",
        p: [
          "Kompletnu rafting opremu dobijate na licu mjesta: neoprensko odijelo, neoprenske čizme, vjetrovku, sigurnosni prsluk, kacigu i veslo. Sve podešavamo po vašoj veličini prije polaska.",
          "U čamcu su i vodootporne barele za stvari koje želite da ostanu suve tokom spusta. Svaku turu vodi licencirani skiper — vaša sigurnost i vođenje kroz kanjon su na njemu.",
        ],
      },
      {
        h: "Šta obavezno ponijeti",
        p: [
          "Kupaći kostim ili šort (nosite ispod neoprena), peškir i suva odjeća za poslije spusta. Obuća koja može da pokvasi — sandale, tenisice ili čizme koje ne žalite.",
          "Zaštita od sunca: krema, kapu ili šešir, naočare sa vezicom. Sunce na vodi i u kanjonu je jače nego što očekujete, čak i u oblaku.",
        ],
      },
      {
        h: "Za višednevne ture",
        p: [
          "Lična higijena, topla odjeća za veče u kampu, čeona lampa i punjač za telefon. Noćenje je u bungalovu, ali večeri uz rijeku mogu biti svježije.",
          "Vodootporna torbica ili dry bag za dokumente i telefon na vodi, plus sitnina za eventualne potrebe u kampu.",
        ],
      },
      {
        h: "Šta NE treba nositi",
        p: [
          "Nakit, satove i vrijednosti — ostavite u smještaju ili kod doma. Velike količine gotovine nisu potrebne.",
          "Telefon bez vodootporne zaštite — uvijek ga nosite u hermetičkom futrolu ili dry bagu. Na vodi nema mjesta za rizik.",
        ],
      },
      {
        h: "Kratka lista za ponijeti",
        p: [
          "Kupaći, peškir, suva odjeća, sunčana zaštita i obuća za vodu. Za višednevno — topla odjeća i higijena.",
          "Opremu, prsluk, kacigu, vodiča i obroke prepustite nama — to je naš posao.",
        ],
      },
    ],
  },

  "np-sutjeska-vodic": {
    slug: "np-sutjeska-vodic",
    cat: "PRIRODA · VODIČ",
    title: "NP Sutjeska: Perućica, Trnovačko i Maglić",
    excerpt:
      "Vodič kroz najstariji nacionalni park — prašuma, srcoliko jezero i krov BiH. Šta vidjeti i kako organizovati izlet.",
    metaTitle: "NP Sutjeska — vodič: Perućica, Trnovačko jezero i Maglić | Kamp Konak",
    metaDescription:
      "Vodič kroz Nacionalni park Sutjeska: prašuma Perućica, srcoliko Trnovačko jezero i Maglić (2386 m). Šta vidjeti, koliko traje i kako organizovati izlet iz rafting kampa Konak.",
    datePublished: "2026-06-01",
    gradient: "var(--gradient-slot-2)",
    lead:
      "Nacionalni park Sutjeska je najstariji nacionalni park u Bosni i Hercegovini i jedan od najljepših kutaka Balkana. Iz kampa Konak organizujemo cjelodnevni izlet do njegova tri najveća dragulja — prašume Perućice, Trnovačkog jezera i vrha Maglić.",
    blocks: [
      {
        h: "Prašuma Perućica — jedna od posljednjih u Evropi",
        p: [
          "Kratki izlet iz kampa: šetnja kroz prašumu Perućicu uz vodiča, kao predah od vode i uvod u Sutjesku.",
        ],
      },
      {
        h: "Trnovačko jezero — srce planine",
        p: [
          "Srcoliko jezero ispod Maglića — idealno za dan u prirodi uz rafting boravak, bez potrebe za višednevnim planinarenjem.",
        ],
      },
      {
        h: "Maglić (2.386 m) — krov Bosne i Hercegovine",
        p: [
          "Za one koji žele više — izlet prema Magliću organizujemo na upit, u skladu sa vremenom i spremnošću grupe.",
        ],
      },
      {
        h: "Kako izgleda izlet iz kampa Konak",
        p: [
          "Polazak iz Huma, prevoz i vodič uključeni u aranžman — jedan dan vode, drugi dan planina, ili obrnuto.",
        ],
      },
      {
        h: "Šta ponijeti",
        p: [
          "Udobna obuća, lagani ruksak, voda i zaštita od sunca — dovoljno za cjelodnevni izlet iz kampa.",
        ],
      },
    ],
  },

  "aktivnosti-na-tari": {
    slug: "aktivnosti-na-tari",
    cat: "AVANTURA · VODIČ",
    title: "Aktivnosti na Tari i oko kampa",
    excerpt:
      "Kanjoning Nevidio i Hrčavka, Durmitor, Zelengora, Pivsko jezero i jahanje — šta sve spojiti uz rafting.",
    metaTitle: "Aktivnosti na Tari i oko kampa — kanjoning, Durmitor, jahanje | Konak",
    metaDescription:
      "Šta raditi pored raftinga na Tari: kanjoning Nevidio i Hrčavka, Durmitor i Crno jezero, Zelengora, Pivsko jezero i jahanje konja. Vodič kroz aktivnosti oko rafting kampa Konak.",
    datePublished: "2026-06-10",
    gradient: "var(--gradient-slot-3)",
    lead:
      "Rafting je glavni razlog dolaska, ali okolina kampa Konak nudi mnogo više. Kanjoni, planinski vrhovi, ledena jezera i jahanje — sve na sat ili dva vožnje. Evo šta sve možete spojiti u jedan boravak.",
    blocks: [
      {
        h: "Kanjoning: Nevidio i Hrčavka",
        p: [
          "Dan u kanjonu pored dana na Tari — Nevidio za iskusne, Hrčavka za prvi kanjoning. Oboje organizujemo iz kampa.",
        ],
      },
      {
        h: "Durmitor i Crno jezero",
        p: [
          "Opušten izlet do Crnog jezera i Durmitora — idealno za porodice i mješovite grupe poslije raftinga.",
        ],
      },
      {
        h: "Zelengora i Pivsko jezero",
        p: [
          "Planinski predah: gorska jezera i netaknuta priroda na dan ili pola dana iz kampa Konak.",
        ],
      },
      {
        h: "Jahanje konja",
        p: [
          "Lagana aktivnost uz vidikovac — može se dodati u aranžman na upit, bez posebne pripreme.",
        ],
      },
      {
        h: "Kako sve spojiti",
        p: [
          "Rafting kao okosnica, a uz njega kanjoning, izlet ili jahanje — javite nam koliko dana ostajete i složićemo program.",
        ],
      },
    ],
  },
};

export const FEATURED_SLUG = "sta-ponijeti-na-rafting";

export const GRID_SLUGS = ["np-sutjeska-vodic", "aktivnosti-na-tari"] as const;

export function blogPostUrl(slug: string) {
  return `${SITE}/blog/${slug}`;
}

export function getAllBlogSlugs() {
  return Object.keys(BLOG_POSTS);
}
