# Registro de cambios

Reorganización del 2026-07-31. Agrupado por fase.
Estado de partida documentado en [`auditoria.md`](./auditoria.md).

Todos los cambios son locales. **No se ejecutó ningún comando de git.**

## Nota previa sobre el alcance

El proyecto no es HTML/CSS/JS plano: es **Next.js 16 (App Router) + React 19 +
TypeScript + Tailwind v4**. Las fases se aplicaron adaptadas al stack real:

| Regla genérica | Aplicación en este proyecto |
|---|---|
| `assets/css`, `assets/js`, `index.html`, `404.html` | Convenciones de Next.js: `src/app/`, `not-found.tsx`, `robots.ts`, `sitemap.ts` |
| `robots.txt` / `sitemap.xml` como archivos | Rutas de metadatos generadas (`app/robots.ts`, `app/sitemap.ts`) |
| Nombres de archivo en minúsculas con guiones | Se mantiene `PascalCase` en componentes React: es la convención del ecosistema y la que ya seguía el repo. Todo lo demás (rutas, `lib/`, `ui/`) va en minúsculas con guiones |
| Comillas dobles en HTML, punto y coma en JS | Ya lo garantizan ESLint + el formato existente de TSX |
| Menú móvil, tablas, formularios | No existen en el proyecto: es una landing de scroll de una sola ruta sin navegación ni formularios |

## Fase 1 — Auditoría

- Creado `docs/auditoria.md` con el inventario completo: rutas, componentes,
  imágenes, dependencias, archivos huérfanos y 9 problemas ordenados por
  gravedad.
- Verificada la línea base antes de tocar nada: `tsc --noEmit` y `next build`
  pasaban limpios. Todo cambio posterior se validó contra esa línea base.

## Fase 2 — Estructura

- Renombrado `src/app/icon1.png` → `src/app/icon.png`.
- Cerrada la numeración de las secciones tras eliminar slides muertos:
  `mv-1 … mv-9` con huecos → `mv-1 … mv-7` consecutivos.
- Eliminada la carpeta `public/` completa: sólo contenía `videos/README.md`,
  sin ningún vídeo.

## Fase 3 — Higiene

**16 archivos huérfanos borrados** (0 importaciones entrantes, 123 KB):

| Archivo | Motivo |
|---|---|
| `ui/animated-beam-demo.tsx` | Demo del registry, 27 KB |
| `ui/animated-beam-multiple-inputs.tsx` | Demo del registry, 27 KB |
| `ui/animated-beam-multiple-outputs.tsx` | Demo del registry, 27 KB |
| `ui/macbook-scroll.tsx` | Nunca usado, 19 KB |
| `ui/background-ripple-effect.tsx` | Nunca usado |
| `ui/typewriter-effect.tsx` | Nunca usado |
| `ui/animated-beam-unidirectional.tsx` | Nunca usado |
| `ui/container-scroll-animation.tsx` | Nunca usado |
| `ui/animated-beam-bidirectional.tsx` | **Archivo de 0 bytes** |
| `ui/{android,safari,file-tree,highlighter,number-ticker}-demo.tsx` | Demos del registry |
| `sections/movira/MoviraCTA.tsx` | Sección completa que ninguna página montaba |
| `lib/performance.ts` | `preloadVideos()`, sin importaciones |

**Duplicados y peso muerto:**

- Borrados `src/{apple-icon.png, favicon.ico, icon0.svg, icon1.png}` — estaban
  fuera de `src/app/`, así que Next.js los ignoraba por completo: **877 KB**.
- Borrado `src/app/icon0.svg` — **818 KB** de PNG en base64 dentro de un `<svg>`
  que sí se servía como favicon en cada carga. Quedan `favicon.ico` (15 KB),
  `icon.png` (12 KB) y `apple-icon.png` (32 KB), que cubren todos los casos.
- Borrado `tailwind.config.ts` — el proyecto usa Tailwind v4 con configuración
  CSS-first; ese archivo no lo leía nadie.

**Dependencias:**

- Corregidas 3 **dependencias fantasma**: `button.tsx`, `file-tree.tsx` y
  `scroll-area.tsx` importaban `@radix-ui/react-slot`,
  `@radix-ui/react-accordion` y `@radix-ui/react-scroll-area` sin que ninguno
  estuviera declarado en `package.json`. Resolvían sólo por el `node_modules`
  plano de npm; con pnpm o Yarn PnP el build habría roto. Ahora están
  declarados explícitamente.
