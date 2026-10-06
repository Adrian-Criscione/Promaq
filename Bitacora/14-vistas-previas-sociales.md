# Bitácora 14 — Vistas previas sociales: Open Graph + Twitter Card completas

**Fecha:** 2026-10-06
**Motivo:** el usuario pidió completar las etiquetas OG/Twitter para las
vistas previas en redes sociales.

## Situación previa

Las etiquetas básicas existían (`og:type/locale/site_name/title/description/
url/image` y `twitter:card/title/description/image`) pero:
1. `og:image` apuntaba al **logo de 320×120 px** → las redes lo muestran
   recortado/chico (lo recomendado es 1200×630, ratio 1,91:1).
2. Faltaban `og:image:width/height/type/alt` y `twitter:image:alt`, que
   ayudan a las plataformas a renderizar y validar la card.

## Cambios

### Imagen social nueva: `public/assets/images/social-card.png`
- Generada con `sharp` (script one-off en `/tmp/opencode/imgtools`, no se
  agregó como dependencia): lienzo 1200×630, fondo `#0f172a`, barra naranja
  `#f97316` arriba y amarilla `#facc15` abajo (paleta industrial del sitio),
  logo `logo.webp` centrado arriba, tagline
  *"Service integral de autoelevadores y maquinaria pesada"* y
  *"Buenos Aires · promaqmaquinas.com.ar"*.
- Tamaño: 102.738 bytes (PNG, compressionLevel 9).
- Verificación visual: primera versión con tagline a 44 px se desbordaba →
  regenerada a 33 px con el texto dentro de márgenes (check visual de la
  imagen antes de commitear).

### `src/layouts/LayoutBase.astro`
- `urlImagen` → `…/assets/images/social-card.png` (impacta `og:image`,
  `twitter:image` **y** el `image` del schema `AutoRepair`).
- Nuevas meta tags: `og:image:type`, `og:image:width` (1200),
  `og:image:height` (630), `og:image:alt`, `twitter:image:alt`
  (const compartida `altImagenSocial`).
- Se mantiene `twitter:card = summary_large_image` (ya existía) — es la
  plantilla grande, que exige imagen ≥1200×630: ahora cumplida.

### `scripts/validar-sitio.mjs`
- Nueva sección **"Vistas previas en redes (OG / Twitter)"**: verifica las
  9 etiquetas en la home y que `social-card.png` exista en `dist/` y mida
  1200×630 (lectura del header IHDR del PNG).

## Validación

- `pnpm build` → 8 páginas, 0 errores.
- `pnpm validar` → **OK (0 fallos)**, ahora con 3 secciones nuevas de
  infraestructura (datos del negocio, OG/Twitter y las previas de
  robots/sitemap/404).

## Pendientes

- Cliente: clic "Activate Form" (FormSubmit) y prueba real del formulario.
- Cliente: fotos de Instagram → `public/assets/images/fotos/`.
- Standby: razón social (CUIT), dominio propio (DNS + Search Console).
