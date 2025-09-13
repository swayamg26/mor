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
            e.preventDefault(); // Prevent default button behavior
            openLoginModal(); // Re-enable the on-page modal
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

    // --- Login/Signup View Toggle ---
    const toggleViewLink = document.getElementById('toggle-view-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (toggleViewLink && forgotPasswordLink) {
        let currentView = 'login'; // Can be 'login', 'signup', or 'forgotPassword'

        const title = document.getElementById('login-modal-title');
        const subtitle = document.getElementById('login-modal-subtitle');
        const emailGroup = document.querySelector('#login-form .form-group:first-of-type');
        const passwordGroup = document.querySelector('#login-form .form-group:nth-of-type(2)');
        const confirmGroup = document.getElementById('confirm-password-group');
        const confirmInput = document.getElementById('confirm-password');
        const submitBtn = document.getElementById('login-submit-btn');
        const toggleText = document.getElementById('toggle-view-text');
        const forgotPasswordGroup = document.getElementById('forgot-password-group');

        const updateView = () => {
            // Reset all states first
            emailGroup.style.display = 'block';
            passwordGroup.style.display = 'block';
            confirmGroup.style.display = 'none';
            confirmInput.required = false;
            forgotPasswordGroup.style.display = 'block';

            if (currentView === 'login') {
                title.textContent = 'Welcome Back';
                subtitle.textContent = 'Log in to access your account and favorites.';
                submitBtn.textContent = 'Log In';
                toggleText.textContent = "Don't have an account? ";
                toggleViewLink.textContent = 'Create your account';
            } else if (currentView === 'signup') {
                title.textContent = 'Create Account';
                subtitle.textContent = 'Join us to save your favorites and more.';
                submitBtn.textContent = 'Sign Up';
                confirmGroup.style.display = 'block';
                confirmInput.required = true;
                forgotPasswordGroup.style.display = 'none';
                toggleText.textContent = 'Already have an account? ';
                toggleViewLink.textContent = 'Log in';
            } else if (currentView === 'forgotPassword') {
                title.textContent = 'Reset Password';
                subtitle.textContent = 'Enter your email to receive a password reset link.';
                submitBtn.textContent = 'Send Reset Link';
                passwordGroup.style.display = 'none';
                forgotPasswordGroup.style.display = 'none';
                toggleText.textContent = 'Remembered your password? ';
                toggleViewLink.textContent = 'Back to Login';
            }
        };

        toggleViewLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentView === 'login') {
                currentView = 'signup';
            } else if (currentView === 'signup') {
                currentView = 'login';
            } else {
                currentView = 'login'; // From 'forgotPassword' view, go back to login
            }
            updateView();
        });

        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentView = 'forgotPassword';
            updateView();
        });

        // Also handle form submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentView === 'forgotPassword') {
                alert('Password reset link sent to your email!');
                closeLoginModal();
            }
            // Other submission logic for login/signup would go here
        })
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

    // --- Cart Side Panel ---
    const cartPopup = document.getElementById('cart-popup');
    const openCartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');

    const openCart = () => {
        if (cartPopup) {
            cartPopup.classList.add('open');
            overlay.style.display = 'block';
            overlay.classList.add('active'); // Use active class for fade-in
        }
    };

    const closeSidePanels = () => {
        let isPanelOpen = false;
        if (cartPopup && cartPopup.classList.contains('open')) {
            cartPopup.classList.remove('open');
            isPanelOpen = true;
        }
        if (favoritesPopup && favoritesPopup.classList.contains('open')) {
            favoritesPopup.classList.remove('open');
            isPanelOpen = true;
        }

        if (isPanelOpen) {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 400); // Match CSS transition duration
        }
    };

    // --- Favorites Side Panel ---
    const favoritesPopup = document.getElementById('favorites-popup');
    const openFavoritesBtn = document.querySelector('.favorites-btn');
    const closeFavoritesBtn = document.querySelector('.close-favorites-btn');
    const startBrowsingBtn = document.querySelector('.start-browsing-btn');

    const openFavorites = () => {
        if (favoritesPopup) {
            favoritesPopup.classList.add('open');
            overlay.style.display = 'block';
            overlay.classList.add('active');
        }
    };

    // --- Event Listeners for Panels ---
    if (openCartBtn) openCartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeSidePanels);
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeSidePanels);
    
    if (openFavoritesBtn) openFavoritesBtn.addEventListener('click', openFavorites);
    if (closeFavoritesBtn) closeFavoritesBtn.addEventListener('click', closeSidePanels);
    if (startBrowsingBtn) {
        startBrowsingBtn.addEventListener('click', () => {
            closeSidePanels();
            document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Add closing functionality to the main overlay
    if (overlay) {
        overlay.addEventListener('click', closeSidePanels);
    }

    // --- Cart functionality ---
    let cartCount = 0;
    document.querySelectorAll('.product-favorite-icon').forEach(icon => {
        icon.addEventListener('click', (e) => e.stopPropagation()); // Prevent card click for now
    });

    document.querySelectorAll('.product-cart-icon').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            cartCount++;
            if (openCartBtn) {
                openCartBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> ${cartCount}`;
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