# Bitácora 02 — Home (`index.html`)

**Fecha:** 2026-09-22
**Fase:** FASE 1 — Home (completada)

## Acción realizada

Creación de `index.html` completo (HTML5 semántico + Tailwind CDN), sin secciones omitidas:

1. **Head / SEO**: title optimizado con keywords de Home (`keywords.md`),
   meta description orientada a CTR, keywords, robots, canonical,
   Open Graph y Twitter Cards.
2. **Schema JSON-LD**: `AutoRepair` (LocalBusiness) con contacto, fundador,
   cobertura BA + **Entre Ríos**, horarios (provisorios), catálogo de los 5 servicios;
   y `FAQPage` espejo del acordeón visible.
3. **Barra superior** de contacto rápido (teléfono + email + badge de cobertura).
4. **Header sticky** con logo (`assets/images/logo.png` con fallback de wordmark),
   menú desktop con desplegable de servicios 100% CSS, menú móvil y botón de llamada.
5. **Hero**: H1 único con keyword primaria, badge de respuesta rápida,
   CTA WhatsApp + Ver servicios.
6. **Bloque de confianza**: +10 años, atención en planta, filtros a medida, rapidez.
7. **Grid de 5 tarjetas** de servicios troncales, cada una con H2, ícono SVG y
   botón "Ver más detalles y cotizar" hacia su página dedicada.
8. **Banner de urgencia** ("Service urgente en planta / minimizar tiempos de parada").
9. **FAQ** con `<details>/<summary>` nativos (cero JS), espejo 1:1 con `FAQPage`.
10. **Footer** completo: datos comerciales, servicios, contacto, cobertura, copyright.
11. **Botón flotante de WhatsApp** con mensaje predeterminado.

## Validaciones ejecutadas

- JSON-LD #1 `AutoRepair` y #2 `FAQPage`: JSON válido.
- Jerarquía: 1 H1, 8 H2, 9 H3 — sin tags sin cerrar.
- Enlaces a las 6 rutas dedicadas: presentes (4 usos c/u, `/contacto/` 3).
- FAQ visible == preguntas del schema: coincide.

## Decisiones tomadas (aprobadas en plan)

- JS total: solo menú móvil (`menuToggle`, `menuMovil`, `isMenuOpen`, `alternarMenu()`).
- Texto del flotante: versión genérica ("…para consultar sobre un servicio").
- Banner de urgencia: incluido antes del FAQ (recomendado y aceptado).