- Eliminadas 6 dependencias sin usar: `next-themes`, `react-syntax-highlighter`
  (+ `@types/`), `dotted-map`, `radix-ui`, `@tabler/icons-react` (sólo la usaba
  `macbook-scroll.tsx`) y `autoprefixer` (redundante con `@tailwindcss/postcss`).
- Resultado: **98 paquetes menos** en el árbol de dependencias.

**Credenciales:** no se encontró ninguna. No hay `.env`, ni claves, ni tokens,
ni llamadas de red en el código. Nada que reportar.

## Fase 4 — Imágenes

El proyecto **no tiene imágenes de contenido**, y no se inventó ninguna. Las
seis pantallas de producto son JSX construido a mano en `FramedScreens.tsx`.

- Tras la limpieza no queda **ni un solo `<img>` ni `background-image`** en el
  HTML renderizado, así que no hay `alt`, `width`/`height` ni `loading="lazy"`
  que aplicar.
- Los únicos binarios que quedan son los tres iconos de pestaña, servidos por
  las convenciones de Next.js.

## Fase 5 — HTML, SEO y accesibilidad

**Metadatos (estaban literalmente vacíos):**

- `title` y `description` pasaban de `""` a valores reales de 55 y 151
  caracteres.
- Añadidos Open Graph (`type`, `url`, `site_name`, `locale: es_CO`, `title`,
  `description`) y `<link rel="canonical">`.
- **Sin `og:image`**: no existe ningún archivo de imagen apto para eso en el
  proyecto y no se inventó una ruta.
- `<html lang="en">` → `lang="es"`. Todo el contenido visible está en español.
- Centralizados dominio, título y descripción en `src/lib/site.ts`, que
  alimenta metadatos, `robots.txt` y `sitemap.xml` desde un solo sitio.

**Estructura:**

- Añadido `src/app/not-found.tsx`: 404 propia, con `title`/`description`
  únicos, `noindex` y enlace de vuelta al inicio.
- Añadidos `src/app/robots.ts` y `src/app/sitemap.ts`.
- Añadido `SiteFooter` (el sitio no tenía `<footer>`).

**Jerarquía de encabezados:** la página emitía **5 `<h1>`**. Los 4 que estaban
dentro de las maquetas de producto (`DashboardScreen`, `WebScreen`,
`DespachosScreen`, `AdminScreen`) son texto decorativo dentro del dibujo de una
interfaz, no encabezados del documento: convertidos a `<p>` conservando el
estilo. Queda **1 `<h1>`** real, el del hero, y 6 `<h2>` de sección.

**Accesibilidad:**

- Los marcos de dispositivo se envuelven en `aria-hidden="true"`: son
  ilustraciones del producto, y sin eso un lector de pantalla recorría seis
  interfaces completas de texto falso.
- Contraste del texto atenuado: `#A1A1AA` daba **2.56:1** sobre blanco, por
  debajo incluso del umbral 3:1 que aplica a texto grande. Cambiado a
  `#71717A` = **4.83:1**, que cumple AA para texto normal.
- Añadido un anillo de foco global con `:focus-visible` en `globals.css`.
- Sustituido el atajo de teclado `q` — no anunciado y sin descubrir — por un
  botón real de avance en el hero, con `aria-label`, estado hover, foco visible
  y área táctil de 44×44 px.

**Texto de relleno:** eliminado el único que había (ver fase 9).

## Fase 6 — CSS y sistema de diseño

- **Eliminada la duplicación de tokens.** `globals.css` mantenía la paleta dos
  veces: el bloque `@theme inline` y un bloque `:root` con los mismos valores
  copiados a mano. Ahora `@theme` es la única fuente: Tailwind emite las
  custom properties y las utilidades desde ahí.
- Añadida **escala de espaciado** 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96.
- Añadidos tokens de tipografía (`--text-section-title`), sombras
  (`--shadow-card|raised|panel`) y duraciones (150 / 200 / 250 ms).
- Paleta **derivada de la que ya usaba el sitio** (monocroma sobre blanco); el
  único cambio de valor es el gris atenuado, por contraste.
- Eliminado `scroll-snap-type: none !important` aplicado al selector universal
  `*` — desactivaba con `!important` una propiedad que ningún elemento usa.
- Eliminado el `!important` restante de `.lenis-smooth`, que sólo existía para
  ganarle a un `scroll-behavior: smooth` que también se eliminó.
- Borrados 3 bloques de CSS muerto: `.scroll-section`, `.gpu-accelerated` y
  `.animate-cell-ripple` con su `@keyframes` (pertenecía a
  `background-ripple-effect.tsx`, borrado en la fase 3).
- Ampliado el bloque `prefers-reduced-motion` para cortar también animaciones y
  transiciones CSS, no sólo el `scroll-behavior`.
