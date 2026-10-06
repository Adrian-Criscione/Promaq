# Bitácora 15 — Header: eliminado el texto de marca junto al logo

**Fecha:** 2026-10-06
**Petición del usuario:** quitar el `<span>` con "PROMAQ MÁQUINAS" al lado
del logo en el Header y reacomodar la barra para que ese espacio no parezca
un hueco.

## Cambio en `src/components/Header.astro`

- Eliminado el `<span class="font-display …">PROMAQ <span…>MÁQUINAS</span></span>`
  (redundante: el `logo.webp` ya es el wordmark completo de la marca).
- El logo crece para ocupar el espacio: `h-12` (48 px) → **`h-14` (56 px) en
  móvil y `sm:h-16` (64 px) desde 640 px**, dentro de la barra `h-20` (80 px):
  queda con 8 px de aire arriba y abajo y much más presencia visual.
- Se quitó `gap-3` del `<a>` (ya no tiene un segundo hijo).
- Accesibilidad sin cambios: el `<a>` conserva `aria-label="PROMAQ MÁQUINAS
  - Ir al inicio"` y el `<img>` su `alt`.

## Validación

- `pnpm build` → 8 páginas, 0 errores.
- `pnpm validar` → OK (0 fallos). Verificado en `dist/`: sin el `span` y con
  la clase nueva del logo.
