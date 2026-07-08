import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TourCard } from "@/components/TourCard";
import { ReviewCard } from "@/components/ReviewCard";
import { BlogCard } from "@/components/BlogCard";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Varijanta A — velika (demo, bez prave slike → gradijent placeholder) */}
      <Hero
        variant="a"
        eyebrow="Najdublji kanjon Evrope · 1.300 m"
        naslov={
          <>
            Divlja Tara,
            <br />
            pitom Konak
          </>
        }
        lead="Rafting, kanjoning i domaća kuhinja na sastavu Tare i Pive — u Humu kod Foče."
        cta={[
          { label: "Rezerviši turu", href: "/rezervacija", arrow: true },
          { label: "Pogledaj ponudu", href: "/ponuda", variant: "ghost" },
        ]}
      />

      {/* Provjera tokena (privremeni sadržaj do izrade stranica) */}
      <section
        className="mx-auto w-full"
        style={{
          maxWidth: "var(--container)",
          padding: "var(--section-pad) var(--px-section)",
        }}
      >
        <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
          Design tokeni — provjera · aktivni jezik: {locale}
        </p>
        <h2
          className="font-display font-extrabold text-pine"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
        >
          Sekcije se smjenjuju svijetlo/tamno
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-card border border-line bg-surface p-6 shadow-soft">
            <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-teal">
              Rafting
            </p>
            <h3 className="font-display text-xl font-semibold text-ink">
              Jednodnevni rafting
            </h3>
            <p className="mt-2 font-sans text-sm text-text-secondary">
              18 km Tarom kroz najdublji kanjon Evrope.
            </p>
            <div className="my-4 h-px bg-line" />
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl font-bold text-pine">od 50€</span>
              <span className="font-sans text-sm font-bold text-terracotta">
                Detaljnije →
              </span>
            </div>
          </article>

          <article className="rounded-card border border-line bg-surface-warm p-6 shadow-soft">
            <h3 className="mb-4 font-display text-xl font-semibold text-ink">Paleta</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                ["pine", "bg-pine"],
                ["teal", "bg-teal"],
                ["terracotta", "bg-terracotta"],
                ["amber", "bg-amber"],
                ["paper", "bg-paper"],
                ["sand", "bg-sand"],
                ["ink", "bg-ink"],
                ["mint", "bg-mint-surface"],
              ].map(([name, cls]) => (
                <div key={name} className="text-center">
                  <div className={`${cls} aspect-square rounded-md border border-line`} />
                  <span className="mt-1 block font-sans text-[10px] text-muted">{name}</span>
                </div>
              ))}
            </div>
          </article>

          <article
            className="rounded-card-lg p-6 text-on-dark"
            style={{ background: "var(--gradient-hero)" }}
          >
            <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.18em] text-amber-light">
              Tamna sekcija
            </p>
            <h3 className="font-display text-xl font-semibold text-white">Gradijent pine</h3>
            <p className="mt-2 font-sans text-sm text-on-dark-muted">
              Naizmjenične svijetle i tamne sekcije daju ritam stranici.
            </p>
          </article>
        </div>
      </section>

      {/* Kartice — provjera (privremeni demo, placeholder slotovi bez slika) */}
      <section
        className="mx-auto w-full"
        style={{ maxWidth: "var(--container)", padding: "var(--section-pad) var(--px-section)" }}
      >
        <h2
          className="mb-8 font-display font-extrabold text-pine"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}
        >
          Kartice
        </h2>

        {/*
          RASPORED ZA PRAVU POČETNU:
          Grid = 4 RAFTING ture ovim redom (1/2/3/4 dana), #3 „Najtraženije".
          Ispod = horizontalne red-kartice za izlete (npr. NP Sutjeska).
          Kanjoning se NE miješa u ovaj grid.
        */}

        {/* Kartica ture — grid (4→2→1), sve rafting ture */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TourCard
            href="/rafting/jednodnevni"
            kicker="1 DAN"
            naslov="Jednodnevni rafting"
            fakti={[{ tekst: "1 dan" }, { tekst: "Ručak" }, { tekst: "18 km" }]}
            cijena="50€"
          />
          <TourCard
            href="/rafting/dvodnevni"
            kicker="2 DANA"
            naslov="Dvodnevni rafting"
            fakti={[{ tekst: "2 dana" }, { tekst: "1 noćenje" }, { tekst: "Pun pansion" }]}
            cijena="100€"
          />
          <TourCard
            href="/rafting/trodnevni"
            kicker="3 DANA"
            naslov="Trodnevni rafting"
            tag="Najtraženije"
            fakti={[{ tekst: "3 dana" }, { tekst: "2 noćenja" }, { tekst: "5 obroka" }]}
            cijena="140€"
          />
          <TourCard
            href="/rafting/cijela-tara"
            kicker="4 DANA"
            naslov="Cijela Tara"
            fakti={[{ tekst: "4 dana" }, { tekst: "3 noćenja" }, { tekst: "76 km" }]}
            cijena="300€"
          />
        </div>

        {/* Kartica ture — red (izleti / hajking) */}
        <div className="mt-6 grid gap-6">
          <TourCard
            href="/aktivnosti"
            varijanta="red"
            kicker="NP Sutjeska"
            naslov="Izlet NP Sutjeska"
            opis="Prašuma Perućica, Trnovačko jezero i Maglić — cjelodnevni planinski izlet iz kampa."
            cijena="Na upit"
            cijenaLabel=""
          />
        </div>

        {/* Recenzije (3→1) */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <ReviewCard
            tekst="Nezaboravno iskustvo, skiperi vrhunski i sve organizovano do detalja."
            ime="Marko"
            grad="Beograd"
          />
          <ReviewCard
            tekst="Priroda, hrana i ljudi — sve na nivou. Vraćamo se sigurno."
            ime="Ana"
            grad="Sarajevo"
          />
          <ReviewCard
            tekst="Kamp je uredan, bungalovi udobni, rafting adrenalinski. Preporuka!"
            ime="Petar"
            grad="Podgorica"
          />
        </div>

        {/* Blog (featured + standard) */}
        <div className="mt-10 grid gap-4">
          <BlogCard
            featured
            href="/blog"
            kategorija="Vodič"
            naslov="Kada je najbolje vrijeme za rafting na Tari?"
            opis="Sezona, vodostaj i savjeti kako izabrati pravi termin za spust."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <BlogCard href="/blog" kategorija="Priroda" naslov="Kanjon Tare iz ptičje perspektive" opis="Zašto je najdublji kanjon Evrope must-see destinacija." />
            <BlogCard href="/blog" kategorija="Hrana" naslov="Domaća kuhinja u kampu Konak" opis="Šta se jede poslije dana na rijeci." />
            <BlogCard href="/blog" kategorija="Savjeti" naslov="Šta ponijeti na rafting" opis="Kratka lista opreme i odjeće za spust." />
          </div>
        </div>
      </section>

      {/* Varijanta B — kompaktna (demo) */}
      <Hero
        variant="b"
        visina="52vh"
        eyebrow="Rafting ture"
        naslov="Rafting na Tari"
        lead="Od jednodnevnog spusta do cijele Tare u četiri dana — izaberi svoj ritam rijeke."
        nazadLink={{ href: "/", label: "Nazad na početnu" }}
        cta={[{ label: "Rezerviši", href: "/rezervacija", arrow: true }]}
      />
    </>
  );
}