- Orden del archivo: tokens → base → handshake de Lenis → reduced motion.

## Fase 7 — Responsive

Dos defectos reales de móvil, **enmascarados** porque las secciones tienen
`overflow: hidden`: no aparecía barra de scroll horizontal, pero el contenido
se perdía.

- **`ModuleFlow`**: las 6 tarjetas se posicionan en píxeles fijos sobre un
  lienzo de 880 px. A 360 px de ancho, **4 de las 6 quedaban fuera del recorte**
  (invisibles); a 768 px, 2 de 6. Ahora el lienzo arrastrable sólo se muestra
  desde `lg` (≥1024 px, donde entra completo) y por debajo se renderiza una
  rejilla estática con los mismos 6 módulos — el mismo patrón que ya usaba
  `EcosystemGrid`.
- **`ContainerSection`**: una tarjeta se salía 33 px del tablero a 360 px.
  Corregidas las posiciones porcentuales para que dejen sitio al ancho de la
  tarjeta, añadido un ancho móvil de 150 px y `overflow-hidden` al tablero.

Comprobado por cálculo sobre los valores reales de CSS a 360 / 640 / 768 /
1024 / 1440 px: cero desbordamientos en ambos componentes.

Áreas táctiles: el único control interactivo nuevo (botón de avance del hero)
mide 44×44 px.

## Fase 8 — UX / UI

- El hero gana una señal de avance visible y accesible; antes la única forma de
  saltar de sección era pulsar `q` sin que nada lo indicara.
- Estados completos en los elementos interactivos nuevos (botón del hero,
  enlaces del footer, botón del 404): reposo, hover, foco visible, con
  transiciones de 200 ms.
- Ancho de línea acotado en los textos nuevos (`max-w-[46ch]`, `max-w-[18ch]`)
  para quedar en el rango de 60–75 caracteres.
- **No se añadió ningún CTA de negocio**: el proyecto no tiene ningún destino
  real al que enlazar (ni formulario, ni correo, ni WhatsApp), así que
  inventarlo habría sido un botón a ninguna parte.
- No hay formularios en el proyecto, así que no hay validación que implementar.

## Fase 9 — JavaScript

**Eliminada la ruta de vídeo/poster completa**, que era el problema más grave
del repo. `shared.tsx` declaraba `export const SHOW_VIDEOS = false` como
literal, lo que dejaba inalcanzables todas las ramas `if (SHOW_VIDEOS)`. En
cadena:

- Borrado `src/lib/placeholder.ts`. Su `posterDataUri()` se ejecutaba 8 veces
  al cargar el módulo para generar SVGs con el texto literal
  **"Placeholder · suelta el video aquí"**, y ninguno llegaba a pintarse nunca.
- Borradas las 8 rutas `/videos/*.mp4` del array `SLIDES`: no existía ninguno
  de esos archivos.
- Borradas las props `video` / `poster` / `appVideo` / `webPoster`… de las 6
  secciones que las recibían sin usarlas.
- Simplificados `AndroidFrame` y `SafariFrame` a una sola rama: la pantalla JSX.
- Borradas las ramas `imageSrc` y `videoSrc` de `ui/safari.tsx` y `src` /
  `videoSrc` de `ui/android.tsx`, inalcanzables desde la app.
- Borrados `public/videos/README.md` y la sección "Adding the product videos"
  del README: documentaban un flujo que el código no podía ejecutar.

**Slide que no se renderizaba:** el `case "ecosystem"` estaba comentado en
`renderSlide`, así que la función devolvía `undefined` para el slide `mv-7` y
la sección desaparecía en silencio. Restaurado: los 6 productos vuelven a
verse. Añadido su título, que estaba vacío (`text: ""`).

**Código muerto:** borrado `SplitSection.tsx` con su tipo `Surface` — se
importaba en `page.tsx` pero ningún slide usaba `kind: "split"`.

**Calidad:** ESLint pasaba de **1 error + 3 warnings** a **0 / 0**:

- `SmoothScrolling.tsx`: `setState` síncrono dentro de un `useEffect`
  (`react-hooks/set-state-in-effect`). Reescrito con `useSyncExternalStore`, que
  además elimina un render extra y alinea el render de servidor con el de
  cliente.
- `EcosystemGrid.tsx`: dependencia `computeLayout` ausente. Resuelto de verdad
  —`useMemo` para los nodos y `useCallback` para el layout— en vez de silenciar
  la regla.
- `shared.tsx`: dependencias ausentes en `useSlideEntrance`.
- `ui/safari.tsx`: warning de `<img>` de `@next/next/no-img-element`, resuelto
  al borrar la rama muerta que lo contenía.

