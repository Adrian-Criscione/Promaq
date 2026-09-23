# Bitácora 09 — FASE 2 completa: páginas de servicio y contacto

**Fecha:** 2026-09-22
**Fase:** FASE 2 — 6 rutas pendientes construidas (1 de 6 en bitácora 08)

## Archivos creados / ajustados

| Archivo | Ruta | Schema (además de AutoRepair + FAQPage) |
|---|---|---|
| `src/pages/reparacion-autoelevadores.astro` | `/reparacion-autoelevadores/` | `Service` + `BreadcrumbList` |
| `src/pages/venta-de-filtros.astro` | `/venta-de-filtros/` | `Service` + `ItemList[Product×4]` + `BreadcrumbList` |
| `src/pages/fabricacion-filtros-especiales.astro` | `/fabricacion-filtros-especiales/` | `Service` + `BreadcrumbList` |
| `src/pages/venta-de-autoelevadores.astro` | `/venta-de-autoelevadores/` | `Service` + `ItemList[Product×3]` + `BreadcrumbList` |
| `src/pages/alquiler-de-maquinaria.astro` | `/alquiler-de-maquinaria/` | `Service` + `BreadcrumbList` |
| `src/pages/contacto.astro` | `/contacto/` | `ContactPage` (LocalBusiness lo emite LayoutBase) |

### Ajustes sobre la página de reparación (revisión de keywords)

1. Nueva tarjeta **"Reparación de mástiles, cadenas e izaje"** (faltaba "mástil").
2. Título de tarjeta ajustado a "Arreglo de frenos y transmisión de **autoelevadores**".
3. Mástiles sumados al párrafo hero y a la `description` del `Service`.
4. Los 3 botones WhatsApp de la página usan ahora el mensaje pedido:
   `Hola Emmanuel, consulto por presupuesto para service/reparación de autoelevador`.

## Mensajes de WhatsApp por página (verificados en build)

- reparacion → "…presupuesto para service/reparación de autoelevador"
- venta-de-filtros → "…disponibilidad y precios de filtros"
- fabricacion → "…fabricación de un filtro a medida/especial"
- venta-de-autoelevadores → "…autoelevadores disponibles para la venta"
- alquiler → "…alquiler de un autoelevador / maquinaria"
- contacto → mensaje genérico de contacto
- (Footer y botón flotante conservan el mensaje genérico, decisión bitácora 02)

## Formulario de contacto

- Form simple (nombre, teléfono, email, empresa, servicio, mensaje) **sin JavaScript**:
  `action="mailto:pro.maq@yahoo.com.ar"` + aviso visible al usuario.
  Alternativa pendiente de confirmación: servicio externo (Formspree/FormSubmit) o
  envío vía WhatsApp con JS mínimo.

## Validaciones ejecutadas (`pnpm build` → 7 páginas)

- Build: 7 rutas generadas, 0 errores de sintaxis.
- JSON-LD: 7/7 páginas con JSON válido y tipos requeridos por página.
- FAQ visible == FAQPage schema en las 6 páginas con FAQ (espejo 1:1, misma fuente).
- Jerarquía: 1 H1 por página; balance de tags OK (incluye `form/select/label` en contacto).
- Canonical y `og:url` correctos en las 7 páginas.
- Sin `cdn.tailwindcss.com`; exactamente 1 script no-JSONLD por página (menú móvil).
- **Keywords `keywords.md` §1–§6: 100% usadas** (38/38, todas coinciden de forma exacta
  o por orden de tokens en el HTML de su página).

## Pendientes heredados (cliente)

Dirección/geo del Schema, horarios por confirmar, logo (`public/assets/images/logo.png`),
CUIT en Footer.
