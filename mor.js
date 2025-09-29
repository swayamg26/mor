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
    // Observe any element with a class starting with "animate-"
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
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

    // --- Login Page Navigation ---
    // This function will be called when a login is required.
    // It redirects to the login page, passing the current page as a parameter
    // so the user can be redirected back after a successful login.
    const openLoginModal = () => {
        // Get the current path, but remove the leading slash
        const redirectPath = window.location.pathname.substring(1) + window.location.search;
        window.location.href = `login.html?redirect=${redirectPath}`;
    };
    window.openLoginModal = openLoginModal;


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
    const openCartBtns = document.querySelectorAll('.cart-btn, #mobile-cart-link'); // Desktop and mobile cart buttons
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');

    const openCart = () => {
        if (cartPopup) cartPopup.classList.add('open');
        if (overlay) overlay.className = 'overlay right';
        handleOverlayAndScroll(true);
    };

    const handleOverlayAndScroll = (shouldOpen) => {
        // This function is now the single source of truth for the overlay and body scroll lock.
        if (shouldOpen) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.classList.add('active'), 10); // Fade in
            document.body.classList.add('no-scroll');
        } else {
            // Only close the overlay if no other side panels are open.
            // We check this *after* the current panel has already started closing.
            const anyOtherPanelOpen = document.querySelector('.cart-popup.open, .favorites-popup.open, .nav-links-container.open');
            if (!anyOtherPanelOpen) {
                overlay.className = 'overlay'; // Reset overlay classes
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
                setTimeout(() => { overlay.style.display = 'none'; }, 400); // Match CSS transition
            }
        }
    };

    const toggleMenu = () => {
        if (!navLinksContainer) return;
        const header = document.querySelector('.header');
        const shouldOpen = !navLinksContainer.classList.contains('open');
        
        navLinksContainer.classList.toggle('open', shouldOpen);
        if (overlay) overlay.className = 'overlay left'; // Set overlay style for left panel
        handleOverlayAndScroll(shouldOpen);

        if (header) header.classList.toggle('menu-open', shouldOpen);
    };

    const closeSidePanels = () => {
        const header = document.querySelector('.header');
        let wasPanelOpen = false;
        if (favoritesPopup && favoritesPopup.classList.contains('open')) {
            favoritesPopup.classList.remove('open');
            wasPanelOpen = true;
        }
        if (cartPopup && cartPopup.classList.contains('open')) {
            cartPopup.classList.remove('open');
            wasPanelOpen = true;
        }
        if (navLinksContainer && navLinksContainer.classList.contains('open')) {
            navLinksContainer.classList.remove('open');
            if (header) {
                header.classList.remove('menu-open');
            }
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
            if (overlay) overlay.className = 'overlay left'; // Set overlay style for left panel
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
    
    openFavoritesBtns.forEach(btn => {
        btn.addEventListener('click', openFavorites);
    });
    if (closeFavoritesBtn) closeFavoritesBtn.addEventListener('click', closeSidePanels);
    openCartBtns.forEach(btn => {
        btn.addEventListener('click', openCart);
    });
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeSidePanels);
    if (startBrowsingBtn) {
        startBrowsingBtn.addEventListener('click', () => {
            closeSidePanels();
            document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (continueShoppingBtn) continueShoppingBtn.addEventListener('click', closeSidePanels);
    // Add closing functionality to the overlay for all side panels
    if (overlay) overlay.addEventListener('click', closeSidePanels);

    // --- Toast Notification ---
    const toast = document.getElementById('notification-toast');
    let toastTimeout;

    const showToast = (message, iconClass = 'fa-check-circle') => {
        if (toast) {
            // Clear any existing timeouts to prevent the toast from hiding prematurely
            clearTimeout(toastTimeout);

            toast.style.display = 'flex'; // Ensure it's visible before animation
            toast.innerHTML = `<i class="fas ${iconClass}"></i> ${message}`;
            toast.classList.add('show');

            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
                // After the slide-out animation (500ms), hide it completely
                setTimeout(() => { toast.style.display = 'none'; }, 500);
            }, 2000);
        }
    };
    // Make it globally accessible for product pages
    window.showToast = showToast;

    // --- Simple Auth Check (for demonstration) ---
    const isUserLoggedIn = () => {
        return localStorage.getItem('mor_user_loggedin') === 'true';
    };
    window.isUserLoggedIn = isUserLoggedIn;

    // --- Login Required Modal ---
    const loginRequiredModal = document.getElementById('login-required-modal');
    if (loginRequiredModal) {
        const closeLoginRequiredBtn = loginRequiredModal.querySelector('.login-required-modal-close');
        const loginNowBtn = document.getElementById('login-now-btn');
        const modalMessage = loginRequiredModal.querySelector('p');

        const openLoginRequiredModal = (message) => {
            if (message) {
                modalMessage.innerHTML = message;
            }

            loginRequiredModal.style.display = 'flex';
            setTimeout(() => loginRequiredModal.classList.add('show'), 10);
        };
        window.openLoginRequiredModal = openLoginRequiredModal;

        const closeLoginRequiredModal = () => {
            loginRequiredModal.classList.remove('show');
            // Reset to default message after closing
            setTimeout(() => { modalMessage.innerHTML = 'You need to be logged in to use this feature.'; }, 300);
            setTimeout(() => loginRequiredModal.style.display = 'none', 300);
        };

        closeLoginRequiredBtn.addEventListener('click', closeLoginRequiredModal);
        loginRequiredModal.addEventListener('click', (e) => {
            if (e.target === loginRequiredModal) closeLoginRequiredModal();
        });
        loginNowBtn.addEventListener('click', window.openLoginModal);
    }

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
        if (!favoritesItemsContainer || !favoritesEmptyMsg) return;
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
        if (!isUserLoggedIn()) {
            window.openLoginRequiredModal('You need to be logged in to save favorites.');
            return;
        }

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

    const isFavorited = (product) => {
        return favoriteItems.some(item => item.name === product.name);
    };
    window.isFavorited = isFavorited;

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
            if (itemToMove && document.querySelector(`.product-card[data-name="${name}"]`)) {
                const productCard = document.querySelector(`.product-card[data-name="${name}"]`);
                const productForCart = {
                    ...itemToMove,
                    size: productCard.dataset.sizes.split(',')[0].trim(), // Get first available size
                    quantity: 1
                };
                addToCart(productForCart);
                // This removes it from favorites and updates UI
                if (productCard.querySelector('.product-favorite-icon')) {
                    toggleFavorite(itemToMove, productCard.querySelector('.product-favorite-icon'));
                }
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
        const cartCountEl = document.querySelector('.cart-count');
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        if (cartCountEl) {
            cartCountEl.textContent = totalQuantity;
            cartCountEl.style.display = totalQuantity > 0 ? 'flex' : 'none';
        }

        // If we are on the cart page, render the full cart view
        if (document.body.querySelector('.cart-page-main')) {
            renderFullCartPage();
        } else {
            // Otherwise, update the side-panel cart
            renderSidePanelCart();
        }
    };

    const renderSidePanelCart = () => {
        if (!cartItemsContainer || !cartEmptyMsg || !cartFooter) return;

        if (cartItems.length === 0) {
            cartItemsContainer.style.display = 'none';
            cartEmptyMsg.style.display = 'block';
            cartFooter.style.display = 'none';
        } else {
            cartItemsContainer.style.display = 'block';
            cartEmptyMsg.style.display = 'none';
            cartFooter.style.display = 'block';

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

    const renderFullCartPage = () => {
        const itemsListContainer = document.querySelector('.cart-items-list .cart-items');
        const emptyCartView = document.querySelector('.cart-items-list .cart-empty');
        const orderSummary = document.querySelector('.order-summary');

        if (!itemsListContainer || !emptyCartView || !orderSummary) return;

        if (cartItems.length === 0) {
            itemsListContainer.style.display = 'none';
            emptyCartView.style.display = 'block';
            orderSummary.style.display = 'none';
        } else {
            itemsListContainer.style.display = 'block';
            emptyCartView.style.display = 'none';
            orderSummary.style.display = 'block';

            itemsListContainer.innerHTML = ''; // Clear old items

            let subtotal = 0;

            cartItems.forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                // Using the same layout as the old side panel for consistency
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
                itemsListContainer.appendChild(itemEl);
                const priceValue = parseFloat(item.price.replace('₹', '').replace(',', ''));
                subtotal += priceValue * item.quantity;
            });

            // Update Order Summary
            document.getElementById('summary-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
            document.getElementById('summary-total').textContent = `₹${subtotal.toFixed(2)}`;
        }
    };

    const addToCart = (product) => {
        // Ensure imgSrc is just the filename, not the full path
        if (product.imgSrc && product.imgSrc.includes('/')) {
            product.imgSrc = product.imgSrc.split('/').pop();
        }

        const existingItem = cartItems.find(item => item.name === product.name && item.size === product.size);

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cartItems.push(product);
        }
        saveCart();
    };
    window.addToCart = addToCart; // Make it global

    // --- Fly-to-Cart Animation ---
    const flyToCart = (startElement, product) => {
        // Gate the feature behind login
        if (!isUserLoggedIn()) {
            window.openLoginRequiredModal('Login to add an item to cart.');
            return;
        }

        const cartIcon = document.querySelector('.cart-btn i');
        if (!cartIcon) return;

        // Add to cart data structure first
        addToCart(product);

        // Create the visual element for the animation
        const flyingImg = document.createElement('img');
        flyingImg.src = product.imgSrc;
        flyingImg.className = 'fly-to-cart-img';
        document.body.appendChild(flyingImg);

        // Get start and end positions for the animation
        const startRect = startElement.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        // Set initial position
        flyingImg.style.left = `${startRect.left + startRect.width / 2}px`;
        flyingImg.style.top = `${startRect.top + startRect.height / 2}px`;

        // Animate to the cart icon
        setTimeout(() => {
            flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`;
            flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`;
            flyingImg.style.transform = 'scale(0.1)';
            flyingImg.style.opacity = '0';
        }, 10);

        // After animation, show feedback and clean up
        setTimeout(() => {
            flyingImg.remove();
            showToast(`${product.name} has been added to your cart!`, 'fa-check-circle');
            // Maybe briefly animate the cart icon
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => { cartBtn.style.transform = 'scale(1)'; }, 200);
        }, 1000); // This duration should match the CSS transition duration
    };
    window.flyToCart = flyToCart;


    // Event delegation for cart item actions
    document.body.addEventListener('click', (e) => { // This listener is now very broad, might be better to scope it
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
        if (target.closest('.cart-items-list') || target.closest('.cart-items')) {
            saveCart();
        }
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