/**
 * Canonical monthly pricing (docs/content-and-seo.md). Single source so every layout
 * agrees. The owner removed annual pricing on 2 September 2026 — there is no
 * billing-period switch, no annual amount and no individual annual inquiry.
 * Plans differ only by employee count; no per-tier feature list, no
 * per-employee surcharge.
 */
import { REGISTER_URL } from "./links";

export type PricingPlan = {
  id: string;
  name: string;
  employees: string;
  /** Monthly amount, or "Zdarma". */
  price: string;
  /** true for paid tiers → show the "za měsíc, bez DPH" unit + the trial helper. */
  paid: boolean;
  cta: { label: string; href: string };
  featured?: boolean;
};

/** Shown below every paid-tier button (outside it), per docs/content-and-seo.md. */
export const PAID_TRIAL_HELPER = "Prvních 14 dní zdarma.";

export const VAT_NOTE = "Všechny ceny jsou uvedeny bez DPH.";

export const PRICING_INTRO =
  "Vyberte si tarif podle počtu zaměstnanců. Funkce jsou stejné ve všech tarifech.";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    employees: "0–5 zaměstnanců",
    price: "Zdarma",
    paid: false,
    cta: { label: "Začít zdarma", href: REGISTER_URL },
  },
  {
    id: "start",
    name: "Start",
    employees: "6–20 zaměstnanců",
    price: "1 130 Kč",
    paid: true,
    cta: { label: "Vyzkoušet", href: REGISTER_URL },
  },
  {
    id: "lite",
    name: "Lite",
    employees: "21–50 zaměstnanců",
    price: "2 600 Kč",
    paid: true,
    cta: { label: "Vyzkoušet", href: REGISTER_URL },
    featured: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    employees: "51–80 zaměstnanců",
    price: "4 400 Kč",
    paid: true,
    cta: { label: "Vyzkoušet", href: REGISTER_URL },
  },
  {
    id: "pro",
    name: "Pro",
    employees: "81 a více zaměstnanců",
    price: "6 000 Kč",
    paid: true,
    cta: { label: "Vyzkoušet", href: REGISTER_URL },
  },
];
