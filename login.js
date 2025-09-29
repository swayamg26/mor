// Import Firebase auth functions and the auth object from your config
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { auth } from './src/index.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Login/Signup View Toggle ---
    const toggleViewLink = document.getElementById('toggle-view-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (toggleViewLink && forgotPasswordLink) {
        let currentView = 'login'; // Can be 'login', 'signup', or 'forgotPassword'
        let loginMethod = 'email'; // 'email' or 'phone'
        let otpSent = false;

        const title = document.getElementById('login-modal-title');
        const subtitle = document.getElementById('login-modal-subtitle');
        const loginToggleContainer = document.querySelector('.login-toggle-options');
        const emailLabel = document.querySelector('label[for="login-email"]');
        const emailGroup = document.querySelector('#login-form .form-group:first-of-type');
        const emailInput = document.getElementById('login-email');
        const mobileNumberGroup = document.getElementById('mobile-number-group');
        const mobileInput = document.getElementById('mobile-number');
        const passwordGroup = document.getElementById('login-password').parentElement;
        const confirmGroup = document.getElementById('confirm-password-group');
        const confirmInput = document.getElementById('confirm-password');
        const otpGroup = document.getElementById('otp-group');
        const otpInput = document.getElementById('otp-input');
        const submitBtn = document.getElementById('login-submit-btn');
        const toggleText = document.getElementById('toggle-view-text');
        const forgotPasswordGroup = document.getElementById('forgot-password-group');

        const updateView = () => {
            // Reset all states first
            emailGroup.style.display = 'block';
            emailInput.placeholder = "you@example.com";
            mobileNumberGroup.style.display = 'none';
            mobileInput.required = false;
            passwordGroup.style.display = 'block';
            confirmGroup.style.display = 'none';
            confirmInput.required = false;
            otpGroup.style.display = 'none';
            otpInput.required = false;
            forgotPasswordGroup.style.display = 'block';
            loginToggleContainer.style.display = 'flex';
            otpSent = false;

            if (currentView === 'login') {
                title.textContent = 'Welcome Back';
                subtitle.textContent = 'Log in to access your account and favorites.';
                submitBtn.textContent = 'Log In';
                toggleText.textContent = "Don't have an account? ";
                toggleViewLink.textContent = 'Create your account';
                emailLabel.textContent = 'Email';

                if (loginMethod === 'phone') {
                    emailGroup.style.display = 'block'; // Re-use email field for phone
                    emailInput.type = 'tel';
                    emailInput.placeholder = '10-digit mobile number';
                    passwordGroup.style.display = 'none';
                    forgotPasswordGroup.style.display = 'none';
                    emailLabel.textContent = 'Mobile Number';
                    submitBtn.textContent = 'Send OTP';
                } else { // email
                    emailInput.type = 'email';
                    emailInput.placeholder = 'you@example.com';
                }

            } else if (currentView === 'signup') {
                title.textContent = 'Create Account';
                subtitle.textContent = 'Join us to save your favorites and more.';
                submitBtn.textContent = 'Sign Up';
                mobileNumberGroup.style.display = 'block';
                mobileInput.required = true;
                loginToggleContainer.style.display = 'none';
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
                loginToggleContainer.style.display = 'none';
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

        // --- Login Method Toggle ---
        loginToggleContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('login-toggle-btn')) {
                loginMethod = e.target.dataset.method;
                loginToggleContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                updateView();
            }
        });

        // Also handle form submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();

            // This function is now called by the onAuthStateChanged listener in mor.js
            const handleSuccessfulLogin = () => {
                // Check for a redirect URL in the query parameters
                const params = new URLSearchParams(window.location.search);
                const redirectUrl = params.get('redirect');

                if (redirectUrl) {
                    window.location.href = redirectUrl; // Go back to the previous page
                } else {
                    window.location.href = 'index.html'; // Go to homepage
                }
            };

            const email = emailInput.value;
            const password = document.getElementById('login-password').value;

            if (currentView === 'login' && loginMethod === 'phone') {
                if (!otpSent) {
                    if (!/^\d{10}$/.test(email)) {
                        alert('Please enter a valid 10-digit phone number.');
                        return;
                    }
                    // NOTE: Phone auth is not implemented with Firebase yet. This is a placeholder.
                    alert(`Phone authentication is not yet implemented. OTP simulation for ${email}.`);
                    otpSent = true;
                    otpGroup.style.display = 'block';
                    otpInput.required = true;
                    submitBtn.textContent = 'Verify OTP & Log In';
                } else {
                    // Simulate OTP verification
                    if (otpInput.value === '123456') {
                        alert('Phone login simulation successful!');
                        // In a real scenario, you'd sign in with the phone credential here.
                        // For now, we'll just redirect.
                        localStorage.setItem('mor_user_loggedin', 'true'); // Temp flag
                        handleSuccessfulLogin(); // Redirect
                    } else {
                        alert('Invalid OTP. Please try again.');
                    }
                }
                return; // Stop further execution for phone login
            } else if (currentView === 'signup') {
                const confirmPassword = confirmInput.value;
                if (password !== confirmPassword) {
                    alert('Passwords do not match. Please try again.');
                    return;
                }
                // Firebase signup
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        console.log('Signup successful:', userCredential.user);
                        // The onAuthStateChanged listener will handle the redirect.
                    })
                    .catch((error) => {
                        alert(`Signup failed: ${error.message}`);
                    });
            } else if (currentView === 'login' && loginMethod === 'email') {
                // Firebase login
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        console.log('Login successful:', userCredential.user);
                        // The onAuthStateChanged listener will handle the redirect.
                    })
                    .catch((error) => {
                        alert(`Login failed: ${error.message}`);
                    });
            } else if (currentView === 'forgotPassword') {
                // Firebase password reset
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        alert('Password reset email sent! Check your inbox.');
                        currentView = 'login';
                        updateView();
                    })
                    .catch((error) => {
                        alert(`Password reset failed: ${error.message}`);
                    });
            }
        });

        // --- Show/Hide Password ---
        document.querySelectorAll('.toggle-password').forEach(icon => {
            icon.addEventListener('click', () => {
                const input = icon.previousElementSibling;
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });
    }
});