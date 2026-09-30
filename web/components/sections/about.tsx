import { BlurFade } from "@/components/magicui/blur-fade";
import { HyperText } from "@/components/magicui/hyper-text";
import { TiltCard } from "@/components/magicui/tilt-card";
import { Icon } from "@/components/icons";
import { areas, BASE, perfil } from "@/lib/data";
import { Terminal } from "./terminal";

export function About() {
  return (
    <section id="quien-soy" className="relative mx-auto max-w-6xl px-4 py-28 sm:px-6">
      <div className="flex flex-col-reverse gap-10 sm:flex-row sm:items-end sm:justify-between">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-magenta">01 · Caja negra</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            <HyperText>Quién soy</HyperText>
          </h2>
          <p className="mt-4 max-w-2xl text-dim">
            Soy {perfil.nombre}. Este es un laboratorio donde conviven tres obsesiones: romper sistemas, construir
            software y diseñar mundos jugables. Interrogá a la terminal o explorá las tarjetas.
          </p>
        </BlurFade>

        <BlurFade delay={0.15} className="w-44 shrink-0 self-center sm:w-52 sm:self-auto">
          <TiltCard glow="#ff3dcb" maxTilt={14} className="overflow-hidden">
            <figure className="scanlines relative">
              <img
                src={`${BASE}/img/perfilBlack.png`}
                alt={`Foto de ${perfil.nombre}`}
                width={375}
                height={500}
                className="block aspect-3/4 w-full rounded-t-2xl object-cover"
              />
              <figcaption className="flex items-center justify-between border-t border-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest">
                <span className="text-dim">expediente</span>
                <span className="flex items-center gap-1.5 text-acid">
                  <span className="size-1.5 animate-blink rounded-full bg-acid" /> activo
                </span>
              </figcaption>
            </figure>
          </TiltCard>
        </BlurFade>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <BlurFade delay={0.1}>
          <Terminal />
        </BlurFade>

        <div className="grid gap-5">
          {areas.map((a, i) => (
            <BlurFade key={a.titulo} delay={0.15 + i * 0.1}>
              <TiltCard glow={a.color} className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{ borderColor: `${a.color}55`, color: a.color, boxShadow: `0 0 24px -6px ${a.color}` }}
                  >
                    <Icon name={a.icono} className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: a.color }}>
                      {a.titulo}
                    </h3>
                    <p className="mt-1 text-sm text-dim">{a.texto}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {a.skills.map((s) => (
                        <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-ink/80">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
