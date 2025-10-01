// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHUtNHyQZhkyYZtx_sHLOrhRoiaD8sPsU",
  authDomain: "morbymansi.firebaseapp.com",
  projectId: "morbymansi",
  storageBucket: "morbymansi.firebasestorage.app",
  messagingSenderId: "643147233927",
  appId: "1:643147233927:web:728b88997e4ceb0c44d622",
  measurementId: "G-HWNLX4DHD6"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const analytics = getAnalytics(firebaseApp);

let currentUser = null;
onAuthStateChanged(auth, (user) => {
    currentUser = user; // always contains current logged-in user
});

export { auth, db, storage , currentUser , analytics};

// Track login state
onAuthStateChanged(auth, (user) => {
  // Update UI elements across the site
  const desktopLoginLink = document.getElementById('desktop-login-link');
  const mobileLoginLink = document.getElementById('mobile-login-link');

  if (user) {
    console.log("✅ Logged in as:", user.email);
    localStorage.setItem("mor_user_loggedin", "true");

    // Change Login buttons to Logout/Profile
    if (desktopLoginLink) {
      desktopLoginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
      desktopLoginLink.setAttribute('aria-label', 'Logout');
      desktopLoginLink.href = '#'; // Prevent navigation
    }
    if (mobileLoginLink) {
      mobileLoginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      mobileLoginLink.href = '#';
    }

    // Load cart from Firestore and update local cart
    const firestoreCart = await loadCartFromFirestore();
    if (firestoreCart) {
      localStorage.setItem("mor_cart", JSON.stringify(firestoreCart));
      // Optionally, trigger UI update for cart here
    }
  } else {
    console.log("❌ No user logged in");
    localStorage.setItem("mor_user_loggedin", "false");

    // Revert buttons to Login
    if (desktopLoginLink) {
      desktopLoginLink.innerHTML = '<i class="fas fa-user"></i>';
      desktopLoginLink.setAttribute('aria-label', 'Login');
      desktopLoginLink.href = 'login.html';
    }
    if (mobileLoginLink) {
      mobileLoginLink.innerHTML = '<i class="fas fa-user"></i> Login';
      mobileLoginLink.href = 'login.html';
    }
    // Optionally, clear local cart or handle as needed
  }
});

// Helper: Save cart to Firestore for current user
async function saveCartToFirestore(cart) {
  if (!currentUser) return;
  try {
    await setDoc(doc(db, "carts", currentUser.uid), { cart });
    console.log("🛒 Cart saved to Firestore");
  } catch (e) {
    console.error("Error saving cart:", e);
  }
}

// Helper: Load cart from Firestore for current user
async function loadCartFromFirestore() {
  if (!currentUser) return null;
  try {
    const docSnap = await getDoc(doc(db, "carts", currentUser.uid));
    if (docSnap.exists()) {
      console.log("🛒 Cart loaded from Firestore");
      return docSnap.data().cart;
    }
  } catch (e) {
    console.error("Error loading cart:", e);
  }
  return null;
}

export { auth, db, storage, currentUser, analytics, saveCartToFirestore, loadCartFromFirestore };

// Importing auth functions
import { saveCartToFirestore, loadCartFromFirestore, auth } from './auth.js';

// Example: Call this function whenever cart changes
function updateCart(cart) {
  // ...existing code to update cart in localStorage/UI...
  localStorage.setItem("mor_cart", JSON.stringify(cart));
  // Save to Firestore if logged in
  if (auth.currentUser) {
    saveCartToFirestore(cart);
  }
}

// Optionally, on page load or user login, sync cart from Firestore
async function syncCartFromFirestore() {
  if (auth.currentUser) {
    const firestoreCart = await loadCartFromFirestore();
    if (firestoreCart) {
      localStorage.setItem("mor_cart", JSON.stringify(firestoreCart));
      // Optionally, update cart UI here
    }
  }
}