**Otros:** el botón de avance usa la API de Lenis cuando está disponible y cae
a `window.scrollTo` cuando el visitante prefiere movimiento reducido (en ese
caso `SmoothScrolling` no monta el wrapper de Lenis).

## Fase 10 — Rendimiento

- **818 KB menos** en la primera carga al borrar el favicon SVG.
- Añadido `display: "swap"` a la fuente Montserrat. `next/font` ya la
  auto-hospeda y precarga, así que no hace falta `preconnect` a un origen
  externo — no hay ninguno.
- Next.js ya emite los scripts con carga diferida y el CSS crítico en `<head>`.
- Peso medido de la primera carga de `/`: **~305 KB comprimido** (~1,1 MB sin
  comprimir), por debajo del objetivo de 1 MB en lo que realmente viaja por la
  red. El HTML pesa 288 KB sin comprimir (33 KB comprimido) porque las seis
  pantallas de producto van en el marcado, que es justo el planteamiento del
  proyecto.

## Fase 11 — QA

| Comprobación | Resultado |
|---|---|
| Enlaces del menú y del footer | Sin menú. Los 2 enlaces del footer y el del 404 apuntan a destinos reales |
| Rutas de imagen ↔ archivo real | No queda ningún `<img>` ni `background-image` |
| `<link>` y `<script>` existentes | Todo lo resuelve el bundler; build limpio |
| Errores de consola | 0 mensajes en `/` (verificado en navegador) |
| Scroll horizontal | Sin desbordamiento a ~666 / ~980 / ~1500 px (navegador) y cero desbordamiento calculado a 360 / 768 / 1024 / 1440 px |
| Menú móvil | No existe en el proyecto |
| Formularios | No existen en el proyecto |
| Lorem ipsum / TODO / texto de plantilla | 0 coincidencias en el HTML servido |
| Imágenes rotas | Ninguna |
| `title` y `description` únicos | `/` y `/no-existe` tienen los suyos |
| 404 con enlace al inicio | `not-found.tsx`, devuelve HTTP 404 |
| Credenciales en el código | Ninguna |

Adicional: `tsc --noEmit` limpio, `eslint` sin errores ni warnings,
`next build` genera las 8 rutas estáticas.

**Limitación:** el navegador de DevTools se bloqueó a mitad de la sesión
(conflicto de perfil de Chrome) y no se pudo repetir la comprobación visual a
360 px y 768 px **después** de las correcciones de la fase 7. Esas dos anchuras
están verificadas por cálculo sobre los valores reales de CSS y por inspección
del HTML servido, no por captura de pantalla.

## Fase 12 — Documentación

- `README.md` actualizado en lo que cambió la reorganización: eliminada la
  sección de vídeos y las afirmaciones falsas de la tabla de stack
  (`next-themes` para temas claro/oscuro que no existían,
  `react-syntax-highlighter` en una sección que no lo usa, `dotted-map` para un
  mapa que no existe); añadidas las rutas nuevas al árbol y documentado cómo se
  eligen las pantallas con `SafariScreenKey`.
- Creados `docs/auditoria.md` y este `docs/cambios.md`.

## Fase 13 — Deploy

- Verificado que no hay ninguna ruta absoluta de la máquina local.
- Verificado que no hay `.env` ni credenciales.
- **No se creó configuración de hosting** (`vercel.json`, `_redirects`,
  `.htaccess`): `DESTINO_DEPLOY` estaba vacío, y Next.js en Vercel no la
  necesita.
- No se ejecutó ningún comando de despliegue.

## Fase 14 — Promoción

- Badge de Fiverr bajo el título del README y bloque `## Hire me` al final.
- `SiteFooter` con la firma de `wib.digital` y el enlace de Fiverr, integrado
  con el CSS existente. El sitio no tenía footer, así que se creó uno.
- Datos estructurados `Person` en JSON-LD, inyectados desde `layout.tsx`.
- Sin cifras de reseñas, ratings ni nivel de vendedor en ningún sitio.

## Decisión que conviene revisar

`DOMINIO_PUBLICACION` se dejó vacío en la configuración del encargo, pero el
README del repo ya documentaba un despliegue real en
`movirashowcasekkrd.wib.digital`. Se usó ese dominio —dato que ya estaba en el
proyecto, no inventado— para el `canonical`, el `og:url`, `robots.txt` y
`sitemap.xml`, porque sin él esas cuatro cosas no se pueden generar. **Si el
dominio no es correcto, se cambia en un único sitio: `src/lib/site.ts`.**
