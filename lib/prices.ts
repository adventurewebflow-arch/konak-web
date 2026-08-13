/** Sentinel u podacima — prikaz ide preko Common.onRequest. */
export const ON_REQUEST_PRICE = "na upit";
export const TRODNEVNI_WEEKDAY = 140;

/** Trodnevni aranžman — vikend, grupni popust po osobi. */
export const TRODNEVNI_WEEKEND = {
  two: 170,
  three: 160,
  fourPlus: 150,
} as const;

export function eur(n: number): string {
  return `${n}€`;
}

/** Vikend cijena po osobi za trodnevni, prema broju plaćajućih (odrasli + djeca 6–12). */
export function trodnevniWeekendPerPerson(payingPeople: number): number {
  if (payingPeople >= 4) return TRODNEVNI_WEEKEND.fourPlus;
  if (payingPeople === 3) return TRODNEVNI_WEEKEND.three;
  return TRODNEVNI_WEEKEND.two;
}
