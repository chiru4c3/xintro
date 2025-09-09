// DOM elements
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-link[aria-expanded]');
const body = document.body;

// Mobile menu functionality - FIXED FOR CYPRESS TESTS
function openMobileMenu() {
    console.log('Opening mobile menu...');
    
    // Show navigation
    if (nav) {
        nav.classList.add('visible');
        nav.style.display = 'block';
        nav.style.transform = 'translateX(0)';
    }
    
    // CRITICAL: Show overlay with exact values Cypress expects
    if (overlay) {
        overlay.classList.add('visible');
         overlay.style.display = 'block';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
    }
    
    // CRITICAL: Toggle buttons - show close, hide open
    if (openMenuBtn) {
        openMenuBtn.classList.add('hidden');
        openMenuBtn.style.display = 'none';
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.classList.remove('hidden');
        closeMenuBtn.style.display = 'block';
        closeMenuBtn.style.visibility = 'visible';
    }
    
    // Prevent body scroll
    body.style.overflow = 'hidden';
    
    console.log('Mobile menu opened');
}

function closeMobileMenu() {
    console.log('Closing mobile menu...');
    
    // Hide navigation
   if (nav) {
        nav.classList.remove('visible');
        if (window.innerWidth < 768) {
            nav.style.display = 'none';
        }
    }
    
    
    // CRITICAL: Hide overlay with exact values Cypress expects
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('visible');
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        setTimeout(() => {
            if (overlay.classList.contains('hidden')) {
                overlay.style.display = 'none';
            }
        }, 300);
    }
    
    // CRITICAL: Toggle buttons - show open, hide close
    if (openMenuBtn) {
        openMenuBtn.classList.remove('hidden');
        openMenuBtn.style.display = 'block';
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.classList.add('hidden');
        closeMenuBtn.style.display = 'none';
    }
    
    // Restore body scroll
    body.style.overflow = '';
    
    console.log('Mobile menu closed');
}

// Event listeners
if (openMenuBtn) {
    openMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Open menu clicked');
        openMobileMenu();
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close menu clicked');
        closeMobileMenu();
    });
}

if (overlay) {
    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Overlay clicked');
        closeMobileMenu();
    });
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
    openMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Open menu clicked');
        openMobileMenu();
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Close menu clicked');
        closeMobileMenu();
    });
}

if (overlay) {
    overlay.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Overlay clicked');
        closeMobileMenu();
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
// CRITICAL: Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing mobile menu...');
    
    // Ensure overlay starts hidden
    if (overlay) {
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
    
    // Ensure correct button visibility on mobile
    if (window.innerWidth < 768) {
        if (openMenuBtn) {
            openMenuBtn.classList.remove('hidden');
            
        }
        
        if (closeMenuBtn) {
            closeMenuBtn.classList.add('hidden');
           
        }
        
       if (nav && window.innerWidth < 768) {
        nav.classList.remove('visible');
        nav.style.display = 'none';
    }
    } else {
        // Desktop - hide menu buttons
        if (openMenuBtn) {
            openMenuBtn.style.display = 'none';
        }
        if (closeMenuBtn) {
            closeMenuBtn.style.display = 'none';
        }
        if (nav) {
            nav.style.display = 'flex';
        }
    }
    
    body.style.overflow = '';
    
    console.log('Mobile menu initialized');
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        // Desktop - close mobile menu if open
        if (nav && nav.classList.contains('visible')) {
            closeMobileMenu();
        }
        // Hide menu buttons on desktop
        if (openMenuBtn) openMenuBtn.style.display = 'none';
        if (closeMenuBtn) closeMenuBtn.style.display = 'none';
        // Show nav on desktop
        if (nav) nav.style.display = 'flex';
    } else {
        // Mobile - show appropriate button
        if (nav && !nav.classList.contains('visible')) {
            if (openMenuBtn) {
                openMenuBtn.classList.remove('hidden');
                openMenuBtn.style.display = 'block';
            }
            if (closeMenuBtn) {
                closeMenuBtn.classList.add('hidden');
                closeMenuBtn.style.display = 'none';
            }
            if (nav) nav.style.display = 'none';
        }
    }
});
