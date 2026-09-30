import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Projects } from "@/components/sections/projects";
import { perfil, secciones } from "@/lib/data";

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-void/60 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#inicio" className="glitch-text font-mono text-lg font-bold tracking-widest">
            BF
          </a>
          <ul className="flex gap-4 font-mono text-[11px] uppercase tracking-widest text-dim sm:gap-7 sm:text-xs">
            {secciones.map((s) => (
              <li key={s.id} className={s.id === "contacto" ? "hidden sm:block" : undefined}>
                <a href={`#${s.id}`} className="transition hover:text-cyan">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Hero />
        <About />
        <Projects />
        <Manifesto />
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-dim">
        © {new Date().getFullYear()} {perfil.nombre} · Hecho con Next.js y Three.js
      </footer>
    </>
  );
}
