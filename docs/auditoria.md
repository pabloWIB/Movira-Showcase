# Auditoría — Movira-Showcase

Fecha: 2026-07-31 · Estado inicial del repo antes de la reorganización.

Documento de trabajo interno. Registra el estado **de partida**; los cambios
aplicados se registran en [`cambios.md`](./cambios.md).

## 1. Qué es el proyecto

Aplicación **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4**.
No es un sitio HTML/CSS/JS plano: la estructura destino genérica
(`assets/css`, `assets/js`, `index.html`, `404.html`) no aplica y se sustituye
por las convenciones de Next.js, que ya cumple el proyecto.

Es una landing de **una sola ruta** (`/`) que presenta la plataforma logística
Movira como un scroll narrativo continuo. La página se genera desde un array
declarativo `SLIDES` en `src/app/page.tsx`; cada entrada lleva un `kind` que
selecciona el componente de sección.

## 2. Inventario de archivos

### 2.1 Rutas y entrypoints

| Archivo | Propósito real | Estado |
|---|---|---|
| `src/app/page.tsx` | Única ruta (`/`). Array `SLIDES` + renderer | Activo |
| `src/app/layout.tsx` | Layout raíz, envuelve en `SmoothScrolling` | Activo, `metadata` vacío |
| `src/app/globals.css` | Tokens `@theme`, reset, handshake con Lenis | Activo |
| — | Página 404 propia | **No existe** (usa el `/_not-found` por defecto) |

### 2.2 Componentes de sección (`src/components/sections/movira/`)

| Archivo | Renderiza | Importado por | Estado |
|---|---|---|---|
| `shared.tsx` | Tokens, `AndroidFrame`, `SafariFrame`, `AccentTitle`, `FadeTop`, `useSlideEntrance` | 9 archivos | Activo |
| `FramedScreens.tsx` | 6 pantallas de producto construidas a mano en JSX | 5 archivos | Activo |
| `PhoneHero.tsx` | Sección de apertura, marco Android vertical | `page.tsx` | Activo |
| `ConnectedSection.tsx` | App + dashboard unidos por `AnimatedBeam` | `page.tsx` | Activo |
| `ContainerSection.tsx` | Tarjetas de módulo arrastrables | `page.tsx` | Activo |
| `GigSection.tsx` | Pantalla en marco Safari con barra de URL | `page.tsx` | Activo |
| `ModuleFlow.tsx` | Diagrama de módulos arrastrable | `page.tsx` | Activo |
| `TechStackSection.tsx` | Árbol de repos + contadores | `page.tsx` | Activo |
| `EcosystemGrid.tsx` | Los 6 productos a la vez | `page.tsx` (import) | **Importado pero nunca renderizado** |
| `SplitSection.tsx` | Dos superficies en paralelo | `page.tsx` (import) | **Importado, ningún slide lo usa** |
| `MoviraCTA.tsx` | Sección de cierre | — | **Huérfano (0 importaciones)** |

### 2.3 Componentes UI (`src/components/ui/`)

| Archivo | Tamaño | Importado por | Estado |
|---|---|---|---|
| `android.tsx` | 3.1 KB | `shared.tsx` | Activo |
| `safari.tsx` | 13.5 KB | `shared.tsx` | Activo |
| `animated-beam.tsx` | 4.7 KB | `ConnectedSection`, `SplitSection` | Activo |
| `file-tree.tsx` | 12.8 KB | `TechStackSection` | Activo |
| `number-ticker.tsx` | 1.8 KB | `TechStackSection` | Activo |
| `highlighter.tsx` | 2.2 KB | `TechStackSection` | Activo |
| `button.tsx` | 1.9 KB | `file-tree.tsx` | Activo (transitivo) |
| `scroll-area.tsx` | 1.7 KB | `file-tree.tsx` | Activo (transitivo) |
| `animated-beam-demo.tsx` | 26.9 KB | — | **Huérfano** |
| `animated-beam-multiple-inputs.tsx` | 27.1 KB | — | **Huérfano** |
| `animated-beam-multiple-outputs.tsx` | 27.2 KB | — | **Huérfano** |
| `macbook-scroll.tsx` | 19.4 KB | — | **Huérfano** |
| `background-ripple-effect.tsx` | 4.3 KB | — | **Huérfano** |
| `typewriter-effect.tsx` | 4.1 KB | — | **Huérfano** |
| `animated-beam-unidirectional.tsx` | 3.4 KB | — | **Huérfano** |
| `container-scroll-animation.tsx` | 2.6 KB | — | **Huérfano** |
| `file-tree-demo.tsx` | 2.0 KB | — | **Huérfano** |
| `highlighter-demo.tsx` | 0.5 KB | — | **Huérfano** |
| `number-ticker-demo.tsx` | 0.3 KB | — | **Huérfano** |
| `android-demo.tsx` | 0.2 KB | — | **Huérfano** |
| `safari-demo.tsx` | 0.2 KB | — | **Huérfano** |
| `animated-beam-bidirectional.tsx` | **0 bytes** | — | **Archivo vacío** |

