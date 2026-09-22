# Bitácora 07 — Eliminación de archivos legacy + config Vercel

**Fecha:** 2026-09-22

## Acción realizada

Los archivos nuevos (Astro) fueron construidos y validados (bitácora 06),
por lo que se procedió a eliminar los estáticos originales según lo acordado:

- `index.html` → reemplazado por `src/pages/index.astro`
- `css/styles.css` → reemplazado por `src/styles/global.css`
- `js/main.js` → reemplazado por el `<script>` de `src/components/Header.astro`
- Carpetas `css/` y `js/` eliminadas (quedaban vacías)

Commit: `chore: remove legacy static files`

## Configuración de Vercel

El proyecto `promaq` en Vercel (https://promaq-wine.vercel.app) fue creado como
sitio estático **antes** de la migración a Astro. Se agregó `vercel.json` para
que el build use siempre:

- `framework: astro`
- `installCommand: pnpm install`
- `buildCommand: pnpm build`
- `outputDirectory: dist`

Commit: `chore: add vercel build configuration`

## Comandos útiles

- Desarrollo local: `pnpm dev`
- Build de producción: `pnpm build` → `dist/`
- Preview local del build: `pnpm preview`
