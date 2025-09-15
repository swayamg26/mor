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
        let loginMethod = 'email'; // 'email' or 'phone'
        let otpSent = false;

        const title = document.getElementById('login-modal-title');
        const subtitle = document.getElementById('login-modal-subtitle');
        const loginToggleContainer = document.querySelector('.login-toggle-options');
        const emailGroup = document.querySelector('#login-form .form-group:first-of-type');
        const emailInput = document.getElementById('login-email');
        const mobileNumberGroup = document.getElementById('mobile-number-group');
        const mobileInput = document.getElementById('mobile-number');
        const passwordGroup = document.getElementById('login-password').parentElement;
        const confirmGroup = document.getElementById('confirm-password-group');
        const confirmInput = document.getElementById('confirm-password');
        const otpGroup = document.getElementById('otp-group');
        const otpInput = document.getElementById('otp-input');
        const submitBtn = document.getElementById('login-submit-btn');
        const toggleText = document.getElementById('toggle-view-text');
        const forgotPasswordGroup = document.getElementById('forgot-password-group');

        const updateView = () => {
            // Reset all states first
            emailGroup.style.display = 'block';
            emailInput.placeholder = "you@example.com";
            mobileNumberGroup.style.display = 'none';
            mobileInput.required = false;
            passwordGroup.style.display = 'block';
            confirmGroup.style.display = 'none';
            confirmInput.required = false;
            otpGroup.style.display = 'none';
            otpInput.required = false;
            forgotPasswordGroup.style.display = 'block';
            loginToggleContainer.style.display = 'flex';
            otpSent = false;

            if (currentView === 'login') {
                title.textContent = 'Welcome Back';
                subtitle.textContent = 'Log in to access your account and favorites.';
                submitBtn.textContent = 'Log In';
                toggleText.textContent = "Don't have an account? ";
                toggleViewLink.textContent = 'Create your account';

                if (loginMethod === 'phone') {
                    emailGroup.style.display = 'block'; // Re-use email field for phone
                    emailInput.type = 'tel';
                    emailInput.placeholder = '10-digit mobile number';
                    passwordGroup.style.display = 'none';
                    forgotPasswordGroup.style.display = 'none';
                    submitBtn.textContent = 'Send OTP';
                } else { // email
                    emailInput.type = 'email';
                    emailInput.placeholder = 'you@example.com';
                }

            } else if (currentView === 'signup') {
                title.textContent = 'Create Account';
                subtitle.textContent = 'Join us to save your favorites and more.';
                submitBtn.textContent = 'Sign Up';
                mobileNumberGroup.style.display = 'block';
                mobileInput.required = true;
                loginToggleContainer.style.display = 'none';
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
                loginToggleContainer.style.display = 'none';
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

        // --- Login Method Toggle ---
        loginToggleContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('login-toggle-btn')) {
                loginMethod = e.target.dataset.method;
                loginToggleContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                updateView();
            }
        });

        // Also handle form submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();

            if (currentView === 'login' && loginMethod === 'phone') {
                if (!otpSent) {
                    if (!/^\d{10}$/.test(emailInput.value)) {
                        alert('Please enter a valid 10-digit phone number.');
                        return;
                    }
                    // Simulate sending OTP
                    alert(`OTP sent to ${emailInput.value}`);
                    otpSent = true;
                    otpGroup.style.display = 'block';
                    otpInput.required = true;
                    submitBtn.textContent = 'Verify OTP & Log In';
                } else {
                    // Simulate OTP verification
                    if (otpInput.value === '123456') { // Example OTP
                        alert('Login successful!');
                        closeLoginModal();
                    } else {
                        alert('Invalid OTP. Please try again.');
                    }
                }
                return; // Stop further execution for phone login
            }

            if (currentView === 'signup') {
                const password = document.getElementById('login-password').value;
                const confirmPassword = confirmInput.value;
                if (password !== confirmPassword) {
                    alert('Passwords do not match. Please try again.');
                    return;
                }
                if (!/^\d{10}$/.test(mobileInput.value)) {
                    alert('Please enter a valid 10-digit mobile number.');
                    return; // Stop form submission
                }
                alert('Signup successful!');
                closeLoginModal();
            }
            if (currentView === 'forgotPassword') {
                alert('Password reset link sent to your email!');
                closeLoginModal();
            }
            // Other submission logic for login/signup would go here
        });

        // --- Show/Hide Password ---
        document.querySelectorAll('.toggle-password').forEach(icon => {
            icon.addEventListener('click', () => {
                const input = icon.previousElementSibling;
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        })
    }


    // Header background opacity on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const overlay = document.querySelector('.overlay');
    const closeMenuBtn = document.querySelector('.close-menu');

    // --- Cart Side Panel ---
    const cartPopup = document.getElementById('cart-popup');
    const openCartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');

    const openCart = () => {
        if (cartPopup) {
            cartPopup.classList.add('open');
            handleOverlayAndScroll(true);
        }
    };

    const toggleMenu = () => {
        if (!navLinksContainer) return;
        const header = document.querySelector('.header');
        const shouldOpen = !navLinksContainer.classList.contains('open');
        
        navLinksContainer.classList.toggle('open', shouldOpen);
        handleOverlayAndScroll(shouldOpen);

        if (header) header.classList.toggle('menu-open', shouldOpen);
    };

    const handleOverlayAndScroll = (shouldOpen) => {
        // This function is now the single source of truth for the overlay and body scroll lock.
        if (shouldOpen) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.classList.add('active'), 10); // Fade in
            document.body.classList.add('no-scroll');
        } else {
            // Only close the overlay if no other side panels are open.
            const anyPanelOpen = cartPopup?.classList.contains('open') || favoritesPopup?.classList.contains('open') || navLinksContainer?.classList.contains('open');
            if (anyPanelOpen) return;

            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            setTimeout(() => { overlay.style.display = 'none'; }, 400); // Match CSS transition
        }
    };

    const closeSidePanels = () => {
        let wasPanelOpen = false;
        if (cartPopup && cartPopup.classList.contains('open')) {
            cartPopup.classList.remove('open');
            wasPanelOpen = true;
        }
        if (favoritesPopup && favoritesPopup.classList.contains('open')) {
            favoritesPopup.classList.remove('open');
            wasPanelOpen = true;
        }
        if (navLinksContainer && navLinksContainer.classList.contains('open')) {
            navLinksContainer.classList.remove('open');
            wasPanelOpen = true;
        }
        if (wasPanelOpen) handleOverlayAndScroll(false);
    };

    // --- Favorites Side Panel ---
    const favoritesPopup = document.getElementById('favorites-popup');
    const openFavoritesBtns = document.querySelectorAll('.favorites-btn, #mobile-favorites-link');
    const closeFavoritesBtn = document.querySelector('.close-favorites-btn');
    const startBrowsingBtn = document.querySelector('.start-browsing-btn');

    const openFavorites = () => {
        if (favoritesPopup) {
            favoritesPopup.classList.add('open');
            handleOverlayAndScroll(true);
        }
    };

    // --- Event Listeners for Panels ---
    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    if (navLinksContainer) {
        // Use event delegation to handle clicks inside the nav container
        navLinksContainer.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            // Only close the panel if it's a navigation link, not a button that opens another panel.
            if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
                closeSidePanels();
            }
        });
    }
    if (openCartBtn) openCartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeSidePanels);
    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeSidePanels);
    
    openFavoritesBtns.forEach(btn => {
        btn.addEventListener('click', openFavorites);
    });
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

    // --- Toast Notification ---
    const toast = document.getElementById('notification-toast');
    const showToast = (message, iconClass = 'fa-check-circle') => {
        if (toast) {
            toast.innerHTML = `<i class="fas ${iconClass}"></i> ${message}`;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    };
    // Make it globally accessible for product pages
    window.showToast = showToast;

    // --- Favorites Functionality ---
    let favoriteItems = JSON.parse(localStorage.getItem('mor_favorites')) || [];
    const favoritesItemsContainer = document.querySelector('.favorites-items');
    const favoritesEmptyMsg = document.querySelector('.favorites-empty');

    const saveFavorites = () => {
        localStorage.setItem('mor_favorites', JSON.stringify(favoriteItems));
        updateFavoritesUI();
    };

    const updateFavoritesUI = () => {
        // Update UI based on whether there are favorite items
        if (favoriteItems.length === 0) {
            favoritesItemsContainer.style.display = 'none';
            favoritesEmptyMsg.style.display = 'block';
        } else {
            favoritesItemsContainer.style.display = 'block';
            favoritesEmptyMsg.style.display = 'none';
            favoritesItemsContainer.innerHTML = ''; // Clear old items

            favoriteItems.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'favorite-item'; // Use a different class to avoid style conflicts
                itemEl.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}" class="favorite-item-img">
                    <div class="favorite-item-details">
                        <div class="favorite-item-name">${item.name}</div>
                        <div class="favorite-item-price">${item.price}</div>
                        <button class="favorite-item-move-to-cart" data-name="${item.name}">Move to Cart</button>
                    </div>
                    <button class="favorite-item-remove" data-name="${item.name}">&times;</button>
                `;
                favoritesItemsContainer.appendChild(itemEl);
            });
        }
    };

    const toggleFavorite = (product, icon) => {
        const isFavorited = favoriteItems.some(item => item.name === product.name);

        if (isFavorited) {
            favoriteItems = favoriteItems.filter(item => item.name !== product.name);
            icon.innerHTML = '<i class="far fa-heart"></i>'; // Change to empty heart
        } else {
            favoriteItems.push(product);
            icon.innerHTML = '<i class="fas fa-heart"></i>'; // Change to solid heart
        }
        saveFavorites();
    };
    window.toggleFavorite = toggleFavorite; // Make it global

    // Event delegation for favorite item removal
    favoritesItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const name = target.dataset.name;

        if (target.classList.contains('favorite-item-remove')) {
            const productCardIcon = document.querySelector(`.product-card[data-name="${name}"] .product-favorite-icon`);
            favoriteItems = favoriteItems.filter(item => item.name !== name);
            if (productCardIcon) productCardIcon.innerHTML = '<i class="far fa-heart"></i>'; // Reset icon on main page
            saveFavorites();
        }

        if (target.classList.contains('favorite-item-move-to-cart')) {
            const itemToMove = favoriteItems.find(item => item.name === name);
            if (itemToMove) {
                const productCard = document.querySelector(`.product-card[data-name="${name}"]`);
                const productForCart = {
                    ...itemToMove,
                    size: productCard.dataset.sizes.split(',')[0].trim(), // Get first available size
                    quantity: 1
                };
                addToCart(productForCart);
                toggleFavorite(itemToMove, productCard.querySelector('.product-favorite-icon')); // This removes it from favorites and updates UI
            }
        }
    });

    // --- Cart functionality ---
    let cartItems = JSON.parse(localStorage.getItem('mor_cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmptyMsg = document.querySelector('.cart-empty');
    const subtotalAmountEl = document.getElementById('cart-subtotal-amount');
    const cartFooter = document.querySelector('.cart-footer');

    const saveCart = () => {
        localStorage.setItem('mor_cart', JSON.stringify(cartItems));
        updateCartUI();
    };
    window.saveCart = saveCart; // Make it global

    const updateCartUI = () => {
        // Update cart count in header
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (openCartBtn) {
            openCartBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> ${totalItems > 0 ? totalItems : ''}`;
        }

        if (cartItems.length === 0) {
            cartItemsContainer.style.display = 'none';
            cartEmptyMsg.style.display = 'block';
            if (cartFooter) {
                cartFooter.style.display = 'none';
            }
        } else {
            cartItemsContainer.style.display = 'block';
            cartEmptyMsg.style.display = 'none';
            if (cartFooter) {
                cartFooter.style.display = 'block';
            }

            cartItemsContainer.innerHTML = ''; // Clear old items

            let subtotal = 0;

            cartItems.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-size">Size: ${item.size}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn-small" data-name="${item.name}" data-size="${item.size}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn-small" data-name="${item.name}" data-size="${item.size}" data-action="increase">+</button>
                    </div>
                    <button class="cart-item-remove" data-name="${item.name}" data-size="${item.size}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemEl);
                const priceValue = parseFloat(item.price.replace('₹', '').replace(',', ''));
                subtotal += priceValue * item.quantity;
            });

            subtotalAmountEl.textContent = `₹${subtotal.toFixed(2)}`;
        }
    };

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.name === product.name && item.size === product.size);

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cartItems.push(product);
        }
        saveCart();
    };
    window.addToCart = addToCart; // Make it global

    // Event delegation for cart item actions
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const name = target.dataset.name;
        const size = target.dataset.size;

        if (target.classList.contains('cart-item-remove')) {
            cartItems = cartItems.filter(item => !(item.name === name && item.size === size));
        }

        if (target.classList.contains('quantity-btn-small')) {
            const itemToUpdate = cartItems.find(item => item.name === name && item.size === size);
            if (itemToUpdate) {
                if (target.dataset.action === 'increase') {
                    itemToUpdate.quantity++;
                } else if (itemToUpdate.quantity > 1) {
                    itemToUpdate.quantity--;
                } else { // quantity is 1 and decrease is clicked
                    cartItems = cartItems.filter(item => !(item.name === name && item.size === size));
                }
            }
        }
        saveCart();
    });

    document.querySelectorAll('.product-favorite-icon').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            const card = this.closest('.product-card');
            const product = {
                name: card.dataset.name,
                price: card.dataset.price,
                imgSrc: card.querySelector('img').src,
            };
            toggleFavorite(product, this);
        });
    });

    // --- Product Card Click to Navigate ---
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent navigation if an icon inside the card was clicked
            if (e.target.closest('.product-favorite-icon')) {
                return;
            }
            const productPage = card.dataset.pageUrl;
            if (productPage) {
                window.location.href = productPage;
            }
        });
    });

    // --- CTA button handlers ---
    document.querySelectorAll('.cta-btn').forEach(btn => {
        // Exclude the new hero button which is now a link
        if (btn.id !== 'hero-shop-now') {
            btn.addEventListener('click', () => {
                const categoriesSection = document.getElementById('categories');
                if (categoriesSection) {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        );
        }
    });

    // Initial UI updates on page load
    updateCartUI();
    updateFavoritesUI();
});