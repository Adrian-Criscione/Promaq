# Bitácora 03 — SEO, AEO y GEO de la Home

**Fecha:** 2026-09-22
**Fase:** FASE 1 — Home

## Acción realizada

Definición de la capa de posicionamiento en `index.html`:

## SEO (meta tags)

- **Title** (59 caracteres): `PROMAQ MÁQUINAS | Service de Autoelevadores en Buenos Aires`
- **Meta description** (~160 caracteres) con keyword primaria
  ("servicio integral de autoelevadores" + "mantenimiento de maquinaria pesada en
  Buenos Aires"), cobertura Entre Ríos y CTA ("Cotizá hoy →").
- Canonical a `https://www.promaqmaquinas.com.ar/`.
- Open Graph (`es_AR`) + Twitter Cards `summary_large_image`.
- Favicon SVG inline con la "P" naranja sobre fondo grafito.

## AEO (Answer Engine Optimization)

- `FAQPage` en JSON-LD con 5 preguntas, **idénticas** al acordeón visible
  (verificado por script: FAQ visible == schema).
- Respuestas en formato directo (Sí/…) ideales para snippets y respuestas de IA.
- Jerarquía: H1 único → H2 por servicio y por sección → H3 en FAQ y ventajas.

## GEO (Local SEO)

- `areaServed`: CABA, Zona Norte/Oeste/Sur GBA, Provincia de Buenos Aires,
  **Entre Ríos** y Argentina (allí donde aplica, también en footer y barra superior).
- `telephone` en formato internacional `+5491132077351`.
- `geo` (GeoCoordinates) provisorio: centro de Buenos Aires (-34.6037, -58.3816).

## Pendientes marcados con TODO en el HTML

1. `streetAddress` del Schema → "A COMPLETAR" (dirección no confirmada).
2. Coordenadas reales → reemplazar las provisorias.
3. `openingHoursSpecification` → L-V 8-18 / Sáb 8-12 **provisorios, a confirmar**.
4. CUIT y dirección en el Footer.
