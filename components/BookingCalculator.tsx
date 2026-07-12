"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CtaButton } from "./CtaButton";
import {
  CAMP_EMAIL,
  EMPTY_UTM,
  readUtmFromWindow,
  submitToFormspree,
  type UtmFields,
} from "@/lib/formspree";

const WHATSAPP_NUM = "38765848110";

interface Tour {
  id: string;
  naziv: string;
  kratko: string;
  wd: number;
  we: number;
  /** Da li tura uopšte ima vikend cijenu. */
  weekend: boolean;
  /** Da li petak računamo kao vikend (samo višednevne). */
  friday: boolean;
}

const TOURS: Tour[] = [
  { id: "r1", naziv: "Jednodnevni rafting", kratko: "1 dan", wd: 50, we: 60, weekend: true, friday: false },
  { id: "r2", naziv: "Dvodnevni aranžman", kratko: "2 dana", wd: 100, we: 120, weekend: true, friday: true },
  { id: "r3", naziv: "Trodnevni aranžman", kratko: "3 dana", wd: 140, we: 160, weekend: true, friday: true },
  { id: "r4", naziv: "Rafting cijelom Tarom", kratko: "4 dana", wd: 300, we: 340, weekend: true, friday: true },
  { id: "k1", naziv: "Kanjoning Hrčavka", kratko: "1 dan", wd: 120, we: 130, weekend: true, friday: false },
  { id: "k2", naziv: "Kanjoning Nevidio", kratko: "1 dan", wd: 130, we: 140, weekend: true, friday: false },
];

const DODACI = [
  { id: "sutjeska", naziv: "NP Sutjeska", sub: "Trnovačko · Maglić" },
  { id: "hrcavka", naziv: "Kanjoning Hrčavka", sub: "na upit" },
  { id: "jahanje", naziv: "Jahanje konja", sub: "vidikovac" },
];

type Status = "idle" | "loading" | "success" | "error";

