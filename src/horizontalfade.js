document.addEventListener('DOMContentLoaded', () => {
    const scrollContainers = document.querySelectorAll('.featured-scroll, .categories-scroll');

    if (scrollContainers.length === 0) {
        return;
    }

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, {
        root: null, // observing intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the item is visible
    });

    scrollContainers.forEach(container => {
        // Select direct children or product wrappers to apply the animation, making it more generic
        const items = container.querySelectorAll('.product-item-wrapper, .category-card');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 100}ms`;
            observer.observe(item);
        });
    });
});