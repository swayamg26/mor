// currentUser.js
import { auth } from "./src/auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Logout function
export const logoutUser = async () => {
    try {
        await signOut(auth);
        console.log("User logged out successfully");
    } catch (err) {
        console.error("Logout error:", err.message);
    }
};

// Attach logout to a global click handler for dynamically changed buttons
document.addEventListener('click', e => {
    const desktopLogout = e.target.closest('#desktop-login-link');
    const mobileLogout = e.target.closest('#mobile-login-link');

    if ((desktopLogout || mobileLogout) && localStorage.getItem('mor_user_loggedin') === 'true') {
        e.preventDefault();
        logoutUser();
    }
});
