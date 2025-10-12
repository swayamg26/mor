function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {
        console.error('Footer placeholder not found!');
        return;
    }

    const footerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h4>Mor</h4>
                <p>Premium fashion for the modern woman. Discover elegance, embrace style, and express your unique personality with our curated collections.</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <p><a href="index.html#home">Home</a></p>
                <p><a href="index.html#categories">Categories</a></p>
                <p><a href="index.html#collections">Collections</a></p>
                <p><a href="index.html#about">About Us</a></p>
            </div>
            <div class="footer-section">
                <h4>Customer Care</h4>
                <p><a href="#">Size Guide</a></p>
                <p><a href="#">Shipping Info</a></p>
                <p><a href="#">Returns & Exchanges</a></p>
                <p><a href="#">Contact Support</a></p>
            </div>
            <div class="footer-section">
                <h4>Connect</h4>
                <div class="social-icons">
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Newsletter"><i class="fas fa-envelope"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Mor Fashion. All rights reserved. | <a href="privacy.html" style="color: inherit;">Privacy Policy</a> | <a href="terms.html" style="color: inherit;">Terms of Service</a></p>
        </div>
    `;

    footerPlaceholder.innerHTML = footerHTML;
}

document.addEventListener('DOMContentLoaded', loadFooter);