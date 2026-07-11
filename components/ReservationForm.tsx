"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CtaButton } from "./CtaButton";
import {
  CAMP_EMAIL,
  EMPTY_UTM,
  FORM_ERROR_MSG,
  FORM_SUCCESS_MSG,
  readUtmFromWindow,
  submitToFormspree,
  type UtmFields,
} from "@/lib/formspree";

const WHATSAPP_NUM = "38765848110";

const TURE = [
  "Jednodnevni rafting",
  "Dvodnevni aranžman",
  "Trodnevni aranžman",
  "Cijela Tara",
  "Kanjoning Hrčavka",
  "Kanjoning Nevidio",
  "Teambuilding / grupa",
  "Nešto drugo",
] as const;

type Status = "idle" | "loading" | "success" | "error";

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

export function ReservationForm() {
  const [tura, setTura] = useState<string>(TURE[0]);
  const [datum, setDatum] = useState("");
  const [osobe, setOsobe] = useState(2);
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [poruka, setPoruka] = useState("");
  const [gotcha, setGotcha] = useState("");
  const [utm, setUtm] = useState<UtmFields>(EMPTY_UTM);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUtm(readUtmFromWindow());
  }, []);

  const tekst = useMemo(() => {
    const l: string[] = [];
    l.push("Upit — Rafting kamp Konak");
    l.push(`Tura / interesovanje: ${tura}`);
    l.push(`Datum: ${datum || "nije izabran"}`);
    l.push(`Broj osoba: ${osobe}`);
    l.push(`Ime: ${ime || "—"}`);
    l.push(`Telefon: ${telefon || "—"}`);
    if (email) l.push(`Email: ${email}`);
    if (poruka) l.push(`Poruka: ${poruka}`);

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
  }, [tura, datum, osobe, ime, telefon, email, poruka, utm]);

  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(tekst)}`;

  const inputCls =
    "w-full rounded-input border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink outline-none focus:border-teal";
  const labelCls =
    "mb-2 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted";

  const canSend = Boolean(
    tura && datum && osobe >= 1 && ime.trim() && telefon.trim() && email.trim(),
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend || status === "loading") return;

    setStatus("loading");
    const result = await submitToFormspree({
      tip: "Rezervacija",
      _subject: `KONAK — Rezervacija: ${tura}`,
      _gotcha: gotcha,
      email: email.trim(),
      ime: ime.trim(),
      telefon: telefon.trim(),
      tura,
      datum,
      osobe,
      poruka: poruka.trim() || "—",
      ...utm,
    });

    setStatus(result.ok ? "success" : "error");
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto max-w-2xl rounded-card-lg border border-line bg-surface p-6 sm:p-8"
    >
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="rez-gotcha">Ne popunjavajte</label>
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

      <p className="font-sans text-[15px] leading-relaxed text-body sm:text-base">
        Cijene su okvirne. Nakon upita javljamo se u najkraćem roku sa tačnom
        ponudom — za grupe imamo dobar popust.
      </p>

      <div className="mt-8">
        <span className={labelCls}>Šta vas zanima</span>
        <div className="flex flex-wrap gap-2">
          {TURE.map((t) => {
            const active = t === tura;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTura(t)}
                className={`rounded-pill border px-4 py-2 font-sans text-sm font-semibold transition-colors ${
                  active
                    ? "border-teal bg-mint-surface text-teal"
                    : "border-line bg-surface text-body hover:border-line-strong hover:text-teal"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="rez-datum" className={labelCls}>
            Datum dolaska
          </label>
          <input
            id="rez-datum"
            type="date"
            value={datum}
            min="2026-05-01"
            max="2026-10-31"
            onChange={(e) => setDatum(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <Stepper
            value={osobe}
            min={1}
            max={60}
            onChange={setOsobe}
            label="Broj osoba"
          />
        </div>
        <div>
          <label htmlFor="rez-ime" className={labelCls}>
            Ime i prezime
          </label>
          <input
            id="rez-ime"
            type="text"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="rez-telefon" className={labelCls}>
            Telefon
          </label>
          <input
            id="rez-telefon"
            type="tel"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="rez-email" className={labelCls}>
            E-mail
          </label>
          <input
            id="rez-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="rez-poruka" className={labelCls}>
            Poruka
          </label>
          <textarea
            id="rez-poruka"
            value={poruka}
            onChange={(e) => setPoruka(e.target.value)}
            rows={4}
            placeholder="Dodatne želje, posebna ishrana, pitanja…"
            className={`${inputCls} resize-y`}
          />
        </div>
      </div>

      {status === "success" && (
        <p
          role="status"
          className="mt-5 rounded-input border border-mint-border bg-mint-surface px-4 py-3 font-sans text-sm font-semibold text-pine"
        >
          {FORM_SUCCESS_MSG}
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-input border border-terracotta/40 bg-terracotta/10 px-4 py-3 font-sans text-sm font-semibold text-ink"
        >
          {FORM_ERROR_MSG}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <CtaButton
          type="submit"
          variant="primary"
          className="w-full sm:flex-1"
          disabled={!canSend || status === "loading"}
        >
          {status === "loading" ? "Šalje se…" : "Pošalji upit"}
        </CtaButton>
        {canSend ? (
          <CtaButton href={waHref} variant="secondary" className="w-full sm:flex-1">
            Ili pošalji na WhatsApp
          </CtaButton>
        ) : (
          <CtaButton
            variant="secondary"
            className="w-full cursor-not-allowed opacity-50 sm:flex-1"
            aria-disabled
          >
            Ili pošalji na WhatsApp
          </CtaButton>
        )}
      </div>

      {!canSend && (
        <p className="mt-3 font-sans text-xs text-muted">
          Popunite turu, datum, broj osoba, ime, telefon i e-mail.
        </p>
      )}

      <p className="mt-4 font-sans text-xs text-muted">
        Ili nam pišite na{" "}
        <span className="font-semibold text-body">{CAMP_EMAIL}</span>
      </p>
    </form>
  );
}
