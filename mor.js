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
    const openFavoritesBtns = document.querySelectorAll('.favorites-btn, #mobile-favorites-link');
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

    // --- Favorites Functionality ---
    let favoriteItems = [];
    const favoritesItemsContainer = document.querySelector('.favorites-items');
    const favoritesEmptyMsg = document.querySelector('.favorites-empty');

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
        updateFavoritesUI();
    };

    // Event delegation for favorite item removal
    favoritesItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const name = target.dataset.name;

        if (target.classList.contains('favorite-item-remove')) {
            const productCardIcon = document.querySelector(`.product-card[data-name="${name}"] .product-favorite-icon`);
            favoriteItems = favoriteItems.filter(item => item.name !== name);
            if (productCardIcon) productCardIcon.innerHTML = '<i class="far fa-heart"></i>';
            updateFavoritesUI();
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
    let cartItems = [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmptyMsg = document.querySelector('.cart-empty');
    const subtotalAmountEl = document.getElementById('cart-subtotal-amount');
    const cartFooter = document.querySelector('.cart-footer');

    // --- Notification Toast ---
    const notificationToast = document.getElementById('notification-toast');
    let notificationTimeout;

    const showNotification = (message) => {
        if (!notificationToast) return;

        clearTimeout(notificationTimeout); // Clear previous timeout if any

        notificationToast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        notificationToast.classList.add('show');

        notificationTimeout = setTimeout(() => {
            notificationToast.classList.remove('show');
        }, 3000); // Hide after 3 seconds
    };
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
        showNotification(`"${product.name}" added to cart!`);
        updateCartUI();
    };

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
        updateCartUI();
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

    document.querySelectorAll('.product-cart-icon').forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.stopPropagation();
            const card = this.closest('.product-card');
            const product = {
                name: card.dataset.name,
                price: card.dataset.price,
                size: card.dataset.sizes.split(',')[0].trim(), // Default to first size
                imgSrc: card.querySelector('img').src,
                quantity: 1
            };
            addToCart(product);
            openCart(); // Open cart when item is added

            const parentCard = this.closest('.product-card');
            if (parentCard) {
                parentCard.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    parentCard.style.transform = '';
                }, 150);
            }
        });
    });

    // --- Product Modal Functionality ---
    const productModal = document.getElementById('product-modal');
    const productCards = document.querySelectorAll('.product-card');
    const closeProductModalBtn = productModal.querySelector('.modal-close');

    const openProductModal = (card) => {
        const name = card.dataset.name;
        const price = card.dataset.price;
        const sizes = card.dataset.sizes;
        const material = card.dataset.material;
        const mainImgSrc = card.dataset.imgSrc;
        const galleryImages = card.dataset.galleryImages ? card.dataset.galleryImages.split(',') : [];

        // Populate text details
        document.getElementById('modal-product-name').textContent = name;
        document.getElementById('modal-product-price').textContent = price;
        document.getElementById('modal-product-sizes').textContent = sizes;
        document.getElementById('modal-product-material').textContent = material;

        // Populate image/gallery
        const galleryContainer = document.getElementById('modal-gallery-container');
        const galleryDots = document.getElementById('gallery-dots');
        galleryContainer.innerHTML = '';
        galleryDots.innerHTML = '';

        const images = [mainImgSrc, ...galleryImages];
        let currentGallerySlide = 0;

        images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${name} - Image ${index + 1}`;
            img.className = 'gallery-img';
            if (index === 0) img.classList.add('active');
            galleryContainer.appendChild(img);

            const dot = document.createElement('span');
            dot.className = 'gallery-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showGallerySlide(index));
            galleryDots.appendChild(dot);
        });

        const showGallerySlide = (index) => {
            galleryContainer.querySelectorAll('.gallery-img').forEach((img, i) => img.classList.toggle('active', i === index));
            galleryDots.querySelectorAll('.gallery-dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentGallerySlide = index;
        };

        document.getElementById('gallery-prev').onclick = () => showGallerySlide((currentGallerySlide - 1 + images.length) % images.length);
        document.getElementById('gallery-next').onclick = () => showGallerySlide((currentGallerySlide + 1) % images.length);

        // Show/hide arrows and dots based on image count
        const showControls = images.length > 1;
        document.getElementById('gallery-prev').style.display = showControls ? 'block' : 'none';
        document.getElementById('gallery-next').style.display = showControls ? 'block' : 'none';
        document.getElementById('gallery-dots').style.display = showControls ? 'block' : 'none';

        // --- Populate Size Options ---
        const sizeSelector = document.getElementById('size-selector');
        sizeSelector.innerHTML = '';
        const availableSizes = sizes.split(',').map(s => s.trim());
        availableSizes.forEach((size, index) => {
            const sizeBtn = document.createElement('button');
            sizeBtn.className = 'size-btn';
            sizeBtn.textContent = size;
            if (index === 0) {
                sizeBtn.classList.add('active'); // Select first size by default
            }
            sizeBtn.addEventListener('click', () => {
                sizeSelector.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
                sizeBtn.classList.add('active');
            });
            sizeSelector.appendChild(sizeBtn);
        });

        // --- Handle Quantity Counter ---
        const quantityValue = document.querySelector('.quantity-value');
        quantityValue.textContent = '1'; // Reset to 1
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.onclick = () => {
                let currentQty = parseInt(quantityValue.textContent);
                if (btn.dataset.action === 'increase') {
                    currentQty++;
                } else if (currentQty > 1) {
                    currentQty--;
                }
                quantityValue.textContent = currentQty;
            };
        });

        // --- Handle Add to Cart from Modal ---
        document.getElementById('modal-add-to-cart-btn').onclick = () => {
            const selectedSize = sizeSelector.querySelector('.size-btn.active').textContent;
            const quantity = parseInt(quantityValue.textContent);
            const product = {
                name: name,
                price: price,
                size: selectedSize,
                imgSrc: mainImgSrc,
                quantity: quantity
            };
            addToCart(product);
            closeProductModal();
            openCart();
        };

        productModal.style.display = 'flex';
        setTimeout(() => productModal.classList.add('show'), 10);
    };

    const closeProductModal = () => {
        productModal.classList.remove('show');
        setTimeout(() => productModal.style.display = 'none', 300);
    };

    productCards.forEach(card => card.addEventListener('click', () => openProductModal(card)));
    closeProductModalBtn.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
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