# Bitácora 01 — Estructura base del sitio

**Fecha:** 2026-09-22
**Fase:** FASE 1 — Home

## Acción realizada

Creación de la estructura base de archivos acordada en el plan:

- `css/styles.css` → ajustes puntuales fuera de Tailwind (scroll suave CSS, fondo
  rejilla industrial del hero, marcador del acordeón FAQ, foco visible, selección
  de color de marca). Sin dependencias.
- `js/main.js` → único JS del sitio en esta fase: menú móvil
  (`menuToggle`, `menuMovil`, `isMenuOpen`, `alternarMenu()`).
  FAQ con `<details>/<summary>` nativos y scroll suave con CSS (cero JS).
- Carpeta `Bitacora/` → creado este registro de acciones.

## Pendiente

- `assets/images/logo.png` → aún no existe; el HTML la referencia igual
  (se verá el wordmark de texto hasta que cargues el logo).
