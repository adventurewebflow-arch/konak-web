export const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqgrrpe";
export const CAMP_EMAIL = "konakraftingkamp@gmail.com";

export type FormTip = "Rezervacija" | "Teambuilding / Grupa" | "Kontakt";

export type UtmFields = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  referrer: string;
  landing_page: string;
};

export const EMPTY_UTM: UtmFields = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  gclid: "",
  referrer: "",
  landing_page: "",
};

export function readUtmFromWindow(): UtmFields {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? "",
    utm_medium: p.get("utm_medium") ?? "",
    utm_campaign: p.get("utm_campaign") ?? "",
    utm_term: p.get("utm_term") ?? "",
    utm_content: p.get("utm_content") ?? "",
    gclid: p.get("gclid") ?? "",
    referrer: document.referrer || "",
    landing_page: window.location.href || "",
  };
}

export type FormspreePayload = Record<string, string | number | boolean | undefined> & {
  tip: FormTip;
  _subject: string;
  _gotcha?: string;
  email?: string;
};

export type FormspreeResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; error: string };

/** POST na Formspree. Ako je honeypot popunjen, ne šalje (tihi uspjeh). */
export async function submitToFormspree(
  payload: FormspreePayload,
): Promise<FormspreeResult> {
  if (payload._gotcha && String(payload._gotcha).trim() !== "") {
    return { ok: true, skipped: true };
  }

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        _gotcha: "",
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}

export const FORM_SUCCESS_MSG =
  "Hvala! Upit je poslat. Javljamo se u najkraćem roku.";
/** @deprecated Use Forms.success / Forms.error via next-intl */
export const FORM_ERROR_MSG =
  "Nešto nije prošlo. Pokušajte ponovo ili nam pišite na WhatsApp.";
