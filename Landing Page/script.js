// Mobile Menu Toggle
const menuToggler = document.getElementById('menu-toggler');
const mobileMenu = document.getElementById('mobile-menu');

menuToggler.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggler.setAttribute('aria-expanded', isOpen);
})

document.getElementById('year').textContent = new Date().getFullYear();