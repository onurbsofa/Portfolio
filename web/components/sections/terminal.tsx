"use client";

import { useEffect, useRef, useState } from "react";
import { areas, perfil, proyectos } from "@/lib/data";

type Line = { kind: "in" | "out" | "err"; text: string };

const PROMPT = "invitado@caja-negra:~$";

const COMMANDS: Record<string, () => string[]> = {
  ayuda: () => [
    "Comandos disponibles:",
    "  quien        ¿quién está detrás de esto?",
    "  habilidades  lo que hay en la caja",
    "  proyectos    trabajos publicados",
    "  contacto     cómo encontrarme",
    "  limpiar      borrar la pantalla",
  ],
  quien: () => [`${perfil.nombre} — ${perfil.rol}.`, "Me interesa entender cómo funcionan (y cómo fallan) las cosas."],
  habilidades: () => areas.flatMap((a) => [`[${a.titulo}]`, `  ${a.skills.join(" · ")}`]),
  proyectos: () => proyectos.map((p) => `> ${p.titulo} — ${p.tags.join(", ")}`),
  contacto: () => [`email     ${perfil.email}`, `github    ${perfil.github}`, `linkedin  ${perfil.linkedin}`],
  sudo: () => ["Buen intento. Este incidente será reportado. 👁"],
  ls: () => ["quien.txt  habilidades/  proyectos/  contacto.txt  .secreto"],
  "cat .secreto": () => ["La percepción es el primer exploit."],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "CAJA NEGRA v2.0 — laboratorio personal" },
    { kind: "out", text: 'Escribí "ayuda" para ver los comandos.' },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setCursor(-1);
    if (cmd === "limpiar" || cmd === "clear") {
      setLines([]);
      return;
    }
    const handler = COMMANDS[cmd] ?? (cmd.startsWith("sudo") ? COMMANDS.sudo : undefined);
    const out: Line[] = handler
      ? handler().map((text) => ({ kind: "out", text }))
      : [{ kind: "err", text: `comando no encontrado: ${cmd}. Probá "ayuda".` }];
    setLines((l) => [...l, { kind: "in", text: raw }, ...out]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next < 0 ? "" : history[next]);
    }
  }

  return (
    <div
      className="scanlines relative flex h-[420px] flex-col overflow-hidden rounded-2xl border border-line bg-panel font-mono text-sm shadow-[0_0_60px_-20px_#3df2e0]"
      onClick={() => input.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-3 rounded-full bg-magenta/80" />
        <span className="size-3 rounded-full bg-acid/80" />
        <span className="size-3 rounded-full bg-cyan/80" />
        <span className="ml-3 text-xs text-dim">caja-negra — bash</span>
      </div>
      <div ref={scroller} className="flex-1 overflow-y-auto p-4 leading-relaxed">
        {lines.map((l, i) => (
          <p
            key={i}
            className={
              l.kind === "in" ? "text-ink" : l.kind === "err" ? "text-magenta" : "whitespace-pre-wrap text-cyan/85"
            }
          >
            {l.kind === "in" && <span className="text-acid">{PROMPT} </span>}
            {l.text}
          </p>
        ))}
        <div className="flex items-center">
          <span className="shrink-0 text-acid">{PROMPT}&nbsp;</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Comando de la terminal"
            autoComplete="off"
            spellCheck={false}
            className="w-full min-w-0 bg-transparent text-ink caret-cyan outline-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {["ayuda", "quien", "habilidades", "proyectos", "contacto"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              run(c);
            }}
            className="rounded border border-line px-2 py-1 text-xs text-dim transition hover:border-cyan hover:text-cyan"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
