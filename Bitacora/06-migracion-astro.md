# Bitácora 06 — Migración a Astro + Tailwind v4

**Fecha:** 2026-09-22
**Fase:** FASE 1.5 — Migración de HTML estático a Astro

## Contexto

El HTML estático sin build obligaba a replicar header/footer en 6 páginas
(Fase 2). Se migró a **Astro + Tailwind v4** para tener layout y componentes
reutilizables manteniendo HTML 100% estático de salida (mejor para SEO/AEO).

## Decisiones tomadas

- **Astro 7.3.3** + **Tailwind CSS 4.3.3** vía `@tailwindcss/vite` (reemplaza el CDN).
- **pnpm** como gestor de paquetes (Node v24.21.0 ya instalado vía pnpm;
  solo hubo que agregar `~/.local/share/pnpm/bin` al PATH).
- **Tailwind v4**: paleta y tipografías en `src/styles/global.css` con `@theme`
  (configuración en CSS, sin `tailwind.config.js`).
- **Archivos viejos conservados** (`index.html`, `css/`, `js/`) como referencia
  hasta validar los nuevos; se eliminan en el commit siguiente.
- `pnpm.onlyBuiltDependencies: ["esbuild"]` en `package.json` (pnpm 10 requiere
  aprobar scripts de build).

## Archivos creados

| Archivo | Contenido |
|---|---|
| `package.json` | scripts dev/build/preview + deps |
| `astro.config.mjs` | site URL + plugin Tailwind v4 |
| `tsconfig.json` | extiende `astro/tsconfigs/base` |
| `src/styles/global.css` | Tailwind v4 + `@theme` (paleta) + estilos custom |
| `src/layouts/LayoutBase.astro` | `<head>` SEO + Schema AutoRepair + Header + slot + Footer + WhatsApp |
| `src/components/Header.astro` | barra superior + navbar sticky + menú móvil + script |
| `src/components/Footer.astro` | footer completo |
| `src/components/WhatsAppFlotante.astro` | botón flotante |
| `src/components/TarjetaServicio.astro` | card de servicio reutilizable |
| `src/components/PreguntaFrecuente.astro` | acordeón `<details>` reutilizable |
| `src/pages/index.astro` | home migrada (11 secciones) |
| `public/assets/images/LEEME.txt` | placeholder para el logo |
| `.gitignore` | + `dist/`, `.astro/`, `.pnpm-store/` |

## Build y validación

- `pnpm build` → `dist/index.html` generado (591ms, 1 página).
- JSON-LD `AutoRepair` + `FAQPage`: válidos.
- Jerarquía: 1 H1, 8 H2, 9 H3 — idéntica al HTML original.
- Balance de etiquetas: sin errores.
- FAQ visible == FAQ schema: coincide (generada desde la misma fuente de datos).
- Rutas a las 6 páginas dedicadas: presentes.
- Tailwind CDN eliminado; CSS propio generado (28KB, purgado).
- `cdn.tailwindcss.com` no aparece en la salida (correcto).
- Script del menú: inlineado y minificado, misma lógica
  (nombres semánticos en el fuente).

## Pendientes (heredados de Fase 1)

1. Dirección y geolocalización en Schema (`streetAddress: "A COMPLETAR"`).
2. Horarios por confirmar (L-V 8-18 / Sáb 8-12, provisorios).
3. Logo en `public/assets/images/logo.png`.
4. CUIT en Footer.

## Siguiente

- Eliminar archivos estáticos viejos (commit `chore: remove legacy static files`).
- Verificar deploy en Vercel (proyecto `promaq` vinculado).
- **FASE 2**: páginas de servicio con Astro.
