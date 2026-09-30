"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: string;
}

/** Tarjeta con inclinación 3D y foco de luz que sigue al cursor (3D Card + Magic Card). */
export function TiltCard({ children, className, maxTilt = 10, glow = "#3df2e0" }: TiltCardProps) {
  const rx = useSpring(0, { stiffness: 200, damping: 18 });
  const ry = useSpring(0, { stiffness: 200, damping: 18 });
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, ${glow}2e, transparent 70%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * maxTilt * 2);
    rx.set(-(py - 0.5) * maxTilt * 2);
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
    mx.set(-300);
    my.set(-300);
  }

  return (
    <div className="h-full [perspective:1000px]">
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={cn(
          "relative h-full rounded-2xl border border-line bg-panel/80 backdrop-blur-sm",
          className,
        )}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: spotlight }}
        />
        <div className="relative h-full [transform:translateZ(30px)]">{children}</div>
      </motion.div>
    </div>
  );
}
