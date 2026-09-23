# Bitácora 08 — Página de servicio: Reparación de autoelevadores

**Fecha:** 2026-09-22
**Fase:** FASE 2 — Página 1 de 6

## Acción realizada

Creación de `src/pages/reparacion-autoelevadores.astro` → ruta `/reparacion-autoelevadores/`:

1. **Head / SEO**: title (53 c.) `Reparación de Autoelevadores en Buenos Aires | PROMAQ`,
   meta description (147 c.) con keyword primaria + CTA, keywords de `keywords.md` §2,
   canonical y OG/Twitter heredados de `LayoutBase.astro`.
2. **Schema JSON-LD**: 3 bloques —
   `AutoRepair` (compartido), `FAQPage` (6 preguntas, espejo 1:1 desde la misma fuente
   de datos) y `schemaAdicional` con `@graph` = `Service` (provider por `@id` al
   negocio, `areaServed` de 7 zonas) + `BreadcrumbList` (Inicio → Página).
3. **Secciones**: hero con miga de pan visible, bloque de confianza (4 H3),
   grid de 6 trabajos (long-tail: preventivo, hidráulico, frenos/transmisión,
   combustión, eléctricos, auxilio mecánico), proceso en 4 pasos, cobertura GEO
   con chips de zonas y modificadores de servicio, otros servicios (4 cards),
   banner de urgencia y FAQ + CTA a `/contacto/`.
4. **Miga de pan visible** espejo del `BreadcrumbList` (consistente home ↔ schema).

## Validaciones ejecutadas

- `pnpm build` → 2 páginas (`/` y `/reparacion-autoelevadores/`), sin errores.
- JSON-LD: 3 bloques, JSON válido; `provider.@id` resuelve al `@id` del negocio.
- Jerarquía: 1 H1, 10 H2, 21 H3 (el supuesto desbalance de `details/summary`
  era el comentario HTML `<!-- <details>/<summary> -->`, marcado real: 6/6).
- FAQ visible == FAQPage schema: coincide (6/6 preguntas).
- Rutas a servicios: presentes (4 usos c/u, `/contacto/` 5).
- Sin `cdn.tailwindcss.com`; único script no-JSONLD: menú móvil.
- Todas las keywords de `keywords.md` §2 presentes en el HTML.

## Siguiente

- 2/6: `/venta-de-filtros/`
