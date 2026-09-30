"use client";

import { Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Line2, LineSegments2 } from "three-stdlib";

type Vec4 = [number, number, number, number];

// 16 vértices del hipercubo: todas las combinaciones de ±1 en 4 dimensiones.
const VERTS: Vec4[] = Array.from({ length: 16 }, (_, i) => [
  i & 1 ? 1 : -1,
  i & 2 ? 1 : -1,
  i & 4 ? 1 : -1,
  i & 8 ? 1 : -1,
]);

// 32 aristas: pares de vértices que difieren en exactamente una coordenada.
const EDGES: [number, number][] = [];
for (let a = 0; a < 16; a++) {
  for (let bit = 0; bit < 4; bit++) {
    const b = a ^ (1 << bit);
    if (a < b) EDGES.push([a, b]);
  }
}

const CYAN = new THREE.Color("#3df2e0");
const MAGENTA = new THREE.Color("#ff3dcb");
const PROJ_DIST = 3; // distancia de la "cámara 4D"
const FLOOR_Y = -2.4;

function rotate(p: Vec4, i: number, j: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const a = p[i];
  const b = p[j];
  p[i] = a * c - b * s;
  p[j] = a * s + b * c;
}

// Posiciones iniciales (sólo para crear la geometría; se reescriben en cada frame).
const INITIAL_POINTS = EDGES.flatMap(() => [new THREE.Vector3(), new THREE.Vector3()]);
const INITIAL_COLORS = EDGES.flatMap(() => [
  [1, 1, 1] as [number, number, number],
  [1, 1, 1] as [number, number, number],
]);

function writeSegments(line: Line2 | LineSegments2 | null, data: Float32Array, attr: "instanceStart" | "instanceColorStart") {
  const buf = line?.geometry.getAttribute(attr) as THREE.InterleavedBufferAttribute | undefined;
  if (!buf) return;
  (buf.data.array as Float32Array).set(data);
  buf.data.needsUpdate = true;
}

