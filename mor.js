// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Promo Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.promo-img');
const slideCount = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
}

if (slideCount > 0) {
    slides[0].classList.add('active');
    setInterval(nextSlide, 2000); // Change slide every 2 seconds
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksContainer = document.querySelector('.nav-links-container');
const overlay = document.querySelector('.overlay');
const closeMenuBtn = document.querySelector('.close-menu');

function toggleMenu() {
    navLinksContainer.classList.toggle('open');
    overlay.style.display = navLinksContainer.classList.contains('open') ? 'block' : 'none';
}

// Add event listeners only if elements exist
if(hamburger) hamburger.addEventListener('click', toggleMenu);
if(overlay) overlay.addEventListener('click', toggleMenu);
if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked (avoid duplicate listeners)
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinksContainer.classList.contains('open')) {
            toggleMenu();
        }
    });
});

// Cart functionality
let cartCount = 0;
const cartBtn = document.querySelector('.cart-btn');

function updateCartCount() { // Not called, but fixed for future use
    if (cartBtn) cartBtn.textContent = `Cart (${cartCount})`;
}

// Add to cart icon click handler
document.querySelectorAll('.product-cart-icon').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the card's click event from firing

        // Simulate adding to cart
        cartCount++;
        if (cartBtn) {
            cartBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> ${cartCount}`;
        }
        
        // Show success alert
        alert('Added to cart successfully!');

        // Add visual feedback
        const parentCard = this.closest('.product-card, .category-card');
        if (parentCard) {
            parentCard.style.transform = 'scale(0.98)';
            setTimeout(() => {
                parentCard.style.transform = '';
            }, 150);
        }
    });
});

// CTA button handlers
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const categoriesSection = document.getElementById('categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const searchTerm = prompt('Search for products:');
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
        }
    });
}

// Header background opacity on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.pageYOffset > 50) {
            header.style.backgroundColor = 'rgba(160, 120, 44, 0.9)'; /* #a0782c with transparency */
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.backdropFilter = 'none';
        }
    }
});