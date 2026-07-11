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
const MIN_LJUDI = 4;

type Status = "idle" | "loading" | "success" | "error";

export function GroupInquiryForm() {
  const [firma, setFirma] = useState("");
  const [kontakt, setKontakt] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [ljudi, setLjudi] = useState(MIN_LJUDI);
  const [datum, setDatum] = useState("");
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
    l.push("Upit za grupu — Rafting kamp Konak");
    l.push(`Firma / organizacija: ${firma || "—"}`);
    l.push(`Kontakt osoba: ${kontakt || "—"}`);
    l.push(`Telefon: ${telefon || "—"}`);
    if (email) l.push(`Email: ${email}`);
    l.push(`Broj ljudi: ${ljudi}`);
    l.push(`Datum: ${datum || "nije izabran"}`);
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
  }, [firma, kontakt, telefon, email, ljudi, datum, poruka, utm]);

  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(tekst)}`;

  const inputCls =
    "w-full rounded-input border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink outline-none focus:border-teal";
  const labelCls =
    "mb-2 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted";

  const canSend = Boolean(
    firma.trim() &&
      kontakt.trim() &&
      telefon.trim() &&
      email.trim() &&
      datum &&
      ljudi >= MIN_LJUDI,
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend || status === "loading") return;

    setStatus("loading");
    const result = await submitToFormspree({
      tip: "Teambuilding / Grupa",
      _subject: `KONAK — Upit za grupu: ${firma.trim() || kontakt.trim()}`,
      _gotcha: gotcha,
      email: email.trim(),
      firma: firma.trim(),
      kontakt_osoba: kontakt.trim(),
      telefon: telefon.trim(),
      broj_ljudi: ljudi,
      datum,
      poruka: poruka.trim(),
      ...utm,
    });

    setStatus(result.ok ? "success" : "error");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card-lg border border-line bg-surface p-6 sm:p-8" noValidate>
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="grp-gotcha">Ne popunjavajte</label>
        <input
          id="grp-gotcha"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="grp-firma" className={labelCls}>
            Firma / organizacija
          </label>
          <input
            id="grp-firma"
            type="text"
            value={firma}
            onChange={(e) => setFirma(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="grp-kontakt" className={labelCls}>
            Kontakt osoba
          </label>
          <input
            id="grp-kontakt"
            type="text"
            value={kontakt}
            onChange={(e) => setKontakt(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="grp-telefon" className={labelCls}>
            Telefon
          </label>
          <input
            id="grp-telefon"
            type="tel"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="grp-email" className={labelCls}>
            E-mail
          </label>
          <input
            id="grp-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <span className={labelCls}>Broj ljudi (min. {MIN_LJUDI})</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-input border border-line bg-surface-warm text-xl font-bold text-pine transition-colors hover:bg-mint-surface disabled:opacity-40"
              onClick={() => setLjudi((n) => Math.max(MIN_LJUDI, n - 1))}
              disabled={ljudi <= MIN_LJUDI}
              aria-label="Manje ljudi"
            >
              −
            </button>
            <span className="min-w-10 text-center font-display text-2xl font-bold text-ink">
              {ljudi}
            </span>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-input border border-line bg-surface-warm text-xl font-bold text-pine transition-colors hover:bg-mint-surface disabled:opacity-40"
              onClick={() => setLjudi((n) => Math.min(55, n + 1))}
              disabled={ljudi >= 55}
              aria-label="Više ljudi"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="grp-datum" className={labelCls}>
            Datum dolaska
          </label>
          <input
            id="grp-datum"
            type="date"
            value={datum}
            min="2026-05-01"
            max="2026-10-31"
            onChange={(e) => setDatum(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="grp-poruka" className={labelCls}>
            Poruka
          </label>
          <textarea
            id="grp-poruka"
            value={poruka}
            onChange={(e) => setPoruka(e.target.value)}
            rows={4}
            placeholder="Šta vas zanima — rafting, kanjoning, smještaj, posebne potrebe…"
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
          Popunite firmu, kontakt osobu, telefon, e-mail, datum i broj ljudi (min.{" "}
          {MIN_LJUDI}).
        </p>
      )}

      <p className="mt-4 font-sans text-xs text-muted">
        Ili nam pišite na{" "}
        <span className="font-semibold text-body">{CAMP_EMAIL}</span>
      </p>
    </form>
  );
}
