"use client";

import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { HyperText } from "@/components/magicui/hyper-text";
import { WordRotate } from "@/components/magicui/word-rotate";
import { perfil, secciones } from "@/lib/data";

const TesseractScene = dynamic(() => import("@/components/three/tesseract-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-xs text-dim">
      cargando hiperespacio…
    </div>
  ),
});

export function Hero() {
  const [unfolded, setUnfolded] = useState(false);

  return (
    <section id="inicio" className="relative flex min-h-svh flex-col overflow-hidden pt-14">
      <div aria-hidden className="grid-bg absolute inset-0" />

      {/* Escenario del teseracto: ocupa el espacio libre sobre el título, así nada se superpone */}
      <div className="relative min-h-[300px] flex-1">
        <div className="absolute inset-0">
          <TesseractScene unfolded={unfolded} onToggle={() => setUnfolded((u) => !u)} />
        </div>

        {/* Al desplegar el teseracto, las secciones salen hacia las cuatro esquinas del escenario */}
        <AnimatePresence>
          {unfolded && (
            <nav aria-label="Secciones" className="pointer-events-none absolute inset-0">
              {secciones.map((s, i) => {
                const sx = i % 2 === 0 ? -1 : 1;
                const sy = i < 2 ? -1 : 1;
                const r = "min(30vw, 340px)";
                return (
                  <div
                    key={s.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `calc(50% + ${sx} * ${r})`, top: `calc(50% + ${sy} * 30%)` }}
                  >
                    <motion.a
                      href={`#${s.id}`}
                      initial={{ opacity: 0, scale: 0.3, x: `calc(${-sx} * ${r})` }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.3, x: `calc(${-sx} * ${r})` }}
                      transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.05 }}
                      className="pointer-events-auto block whitespace-nowrap rounded-full border border-cyan/40 bg-void/70 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan backdrop-blur hover:border-magenta hover:text-magenta sm:text-sm"
                    >
                      {s.label}
                    </motion.a>
                  </div>
                );
              })}
            </nav>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none relative z-10 flex flex-col items-center px-4 pb-14 text-center sm:pb-16">
        <BlurFade delay={0.1}>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-dim">{perfil.nombre}</p>
        </BlurFade>
        <BlurFade delay={0.25}>
          <h1 className="glitch-text mt-3 text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
            <HyperText duration={1400}>PERCEPCIÓN</HyperText>
          </h1>
        </BlurFade>
        <BlurFade delay={0.45}>
          <p className="mt-4 text-lg text-ink/90 sm:text-2xl">
            Construyo{" "}
            <WordRotate words={[...perfil.lema]} className="font-semibold text-cyan" />
          </p>
        </BlurFade>
        <BlurFade delay={0.6}>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-dim">
            {unfolded ? "tocá de nuevo para plegarlo" : "tocá el teseracto para desplegarlo"}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
