# Bitácora 12 — Logo, corrección de email, sitemap/robots y 404

**Fecha:** 2026-09-25
**Alcance:** pendientes del cliente nº 2 y 3 (logo + formulario) y SEO técnico
nº 4 y 5 (sitemap/robots + 404), sobre los pendientes de la revisión general.

## 1. Logo (pendiente cliente nº 2)

- El cliente cargó `public/assets/images/logo.png` (320×120 px, RGBA).
- Se eliminó el artefacto `logo.png:Zone.Identifier` (metadato de descarga de
  Windows que se habría publicado con el sitio).
- Efecto: el `<img>` del Header y el `og:image`/`twitter:image` del `LayoutBase`
  ya resuelven a un archivo real (antes la URL rota impedía las vistas previas
  en redes).
- **Recomendación pendiente:** para que las vistas previas en WhatsApp /
  LinkedIn / X salgan con imagen completa conviene una versión social de
  ~1200×630 px (el logo actual es 320×120 y queda pequeño/chico en la card).

## 2. Email corregido (afectaba el formulario = pendiente nº 3)

- El correo real es **`pro_maq@yahoo.com.ar`** (guion bajo), no `pro.maq@…`.
- Reemplazo en 5 archivos (8 apariciones):
  - `src/layouts/LayoutBase.astro` → `schemaNegocio.email`
  - `src/components/Header.astro` → `mailto:` + texto visible
  - `src/components/Footer.astro` → `mailto:` + texto visible
  - `src/pages/contacto.astro` → `emailMostrar` (alimenta el `action` de
    FormSubmit) + comentario
  - `src/pages/reparacion-autoelevadores.astro` → respuesta de FAQ
- **Prueba de activación (pendiente nº 3):** POST de prueba al endpoint AJAX
  de FormSubmit → respondió *"This form needs Activation. We've sent you an
  email…"*. **Queda del lado del cliente abrir el mail en `pro_maq@yahoo.com.ar`
  (revisar Spam) y clickear "Activate Form".** Hasta entonces los envíos no se
  entregan.
- Nota: el primer POST sin headers de navegador fue filtrado por anti-bot de
  FormSubmit; un envío real desde el navegador (como lo hace nuestro JS) pasa
  con normalidad.

## 3. Sitemap + robots.txt (SEO técnico nº 4)

- `astro.config.mjs`: integración **`@astrojs/sitemap`** (v3.7.4) con
  `filter` que excluye `/404`.
- `public/robots.txt` nuevo: `User-agent: * / Allow: /` + línea
  `Sitemap: https://www.promaqmaquinas.com.ar/sitemap-index.xml`.
- Build genera `dist/sitemap-index.xml` + `dist/sitemap-0.xml` con las **7
  URLs indexables** (verificado).

## 4. Página 404 (SEO técnico nº 5)

- Nuevo `src/pages/404.astro` → `dist/404.html` (Vercel lo sirve con status
  404 automáticamente): H1 "Página no encontrada", botón al inicio, botón
  WhatsApp y grilla con los 6 destinos del sitio.
- `LayoutBase.astro`: prop opcional **`noindex`** (default `false`):
  - `noindex=true` → `<meta name="robots" content="noindex, nofollow">` y
    **sin** `canonical` ni `og:url` (Google desaconseja canonical en
    páginas noindex).
  - Las 7 páginas indexables quedan igual que antes (validador lo confirma).

## Validación (`pnpm build` → 8 páginas, 0 errores)

Validador `/tmp/opencode/validar-fase2.mjs` ampliado; **RESULTADO: OK (0 fallos)**:
- 7/7 páginas: JSON-LD + tipos, FAQ espejo 1:1, 1 H1, canonical/og:url,
  sin Tailwind CDN, scripts (contacto = 2), WhatsApp, backend FormSubmit.
- keywords.md §1–§6: 38/38 en su página.
- **Nuevos:** sin residuos del email viejo `pro.maq` en el HTML; robots.txt
  con Sitemap; sitemap con las 7 URLs y sin 404; 404 con noindex, sin
  canonical y con 1 H1.

## Pendientes restantes

1. **Cliente:** datos del LocalBusiness (dirección, horarios, CUIT) → aún no
   disponibles.
2. **Cliente:** activar el formulario en FormSubmit (mail de confirmación ya
   enviado) + probar un envío real desde `/contacto/`.
3. **Cliente:** fotos desde Instagram → guardar en `public/assets/images/`
   (nombres sugeridos abajo) y luego integrarlas en las páginas.
4. **Recomendación:** versión social del logo ~1200×630 para `og:image`.
