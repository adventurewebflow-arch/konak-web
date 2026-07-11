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
  cta?: { label: string; href: string };
  blocks: BlogBlock[];
}

const SITE = "https://www.raftingkampkonak.com";

export const BLOG_POSTS: Record<string, BlogPost> = {
  "kada-na-taru": {
    slug: "kada-na-taru",
    cat: "PLANIRANJE · VODIČ",
    title: "Kada je najbolje vrijeme za rafting na Tari?",
    excerpt:
      "Maj ili avgust? Kakva je voda po mjesecima, kad je najbrža, kad je najtoplija — i koji mjesec bira ko.",
    metaTitle: "Kada je najbolje vrijeme za rafting na Tari? | Kamp Konak",
    metaDescription:
      "Maj ili avgust? Vodič kroz rafting sezonu na Tari — kakva je voda po mjesecima, kad je najbrža, kad je najtoplija, i koji mjesec bira ko. Iz iskustva skipera sa 20+ godina na rijeci.",
    datePublished: "2026-05-20",
    gradient: "var(--gradient-slot-1)",
    cta: { label: "Pogledaj rafting ture", href: "/rafting" },
    lead:
      "Najčešće pitanje koje dobijemo prije rezervacije. Odgovor nije jedan — jer Tara nije ista u maju i u avgustu. Evo kako rijeka izgleda mjesec po mjesec, pa birajte onu Taru koja je vaša.",
    blocks: [
      {
        h: "Kratak odgovor",
        p: [
          "Ako tražite adrenalin i brzu vodu — maj i jun. Ako vodite porodicu i želite toplu vodu i miran spust — jul i avgust. Ako želite mir bez gužve i najljepše boje kanjona — septembar. Sezona kod nas traje od maja do oktobra.",
        ],
      },
      {
        h: "Maj i jun — Tara pokazuje zube",
        p: [
          "Ovo je mjesec kad se snijeg sa Durmitora i Sinjajevine topi i sav taj vodostaj završava u Tari. Rijeka je brza, puna, i bukovi su najozbiljniji. Spust koji u avgustu traje tri i po sata, u maju se preleti za sat i po — jednostavno vas nosi.",
          "Voda je hladna. Ali za to imamo neoprensko odijelo, čizme i prsluk, pa se to ne osjeti onako kako zvuči. Ono što se osjeti je da rijeka radi svoj posao i da vi samo držite veslo.",
          "Ovo je mjesec za one koji hoće pravu vožnju. Nije za one koji traže lagano popodne na vodi.",
        ],
      },
      {
        h: "Jul i avgust — Tara za sve",
        p: [
          "Vodostaj pada, voda se zagrijava, i rijeka postaje pitomija. Bukovi su i dalje tu — svih osamnaest — ali su blaži, i između njih ima mnogo više prostora da se gleda gore, u zidove kanjona.",
          "Ovo je vrijeme kad se najviše kupamo. Stajemo na smaragdnim bazenima, skače se sa stijena, sunca se na čamcu. Spust traje duže, tri i po sata, i to nije mana — to je razlog zbog kojeg ljudi baš tad dolaze.",
          "Ako vodite djecu ili nekoga ko prvi put sjeda u čamac, ovo je vaš mjesec.",
        ],
      },
      {
        h: "Septembar i oktobar — kanjon za sebe",
        p: [
          "Gužva prođe, a rijeka ostane. Voda je još uvijek pristojno topla, dani su bistri, a kanjon dobija one boje koje ljeti ne vidite — bukva požuti, stijena se zacrveni pod niskim suncem.",
          "Manje je ljudi na vodi, pa se sve radi bez žurbe. Za nas su ovo najljepši dani na Tari, iako to gosti rijetko znaju unaprijed.",
        ],
      },
      {
        h: "Šta god izaberete",
        p: [
          "Voda u Tari je pitka. To nije reklama — to je rijeka koju možete zahvatiti dlanom i popiti, na bilo kojoj dionici. Prve godine kad se ljudi tome iznenade, druge godine to prepričavaju.",
          "Bilo koji mjesec da izaberete, u čamcu je skiper koji Taru vozi preko dvadeset godina. On zna koja je linija za taj vodostaj, gdje se staje i gdje se ne staje. Vi samo dođite.",
        ],
      },
    ],
  },

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
    cta: { label: "Pogledaj rafting ture", href: "/rafting" },
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
    cat: "PRIRODA · IZLET",
    title: "NP Sutjeska — izlet iz rafting kampa Konak",
    excerpt:
      "Cjelodnevni izlet: prašuma Perućica, Trnovačko jezero i Maglić. Šta se stigne za jedan dan i kako organizujemo.",
    metaTitle:
      "NP Sutjeska — izlet iz rafting kampa Konak | Perućica, Trnovačko, Maglić",
    metaDescription:
      "Cjelodnevni izlet u Nacionalni park Sutjeska iz kampa Konak: prašuma Perućica, Trnovačko jezero i Maglić. Šta se stigne za jedan dan i kako organizujemo.",
    datePublished: "2026-06-01",
    gradient: "var(--gradient-slot-2)",
    cta: { label: "Pošalji upit", href: "/kontakt" },
    lead:
      "Kad ste već tu, na sat vožnje od kampa čeka vas najstariji nacionalni park u Bosni i Hercegovini. Za goste koji ostaju više dana, jedan dan u Sutjesci je prirodan predah od rijeke — i mnogi kažu da im je bio vrhunac boravka.",
    blocks: [
      {
        h: "Prašuma Perućica",
        p: [
          "Jedna od posljednjih prašuma u Evropi. Nikad posječena, nikad dirana — drveće koje raste, pada i truli tačno onako kako je raslo, padalo i trulilo prije hiljadu godina. Ulazi se samo sa vodičem parka, i to je dobro: bez vodiča biste prošli pored svega, a ne biste vidjeli ništa.",
          "Sa vidikovca Dragoš sedlo puca pogled na cijelu prašumu i na vodopad Skakavac, koji pada osamdesetak metara u dolinu.",
        ],
      },
      {
        h: "Trnovačko jezero",
        p: [
          "Ledničko jezero u obliku srca, na 1517 metara, okruženo Volujakom i Maglićem. Do njega se pješači — nije šetnja, ali nije ni ekspedicija. Voda je hladna do bola i bistra do dna. Ovo je jedno od onih mjesta zbog kojih se ljudi vraćaju u ove planine.",
        ],
      },
      {
        h: "Maglić — krov Bosne",
        p: [
          "Sa 2386 metara, najviši vrh u BiH. Za one u dobroj formi i sa cijelim danom na raspolaganju. Sa vrha se vidi i Durmitor i pola Crne Gore, ako je dan bistar.",
        ],
      },
      {
        h: "Kako to izgleda iz kampa",
        p: [
          "Izlet u Sutjesku organizujemo za goste koji su kod nas na višednevnom aranžmanu. Dogovaramo se prema tome koliko vas je, koliko ste spremni i koliko vremena imate — pa biramo da li idete na Perućicu, na Trnovačko, ili na oboje.",
          "Cijena se dogovara na upit. Gostima koji su već uzeli rafting aranžman pravimo najbolju cijenu.",
        ],
      },
      {
        h: "Šta ponijeti",
        p: [
          "Dobre patike ili planinarske cipele, jaknu (gore je hladnije nego u kanjonu, i po ljeti), vodu i nešto za pojesti. Sve ostalo dogovaramo.",
        ],
      },
    ],
  },

  "aktivnosti-na-tari": {
    slug: "aktivnosti-na-tari",
    cat: "AVANTURA · VODIČ",
    title: "Šta raditi na Tari osim raftinga?",
    excerpt:
      "Kanjoning Nevidio i Hrčavka, jahanje na vrhu kanjona, NP Sutjeska, Durmitor — šta sve možete spojiti uz rafting.",
    metaTitle: "Šta raditi na Tari osim raftinga? | Kamp Konak",
    metaDescription:
      "Kanjoning Nevidio i Hrčavka, jahanje na vrhu kanjona, NP Sutjeska, Durmitor — šta sve možete spojiti uz rafting u kampu Konak.",
    datePublished: "2026-06-10",
    gradient: "var(--gradient-slot-3)",
    cta: { label: "Pogledaj ponudu", href: "/ponuda" },
    lead:
      "Rafting je razlog zbog kojeg većina dođe. Ali kad ostanete više dana, ispostavi se da je rijeka samo početak — sve što je oko nje vrijedi isto toliko.",
    blocks: [
      {
        h: "Kanjoning — Nevidio i Hrčavka",
        p: [
          "Dva kanjona, dva potpuno različita dana.",
          "Hrčavka je u Nacionalnom parku Sutjeska, kod Tjentišta — pitomija, prava uživancija. Vodopadi, duboki bazeni, prirodni tobogani. Ako vam je ovo prvi kanjoning, počnite ovdje. Prolazi i sposobnija djeca od četrnaest godina.",
          "Nevidio je druga priča. Kanjon Komarnice pod Durmitorom, posljednji osvojeni kanjon u Evropi. Uski prolazi, skokovi do osam metara, plivanje kroz ledenu vodu. Ovo je za avanturiste u formi, i ne ulazi se bez licenciranog vodiča.",
        ],
      },
      {
        h: "Jahanje na vrhu kanjona",
        p: [
          "Ovo je aktivnost koju gosti ne očekuju, pa ih zato i najviše iznenadi. Jaše se gore, na vrhu najdubljeg kanjona Tare — a kanjon je ispod vas hiljadu i tri stotine metara. Pogled odozgo na rijeku kojom ste jučer prošli je nešto sasvim drugo.",
          "Organizujemo na upit, javite se pa dogovaramo.",
        ],
      },
      {
        h: "NP Sutjeska",
        p: [
          "Prašuma Perućica, Trnovačko jezero, Maglić. Cjelodnevni izlet iz kampa, za goste na višednevnom aranžmanu. Detaljnije u posebnom članku.",
        ],
      },
      {
        h: "Durmitor i Pivsko jezero",
        p: [
          "Durmitorski prsten je jedan od najljepših puteva na Balkanu — i vozimo ga svake godine, kad idemo na start četvorodnevne ture. Pivsko jezero je na putu, tirkizno i tiho, sa vodom koja izgleda kao da neko slika.",
        ],
      },
      {
        h: "Kako sve spojiti",
        p: [
          "Najlakše je kroz višednevni aranžman. Rafting je okosnica, a ostalo se nakalemi — dan na vodi, dan u kanjonu, dan u planini. Recite nam koliko dana imate i šta vas vuče, pa ćemo sklopiti.",
        ],
      },
    ],
  },
};

export const FEATURED_SLUG = "kada-na-taru";

export const GRID_SLUGS = [
  "np-sutjeska-vodic",
  "aktivnosti-na-tari",
  "sta-ponijeti-na-rafting",
] as const;

export function blogPostUrl(slug: string) {
  return `${SITE}/blog/${slug}`;
}

export function getAllBlogSlugs() {
  return Object.keys(BLOG_POSTS);
}
