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
    nav.style.display = 'flex';
    
    // Show overlay - CRITICAL for Cypress
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    
    // Show close button - CRITICAL for Cypress  
    openMenuBtn.classList.add('hidden');
    openMenuBtn.style.display = 'none';
    closeMenuBtn.classList.remove('hidden');
    closeMenuBtn.style.display = 'block';
    
    body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    // Hide navigation
    nav.classList.remove('visible');
    if (window.innerWidth < 768) {
        nav.style.display = 'none';
    }
    
    // Hide overlay - CRITICAL for Cypress
    overlay.classList.add('hidden');
    overlay.classList.remove('visible');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    
    // After transition, hide completely
    setTimeout(() => {
        if (overlay.classList.contains('hidden')) {
            overlay.style.display = 'none';
        }
    }, 300);
    
    // Show open button, hide close button
    openMenuBtn.classList.remove('hidden');
    openMenuBtn.style.display = 'block';
    closeMenuBtn.classList.add('hidden');
    closeMenuBtn.style.display = 'none';
    
    body.style.overflow = '';
    closeAllDropdowns();
}

// Dropdown functionality
function toggleDropdown(navLink) {
    const isOpen = navLink.getAttribute('aria-expanded') === 'true';
    
    // Close all other dropdowns first
    closeAllDropdowns();
    
    if (!isOpen) {
        navLink.setAttribute('aria-expanded', 'true');
        navLink.classList.add('link-open');
        
        // Force the dropdown to show
        const dropdown = navLink.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-list')) {
            dropdown.style.display = 'block';
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        }
    }
}

function closeAllDropdowns() {
    navLinks.forEach(link => {
        closeDropdown(link);
    });
}

function closeDropdown(navLink) {
    navLink.setAttribute('aria-expanded', 'false');
    navLink.classList.remove('link-open');
    
    // Force the dropdown to hide
    const dropdown = navLink.nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-list')) {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            if (navLink.getAttribute('aria-expanded') === 'false') {
                dropdown.style.display = 'none';
            }
        }, 250);
    }
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

// Dropdown toggle on click
navLinks.forEach(navLink => {
    navLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(navLink);
    });
});

// Close dropdowns when clicking outside
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
        // Close mobile menu if window becomes desktop size
        if (nav && nav.classList.contains('visible')) {
            closeMobileMenu();
        }
        // Show nav for desktop
        nav.style.display = 'flex';
    } else {
        // Hide nav for mobile unless visible
        if (!nav.classList.contains('visible')) {
            nav.style.display = 'none';
        }
    }
});

// Initialize on page load - CRITICAL for Cypress
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Ensure overlay starts hidden
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('visible');
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
    
    // Ensure close menu starts hidden
    if (closeMenuBtn) {
        closeMenuBtn.classList.add('hidden');
        closeMenuBtn.style.display = 'none';
    }
    
    // Ensure open menu is visible on mobile
    if (openMenuBtn) {
        openMenuBtn.classList.remove('hidden');
        if (window.innerWidth < 768) {
            openMenuBtn.style.display = 'block';
        } else {
            openMenuBtn.style.display = 'none';
        }
    }
    
    // Initialize all dropdowns as closed
    closeAllDropdowns();
    
    // Set initial dropdown styles
    document.querySelectorAll('.dropdown-list').forEach(dropdown => {
        dropdown.style.display = 'none';
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-10px)';
    });
    
    // Ensure mobile menu is closed on page load
    if (nav) {
        nav.classList.remove('visible');
        if (window.innerWidth < 768) {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
        }
    }
    
    body.style.overflow = '';
    
    console.log('Initialization complete');
});
