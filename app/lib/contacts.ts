/**
 * Approved contact people (docs/content-and-seo.md). Single source for the
 * contact section and the FAQ mention. The obsolete Miroslav Adamec details
 * must not appear anywhere in visible copy, labels or metadata.
 */
export type Contact = {
  id: string;
  name: string;
  role: string;
  phoneDisplay: string;
  phoneHref: string;
  emailDisplay: string;
  emailHref: string;
  /** Registry key for <ResponsiveImage>; original preserved under public/img/. */
  portraitSrc: string;
};

export const CONTACTS: Contact[] = [
  {
    id: "martina-adamcova",
    name: "Martina Adamcová",
    role: "Obchod a produkt",
    phoneDisplay: "+420 728 918 562",
    phoneHref: "tel:+420728918562",
    emailDisplay: "martina.adamcova@coalsoft.cz",
    emailHref: "mailto:martina.adamcova@coalsoft.cz",
    portraitSrc: "/img/martina-adamcova.png",
  },
  {
    id: "sarka-melisova",
    name: "Šárka Melišová",
    role: "Podpora",
    phoneDisplay: "+420 702 244 296",
    phoneHref: "tel:+420702244296",
    emailDisplay: "sarka.melisova@coalsoft.cz",
    emailHref: "mailto:sarka.melisova@coalsoft.cz",
    portraitSrc: "/img/sarka-melisova.png",
  },
];
