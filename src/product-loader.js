import { getReviews, displayReviews } from './review.js';

function initializeProductPage(productData, allProducts) {
    const { id, name, price, imgSrc, galleryImages } = productData;
    const reviewsListContainerId = 'reviews-list';

    // --- Share Button ---
    document.getElementById('share-btn')?.addEventListener('click', () => {
        navigator.share({ title: name, text: `Check out this ${name}!`, url: window.location.href })
            .catch(() => window.showToast('Sharing is not supported on your browser.', 'fa-exclamation-triangle'));
    });

    // --- Favorite Button ---
    const favIconContainer = document.getElementById('page-favorite-icon');
    if (favIconContainer) {
        const productForFav = { id, name, price, imgSrc };
        // Set initial state
        if (window.isFavorited && window.isFavorited(productForFav)) {
            favIconContainer.innerHTML = '<i class="fas fa-heart"></i>';
        }
        // Add click listener
        favIconContainer.addEventListener('click', () => {
            if (window.toggleFavorite) {
                window.toggleFavorite(productForFav, favIconContainer);
            }
        });
    }

    // --- Product Page Gallery ---
    const sliderTrack = document.getElementById('gallery-slider-track');
    const dotsContainer = document.getElementById('gallery-dots-container');
    const sliderContainer = document.querySelector('.gallery-slider-container');
    let currentImageIndex = 0;

    if (sliderTrack && dotsContainer && sliderContainer && galleryImages && galleryImages.length > 0) {
        // Create images and dots
        galleryImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Product image ${index + 1}`;
            img.loading = 'lazy';
            sliderTrack.appendChild(img);

            const dot = document.createElement('span');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.gallery-dot');

        function showImage(index) {
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            currentImageIndex = index;
        }

        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('gallery-dot')) {
                const index = parseInt(e.target.dataset.index);
                showImage(index);
            }
        });

        // --- Swipe functionality for gallery ---
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;

        const handleSwipe = () => {
            if (touchEndX === 0 || Math.abs(touchEndX - touchStartX) < 50) return; // Threshold
            if (touchEndX < touchStartX) { // Swiped left
                showImage((currentImageIndex + 1) % galleryImages.length);
            } else { // Swiped right
                showImage((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);
            }
            touchStartX = 0;
            touchEndX = 0;
        };

        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
            sliderContainer.style.cursor = 'grabbing';
        }, { passive: true });

        sliderContainer.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderContainer.addEventListener('touchend', () => {
            if (!isSwiping) return;
            isSwiping = false;
            sliderContainer.style.cursor = 'grab';
            handleSwipe();
        });

        sliderContainer.addEventListener('mousedown', (e) => {
            isSwiping = true;
            touchStartX = e.screenX;
            sliderContainer.style.cursor = 'grabbing';
            sliderContainer.style.userSelect = 'none';
        });

        sliderContainer.addEventListener('mousemove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.screenX;
        });

        const mouseUpHandler = () => {
            if (!isSwiping) return;
            isSwiping = false;
            sliderContainer.style.cursor = 'grab';
            sliderContainer.style.userSelect = '';
            handleSwipe();
        };
        sliderContainer.addEventListener('mouseup', mouseUpHandler);
        sliderContainer.addEventListener('mouseleave', mouseUpHandler);
    }

    // --- Size Selector ---
    const sizeSelector = document.getElementById('size-selector');
    if (sizeSelector) {
        sizeSelector.addEventListener('click', (e) => {
            if (e.target.classList.contains('size-btn')) {
                sizeSelector.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    // --- Quantity Counter ---
    const quantityValue = document.querySelector('.quantity-value');
    if (quantityValue) {
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                let currentQty = parseInt(quantityValue.textContent);
                if (btn.dataset.action === 'increase') {
                    currentQty++;
                } else if (currentQty > 1) {
                    currentQty--;
                }
                quantityValue.textContent = currentQty;
            });
        });
    }

    // --- Add to Cart ---
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (!window.isUserLoggedIn()) {
                window.openLoginRequiredModal('Login to add an item to cart.');
                return;
            }

            const product = {
                id: id, // Pass the product ID
                name: document.getElementById('product-name').textContent,
                price: document.getElementById('product-price').textContent,
                size: sizeSelector.querySelector('.size-btn.active').textContent,
                imgSrc: galleryImages[0],
                quantity: parseInt(quantityValue.textContent)
            };
            window.addToCart(product);
            window.showToast(`${product.name} has been added to your cart!`);
        });
    }

    // --- Related Products ---
    const relatedProductsContainer = document.getElementById('related-products-container');
    if (relatedProductsContainer) {
        const currentProductName = document.getElementById('product-name').textContent;
        const relatedProducts = allProducts
            .filter(p => p.name !== currentProductName)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        relatedProducts.forEach(product => {
            const productCardHTML = `
                <div class="product-item-wrapper no-info">
                    <a href="${product.pageUrl}" style="text-decoration: none; color: inherit;">
                        <div class="product-card" data-name="${product.name}" data-price="${product.price}" data-page-url="${product.pageUrl}">
                            <div class="product-image-container">
                                <img src="${product.imgSrc}" alt="${product.name}" loading="lazy">
                                <div class="product-favorite-icon">
                                    <i class="far fa-heart"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            relatedProductsContainer.innerHTML += productCardHTML;
        });
    }

    // --- Product Description Accordion ---
    document.querySelectorAll('.modern-accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            const item = header.parentElement;

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                content.style.maxHeight = null;
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });

    // --- Review Modal ---
    const openReviewBtn = document.getElementById('write-review-btn');
    if (openReviewBtn) {
        openReviewBtn.addEventListener('click', () => {
            if (window.isUserLoggedIn && window.isUserLoggedIn()) {
                window.location.href = `review.html?product=${id}`;
            } else {
                window.openLoginRequiredModal('You need to be logged in to write a review.');
            }
        });
    }

    // --- Load and Display Reviews ---
    async function loadAndDisplayReviews() {
        const reviews = await getReviews(id);
        displayReviews(reviews, reviewsListContainerId);
    }
    loadAndDisplayReviews();
}

export { initializeProductPage };