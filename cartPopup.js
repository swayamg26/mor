document.addEventListener('DOMContentLoaded', () => {
    // --- Quick Add Modal ---

    // Create the modal structure once and append it to the body
    const modalHTML = `
        <div class="quick-add-modal-overlay" id="quick-add-modal-overlay">
            <div class="quick-add-modal-content">
                <button class="quick-add-modal-close" aria-label="Close modal">&times;</button>
                <img src="" alt="Product Image" class="quick-add-modal-img">
                <h3 class="quick-add-modal-name"></h3>
                <p class="quick-add-modal-price"></p>
                <div class="modal-option-group">
                    <label>Size:</label>
                    <div class="size-selector" id="quick-add-size-selector"></div>
                </div>
                <div class="quantity-counter">
                    <button class="quantity-btn" data-action="decrease">-</button>
                    <span class="quantity-value">1</span>
                    <button class="quantity-btn" data-action="increase">+</button>
                </div>
                <button class="cta-btn add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalOverlay = document.getElementById('quick-add-modal-overlay');
    const modalContent = modalOverlay.querySelector('.quick-add-modal-content');
    const closeBtn = modalOverlay.querySelector('.quick-add-modal-close');
    const modalImg = modalOverlay.querySelector('.quick-add-modal-img');
    const modalName = modalOverlay.querySelector('.quick-add-modal-name');
    const modalPrice = modalOverlay.querySelector('.quick-add-modal-price');
    const quantityValueEl = modalOverlay.querySelector('.quantity-value');
    const sizeSelectorEl = modalOverlay.querySelector('#quick-add-size-selector');
    const modalAddToCartBtn = modalOverlay.querySelector('.add-to-cart-btn');

    let currentProductData = null;

    function openQuickAddModal(productData) {
        currentProductData = productData;
        modalImg.src = productData.imgSrc;
        modalImg.alt = productData.name;
        modalName.textContent = productData.name;
        modalPrice.textContent = productData.price;
        quantityValueEl.textContent = '1'; // Reset quantity

        // Populate sizes
        sizeSelectorEl.innerHTML = '';
        const sizes = productData.sizes ? productData.sizes.split(',').map(s => s.trim()) : ['M'];
        sizes.forEach((size, index) => {
            const sizeBtn = document.createElement('button');
            sizeBtn.className = 'size-btn';
            sizeBtn.textContent = size;
            sizeBtn.dataset.size = size;
            if (index === 0) {
                sizeBtn.classList.add('active');
            }
            sizeSelectorEl.appendChild(sizeBtn);
        });

        modalOverlay.classList.add('show');
    }

    function closeQuickAddModal() {
        modalOverlay.classList.remove('show');
    }

    // Event delegation for the floating cart icons
    document.body.addEventListener('click', (e) => {
        const cartIcon = e.target.closest('.product-cart-icon');
        if (cartIcon) {
            e.preventDefault();
            e.stopPropagation();

            const card = cartIcon.closest('.product-card');
            if (card) {
                const productData = {
                    name: card.dataset.name,
                    price: card.dataset.price,
                    imgSrc: card.dataset.imgSrc,
                    pageUrl: card.dataset.pageUrl,
                    sizes: card.dataset.sizes || 'M',
                };
                openQuickAddModal(productData);
            }
        }
    });

    // Listeners for closing the modal
    closeBtn.addEventListener('click', closeQuickAddModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeQuickAddModal();
        }
    });

    // Listeners for modal quantity and add to cart
    modalContent.addEventListener('click', (e) => {
        const target = e.target;

        // Size selector logic
        if (target.classList.contains('size-btn')) {
            sizeSelectorEl.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }


        // Quantity counter logic
        if (target.classList.contains('quantity-btn')) {
            let currentQty = parseInt(quantityValueEl.textContent);
            if (target.dataset.action === 'increase') {
                currentQty++;
            } else if (currentQty > 1) {
                currentQty--;
            }
            quantityValueEl.textContent = currentQty;
        }

        // Add to cart button logic
        if (target.classList.contains('add-to-cart-btn')) {
            if (currentProductData) {
                const selectedSize = sizeSelectorEl.querySelector('.size-btn.active')?.dataset.size || 'M';
                const productToAdd = {
                    ...currentProductData,
                    quantity: parseInt(quantityValueEl.textContent),
                    size: selectedSize,
                };

                if (window.isUserLoggedIn && !window.isUserLoggedIn()) {
                    window.openLoginRequiredModal('Login to add an item to cart.');
                    return;
                }

                window.addToCart(productToAdd);
                window.showToast(`${productToAdd.name} added to cart!`);
                closeQuickAddModal();
            }
        }
    });
});