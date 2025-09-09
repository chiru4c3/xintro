// DOM elements
const openMenuBtn = document.querySelector('.open-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-link[aria-expanded]');
const body = document.body;

// Mobile menu functionality
function openMobileMenu() {
    nav.classList.add('visible');
    nav.style.display = 'flex';
    overlay.classList.add('visible');
    overlay.classList.remove('hidden');
    openMenuBtn.classList.add('hidden');
    closeMenuBtn.classList.remove('hidden');
    body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    nav.classList.remove('visible');
    if (window.innerWidth < 768) {
        nav.style.display = 'none';
    }
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
    openMenuBtn.classList.remove('hidden');
    closeMenuBtn.classList.add('hidden');
    body.style.overflow = '';
    
    // Close any open dropdowns when closing mobile menu
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
        
        // Force the dropdown to show by setting display
        const dropdown = navLink.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-list')) {
            dropdown.style.display = 'block';
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        }
    } else {
        closeDropdown(navLink);
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
        console.log('Dropdown clicked:', navLink.textContent.trim());
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

// Prevent dropdown links from closing dropdown when clicked
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Dropdown link clicked:', link.textContent.trim());
        // You can add navigation logic here if needed
    });
});

// Accessibility: Handle arrow keys in dropdown navigation
navLinks.forEach(navLink => {
    navLink.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const isOpen = navLink.getAttribute('aria-expanded') === 'true';
            if (!isOpen) {
                toggleDropdown(navLink);
            }
            
            // Focus first dropdown item
            const dropdown = navLink.nextElementSibling;
            const firstLink = dropdown.querySelector('.dropdown-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 50);
            }
        }
    });
});

// Handle arrow key navigation within dropdowns
document.querySelectorAll('.dropdown-list').forEach(dropdown => {
    const links = dropdown.querySelectorAll('.dropdown-link');
    
    links.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (index + 1) % links.length;
                links[nextIndex].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = index === 0 ? links.length - 1 : index - 1;
                links[prevIndex].focus();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                const navLink = dropdown.previousElementSibling;
                closeDropdown(navLink);
                navLink.focus();
            }
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (nav && nav.classList.contains('visible')) {
                closeMobileMenu();
            }
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Ensure all dropdowns are closed on page load
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
    
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('visible');
    }
    
    if (openMenuBtn) {
        openMenuBtn.classList.remove('hidden');
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.classList.add('hidden');
    }
    
    body.style.overflow = '';
    
    console.log('Initialization complete');
});
function openMobileMenu() {
    nav.classList.add('visible');
    nav.style.display = 'flex';
    
    // Critical for Cypress test
    overlay.classList.add('visible');
    overlay.classList.remove('hidden');
    overlay.style.display = 'block';
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    
    openMenuBtn.classList.add('hidden');
    closeMenuBtn.classList.remove('hidden');
    body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    nav.classList.remove('visible');
    if (window.innerWidth < 768) {
        nav.style.display = 'none';
    }
    
    // Critical for Cypress test  
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    
    // Hide overlay after transition
    setTimeout(() => {
        if (overlay.classList.contains('hidden')) {
            overlay.style.display = 'none';
        }
    }, 300);
    
    openMenuBtn.classList.remove('hidden');
    closeMenuBtn.classList.add('hidden');
    body.style.overflow = '';
    
    closeAllDropdowns();
}

