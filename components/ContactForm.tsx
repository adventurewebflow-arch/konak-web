"use client";

import { useEffect, useMemo, useState } from "react";
import { CtaButton } from "./CtaButton";

const WHATSAPP_NUM = "38765848110";
const EMAIL = "konakraftingkamp@gmail.com";

const TEME = [
  "Upit: Rafting tura",
  "Upit: Smeštaj / auto kamp",
  "Upit: Aktivnosti / izleti",
  "Upit: Grupa / team building",
  "Ostalo",
] as const;

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

export function ContactForm() {
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [tema, setTema] = useState<string>(TEME[0]);
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
    l.push("*KONAK — Upit sa sajta*");
    l.push(`Tema: ${tema}`);
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
  }, [tema, ime, telefon, email, poruka, utm]);

  const waHref = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(tekst)}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Upit sa sajta — ${tema}`,
  )}&body=${encodeURIComponent(tekst)}`;

  const inputCls =
    "w-full rounded-input border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink outline-none focus:border-teal";
  const labelCls =
    "mb-2 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted";

  const canSend = ime.trim() && telefon.trim() && tema;

  return (
    <div className="rounded-card-lg border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-ink">Pošaljite upit</h2>
      <p className="mt-2 font-sans text-sm text-text-secondary">
        Popunite i šaljemo na WhatsApp ili e-mail — sa svim detaljima.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="kontakt-ime" className={labelCls}>
            Ime i prezime
          </label>
          <input
            id="kontakt-ime"
            type="text"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="kontakt-telefon" className={labelCls}>
            Telefon
          </label>
          <input
            id="kontakt-telefon"
            type="tel"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="kontakt-email" className={labelCls}>
            Email (opciono)
          </label>
          <input
            id="kontakt-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="kontakt-tema" className={labelCls}>
            Tema
          </label>
          <select
            id="kontakt-tema"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className={inputCls}
          >
            {TEME.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="kontakt-poruka" className={labelCls}>
            Poruka
          </label>
          <textarea
            id="kontakt-poruka"
            value={poruka}
            onChange={(e) => setPoruka(e.target.value)}
            rows={5}
            placeholder="Vaša poruka — broj osoba, željeni termin, pitanja..."
            className={`${inputCls} resize-y`}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        {canSend ? (
          <>
            <CtaButton href={waHref} variant="primary" className="w-full" arrow>
              Pošalji na WhatsApp
            </CtaButton>
            <CtaButton href={mailHref} variant="secondary" className="w-full">
              Ili pošalji e-mailom
            </CtaButton>
          </>
        ) : (
          <>
            <CtaButton variant="primary" className="w-full cursor-not-allowed opacity-50" aria-disabled arrow>
              Pošalji na WhatsApp
            </CtaButton>
            <CtaButton variant="secondary" className="w-full cursor-not-allowed opacity-50" aria-disabled>
              Ili pošalji e-mailom
            </CtaButton>
          </>
        )}
      </div>

      {!canSend && (
        <p className="mt-3 font-sans text-xs text-muted">
          Popunite ime, telefon i temu upita.
        </p>
      )}

      {Object.entries(utm).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} readOnly />
      ))}
    </div>
  );
}