function Tesseract({ unfolded, onToggle }: { unfolded: boolean; onToggle: () => void }) {
  const group = useRef<THREE.Group>(null);
  const edgeLine = useRef<Line2 | LineSegments2>(null);
  const shadowLine = useRef<Line2 | LineSegments2>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const state = useMemo(
    () => ({
      unfold: 0,
      distortion: 0,
      lastPointer: new THREE.Vector2(),
      hover: 0,
      projected: VERTS.map(() => new THREE.Vector3()),
      w: new Float32Array(16),
      positions: new Float32Array(EDGES.length * 6),
      shadow: new Float32Array(EDGES.length * 6),
      colors: new Float32Array(EDGES.length * 6),
      dummy: new THREE.Object3D(),
      tmpColor: new THREE.Color(),
    }),
    [],
  );

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.elapsedTime;
    const s = state;

    // La velocidad del puntero "carga" la deformación, que luego se disipa.
    const speed = pointer.distanceTo(s.lastPointer) / Math.max(delta, 1e-3);
    s.lastPointer.copy(pointer);
    s.distortion = THREE.MathUtils.lerp(s.distortion, Math.min(speed * 0.08, 1.2), 0.08);
    s.unfold = THREE.MathUtils.damp(s.unfold, unfolded ? 1 : 0, 3, delta);

    const spin = 1 - s.unfold * 0.7;
    const px = (pointer.x * viewport.width) / 2;
    const py = (pointer.y * viewport.height) / 2;

    for (let i = 0; i < 16; i++) {
      const p = [...VERTS[i]] as Vec4;
      rotate(p, 0, 3, t * 0.45 * spin + pointer.x * 0.9); // plano XW
      rotate(p, 1, 3, t * 0.3 * spin + pointer.y * 0.7); // plano YW
      rotate(p, 2, 3, t * 0.2 * spin); // plano ZW
      rotate(p, 0, 1, t * 0.1);

      // Desplegar: la dimensión W se "abre" hacia afuera.
      const w = p[3] * (1 + s.unfold * 0.8);
      const k = 1.8 / (PROJ_DIST - w * 0.55);
      const v = s.projected[i].set(p[0] * k, p[1] * k, p[2] * k);
      v.multiplyScalar(1 + s.unfold * 0.35);
      s.w[i] = p[3];

      // Deformación orgánica según la velocidad del cursor.
      const d = s.distortion * 0.35;
      v.x += Math.sin(t * 3.1 + i * 1.7) * d;
      v.y += Math.cos(t * 2.7 + i * 2.3) * d;
      v.z += Math.sin(t * 2.3 + i * 0.9) * d;

      // Repulsión: los vértices cercanos al cursor se apartan.
      const dx = v.x - px;
      const dy = v.y - py;
      const dist2 = dx * dx + dy * dy;
      const push = Math.exp(-dist2 * 1.2) * 0.6;
      v.x += dx * push;
      v.y += dy * push;
    }

    EDGES.forEach(([a, b], e) => {
      const o = e * 6;
      for (const [slot, idx] of [[0, a], [3, b]] as const) {
        const v = s.projected[idx];
        s.positions[o + slot] = v.x;
        s.positions[o + slot + 1] = v.y;
        s.positions[o + slot + 2] = v.z;
        // Sombra falsa: proyección aplanada sobre el "piso".
        s.shadow[o + slot] = v.x * 1.1 + v.y * 0.25;
        s.shadow[o + slot + 1] = FLOOR_Y;
        s.shadow[o + slot + 2] = v.z * 1.1 - 0.5;
        // Color según profundidad en W: cubo interior cian, exterior magenta.
        s.tmpColor.copy(CYAN).lerp(MAGENTA, THREE.MathUtils.clamp((s.w[idx] + 2) / 4, 0, 1));
        s.colors[o + slot] = s.tmpColor.r;
        s.colors[o + slot + 1] = s.tmpColor.g;
        s.colors[o + slot + 2] = s.tmpColor.b;
      }
    });

    writeSegments(edgeLine.current, s.positions, "instanceStart");
    writeSegments(edgeLine.current, s.colors, "instanceColorStart");
    writeSegments(shadowLine.current, s.shadow, "instanceStart");

    if (nodes.current) {
      for (let i = 0; i < 16; i++) {
        s.dummy.position.copy(s.projected[i]);
        s.dummy.scale.setScalar(0.022 + 0.008 * Math.sin(t * 4 + i) + s.hover * 0.012);
        s.dummy.updateMatrix();
        nodes.current.setMatrixAt(i, s.dummy.matrix);
      }
      nodes.current.instanceMatrix.needsUpdate = true;
    }

    if (group.current) {
      // Más chico en pantallas angostas y un poco elevado para dejar lugar al título.
      group.current.scale.setScalar(Math.min(1, viewport.width / 4.2));
      group.current.position.y = 0.45;
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.5, 2, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.35, 2, delta);
    }
  });

  return (
    <>
      <group ref={group}>
        <Line
          ref={edgeLine}
          segments
          points={INITIAL_POINTS}
          vertexColors={INITIAL_COLORS}
          lineWidth={2}
          frustumCulled={false}
          toneMapped={false}
        />
        <instancedMesh ref={nodes} args={[undefined, undefined, 16]} frustumCulled={false}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} />
        </instancedMesh>
        {/* Zona de clic invisible alrededor del teseracto */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          onPointerOver={() => {
            state.hover = 1;
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            state.hover = 0;
            document.body.style.cursor = "";
          }}
        >
          <sphereGeometry args={[1.6, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
      <Line
        ref={shadowLine}
        segments
        points={INITIAL_POINTS}
        color="#3df2e0"
        lineWidth={1}
        transparent
        opacity={0.12}
        frustumCulled={false}
      />
    </>
  );
}

export default function TesseractScene(props: { unfolded: boolean; onToggle: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <Tesseract {...props} />
      <Sparkles count={70} scale={[10, 6, 6]} size={1.6} speed={0.25} color="#3df2e0" opacity={0.5} />
    </Canvas>
  );
}
