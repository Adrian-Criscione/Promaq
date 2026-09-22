# Bitácora 05 — Subida a GitHub

**Fecha:** 2026-09-22
**Acción:** Publicación del repositorio inicial

## Decisiones (acordadas con el cliente)

1. **Repositorio:** se usa el ya existente **`Adrian-Criscione/Promaq`** (público)
   en lugar de crear uno nuevo `promaq-web` (evita duplicados).
2. **Identidad del commit:** leída de GitHub (`gh api user`):
   `Adrian Criscione <jadriancriscione@gmail.com>`.
   (Nota: `gh api user/emails` requiere scope `user`; se usó el email del perfil.)
3. **Archivos excluidos:** solo se suben los archivos del sitio.
   `AGENTS.md`, `keywords.md` y los artefactos `*:Zone.Identifier`
   se agregaron al `.gitignore` junto a `.vercel`, `node_modules/` y `.env`.

## Acciones ejecutadas

1. `.gitignore` completado (ya existía con `.vercel`; se sumaron los que faltaban).
2. `git init -b main` → rama principal `main`.
3. `git config user.name / user.email` (config local del repo).
4. `git add -A` + verificación con `git status --ignored`:
   - **Subidos (8):** `.gitignore`, `index.html`, `css/styles.css`, `js/main.js` y 4 bitácoras.
   - **Ignorados (5):** `.vercel/`, `AGENTS.md`, `keywords.md` y 2 `Zone.Identifier`.
5. Commit: `feat: initial commit promaq static site` → `3daf03c` (908 líneas).
6. `git remote add origin https://github.com/Adrian-Criscione/Promaq.git`
   + `git push -u origin main` → rama `main` creada y tracking activo.

## Estado final

- Repo: `https://github.com/Adrian-Criscione/Promaq` (público, rama `main`).
- Working tree limpio; cambios futuros se suben con `git add -A && git commit && git push`.
