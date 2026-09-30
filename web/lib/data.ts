// Todo el contenido editable del sitio está acá.

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const perfil = {
  nombre: "Bruno Fazio",
  rol: "Desarrollador Full Stack · Ciberseguridad · Videojuegos",
  lema: ["lo que otros no ven", "sistemas que no se rompen", "mundos jugables", "código con intención"],
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

type Enlace = { label: string; href: string; icon: "external" | "github" | "gamepad" };

export type Proyecto = {
  titulo: string;
  descripcion: string;
  tags: string[];
  enlaces: Enlace[];
  color: string;
  snippet: string;
};

export const proyectos: Proyecto[] = [
  {
    titulo: "Eterna Memoria",
    descripcion:
      "Videojuego creado en equipo para la Godot Meetup Argentina Game Jam II, donde participé como Onurb. Una niña fantasma queda atrapada durante la dictadura militar argentina de 1969.",
    tags: ["Godot", "Game Jam", "Narrativa", "Itch.io"],
    enlaces: [
      { label: "Jugar", href: "https://vickiarismendi1984.itch.io/eterna-memoria", icon: "gamepad" },
      { label: "Game jam", href: "https://itch.io/jam/godot-meetup-argentina-game-jam-ii/entries", icon: "external" },
    ],
    color: "#ff3dcb",
    snippet: `func _on_recuerdo_encontrado(recuerdo):
    memoria.append(recuerdo)
    if memoria.size() == TOTAL:
        liberar_alma()`,
  },
  {
    titulo: "Ventas: El Cliente",
    descripcion:
      "CRM móvil para el trabajo de mi novia: rediseñé la arquitectura y el flujo de datos y le sumé inteligencia artificial. Se instala en el celular y funciona sin conexión.",
    tags: ["CRM", "IA", "PWA", "Offline", "Netlify"],
    enlaces: [{ label: "Ver app", href: "https://dancing-granita-aaf08d.netlify.app/#crm", icon: "external" }],
    color: "#3df2e0",
    snippet: `const { data } = Papa.parse(csv, {
  header: true,
});
const idea = await ia.sugerir(data);
guardar("crm", { data, idea });`,
  },
  {
    titulo: "Cranio Comercio",
    descripcion: "Aplicación web comercial con interfaz responsiva, actualizaciones en tiempo real y una experiencia de usuario intuitiva.",
    tags: ["React", "Node.js", "Vercel"],
    enlaces: [{ label: "Ver demo", href: "https://craniocomercio.vercel.app/", icon: "external" }],
    color: "#3df2e0",
    snippet: `const tienda = await fetch("/api/productos");
const items = await tienda.json();
render(<Catalogo items={items} />);`,
  },
  {
    titulo: "Back To Mesozoic",
    descripcion: "Videojuego desarrollado para un museo mexicano: viaje interactivo a la era de los dinosaurios.",
    tags: ["Godot", "GDScript", "Itch.io"],
    enlaces: [{ label: "Jugar", href: "https://mechabrain.itch.io/back-to-the-mezosoic", icon: "gamepad" }],
    color: "#b6ff3d",
    snippet: `func _physics_process(delta):
    velocity.y += gravedad * delta
    move_and_slide()`,
  },
  {
    titulo: "Percepción (este sitio)",
    descripcion: "Portfolio interactivo con un teseracto 4D renderizado en tiempo real, proyectado a 3D y deformado por el cursor.",
    tags: ["Next.js", "Three.js", "React Three Fiber", "Motion"],
    enlaces: [{ label: "Código", href: "https://github.com/onurbsofa/Portfolio", icon: "github" }],
    color: "#ff3dcb",
    snippet: `// rotación en el plano XW
const [x, w] = [p.x * cos - p.w * sin,
                p.x * sin + p.w * cos];
const k = 1 / (D - w); // proyección 4D → 3D`,
  },
];
