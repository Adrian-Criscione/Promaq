# Bitácora 11 — Formulario de contacto: de `mailto:` a backend con JS

**Fecha:** 2026-09-23
**Decisión del usuario:** pasar el formulario de `/contacto/` a backend/JS
(se descartó el `mailto:` por depender del cliente de correo del visitante).

## Cambios en `src/pages/contacto.astro`

### Backend
- `action` → **FormSubmit**: `https://formsubmit.co/pro.maq@yahoo.com.ar`
  (POST nativo, sin cuenta ni dependencias en el repo).
- Hidden inputs:
  - `_subject` = "Consulta desde la web - PROMAQ MÁQUINAS"
  - `_template` = `table` (email con las fields en tabla)
  - `_captcha` = `false` (sin captcha de FormSubmit; anti-bot por honeypot)
  - `_next` = `{urlPagina}?enviado=1` (vuelve a la página tras el POST sin JS)
  - `_honey` = campo trampa oculto (si lo rellena un bot, se descarta)

### JS progresivo (1 script inline en la página)
- Variables con nombres en español y lógica mínima: `formularioConsulta`,
  `botonEnviar`, `estadoFormulario`, `datosFormulario`, `urlBackend`.
- `submit` → `preventDefault()`, `fetch` POST al endpoint JSON
  (`formsubmit.co/ajax/…`) con `Accept: application/json`.
- Envía `_ReplyTo` con el email del visitante si lo completó.
- Estados visibles en `<p id="estado-formulario" role="status" aria-live="polite">`:
  "Enviando consulta…" (deshabilita el botón), éxito en verde tras `reset()`,
  error en rojo sugiriendo WhatsApp. El botón se re-habilita en `finally`.
- **Fallback sin JS:** el POST nativo de FormSubmit redirige con `_next` a
  `/contacto/?enviado=1`.

### Copy
- Nota bajo el botón: antes "se abrirá tu aplicación de correo…" →
  "La consulta llega a pro.maq@yahoo.com.ar y te respondemos a la brevedad".
- Tarjeta de email y canal `mailto:` del aside se mantienen (son un canal
  directo, no el formulario).

## Validación

- `pnpm build` → 7 páginas, 0 errores.
- Validador `/tmp/opencode/validar-fase2.mjs` ampliado:
  - contacto: **2 scripts inline no-JSONLD** (menú + formulario), resto 1;
  - `<form action="https://formsubmit.co/…">` presente;
  - ausencia de `<form action="mailto:">`.
  - Resultado: **7/7 páginas, 0 fallos**, keywords 38/38.

## Acción pendiente del cliente (activación)

- **Primer envío** de prueba: FormSubmit manda un mail de activación a
  `pro.maq@yahoo.com.ar` (revisar Spam). Confirmar el link para que lleguen
  los siguientes. Hasta activar, los envíos no se entregan.
