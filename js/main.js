/* ============================================================
   PROMAQ MÁQUINAS - JavaScript principal
   Regla crítica del proyecto: JS mínimo indispensable, variables
   con nombres semánticos en español/inglés claro.
   En esta Fase 1 solo se usa JS para el menú móvil.
   El FAQ usa <details>/<summary> nativos (0 JS) y el scroll
   suave se resuelve con CSS (ver css/styles.css).
   ============================================================ */

const menuToggle = document.getElementById('menuToggle');
const menuMovil = document.getElementById('menuMovil');
let isMenuOpen = false;

function alternarMenu() {
  isMenuOpen = !isMenuOpen;
  menuMovil.classList.toggle('hidden', !isMenuOpen);
  menuToggle.setAttribute('aria-expanded', String(isMenuOpen));
}

if (menuToggle && menuMovil) {
  menuToggle.addEventListener('click', alternarMenu);

  // Cerrar el menú al tocar cualquiera de sus enlaces
  const enlacesMenu = menuMovil.querySelectorAll('a');
  enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      if (isMenuOpen) {
        alternarMenu();
      }
    });
  });
}
