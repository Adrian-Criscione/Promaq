# Bitácora 10 — Opción A: bloques de confianza y FAQ sin repetir el index

**Fecha:** 2026-09-23
**Motivo:** El usuario detectó que la sección "¿Por qué confiar?" y el FAQ de las páginas
de servicio replicaban contenido del home. Se eligió la **Opción A**: mantener ambas
secciones pero con contenido 100% específico de cada vertica (eliminando boilerplate)
y diferenciando toda FAQ que duplicara al index.

## Cambios por archivo

### `src/pages/reparacion-autoelevadores.astro`
- **Bloque de confianza reescrito (4 tarjetas nuevas, antes casi calcadas del home):**
  1. "Diagnóstico antes de tocar la máquina" (reemplaza "+10 años de trayectoria")
  2. "Presupuesto previo por escrito" (reemplaza "Service en planta o en taller")
  3. "Repuestos y filtros para resolver en la visita" (reemplaza "Repuestos y filtros en stock")
  4. "+10 años reparando esta maquinaria" (reemplaza "Rapidez que reduce paradas", único genérico)
- Subtítulo diferenciado del home ("Cada reparación arranca con diagnóstico y presupuesto previo…").
- **FAQ #1 reemplazada** (era idéntica a la #1 del home):
  antes "¿El service de autoelevadores lo hacen en planta?" →
  ahora **"¿Qué trabajos puedo hacer en mi planta y cuáles van al taller?"** con respuesta
  propia (incluye la keyword "service de autoelevadores en planta" de forma natural).
- **Banner de urgencia diferenciado del home:** H2 "¿Tu autoelevador está parado?
  Coordinamos el auxilio mecánico hoy" (antes repetía "¿La máquina se detuvo?…" y el
  mismo párrafo "Vamos a tu planta con técnicos y repuestos…").

### `src/pages/venta-de-filtros.astro`
- Tarjeta 1 "…+10 años de trayectoria" (título idéntico al home) →
  **"Las cuatro familias, un solo proveedor"** (aire, aceite, combustible gasoil,
  hidráulicos con reposición periódica). Las otras 3 tarjetas ya eran propias.

### `src/pages/fabricacion-filtros-especiales.astro`
- Tarjeta 1 "Desarrollo sobre muestra o plano" (repetía badge/hero de la misma página) →
  **"Reposición idéntica a la aprobada"** (nueva información: se guarda la especificación).
- **FAQ #1 reemplazada** (solapaba con la #3 del home "¿Fabrican filtros especiales si no
  consigo el repuesto?"): ahora **"¿Pueden mejorar el filtro original al fabricarlo?"**.

### `src/pages/venta-de-autoelevadores.astro`
- **FAQ #1 reemplazada** (título idéntico a la #5 del home "¿Venden autoelevadores
  reacondicionados con garantía?"): ahora **"¿Qué formas de pago aceptan?"**
  (efectivo y transferencia, coherente con `paymentAccepted` del LocalBusiness).
- Las 4 tarjetas de confianza ya eran específicas de la vertica: sin cambios.

### `src/pages/alquiler-de-maquinaria.astro`
- Tarjeta 3 "Modalidades flexibles" (repetía el badge del hero "Día, mes o largo plazo") →
  **"Todo incluido en el precio"** (mantenimiento + auxilio + entrega/retiro sin costos extra).
- **FAQ #5 reencuadrada** (su respuesta replicaba la de zonas del home): ahora
  **"¿Entregan y retiran la máquina en mi planta?"** con foco en la logística del alquiler
  (la keyword de zonas/Entre Ríos se mantiene en la respuesta).

### `src/pages/contacto.astro`
- Sin bloque de confianza ni FAQ duplicada: sin cambios.

## Resultado de la revisión home ↔ páginas

- Títulos y textos de ventajas duplicados con el home: **0 restantes** (antes 3 en
  reparación + 1 en filtros, más el subtítulo y el banner).
- Preguntas FAQ duplicadas home ↔ páginas: **0 restantes** (antes 4: reparación #1,
  fabricación #1, venta #1 y, por similitud de respuesta, alquiler #5).
- FAQ por página se mantiene en 5–6 preguntas, todas propias de su vertica
  (el schema `FAQPage` se genera de la misma fuente: espejo automático).

## Validaciones (`pnpm build` → 7 páginas, 0 errores)

- Validador FASE 2 rehecho tras el reinicio del servidor (`/tmp/opencode/validar-fase2.mjs`):
  **7/7 páginas OK, 0 fallos** — JSON-LD válido con tipos requeridos por página,
  FAQ visible == schema (espejo 1:1), 1 H1, canonical/og:url, sin Tailwind CDN,
  1 script inline no-JSONLD, WhatsApp presentes, **keywords.md §1–§6: 38/38 usadas**.

## Pendientes heredados (cliente)

Dirección/geo del Schema ("A COMPLETAR"), horarios por confirmar, logo
(`public/assets/images/logo.png`), CUIT en Footer. Decisión abierta: formulario
`mailto:` vs. backend/JS (requiere confirmación del usuario). FASE 2 sin commitear.