Total huérfano en `ui/` + `MoviraCTA.tsx` + `lib/performance.ts`: **123 KB / 16 archivos**.

### 2.4 Librería (`src/lib/`)

| Archivo | Propósito | Estado |
|---|---|---|
| `utils.ts` | `cn()` — merge de clases | Activo, 13 importaciones |
| `placeholder.ts` | `posterDataUri()` — genera un SVG con el texto *"Placeholder · suelta el video aquí"* | Importado por `page.tsx`, **nunca llega a pintarse** |
| `performance.ts` | `preloadVideos()` | **Huérfano (0 importaciones)** |

### 2.5 Imágenes y binarios

| Ruta | Peso | Dimensiones | Estado |
|---|---|---|---|
| `src/app/icon0.svg` | **818 KB** | 1024×1024 | SVG que envuelve un PNG en base64. Se sirve como favicon |
| `src/app/apple-icon.png` | 32 KB | — | Activo (convención Next.js) |
| `src/app/favicon.ico` | 15 KB | — | Activo (convención Next.js) |
| `src/app/icon1.png` | 12 KB | — | Activo (convención Next.js) |
| `src/apple-icon.png` | 32 KB | — | **Fuera de `app/`: Next.js lo ignora** |
| `src/favicon.ico` | 15 KB | — | **Fuera de `app/`: Next.js lo ignora** |
| `src/icon0.svg` | 818 KB | — | **Fuera de `app/`: Next.js lo ignora** |
| `src/icon1.png` | 12 KB | — | **Fuera de `app/`: Next.js lo ignora** |

Los 4 duplicados en `src/` suman **877 KB** de peso muerto en el repositorio.

No hay ninguna imagen de contenido: todas las pantallas de producto son JSX
construido a mano (`FramedScreens.tsx`). No existe ningún `.mp4`.

### 2.6 Dependencias externas

Fuentes: **Montserrat** vía `next/font/google` (self-hosted por Next.js, sin
petición a un CDN externo). No hay ningún `<script>` ni hoja de estilo remota.

Dependencias declaradas en `package.json` que **ningún archivo importa**:

| Paquete | Nota |
|---|---|
| `next-themes` | El README afirma "light and dark themes"; no hay `ThemeProvider` en `layout.tsx` |
| `react-syntax-highlighter` (+ `@types/`) | El README lo atribuye a `TechStackSection`, que no lo usa |
| `dotted-map` | El README lo atribuye a un "coverage visual" que no existe |
| `radix-ui` | Declarado, pero el código importa los paquetes sueltos (ver 3.7) |
| `@tabler/icons-react` | Sólo lo usa `macbook-scroll.tsx`, que es huérfano |
| `autoprefixer` | Redundante: `@tailwindcss/postcss` (Tailwind v4) ya lo cubre |

### 2.7 Archivos basura

