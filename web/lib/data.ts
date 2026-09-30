// Todo el contenido editable del sitio está acá.

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const perfil = {
  nombre: "Bruno Fazio",
  rol: "Desarrollador Full Stack · Ciberseguridad · Videojuegos",
  lema: ["lo que otros no ven", "sistemas que se rompen", "mundos jugables", "código con intención"],
  email: "brufazio8@gmail.com",
  github: "https://github.com/onurbsofa",
  linkedin: "https://linkedin.com/in/bruno-fazio-7576b3274/",
};

export const secciones = [
  { id: "quien-soy", label: "Quién soy" },
  { id: "proyectos", label: "Proyectos" },
  { id: "manifiesto", label: "Manifiesto" },
  { id: "contacto", label: "Contacto" },
];

export const areas = [
  {
    titulo: "Ciberseguridad",
    color: "#ff3dcb",
    icono: "shield",
    texto: "Entender cómo fallan los sistemas para construirlos mejor. Curiosidad por redes, vulnerabilidades y seguridad aplicada al desarrollo.",
    skills: ["Redes", "Linux", "Seguridad web", "Hardening"],
  },
  {
    titulo: "Programación",
    color: "#3df2e0",
    icono: "code",
    texto: "Aplicaciones web de punta a punta: interfaces responsivas, APIs, bases de datos y despliegue.",
    skills: ["JavaScript / TypeScript", "React · Next.js", "Node.js", "Bases de datos", "Git"],
  },
  {
    titulo: "Videojuegos",
    color: "#b6ff3d",
    icono: "gamepad",
    texto: "Diseño y desarrollo de juegos con Godot: mecánicas, experiencias educativas y prototipos jugables.",
    skills: ["Godot", "GDScript", "Game design", "Itch.io"],
  },
] as const;

export const proyectos = [
  {
    titulo: "Cranio Comercio",
    descripcion: "Aplicación web comercial con interfaz responsiva, actualizaciones en tiempo real y una experiencia de usuario intuitiva.",
    tags: ["React", "Node.js", "Vercel"],
    demo: "https://craniocomercio.vercel.app/",
    codigo: null as string | null,
    color: "#3df2e0",
    snippet: `const tienda = await fetch("/api/productos");
const items = await tienda.json();
render(<Catalogo items={items} />);`,
  },
  {
    titulo: "Back To Mesozoic",
    descripcion: "Videojuego desarrollado para un museo mexicano: viaje interactivo a la era de los dinosaurios.",
    tags: ["Godot", "GDScript", "Itch.io"],
    demo: "https://mechabrain.itch.io/back-to-the-mezosoic",
    codigo: null as string | null,
    color: "#b6ff3d",
    snippet: `func _physics_process(delta):
    velocity.y += gravedad * delta
    move_and_slide()`,
  },
  {
    titulo: "Percepción (este sitio)",
    descripcion: "Portfolio interactivo con un teseracto 4D renderizado en tiempo real, proyectado a 3D y deformado por el cursor.",
    tags: ["Next.js", "Three.js", "React Three Fiber", "Motion"],
    demo: null as string | null,
    codigo: "https://github.com/onurbsofa/Portfolio",
    color: "#ff3dcb",
    snippet: `// rotación en el plano XW
const [x, w] = [p.x * cos - p.w * sin,
                p.x * sin + p.w * cos];
const k = 1 / (D - w); // proyección 4D → 3D`,
  },
];
