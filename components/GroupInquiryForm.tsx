"use client";

import { useEffect, useMemo, useState } from "react";
import { CtaButton } from "./CtaButton";

const WHATSAPP_NUM = "38765848110";
const EMAIL = "konakraftingkamp@gmail.com";
const MIN_LJUDI = 4;

interface Utm {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  referrer: string;
  landing_page: string;
}

const EMPTY_UTM: Utm = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  gclid: "",
  referrer: "",
  landing_page: "",
};

export function GroupInquiryForm() {
  const [firma, setFirma] = useState("");
  const [kontakt, setKontakt] = useState("");
  const [telefon, setTelefon] = useState("");
  const [ljudi, setLjudi] = useState(MIN_LJUDI);
  const [datum, setDatum] = useState("");
  const [poruka, setPoruka] = useState("");
  const [utm, setUtm] = useState<Utm>(EMPTY_UTM);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUtm({
      utm_source: p.get("utm_source") ?? "",
      utm_medium: p.get("utm_medium") ?? "",
      utm_campaign: p.get("utm_campaign") ?? "",
      utm_term: p.get("utm_term") ?? "",
      utm_content: p.get("utm_content") ?? "",
      gclid: p.get("gclid") ?? "",
      referrer: document.referrer || "",
      landing_page: window.location.href || "",
    });
  }, []);

  const tekst = useMemo(() => {
    const l: string[] = [];
    l.push("Upit za grupu — Rafting kamp Konak");
    l.push(`Firma / organizacija: ${firma || "—"}`);
    l.push(`Kontakt osoba: ${kontakt || "—"}`);
    l.push(`Telefon: ${telefon || "—"}`);
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
  }, [firma, kontakt, telefon, ljudi, datum, poruka, utm]);

  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(tekst)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Upit grupe: ${firma || kontakt || "Teambuilding"}`,
  )}&body=${encodeURIComponent(tekst)}`;

  const inputCls =
    "w-full rounded-input border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink outline-none focus:border-teal";
  const labelCls =
    "mb-2 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted";

  const canSend = firma.trim() && kontakt.trim() && telefon.trim() && datum && ljudi >= MIN_LJUDI;

  return (
    <div className="rounded-card-lg border border-line bg-surface p-6 sm:p-8">
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
        <div className="sm:col-span-2">
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

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        {canSend ? (
          <>
            <CtaButton href={waHref} variant="primary" className="w-full sm:flex-1">
              Pošalji na WhatsApp
            </CtaButton>
            <CtaButton href={mailHref} variant="secondary" className="w-full sm:flex-1">
              Ili pošalji e-mailom
            </CtaButton>
          </>
        ) : (
          <>
            <CtaButton variant="primary" className="w-full cursor-not-allowed opacity-50 sm:flex-1" aria-disabled>
              Pošalji na WhatsApp
            </CtaButton>
            <CtaButton variant="secondary" className="w-full cursor-not-allowed opacity-50 sm:flex-1" aria-disabled>
              Ili pošalji e-mailom
            </CtaButton>
          </>
        )}
      </div>

      {!canSend && (
        <p className="mt-3 font-sans text-xs text-muted">
          Popunite firmu, kontakt osobu, telefon, datum i broj ljudi (min. {MIN_LJUDI}).
        </p>
      )}

      {Object.entries(utm).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} readOnly />
      ))}
    </div>
  );
}
