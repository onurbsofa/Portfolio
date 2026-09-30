# Portfolio — Bruno Fazio

Portfolio personal: https://onurbsofa.github.io/Portfolio/

Hecho con **Next.js (App Router) + TypeScript**, **Tailwind CSS**, **React Three Fiber / drei**
(teseracto 4D interactivo), **Motion** y componentes estilo **Magic UI**.

## Estructura

- `web/` — código fuente del sitio (Next.js)
  - `lib/data.ts` — **todo el contenido editable** (textos, proyectos, habilidades, links)
  - `components/three/` — escena 3D del teseracto (hipercubo 4D proyectado a 3D)
  - `components/sections/` — Hero, Quién soy (terminal), Proyectos, Manifiesto
  - `components/magicui/` — efectos de texto, botones y tarjetas 3D
  - `public/img/` — imágenes
- Raíz del repo (`index.html`, `_next/`, `img/`, …) — **sitio compilado** que publica GitHub Pages. No editar a mano.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000/Portfolio/
```

## Publicar en GitHub Pages

```bash
npm run deploy   # compila y copia el sitio estático a la raíz del repo
git add -A
git commit -m "deploy"
git push
```

GitHub Pages sigue configurado como siempre (rama `main`, carpeta raíz), así que en uno o dos minutos
aparece la nueva versión.
