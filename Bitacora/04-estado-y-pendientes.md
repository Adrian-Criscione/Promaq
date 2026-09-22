# Bitácora 04 — Estado y pendientes de la FASE 1

**Fecha:** 2026-09-22

## Archivos creados

| Archivo | Estado |
|---|---|
| `index.html` | ✅ Completo y validado |
| `css/styles.css` | ✅ Creado (scroll suave, rejilla hero, acordeón FAQ, foco) |
| `js/main.js` | ✅ Creado (solo menú móvil) |
| `Bitacora/01..04` | ✅ Este registro de acciones |
| `assets/images/logo.png` | ⚠️ Falta (referenciado en header y OG image) |

## Pendientes del cliente

1. **Dirección y geolocalización** → completar en el Schema (`streetAddress: "A COMPLETAR"`).
2. **Horarios** → confirmar L-V 8:00-18:00 / Sáb 8:00-12:00 (marcados con TODO).
3. **Logo** → subir en `assets/images/logo.png` (mientras tanto se muestra el wordmark de texto).
4. **CUIT** → agregar en el Footer cuando se confirme.

## Notas técnicas

- Las 6 rutas (`/reparacion-autoelevadores/`, `/venta-de-filtros/`,
  `/fabricacion-filtros-especiales/`, `/venta-de-autoelevadores/`,
  `/alquiler-de-maquinaria/`, `/contacto/`) **darán 404 hasta la FASE 2**
  (páginas de servicio). Es esperado.
- JS total del sitio: 1 interacción (menú móvil). FAQ y scroll: CSS/nativos.
- Para probar localmente: abrir `index.html` en el navegador
  (las rutas absolutas solo funcionarán al publicarse en el servidor).

## Siguiente fase

**FASE 2:** páginas de servicio bajo cada ruta + `/contacto/`.
