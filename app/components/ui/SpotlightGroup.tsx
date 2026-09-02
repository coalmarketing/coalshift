"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pointer-following blue border glow for `.glow-border` children — a React,
 * border-only adaptation of the reference's magic-bento effect. No ambient
 * document-level element (the reference accesses that unconditionally even in
 * border-only mode). Disabled for coarse pointers and reduced motion (CSS also
 * neutralises it); listeners are cleaned up on unmount.
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

    const cards = () =>
      Array.from(root.querySelectorAll<HTMLElement>(".glow-border"));

    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
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
          let intensity = 0;
          if (dist <= proximity) intensity = 1;
          else if (dist <= fade) intensity = (fade - dist) / (fade - proximity);
          card.style.setProperty("--glow-x", `${x}px`);
          card.style.setProperty("--glow-y", `${y}px`);
          card.style.setProperty("--glow-radius", `${radius}px`);
          card.style.setProperty("--glow-intensity", intensity.toFixed(2));
        }
      });
    };

    const clear = () => {
      for (const card of cards()) card.style.setProperty("--glow-intensity", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", clear);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", clear);
    };
  }, [radius]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
