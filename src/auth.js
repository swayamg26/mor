// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh3ndQIWR_4wYvhptvoKVZuaFWlvNdSyQ",
  authDomain: "mor-by-mansi.firebaseapp.com",
  projectId: "mor-by-mansi",
  storageBucket: "mor-by-mansi.appspot.com",
  messagingSenderId: "535258474390",
  appId: "1:535258474390:web:c0688015d84c25f6ee5fb7",
  measurementId: "G-EJ9G1N6HC2"
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
  }
});