| Ruta | Motivo |
|---|---|
| `tailwind.config.ts` | El proyecto usa Tailwind v4 con configuración CSS-first (`@theme` en `globals.css`) y `components.json` declara `"tailwind": { "config": "" }`. El archivo no lo lee nadie |
| `public/videos/README.md` | Documenta un flujo de vídeo que el código no puede ejecutar (ver 3.1). Deja `public/videos/` como carpeta que sólo contiene su propio README |
| `src/{apple-icon.png, favicon.ico, icon0.svg, icon1.png}` | Duplicados fuera de `app/` |
| `animated-beam-bidirectional.tsx` | Archivo de 0 bytes |

No hay `.bak`, `node_modules` versionado, `.DS_Store` ni `Thumbs.db`.

## 3. Problemas detectados

Ordenados de más a menos grave.

### 3.1 · CRÍTICO — La ruta de vídeo entera es código muerto

`src/components/sections/movira/shared.tsx:23` declara:

```ts
export const SHOW_VIDEOS = false;
```

Es una constante literal `false`, así que las tres ramas `if (SHOW_VIDEOS)` de
`AndroidFrame` y `SafariFrame` son inalcanzables. Consecuencias en cadena:

- Ningún `videoSrc` se pasa jamás a `<Android>` / `<Safari>`.
- Las 8 rutas `/videos/*.mp4` de `page.tsx` no apuntan a ningún archivo real y
  **nunca se leen**, así que tampoco producen un 404: son literales inertes.
- `posterDataUri()` se ejecuta 8 veces al cargar el módulo y sus resultados se
  pasan como props `poster`, pero **ninguna llega a pintarse**: todos los marcos
  que se renderizan reciben un `screen`, que tiene prioridad. Es trabajo tirado.
- El README dedica una sección ("Adding the product videos") y
  `public/videos/README.md` una tabla entera a un flujo que promete
  *"no hay que tocar código"* — falso mientras `SHOW_VIDEOS` sea `false`.

El generador de posters, además, escribe literalmente
`"Placeholder · suelta el video aquí"` dentro del SVG.

### 3.2 · CRÍTICO — `<title>` y `<meta name="description">` vacíos

`src/app/layout.tsx:5-8`:

```ts
export const metadata: Metadata = {
  title: "",
  description: "",
};
```

La pestaña del navegador sale sin nombre y el resultado en buscadores sale sin
título ni descripción. No hay Open Graph, ni `canonical`, ni `lang` en español
pese a que **todo el contenido visible está en español** (`<html lang="en">`).

### 3.3 · GRAVE — Un slide del array no se renderiza

`page.tsx` declara el slide `mv-7` de tipo `ecosystem`, pero su `case` en
`renderSlide` está comentado:

```ts
// case "ecosystem":
//   return <EcosystemGrid key={slide.id} {...slide} zIndex={zIndex} />;
```

`renderSlide` devuelve `undefined` para ese slide: React no pinta nada y la
sección desaparece en silencio. `EcosystemGrid` y `EcosystemItem` quedan
importados sin uso, y los 6 objetos `items` del slide (el bloque de datos más
largo del archivo) se construyen para nada.

`SplitSection` / `Surface` se importan también sin que ningún slide use
`kind: "split"`.

### 3.4 · GRAVE — Jerarquía de encabezados rota

La página emite **5 `<h1>`**: uno en `PhoneHero` y cuatro más dentro de las
maquetas de producto de `FramedScreens.tsx` (`DashboardScreen`, `WebScreen`,
`DespachosScreen`, `AdminScreen`). Los de las maquetas son texto decorativo
dentro de un dibujo de una interfaz, no encabezados del documento.

Otros fallos de accesibilidad:

- El `<h2>` de `ModuleFlow` va suelto: la sección no es navegable por landmarks.
- Las tarjetas arrastrables de `ContainerSection`, `ModuleFlow` y
  `EcosystemGrid` sólo responden a puntero. Sin acceso por teclado ni rol ARIA.
- El atajo de teclado `q` (`page.tsx:113`) no está anunciado ni documentado en
  ningún sitio de la interfaz.
- Las maquetas de `FramedScreens.tsx` son árboles DOM completos leídos por los
  lectores de pantalla como contenido real, cuando son una ilustración.
