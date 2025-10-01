import { saveCartToFirestore, auth } from './auth.js';

// Example: On page load, handle cart cleared by logout
function loadCart() {
  const cartStr = localStorage.getItem("mor_cart");
  let cart = [];
  if (cartStr) {
    try {
      cart = JSON.parse(cartStr);
    } catch (e) {
      cart = [];
    }
  }
  // ...update cart UI with cart...

  // Save cart to Firestore if logged in
  if (auth.currentUser) {
    saveCartToFirestore(cart);
  }
}

// Optionally, listen for storage changes (if cart is cleared in another tab)
window.addEventListener("storage", (event) => {
  if (event.key === "mor_cart") {
    loadCart();
  }
});

function showPreviousCart() {
  const prevCartStr = localStorage.getItem("mor_cart_last");
  if (prevCartStr) {
    let prevCart;
    try {
      prevCart = JSON.parse(prevCartStr);
    } catch (e) {
      prevCart = [];
    }
    // Display prevCart in your UI as "Your previous cart"
    // Example: console.log("Previous cart:", prevCart);
    // Replace this with your actual UI update logic
    displayCart(prevCart, "previous-cart-container");
  }
}

// Example displayCart function (implement as needed)
function displayCart(cart, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = ""; // Clear previous
  if (!cart || cart.length === 0) {
    container.innerHTML = "<p>No previous cart items.</p>";
    return;
  }
  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = JSON.stringify(item);
    container.appendChild(div);
  });
}

// Update login/logout button based on auth state
function updateLoginButton(user) {
  const desktopLoginLink = document.getElementById('desktop-login-link');
  const mobileLoginLink = document.getElementById('mobile-login-link');
  if (user) {
    if (desktopLoginLink) {
      desktopLoginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
      desktopLoginLink.setAttribute('aria-label', 'Logout');
      desktopLoginLink.href = '#';
    }
    if (mobileLoginLink) {
      mobileLoginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      mobileLoginLink.href = '#';
    }
  } else {
    if (desktopLoginLink) {
      desktopLoginLink.innerHTML = '<i class="fas fa-user"></i>';
      desktopLoginLink.setAttribute('aria-label', 'Login');
      desktopLoginLink.href = 'login.html';
    }
    if (mobileLoginLink) {
      mobileLoginLink.innerHTML = '<i class="fas fa-user"></i> Login';
      mobileLoginLink.href = 'login.html';
    }
  }
}

// Listen for auth state changes and update button
auth.onAuthStateChanged(updateLoginButton);

// Initial load
loadCart();