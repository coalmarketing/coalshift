import type { ReactNode, SVGProps } from "react";

/**
 * Coherent outlined line-icon set (stroke = currentColor), matching the
 * reference's outlined icon language. Used by the key-functions cards, the
 * practical-use browser tabs and the fact chips.
 */
export type LineIconName =
  | "users"
  | "roles"
  | "calendar"
  | "absence"
  | "export"
  | "chart"
  | "coverage"
  | "rules"
  | "id"
  | "leave"
  | "availability"
  | "mail"
  | "clock"
  | "phone"
  | "social"
  | "health"
  | "factory"
  | "restaurant"
  | "hotel"
  | "retail"
  | "plus";

const P: Record<LineIconName, ReactNode> = {
  users: (
    <>
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </>
  ),
  roles: (
    <>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="1.5" />
      <rect x="3" y="15" width="7" height="5" rx="1.5" />
      <rect x="14" y="15" width="7" height="5" rx="1.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" />
      <path d="M9 15l2 2 4-4" />
    </>
  ),
  absence: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" />
      <path d="M10 14l4 4M14 14l-4 4" />
    </>
  ),
  export: (
    <>
      <path d="M14 3v5h5" />
      <path d="M19 8v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7z" />
      <path d="M12 17V9M9 12l3-3 3 3" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l3-4 3 3 5-7" />
    </>
  ),
  coverage: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 5v14M12 5v14M17 5v14" />
      <path d="M8.5 12h2M13.5 9h2" />
    </>
  ),
  rules: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.5" />
      <path d="M14 10h4M14 14h4" />
    </>
  ),
  leave: (
    <>
      <path d="M3 21h18" />
      <path d="M6 21V10l6-4 6 4v11" />
      <path d="M10 21v-5h4v5" />
    </>
  ),
  availability: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  phone: (
    <path d="M15.5 21A12.5 12.5 0 0 1 3 8.5 2.5 2.5 0 0 1 5.5 6h1.8a1 1 0 0 1 1 .76l.7 2.8a1 1 0 0 1-.5 1.1l-1.4.8a11 11 0 0 0 4.6 4.6l.8-1.4a1 1 0 0 1 1.1-.5l2.8.7a1 1 0 0 1 .76 1v1.8A2.5 2.5 0 0 1 15.5 21z" />
  ),
  social: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      <path d="M20 8.5a2.5 2.5 0 1 0-3-2M7 6.5a2.5 2.5 0 1 0-3 2" />
    </>
  ),
  health: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M12 11v5M9.5 13.5h5" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 4V10l6 4V7l6-3v17z" />
      <path d="M3 21h18M7 17h2M13 17h2" />
    </>
  ),
  restaurant: (
    <>
      <path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11" />
      <path d="M17 3c-1.7 0-3 2-3 5s1.3 4 3 4v9" />
    </>
  ),
  hotel: (
    <>
      <path d="M3 20V6M3 12h13a5 5 0 0 1 5 5v3M3 20h18" />
      <circle cx="8" cy="9" r="1.5" />
    </>
  ),
  retail: (
    <>
      <path d="M4 8h16l-1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
};

export default function LineIcon({
  name,
  ...props
}: { name: LineIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {P[name]}
    </svg>
  );
}
