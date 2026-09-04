"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Coordinated pointer spotlight for `.glow-border` children — React port of
 * coalios `data-spotlight="both"`: a fixed ambient circle (`.spotlight-ambient`,
 * coalshift blue) plus the border glow on the nearest cards, driven by the
 * same pointer position/proximity math per `requestAnimationFrame` tick. Own
 * ambient element per instance, created/removed with this component. Disabled
 * for coarse pointers and `prefers-reduced-motion`.
 */
export default function SpotlightGroup({
  children,
  className = "",
  radius = 220,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  /** Render element — use "ul" when the group is itself a list. */
  as?: "div" | "ul";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const proximity = radius * 0.5;
    const fade = radius * 0.85;
    let frame = 0;

    // One ambient circle per group instance, sized to this group's radius.
    const ambient = document.createElement("div");
    ambient.className = "spotlight-ambient";
    ambient.setAttribute("aria-hidden", "true");
    ambient.style.width = `${radius * 2}px`;
    ambient.style.height = `${radius * 2}px`;
    document.body.appendChild(ambient);

    const cards = () =>
      Array.from(root.querySelectorAll<HTMLElement>(".glow-border"));

    const clear = () => {
      for (const card of cards()) card.style.setProperty("--glow-intensity", "0");
      ambient.style.opacity = "0";
    };

    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Reference `isInside` check (magic-bento.js): only the group the
        // pointer is actually over may show its ambient/border response.
        const bounds = root.getBoundingClientRect();
        const isInside =
          e.clientX >= bounds.left &&
          e.clientX <= bounds.right &&
          e.clientY >= bounds.top &&
          e.clientY <= bounds.bottom;
        if (!isInside) {
          clear();
          return;
        }

        let minDistance = Infinity;
        for (const card of cards()) {
          const r = card.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dist = Math.max(
            0,
            Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2,
          );
          minDistance = Math.min(minDistance, dist);
          let intensity = 0;
          if (dist <= proximity) intensity = 1;
          else if (dist <= fade) intensity = (fade - dist) / (fade - proximity);
          card.style.setProperty("--glow-x", `${x}px`);
          card.style.setProperty("--glow-y", `${y}px`);
          card.style.setProperty("--glow-radius", `${radius}px`);
          card.style.setProperty("--glow-intensity", intensity.toFixed(2));
        }

        // Same fade curve as the cards — ambient tracks the strongest one.
        let ambientIntensity = 0;
        if (minDistance <= proximity) ambientIntensity = 1;
        else if (minDistance <= fade) {
          ambientIntensity = (fade - minDistance) / (fade - proximity);
        }
        ambient.style.left = `${e.clientX}px`;
        ambient.style.top = `${e.clientY}px`;
        ambient.style.opacity = ambientIntensity.toFixed(2);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", clear);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", clear);
      ambient.remove();
    };
  }, [radius]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
