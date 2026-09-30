import { BlurFade } from "@/components/magicui/blur-fade";
import { HyperText } from "@/components/magicui/hyper-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Icon, type IconName } from "@/components/icons";
import { perfil } from "@/lib/data";
import { NodeNetwork } from "./node-network";

const PRINCIPIOS = [
  "Construir herramientas que hagan la tecnología más segura y más humana.",
  "Diseñar juegos que enseñen, sorprendan y se queden en la memoria.",
  "Seguir aprendiendo en el borde entre el código, la seguridad y el arte.",
];

const REDES: { href: string; label: string; icon: IconName }[] = [
  { href: perfil.github, label: "GitHub", icon: "github" },
  { href: perfil.linkedin, label: "LinkedIn", icon: "linkedin" },
  { href: `mailto:${perfil.email}`, label: "Email", icon: "mail" },
];

export function Manifesto() {
  return (
    <section id="manifiesto" className="relative overflow-hidden border-t border-line py-28">
      <NodeNetwork className="absolute inset-0 size-full" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-void)_75%)]" />

      <div className="pointer-events-none relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <BlurFade>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-acid">03 · Manifiesto</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
            <HyperText>Lo que quiero hacer</HyperText>
          </h2>
        </BlurFade>

        <ol className="mt-12 space-y-6 text-left">
          {PRINCIPIOS.map((p, i) => (
            <BlurFade key={p} delay={0.1 + i * 0.12}>
              <li className="flex gap-5 rounded-xl border border-line bg-void/60 p-5 backdrop-blur-sm">
                <span className="font-mono text-sm text-magenta">0{i + 1}</span>
                <span className="text-lg text-ink/90">{p}</span>
              </li>
            </BlurFade>
          ))}
        </ol>

        <div id="contacto" className="scroll-mt-24 pt-20">
          <BlurFade delay={0.1}>
            <h3 className="text-2xl font-semibold sm:text-3xl">¿Construimos algo juntos?</h3>
            <p className="mx-auto mt-3 max-w-lg text-dim">
              Siempre abierto a proyectos nuevos, ideas raras y oportunidades para sumarme a tu visión.
            </p>
            <div className="pointer-events-auto mt-8 flex justify-center">
              <ShimmerButton href={`mailto:${perfil.email}`} className="font-mono text-sm uppercase tracking-widest">
                <Icon name="mail" className="size-4" /> Escribime
              </ShimmerButton>
            </div>
            <ul className="pointer-events-auto mt-8 flex justify-center gap-4">
              {REDES.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target={r.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={r.label}
                    className="flex size-12 items-center justify-center rounded-full border border-line bg-void/70 text-dim transition hover:-translate-y-1 hover:border-cyan hover:text-cyan"
                  >
                    <Icon name={r.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
