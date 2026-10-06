// Validador del sitio PROMAQ MÁQUINAS (FASE 2 + infraestructura SEO)
// Uso: pnpm validar  (requiere previamente: pnpm build)
//
// Por página: JSON-LD válido + tipos requeridos, espejo FAQ visible==schema,
// 1 H1, canonical/og:url, sin Tailwind CDN, scripts, WhatsApp, backend del
// formulario. Global: email del negocio, robots.txt, sitemap y 404.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url)).replace(/\/$/, '');
const dominio = 'https://www.promaqmaquinas.com.ar';

const paginas = [
  { ruta: '/', archivo: `${raiz}/dist/index.html`, requeridos: ['FAQPage'] },
  { ruta: '/reparacion-autoelevadores/', archivo: `${raiz}/dist/reparacion-autoelevadores/index.html`, requeridos: ['Service', 'BreadcrumbList', 'FAQPage'] },
  { ruta: '/venta-de-filtros/', archivo: `${raiz}/dist/venta-de-filtros/index.html`, requeridos: ['ItemList', 'FAQPage'] },
  { ruta: '/fabricacion-filtros-especiales/', archivo: `${raiz}/dist/fabricacion-filtros-especiales/index.html`, requeridos: ['Service', 'FAQPage'] },
  { ruta: '/venta-de-autoelevadores/', archivo: `${raiz}/dist/venta-de-autoelevadores/index.html`, requeridos: ['ItemList', 'FAQPage'] },
  { ruta: '/alquiler-de-maquinaria/', archivo: `${raiz}/dist/alquiler-de-maquinaria/index.html`, requeridos: ['Service', 'FAQPage'] },
  { ruta: '/contacto/', archivo: `${raiz}/dist/contacto/index.html`, requeridos: ['ContactPage'] },
];

