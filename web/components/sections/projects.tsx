"use client";

import { useRef } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { HyperText } from "@/components/magicui/hyper-text";
import { TiltCard } from "@/components/magicui/tilt-card";
import { Icon } from "@/components/icons";
import { proyectos } from "@/lib/data";

// Alinea la primera tarjeta con el contenedor de 72rem de las demás secciones.
const GUTTER = "max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))";

export function Projects() {
  const track = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 420), behavior: "smooth" });
  }

  return (
    <section id="proyectos" className="relative py-28">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-cyan">02 · Vitrina 2.5D</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            <HyperText>Proyectos</HyperText>
          </h2>
          <p className="mt-4 max-w-xl text-dim">Pasá el cursor sobre una tarjeta para ver un fragmento del código.</p>
        </BlurFade>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Proyecto anterior" : "Proyecto siguiente"}
              className="flex size-11 items-center justify-center rounded-full border border-line text-dim transition hover:border-cyan hover:text-cyan"
            >
              <Icon name={d < 0 ? "arrowLeft" : "arrowRight"} className="size-5" />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8 [scrollbar-width:none]"
        style={{ paddingInline: GUTTER, scrollPaddingInline: GUTTER }}
      >
        {proyectos.map((p, i) => (
          <BlurFade key={p.titulo} delay={i * 0.1} className="w-[85vw] max-w-[400px] shrink-0 snap-center sm:snap-start">
            <TiltCard glow={p.color} className="group flex flex-col">
              <div className="relative h-44 overflow-hidden rounded-t-2xl border-b border-line bg-void">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${p.color}40, transparent 60%), radial-gradient(circle at 80% 80%, #ff3dcb30, transparent 55%)`,
                  }}
                />
                <span className="absolute left-5 top-4 font-mono text-5xl font-bold text-white/10 transition-opacity duration-500 group-hover:opacity-0">
                  0{i + 1}
                </span>
                <pre className="absolute inset-0 translate-y-4 overflow-hidden p-5 font-mono text-[12px] leading-relaxed opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100">
                  <code style={{ color: p.color }}>{p.snippet}</code>
                </pre>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold">{p.titulo}</h3>
                <p className="mt-2 flex-1 text-sm text-dim">{p.descripcion}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border px-2.5 py-0.5 font-mono text-[11px]" style={{ borderColor: `${p.color}44`, color: p.color }}>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-5 text-sm">
                  {p.enlaces.map((e) => (
                    <a key={e.href} href={e.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-ink hover:text-cyan">
                      <Icon name={e.icon} className="size-4" /> {e.label}
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