function isWeekend(dateStr: string, tour: Tour): boolean {
  if (!dateStr || !tour.weekend) return false;
  const d = new Date(`${dateStr}T00:00:00`);
  const day = d.getDay(); // 0 = ned, 6 = sub
  if (day === 6 || day === 0) return true;
  if (day === 5 && tour.friday) return true;
  return false;
}

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-input border border-line bg-surface text-xl font-bold text-pine transition-colors hover:bg-mint-surface disabled:opacity-40";
  return (
    <div>
      <span className="mb-2 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={btn}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`${label} manje`}
        >
          −
        </button>
        <span className="min-w-10 text-center font-display text-2xl font-bold text-ink">
          {value}
        </span>
        <button
          type="button"
          className={btn}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`${label} više`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function BookingCalculator() {
  const t = useTranslations("Forms");
  const tc = useTranslations("Common");
  const [tourId, setTourId] = useState("r1");
  const [lunch, setLunch] = useState(true);
  const [osobe, setOsobe] = useState(2);
  const [djeca, setDjeca] = useState(0);
  const [datum, setDatum] = useState("");
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [ishrana, setIshrana] = useState("");
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [utm, setUtm] = useState<UtmFields>(EMPTY_UTM);
  const [status, setStatus] = useState<Status>("idle");

  // UTM čitamo tek nakon mounta (window je dostupan samo na klijentu);
  // ostaje prazno pri SSR-u da izbjegnemo hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUtm(readUtmFromWindow());
  }, []);

  const tour = TOURS.find((t) => t.id === tourId) ?? TOURS[0];
  const weekend = isWeekend(datum, tour);
  const perPerson =
    tour.id === "r1"
      ? weekend
        ? lunch
          ? 75
          : 60
        : lunch
          ? 65
          : 50
      : weekend
        ? tour.we
        : tour.wd;
  const total = perPerson * osobe + (perPerson / 2) * djeca;

  const activeDodaci = DODACI.filter((d) => addons[d.id]);

  const poruka = useMemo(() => {
    const l: string[] = [];
    l.push("Upit — Rafting kamp Konak");
    l.push(
      `Tura: ${tour.naziv}${
        tour.id === "r1" ? (lunch ? " (sa ručkom)" : " (bez ručka)") : ""
      }${weekend ? " (vikend)" : ""}`,
    );
    l.push(`Datum: ${datum || "nije izabran"}`);
    l.push(`Osobe: ${osobe}`);
    if (djeca > 0) l.push(`Djeca (6–12 god.): ${djeca}`);
    l.push(
      `Dodatno (na upit): ${
        activeDodaci.length ? activeDodaci.map((d) => d.naziv).join(", ") : "—"
      }`,
    );
    if (ishrana) l.push(`Posebna ishrana: ${ishrana}`);
    l.push(`Procjena: ${total}€`);
    if (ime) l.push(`Ime: ${ime}`);
    if (telefon) l.push(`Telefon: ${telefon}`);
    if (email) l.push(`Email: ${email}`);

    const tail: string[] = [];
    if (utm.utm_source || utm.utm_medium)
      tail.push(`Izvor: ${utm.utm_source || "-"}/${utm.utm_medium || "-"}`);
    if (utm.utm_campaign) tail.push(`Kampanja: ${utm.utm_campaign}`);
    if (utm.utm_term) tail.push(`Term: ${utm.utm_term}`);
    if (utm.utm_content) tail.push(`Sadržaj: ${utm.utm_content}`);
    if (utm.gclid) tail.push(`gclid: ${utm.gclid}`);
    if (utm.referrer) tail.push(`Referrer: ${utm.referrer}`);
    if (utm.landing_page) tail.push(`Landing: ${utm.landing_page}`);
    if (tail.length) {
      l.push("—");
      l.push(...tail);
    }
    return l.join("\n");
  }, [
    tour,
    lunch,
    weekend,
    datum,
    osobe,
    djeca,
    activeDodaci,
    ishrana,
    total,
    ime,
    telefon,
    email,
    utm,
  ]);

  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(poruka)}`;

  const toggleDodatak = (id: string) =>
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));

  const canSubmit = Boolean(ime.trim() && telefon.trim() && email.trim() && datum);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "loading") return;

    setStatus("loading");
    const result = await submitToFormspree({
      tip: "Rezervacija",
      _subject: `KONAK — Rezervacija: ${tour.naziv}`,
      _gotcha: gotcha,
      email: email.trim(),
      ime: ime.trim(),
      telefon: telefon.trim(),
      tura: tour.naziv,
      tura_id: tour.id,
      datum,
      osobe,
      djeca,
      rucak:
        tour.id === "r1" ? (lunch ? "sa ručkom" : "bez ručka") : "n/a",
      vikend: weekend ? "da" : "ne",
      cijena_po_osobi: perPerson,
      procjena_ukupno: `${total}€`,
      dodatne_aktivnosti: activeDodaci.length
        ? activeDodaci.map((d) => d.naziv).join(", ")
        : "—",
      posebna_ishrana: ishrana.trim() || "—",
      poruka_sažetak: poruka,
      ...utm,
    });

    setStatus(result.ok ? "success" : "error");
  }

  const stepLabel =
    "mb-4 inline-flex items-center gap-2.5 font-display text-lg font-bold text-pine";
  const stepNum =
    "flex h-7 w-7 items-center justify-center rounded-full bg-pine font-sans text-sm font-bold text-white";
  const cardCls = "rounded-card-lg border border-line bg-surface p-6 sm:p-7";
  const inputCls =
    "w-full rounded-input border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink outline-none focus:border-teal";

  return (
    <div className="kon-calc">
      {/* LIJEVO — koraci */}
      <div className="flex flex-col gap-5">
        {/* Korak 1 — tura */}
        <div className={cardCls}>
          <h2 className={stepLabel}>
            <span className={stepNum}>1</span> Izaberi turu
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TOURS.map((t) => {
              const active = t.id === tourId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTourId(t.id)}
                  className={`rounded-card border-2 p-4 text-left transition-colors ${
                    active
                      ? "border-teal bg-mint-surface"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <span className="block font-display text-base font-bold text-ink">
                    {t.naziv}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs text-muted">
                    {t.kratko} · od {t.wd}€
                  </span>
                </button>
              );
            })}
          </div>

          {/* Jednodnevni — ručak toggle */}
          {tour.id === "r1" && (
            <label className="mt-4 flex cursor-pointer items-center justify-between rounded-card border border-line bg-surface-warm px-4 py-3">
              <span className="font-sans text-sm font-semibold text-ink">
                Sa ručkom (domaća kuhinja)
                <span className="ml-2 font-normal text-muted">
                  +15€ sa ručkom · 50€ → 65€ (vikend 60€ → 75€)
                </span>
              </span>
              <input
                type="checkbox"
                checked={lunch}
                onChange={(e) => setLunch(e.target.checked)}
                className="h-5 w-5 accent-teal"
              />
            </label>
          )}
        </div>

        {/* Korak 2 — datum i osobe */}
        <div className={cardCls}>
          <h2 className={stepLabel}>
            <span className={stepNum}>2</span> Datum i broj osoba
          </h2>
          <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
            <div className="min-w-[220px] flex-1">
              <span className="mb-2 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Datum dolaska
              </span>
              <input
                type="date"
                value={datum}
                min="2026-05-01"
                max="2026-10-31"
                onChange={(e) => setDatum(e.target.value)}
                className={inputCls}
              />
            </div>
            <Stepper value={osobe} min={1} max={60} onChange={setOsobe} label="Osobe" />
            <Stepper
              value={djeca}
              min={0}
              max={30}
              onChange={setDjeca}
              label="Djeca 6–12"
            />
          </div>

          {weekend && (
            <p className="mt-4 rounded-input border border-amber/40 bg-amber-light/25 px-4 py-3 font-sans text-sm font-semibold text-ink">
              Izabran je vikend — primjenjuje se vikend cijena ({perPerson}€ / os.).
            </p>
          )}
        </div>

        {/* Korak 3 — dodatne aktivnosti */}
        <div className={cardCls}>
          <h2 className={stepLabel}>
            <span className={stepNum}>3</span> Dodaj aktivnosti
            <span className="font-sans text-sm font-normal text-muted">
              opciono · {tc("onRequest")}
            </span>
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {DODACI.map((d) => {
              const active = Boolean(addons[d.id]);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleDodatak(d.id)}
                  className={`rounded-card border-2 p-4 text-left transition-colors ${
                    active
                      ? "border-teal bg-mint-surface"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <span className="block font-sans text-sm font-bold text-ink">
                    {d.naziv}
                  </span>
                  <span className="mt-0.5 block font-sans text-xs text-muted">
                    {d.sub === "na upit" ? tc("onRequest") : d.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Korak 4 — posebna ishrana */}
        <div className={cardCls}>
          <h2 className={stepLabel}>
            <span className={stepNum}>4</span> Posebna ishrana u ekipi?
          </h2>
          <input
            type="text"
            value={ishrana}
            onChange={(e) => setIshrana(e.target.value)}
            placeholder={t("placeholderDiet")}
            className={inputCls}
          />
        </div>
      </div>

      {/* DESNO — sažetak + forma (tamna sticky kartica) */}
      <aside className="kon-calc-side">
        <form
          onSubmit={onSubmit}
          noValidate
          className="rounded-card-lg bg-ink p-7 text-on-dark"
        >
          <div
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="rez-gotcha">{t("honeypot")}</label>
            <input
              id="rez-gotcha"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={gotcha}
              onChange={(e) => setGotcha(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-bold text-white">
              Tvoja avantura
            </h2>
            <span
              className={`rounded-pill px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.08em] ${
                weekend ? "bg-amber text-ink" : "bg-teal text-white"
              }`}
            >
              {weekend ? "Vikend" : "Radni dan"}
            </span>
          </div>

          <div className="my-5 h-px bg-white/12" />

          <ul className="flex flex-col gap-3 font-sans text-sm">
            <li className="flex items-start justify-between gap-3">
              <span className="text-on-dark-muted">
                {tour.naziv}
                {tour.id === "r1" ? (lunch ? " · sa ručkom" : " · bez ručka") : ""} ×{" "}
                {osobe} os.
              </span>
              <span className="shrink-0 font-semibold text-white">
                {perPerson * osobe}€
              </span>
            </li>
            {djeca > 0 && (
              <li className="flex items-start justify-between gap-3">
                <span className="text-on-dark-muted">
                  Djeca 6–12 (50%) × {djeca}
                </span>
                <span className="shrink-0 font-semibold text-white">
                  {(perPerson / 2) * djeca}€
                </span>
              </li>
            )}
            {activeDodaci.map((d) => (
              <li key={d.id} className="flex items-start justify-between gap-3">
                <span className="text-on-dark-muted">{d.naziv}</span>
                <span className="shrink-0 font-semibold text-amber-light">
                  {tc("onRequest")}
                </span>
              </li>
            ))}
          </ul>

          <div className="my-5 h-px bg-white/12" />

          <div className="flex items-baseline justify-between">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-on-dark-muted">
              Ukupno (procjena)
            </span>
            <span className="font-display text-4xl font-extrabold text-teal-light">
              {total}€
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <input
              type="text"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              placeholder={t("fullName")}
              required
              className="w-full rounded-input border border-white/15 bg-white/5 px-4 py-3 font-sans text-[15px] text-white placeholder:text-on-dark-muted outline-none focus:border-teal-light"
            />
            <input
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder={t("phoneWhatsapp")}
              required
              className="w-full rounded-input border border-white/15 bg-white/5 px-4 py-3 font-sans text-[15px] text-white placeholder:text-on-dark-muted outline-none focus:border-teal-light"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("email")}
              required
              className="w-full rounded-input border border-white/15 bg-white/5 px-4 py-3 font-sans text-[15px] text-white placeholder:text-on-dark-muted outline-none focus:border-teal-light"
            />
          </div>

          {status === "success" && (
            <p
              role="status"
              className="mt-4 rounded-input border border-teal/40 bg-teal/15 px-4 py-3 font-sans text-sm font-semibold text-teal-light"
            >
              {t("success")}
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="mt-4 rounded-input border border-terracotta/50 bg-terracotta/20 px-4 py-3 font-sans text-sm font-semibold text-white"
            >
              {t("error")}
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2.5">
            <CtaButton
              type="submit"
              variant="primary"
              className="w-full"
              disabled={!canSubmit || status === "loading"}
            >
              {status === "loading" ? t("submitting") : t("submit")}
            </CtaButton>
            <CtaButton href={waHref} variant="ghost" className="w-full">
              {t("whatsapp")}
            </CtaButton>
          </div>

          {!canSubmit && (
            <p className="mt-3 font-sans text-xs text-on-dark-muted">
              {t("bookingHint")}
            </p>
          )}

          <p className="mt-4 font-sans text-xs leading-relaxed text-on-dark-muted">
            * Okvirna cijena. Djeca do 6 god. besplatno, 6–12 god. 50%. Tačan termin
            i ponudu potvrđujemo nakon upita. Pišite nam i na{" "}
            <span className="text-on-dark">{CAMP_EMAIL}</span>.
          </p>
        </form>
      </aside>
    </div>
  );
}