const sinAcentos = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const limpiar = (s) => sinAcentos(s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')).trim();

// --- keywords.md: secciones 1-6 -> keywords por sección ---
const md = readFileSync(`${raiz}/keywords.md`, 'utf8');
const secciones = {};
let actual = null;
for (const linea of md.split('\n')) {
  const enc = linea.match(/^## (\d+)\./);
  if (enc) { actual = enc[1]; secciones[actual] = []; continue; }
  if (actual && linea.startsWith('- **')) {
    const lista = linea.replace(/^- \*\*[^:]*:\*\*/, '').split(',').map((k) => k.trim().replace(/\.$/, '')).filter(Boolean);
    secciones[actual].push(...lista);
  }
}
const keywordPorSeccion = {
  1: { archivo: paginas[0].archivo, kws: secciones[1] },
  2: { archivo: paginas[1].archivo, kws: secciones[2] },
  3: { archivo: paginas[2].archivo, kws: secciones[3] },
  4: { archivo: paginas[3].archivo, kws: secciones[4] },
  5: { archivo: paginas[4].archivo, kws: secciones[5] },
  6: { archivo: paginas[5].archivo, kws: secciones[6] },
};

let fallos = 0;
const err = (msg) => { fallos++; console.log(`  ✗ ${msg}`); };
const ok = (msg) => console.log(`  ✓ ${msg}`);

const recolectarTipos = (nodo, tipos) => {
  if (Array.isArray(nodo)) return nodo.forEach((n) => recolectarTipos(n, tipos));
  if (!nodo || typeof nodo !== 'object') return;
  if (nodo['@type']) (Array.isArray(nodo['@type']) ? nodo['@type'] : [nodo['@type']]).forEach((t) => tipos.add(t));
  if (nodo['@graph']) recolectarTipos(nodo['@graph'], tipos);
};

for (const pag of paginas) {
  console.log(`\n== ${pag.ruta} ==`);
  let html;
  try { html = readFileSync(pag.archivo, 'utf8'); } catch { err(`no existe ${pag.archivo}`); continue; }

  // 1) JSON-LD válido
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const tipos = new Set();
  let jsonOk = scripts.length > 0;
  for (const s of scripts) {
    try {
      const datos = JSON.parse(s[1]);
      recolectarTipos(datos, tipos);
    } catch (e) { jsonOk = false; err(`JSON-LD inválido: ${e.message}`); }
  }
  if (jsonOk) ok(`JSON-LD válido (${scripts.length} bloques)`); else if (!fallos) err('JSON-LD inválido');

  // 2) Tipos requeridos (LocalBusiness/AutoRepair global en todas)
  const globalOk = tipos.has('LocalBusiness') || tipos.has('AutoRepair');
  if (globalOk) ok('schema global LocalBusiness/AutoRepair presente'); else err('falta schema global LocalBusiness/AutoRepair');
  for (const t of pag.requeridos) {
    if (tipos.has(t)) ok(`tipo ${t}`); else err(`falta tipo ${t}`);
  }

  // 3) Espejo FAQ: <summary> visibles == FAQPage mainEntity (sin comentarios HTML)
  if (tipos.has('FAQPage')) {
    const htmlSinComentarios = html.replace(/<!--[\s\S]*?-->/g, '');
    const faqScript = scripts.map((s) => { try { return JSON.parse(s[1]); } catch { return null; } })
      .flatMap((d) => (d?.['@graph'] ?? [d]))
      .find((n) => n && n['@type'] === 'FAQPage');
    const visibles = [...htmlSinComentarios.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) => limpiar(m[1]));
    const esquema = (faqScript?.mainEntity ?? []).map((q) => limpiar(q.name));
    if (visibles.length === 0) err('FAQPage sin acordeón visible');
    else if (visibles.length !== esquema.length) err(`FAQ desalineado: visibles=${visibles.length} schema=${esquema.length}`);
    else if (visibles.some((v, i) => v !== esquema[i])) err('FAQ desalineado: preguntas distintas entre visible y schema');
    else ok(`FAQ espejo 1:1 (${visibles.length} preguntas)`);
  }

  // 4) Un solo H1
  const h1 = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1 === 1) ok('1 H1'); else err(`${h1} H1 (debe ser 1)`);

  // 5) canonical y og:url
  const esperado = `${dominio}${pag.ruta}`;
  const canon = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ogurl = html.match(/property="og:url" content="([^"]+)"/)?.[1];
  if (canon === esperado) ok('canonical correcto'); else err(`canonical="${canon}" esperado="${esperado}"`);
  if (ogurl === esperado) ok('og:url correcto'); else err(`og:url="${ogurl}" esperado="${esperado}"`);

  // 6) Sin Tailwind CDN
  if (!html.includes('cdn.tailwindcss.com')) ok('sin Tailwind CDN'); else err('Tailwind CDN presente');

  // 7) Scripts inline no-JSONLD: menú (y formulario en contacto)
  const inlineNoLd = [...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)]
    .filter((m) => !m[1].includes('src='));
  const esperadosScripts = pag.ruta === '/contacto/' ? 2 : 1;
  if (inlineNoLd.length === esperadosScripts) ok(`${inlineNoLd.length} scripts inline no-JSONLD (menú${pag.ruta === '/contacto/' ? ' + formulario' : ''})`);
  else err(`${inlineNoLd.length} scripts inline no-JSONLD (esperado ${esperadosScripts})`);

  // 8) WhatsApp presente + backend del formulario en contacto
  if (html.includes('wa.me/5491132077351')) ok('links WhatsApp'); else err('sin links WhatsApp');
  if (pag.ruta === '/contacto/') {
    if (/<form[^>]*action="https:\/\/formsubmit\.co\//.test(html)) ok('formulario con backend FormSubmit');
    else err('formulario sin backend FormSubmit');
    if (/<form[^>]*action="mailto:/.test(html)) err('formulario aún usa mailto:');
  }
}

// --- keywords.md por sección en su propia página ---
console.log('\n== keywords.md §1-§6 (en su página) ==');
let total = 0, usadas = 0;
for (const [sec, { archivo, kws }] of Object.entries(keywordPorSeccion)) {
  const html = sinAcentos(readFileSync(archivo, 'utf8'));
  for (const kw of kws) {
    total++;
    if (html.includes(sinAcentos(kw))) usadas++;
    else err(`§${sec} keyword ausente en página: "${kw}"`);
  }
}
if (usadas === total) ok(`${usadas}/${total} keywords usadas`);
else console.log(`  → ${usadas}/${total} keywords usadas`);

// --- Chequeos globales (email, robots, sitemap, 404, datos del negocio) ---
console.log('\n== Infraestructura SEO / contacto ==');
const leerDist = (ruta) => {
  try { return readFileSync(`${raiz}/dist/${ruta}`, 'utf8'); } catch { return null; }
};

// Email correcto: ninguna página conserva el dominio viejo "pro.maq"
let residuo = 0;
for (const pag of paginas) {
  const html = readFileSync(pag.archivo, 'utf8');
  if (html.includes('pro.maq@yahoo.com.ar')) { residuo++; err(`email viejo pro.maq residual en ${pag.ruta}`); }
}
if (residuo === 0) ok('sin residuos del email viejo (pro.maq) en las 7 páginas');

// robots.txt con Sitemap
const robots = leerDist('robots.txt');
if (robots && robots.includes('Sitemap: https://www.promaqmaquinas.com.ar/sitemap-index.xml')) ok('robots.txt con Sitemap');
else err('robots.txt ausente o sin línea Sitemap');

// sitemap con las 7 páginas y sin la 404
const sitemap = leerDist('sitemap-0.xml');
if (!sitemap) err('sitemap-0.xml ausente');
else {
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const esperadasSitemap = paginas.map((p) => `${dominio}${p.ruta}`);
  const faltan = esperadasSitemap.filter((u) => !urls.includes(u));
  if (urls.includes(`${dominio}/404/`)) err('el sitemap incluye la 404');
  else if (faltan.length) err(`sitemap sin: ${faltan.join(', ')}`);
  else ok('sitemap con las 7 URLs y sin 404');
}

// 404: existe, noindex, sin canonical, 1 H1
const pagina404 = leerDist('404.html');
if (!pagina404) err('dist/404.html ausente');
else {
  if (pagina404.includes('content="noindex, nofollow"')) ok('404 con noindex');
  else err('404 sin noindex');
  if (pagina404.includes('rel="canonical"')) err('404 con canonical (no debe tener)');
  else ok('404 sin canonical');
  if ((pagina404.match(/<h1[\s>]/g) ?? []).length === 1) ok('404 con 1 H1');
  else err('404 sin 1 H1');
}

// Datos del negocio en el schema (dirección, CP, coordenadas, CUIT, email)
console.log('\n== Datos del negocio ==');
const home = readFileSync(paginas[0].archivo, 'utf8');
const datosEsperados = [
  ['dirección', 'Arévalo 2880'],
  ['localidad', 'General Pacheco'],
  ['código postal', 'B1617'],
  ['latitud', '-34.444125'],
  ['longitud', '-58.6751884'],
  ['CUIT', '20-34094172-2'],
  ['email', 'pro_maq@yahoo.com.ar'],
  ['teléfono', '+5491132077351'],
];
for (const [que, valor] of datosEsperados) {
  if (home.includes(valor)) ok(`${que}: ${valor}`);
  else err(`falta ${que} en el schema de la home: ${valor}`);
}
if (!home.includes('A COMPLETAR')) ok('sin marcadores A COMPLETAR');
else err('quedan marcadores "A COMPLETAR" en el schema');

// Vistas previas en redes: Open Graph + Twitter Card con imagen 1200x630
console.log('\n== Vistas previas en redes (OG / Twitter) ==');
const etiquetasSociales = [
  ['og:image → social-card.png', 'property="og:image" content="https://www.promaqmaquinas.com.ar/assets/images/social-card.png"'],
  ['og:image:type image/png', '<meta property="og:image:type" content="image/png">'],
  ['og:image:width 1200', '<meta property="og:image:width" content="1200">'],
  ['og:image:height 630', '<meta property="og:image:height" content="630">'],
  ['og:image:alt', 'property="og:image:alt"'],
  ['og:site_name', 'property="og:site_name"'],
  ['og:locale es_AR', '<meta property="og:locale" content="es_AR">'],
  ['twitter:card summary_large_image', '<meta name="twitter:card" content="summary_large_image">'],
  ['twitter:image:alt', 'name="twitter:image:alt"'],
];
for (const [que, aguja] of etiquetasSociales) {
  if (home.includes(aguja)) ok(que); else err(`falta ${que}`);
}
try {
  const png = readFileSync(`${raiz}/dist/assets/images/social-card.png`);
  const ancho = png.readUInt32BE(16);
  const alto = png.readUInt32BE(20);
  if (ancho === 1200 && alto === 630) ok(`social-card.png ${ancho}x${alto}`);
  else err(`social-card.png mide ${ancho}x${alto} (esperado 1200x630)`);
} catch {
  err('dist/assets/images/social-card.png ausente');
}

console.log(`\nRESULTADO: ${fallos === 0 ? 'OK (0 fallos)' : `${fallos} FALLO(S)`}`);
process.exit(fallos === 0 ? 0 : 1);
