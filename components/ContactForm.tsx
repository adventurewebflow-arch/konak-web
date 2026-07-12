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

const TEME = [
  "Upit: Rafting tura",
  "Upit: Smeštaj / auto kamp",
  "Upit: Aktivnosti / izleti",
  "Upit: Grupa / team building",
  "Ostalo",
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("Forms");
  const [ime, setIme] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [tema, setTema] = useState<string>(TEME[0]);
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

  const inputCls =
    "w-full rounded-input border border-line bg-surface px-4 py-3 font-sans text-[15px] text-ink outline-none focus:border-teal";
  const labelCls =
    "mb-2 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-muted";

  const canSend = Boolean(ime.trim() && telefon.trim() && tema && email.trim());

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend || status === "loading") return;

    setStatus("loading");
    const result = await submitToFormspree({
      tip: "Kontakt",
      _subject: `KONAK — Kontakt: ${tema}`,
      _gotcha: gotcha,
      email: email.trim(),
      ime: ime.trim(),
      telefon: telefon.trim(),
      tema,
      poruka: poruka.trim(),
      ...utm,
    });

    setStatus(result.ok ? "success" : "error");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card-lg border border-line bg-surface p-6 sm:p-8"
      noValidate
    >
      <h2 className="font-display text-2xl font-bold text-ink">{t("contactTitle")}</h2>
      <p className="mt-2 font-sans text-sm text-text-secondary">
        {t("contactLead")}
      </p>

      {/* Honeypot */}
      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="kontakt-gotcha">{t("honeypot")}</label>
        <input
          id="kontakt-gotcha"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          value={gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="kontakt-ime" className={labelCls}>
            {t("fullName")}
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
            {t("phone")}
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
            {t("email")}
          </label>
          <input
            id="kontakt-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputCls}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="kontakt-tema" className={labelCls}>
            {t("topic")}
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
            {t("message")}
          </label>
          <textarea
            id="kontakt-poruka"
            value={poruka}
            onChange={(e) => setPoruka(e.target.value)}
            rows={5}
            placeholder={t("placeholderContact")}
            className={`${inputCls} resize-y`}
          />
        </div>
      </div>

      {status === "success" && (
        <p
          role="status"
          className="mt-5 rounded-input border border-mint-border bg-mint-surface px-4 py-3 font-sans text-sm font-semibold text-pine"
        >
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-input border border-terracotta/40 bg-terracotta/10 px-4 py-3 font-sans text-sm font-semibold text-ink"
        >
          {t("error")}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2.5">
        <CtaButton
          type="submit"
          variant="primary"
          className="w-full"
          arrow={status !== "loading"}
          disabled={!canSend || status === "loading"}
        >
          {status === "loading" ? t("submitting") : t("submit")}
        </CtaButton>
        {canSend ? (
          <CtaButton href={waHref} variant="secondary" className="w-full">
            {t("whatsapp")}
          </CtaButton>
        ) : (
          <CtaButton
            variant="secondary"
            className="w-full cursor-not-allowed opacity-50"
            aria-disabled
          >
            {t("whatsapp")}
          </CtaButton>
        )}
      </div>

      {!canSend && (
        <p className="mt-3 font-sans text-xs text-muted">
          {t("contactHint")}
        </p>
      )}

      <p className="mt-4 font-sans text-xs text-muted">
        {t("orEmail")}{" "}
        <span className="font-semibold text-body">{CAMP_EMAIL}</span>
      </p>
    </form>
  );
}
