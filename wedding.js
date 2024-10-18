// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const body = document.body;

// Ensure the menu is hidden on page load
mobileMenu.classList.add('hidden');

// Toggle mobile menu visibility when the button is clicked
mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the event from bubbling to the body
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
});

// Close the mobile menu when clicking anywhere outside of it
body.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
});

// Close the mobile menu when clicking a link inside it
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Banner carousel functionality
const carouselItems = document.querySelectorAll('#bannerCarousel .carousel-item');
let currentItemIndex = 0;

function showNextItem() {
    carouselItems[currentItemIndex].classList.remove('opacity-100');
    carouselItems[currentItemIndex].classList.add('opacity-0');
    currentItemIndex = (currentItemIndex + 1) % carouselItems.length;
    carouselItems[currentItemIndex].classList.remove('opacity-0');
    carouselItems[currentItemIndex].classList.add('opacity-100');
}

// Initialize the first image
window.addEventListener('load', () => {
    carouselItems[0].classList.remove('opacity-0');
    carouselItems[0].classList.add('opacity-100');
    // Start the carousel after a short delay
    setTimeout(() => {
        setInterval(showNextItem, 3400); // Changed to 3.4 seconds
    }, 100);
});

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const viewAllWorkBtn = document.getElementById('viewAllWork');
const modal = document.getElementById('workModal');
const closeModalBtn = document.getElementById('closeModal');

viewAllWorkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    modal.classList.add('animate-fade-in'); // Add fade-in animation class
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.classList.remove('animate-fade-in'); // Remove fade-in animation class
    document.body.style.overflow = ''; // Re-enable scrolling
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        modal.classList.remove('animate-fade-in'); // Remove fade-in animation class
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Responsive image loading
function loadResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const src = window.innerWidth <= 640 ? img.getAttribute('data-src-mobile') :
            window.innerWidth <= 1024 ? img.getAttribute('data-src-tablet') :
                img.getAttribute('data-src');
        img.src = src;
    });
}

window.addEventListener('load', loadResponsiveImages);
window.addEventListener('resize', loadResponsiveImages);

// Improve scroll performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Get in Touch button functionality
const getInTouchBtn = document.getElementById('getInTouchBtn');
const contactInfoModal = document.getElementById('contactInfoModal');
const closeContactModal = document.getElementById('closeContactModal');

getInTouchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contactInfoModal.classList.remove('hidden');
    contactInfoModal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

closeContactModal.addEventListener('click', () => {
    contactInfoModal.classList.add('hidden');
    contactInfoModal.classList.remove('flex');
    document.body.style.overflow = ''; // Re-enable scrolling
});

contactInfoModal.addEventListener('click', (e) => {
    if (e.target === contactInfoModal) {
        contactInfoModal.classList.add('hidden');
        contactInfoModal.classList.remove('flex');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add the visible class to elements in the viewport
function handleScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

// Add fade-in class to elements you want to animate
document.querySelectorAll('h1, h2, h3, p, .btn, .grid-item, .about-image, input, textarea').forEach(el => {
    el.classList.add('fade-in');
});

// Initial check
handleScroll();

// Add scroll event listener
window.addEventListener('scroll', handleScroll);