- Contraste: `MUTED = #A1A1AA` sobre blanco da **2.56:1**. Al ser texto grande
  (`clamp(21px, 4.39vw, 47px)` a peso 600) el umbral AA que le aplica es 3:1,
  no 4.5:1 — y aun así no llega. Afecta a la mitad de cada título
  (`AccentTitle`, `PhoneHero`, `ModuleFlow`), el texto más grande de la página.
  `#71717A` (4.83:1) cumple incluso el umbral de texto normal.

### 3.5 · GRAVE — 818 KB de favicon

`src/app/icon0.svg` es un PNG de 1024×1024 codificado en base64 dentro de un
`<svg>`. Se sirve en `/icon0.svg` y el navegador lo pide en cada carga. Es más
de la mitad del presupuesto de 1 MB de primera carga, para un icono de pestaña,
existiendo ya `icon1.png` (12 KB) y `favicon.ico` (15 KB) con la misma imagen.

### 3.6 · MEDIO — Datos de negocio inventados en las maquetas

`FramedScreens.tsx:342` (`WebScreen`) muestra `4.8★ / 47 reseñas`. Es una
valoración con número de reseñas concreto atribuida a un producto real
(movira.com.co) que no se puede verificar.

### 3.7 · MEDIO — Dependencias fantasma de Radix

`button.tsx`, `file-tree.tsx` y `scroll-area.tsx` importan
`@radix-ui/react-slot`, `@radix-ui/react-accordion` y
`@radix-ui/react-scroll-area`. Ninguno de los tres figura en `package.json`;
resuelven sólo porque el paquete `radix-ui` los arrastra al `node_modules`
plano de npm. Con pnpm o Yarn PnP el build rompe.

### 3.8 · MENOR — CSS y configuración

- `globals.css:57`: `scroll-snap-type: none !important` aplicado al selector
  universal `*`. Un `!important` sobre `*` para desactivar una propiedad que
  nadie activa.
- `globals.css` mantiene dos copias del mismo juego de colores: el bloque
  `@theme inline` y el bloque `:root`. Los valores están duplicados a mano.
- No hay escala de espaciado ni de tipografía en variables; los tamaños van
  como literales `clamp(...)` repetidos en cuatro componentes.
- `next.config.ts` sólo contiene el comentario de relleno
  `/* config options here */`.
- `.gitignore` correcto (plantilla de Next.js), no necesita cambios.

### 3.9 · Comprobaciones que salen limpias

- **Enlaces rotos:** no hay ningún `<a href>` en toda la aplicación.
- **Imágenes rotas:** no hay ningún `<img>` ni `background-image` con URL.
- **CSS/JS referenciados inexistentes:** ninguno; todo pasa por el bundler.
- **Credenciales / tokens / API keys:** ninguna. No hay `.env`, ni llamadas de
  red, ni claves en el código.
- **HTML duplicado entre páginas:** hay una sola ruta.
- **`tsc --noEmit`** y **`next build`** pasan sin errores ni avisos.
- **Lorem ipsum:** no hay. El texto de relleno que sí hay es el poster
  `"Placeholder · suelta el video aquí"` (3.1).

## 4. Resumen en 5 líneas

1. Es una landing de una sola ruta en Next.js 16 que cuenta la plataforma
   Movira como un scroll continuo, con las pantallas de producto dibujadas a
   mano en JSX en vez de capturadas.
2. El estado de partida compila y despliega sin errores; el problema no es que
   esté roto, es que arrastra una capa entera de andamiaje sin terminar.
3. Lo más grave: **`SHOW_VIDEOS = false` deja muerta toda la ruta de vídeo y
   poster** — 8 rutas `.mp4` inexistentes, un generador de placeholders que
   nunca se pinta y dos documentos que explican un flujo que no funciona.
4. Segundo más grave: **`title` y `description` vacíos** y `lang="en"` sobre
   contenido íntegramente en español; y un slide (`ecosystem`) que se declara
   pero no se pinta porque su `case` quedó comentado.
5. Peso: **877 KB** de iconos duplicados que Next.js ignora, **818 KB** de
   favicon SVG servido de verdad y **123 KB** en 16 archivos huérfanos.
