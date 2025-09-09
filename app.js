// DOM elements
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-link[aria-expanded]');
const body = document.body;

// Mobile menu functionality
function openMobileMenu() {
    // Show navigation
    nav.classList.add('visible');
    
    // Show overlay by removing the hidden class and adding the visible class
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');

    // Hide open button and show close button
    openMenuBtn.classList.add('hidden');
    closeMenuBtn.classList.remove('hidden');

    // Prevent body scroll
    body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    // Hide navigation
    nav.classList.remove('visible');

    // Hide overlay by removing the visible class and adding the hidden class
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');

    // Show open button and hide close button
    openMenuBtn.classList.remove('hidden');
    closeMenuBtn.classList.add('hidden');

    // Restore body scroll
    body.style.overflow = '';
}

// Event listeners
if (openMenuBtn) {
    openMenuBtn.addEventListener('click', openMobileMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
}

if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
}

// Dropdown functionality (unchanged)
function toggleDropdown(navLink) {
    const isOpen = navLink.getAttribute('aria-expanded') === 'true';
    closeAllDropdowns();
    if (!isOpen) {
        navLink.setAttribute('aria-expanded', 'true');
        navLink.classList.add('link-open');
    }
}

function closeAllDropdowns() {
    navLinks.forEach(link => {
        link.setAttribute('aria-expanded', 'false');
        link.classList.remove('link-open');
    });
}

// Event listeners for dropdowns (unchanged)
navLinks.forEach(navLink => {
    navLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(navLink);
    });
});

document.addEventListener('click', (e) => {
    const isNavLink = e.target.closest('.nav-link[aria-expanded]');
    const isDropdown = e.target.closest('.dropdown-list');
    if (!isNavLink && !isDropdown) {
        closeAllDropdowns();
    }
});

// Handle resize (unchanged)
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        closeMobileMenu();
        if (openMenuBtn) openMenuBtn.classList.add('hidden');
        if (closeMenuBtn) closeMenuBtn.classList.add('hidden');
        if (nav) nav.classList.remove('hidden');
    } else {
        if (openMenuBtn) openMenuBtn.classList.remove('hidden');
    }
});

// Initialize state on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 768) {
        nav.classList.add('hidden');
        closeMenuBtn.classList.add('hidden');
        openMenuBtn.classList.remove('hidden');
    } else {
        openMenuBtn.classList.add('hidden');
        closeMenuBtn.classList.add('hidden');
        nav.classList.remove('hidden');
    }
    // Ensure overlay starts hidden
    if (overlay) {
        overlay.classList.add('hidden');
    }
});