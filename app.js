// DOM elements
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-link[aria-expanded]');
const body = document.body;

// Mobile menu functionality - FIXED FOR CYPRESS TESTS
function openMobileMenu() {
   // Show navigation
    nav.classList.add('visible');
    
    // Show overlay
    overlay.classList.add('visible');
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';

    // Hide open button and show close button
    openMenuBtn.classList.add('hidden');
    closeMenuBtn.classList.remove('hidden');

    // Prevent body scroll
    body.style.overflow = 'hidden';
    // Prevent body scroll
    body.style.overflow = 'hidden';
    
    console.log('Mobile menu opened');
}

function closeMobileMenu() {
      // Hide navigation
    nav.classList.remove('visible');

    // Hide overlay
    overlay.classList.remove('visible');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';

    // Show open button and hide close button
    openMenuBtn.classList.remove('hidden');
    closeMenuBtn.classList.add('hidden');

    // Restore body scroll
    body.style.overflow = '';
    
    // Restore body scroll
    body.style.overflow = '';
    
    console.log('Mobile menu closed');
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


// Dropdown functionality
function toggleDropdown(navLink) {
    const isOpen = navLink.getAttribute('aria-expanded') === 'true';
    closeAllDropdowns(); // Close all other dropdowns
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

// Dropdown toggle on click
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

// Handle escape key to close menus
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (nav && nav.classList.contains('visible')) {
            closeMobileMenu();
        } else {
            closeAllDropdowns();
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        closeMobileMenu();
        // Ensure buttons are hidden and nav is visible on desktop
        if (openMenuBtn) openMenuBtn.classList.add('hidden');
        if (closeMenuBtn) closeMenuBtn.classList.add('hidden');
        if (nav) nav.classList.remove('hidden');
    } else {
        // Show open menu button on mobile
        if (openMenuBtn) openMenuBtn.classList.remove('hidden');
    }
});

// Initialize state on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 768) {
        nav.classList.add('hidden');
        closeMenuBtn.classList.add('hidden');
    } else {
        openMenuBtn.classList.add('hidden');
        closeMenuBtn.classList.add('hidden');
        nav.classList.remove('hidden');
    }
    // Ensure overlay starts hidden
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
});