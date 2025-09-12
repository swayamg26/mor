document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for fade-in animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // --- Smooth scrolling for navigation links ---
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

    // --- Promo Slider ---
    let currentSlide = 0;
    const slides = document.querySelectorAll('.promo-img');
    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };
        slides[0].classList.add('active');
        setInterval(nextSlide, 2000);
    }

    // Info Banner Slider
    let currentInfoSlide = 0;
    const infoSlider = document.querySelector('.info-slider');
    const infoSlides = document.querySelectorAll('.info-slide');
    const infoDots = document.querySelectorAll('.info-dot');
    const infoSlideCount = infoSlides.length;

    function showInfoSlide(index) {
        if (infoSlider) {
            infoSlider.style.transform = `translateX(-${index * 100}%)`;
        }
        infoDots.forEach(dot => dot.classList.remove('active'));
        if (infoDots[index]) {
            infoDots[index].classList.add('active');
        }
    }

    function nextInfoSlide() {
        currentInfoSlide = (currentInfoSlide + 1) % infoSlideCount;
        showInfoSlide(currentInfoSlide);
    }

    if (infoSlideCount > 0) {
        showInfoSlide(0); // Initialize first slide
        setInterval(nextInfoSlide, 3000); // Change info slide every 3 seconds

        infoDots.forEach(dot => {
            dot.addEventListener('click', () => {
                showInfoSlide(parseInt(dot.dataset.slide));
            });
        });
    }

    // --- Login Modal Functionality ---
    // Get all the necessary elements
    const loginModal = document.getElementById('login-modal');
    const loginBtns = document.querySelectorAll('.login-btn, #mobile-login-link'); // Desktop and mobile login buttons
    const closeModalBtns = document.querySelectorAll('.login-modal-close'); // Close buttons for the modal

    // Function to open the login modal
    const openLoginModal = () => {
        if (loginModal) {
            loginModal.style.display = 'flex'; // Use flex to center the content
            // Add a class to trigger the fade-in animation
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10); // Small delay to ensure transition is applied
        }
    };

    // Function to close the login modal
    const closeLoginModal = () => {
        if (loginModal) {
            loginModal.classList.remove('show');
            // Wait for the fade-out animation to finish before hiding
            setTimeout(() => {
                loginModal.style.display = 'none';
            }, 300); // This duration should match the CSS transition time
        }
    };

    // Add click event listeners to all login buttons
    loginBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            openLoginModal();
        });
    });

    // Add click event listeners to all close buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeLoginModal);
    });

    // Add click event listener to the modal overlay itself to close it
    if (loginModal) {
        loginModal.addEventListener('click', (event) => {
            // Close the modal only if the click is on the overlay itself, not the content
            if (event.target === loginModal) {
                closeLoginModal();
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
                header.style.backgroundColor = ''; // Revert to CSS default
                header.style.backdropFilter = 'none';
            }
        }
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const overlay = document.querySelector('.overlay');
    const closeMenuBtn = document.querySelector('.close-menu');

    const toggleMenu = () => {
        if (navLinksContainer) navLinksContainer.classList.toggle('open');
        if (overlay) overlay.style.display = navLinksContainer.classList.contains('open') ? 'block' : 'none';
    };

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    if (navLinksContainer) {
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- Cart functionality ---
    let cartCount = 0;
    const cartBtn = document.querySelector('.cart-btn');
    document.querySelectorAll('.product-cart-icon').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            cartCount++;
            if (cartBtn) {
                cartBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> ${cartCount}`;
            }
            alert('Added to cart successfully!');
            const parentCard = this.closest('.product-card');
            if (parentCard) {
                parentCard.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    parentCard.style.transform = '';
                }, 150);
            }
        });
    });

    // --- CTA button handlers ---
    document.querySelectorAll('.cta-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const categoriesSection = document.getElementById('categories');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});