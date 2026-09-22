// Configuración de Astro - PROMAQ MÁQUINAS
// Stack: Astro (HTML estático) + Tailwind CSS v4 (vía plugin Vite)
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.promaqmaquinas.com.ar',
  vite: {
    plugins: [tailwindcss()],
  },
});
