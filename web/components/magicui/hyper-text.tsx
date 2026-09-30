"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789#$%&@<>/";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
}

/** Texto que se "descifra" letra por letra al verse o al pasar el mouse (Hyper Text de Magic UI). */
export function HyperText({ children, className, duration = 900 }: HyperTextProps) {
  const [display, setDisplay] = useState(children);
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const scramble = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const revealed = Math.floor(progress * children.length);
      setDisplay(
        [...children]
          .map((ch, i) =>
            ch === " " || i < revealed ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [children, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [scramble]);

  return (
    <span ref={ref} aria-label={children} onMouseEnter={scramble} className={cn("inline-block", className)}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
