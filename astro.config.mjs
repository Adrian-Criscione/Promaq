// Configuración de Astro - PROMAQ MÁQUINAS
// Stack: Astro (HTML estático) + Tailwind CSS v4 (vía plugin Vite)
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.promaqmaquinas.com.ar',
  integrations: [
    sitemap({
      // La página 404 no debe aparecer en el sitemap
      filter: (pagina) => !pagina.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
