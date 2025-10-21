import { auth, initializeUserCart } from './src/auth.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


document.addEventListener('DOMContentLoaded', () => {
    const toggleViewLink = document.getElementById('toggle-view-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');

    if (toggleViewLink && forgotPasswordLink) {
        let currentView = 'login'; 
        let loginMethod = 'email'; 
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
                    emailGroup.style.display = 'block'; 
                    emailInput.type = 'tel';
                    emailInput.placeholder = '10-digit mobile number';
                    passwordGroup.style.display = 'none';
                    forgotPasswordGroup.style.display = 'none';
                    emailLabel.textContent = 'Mobile Number';
                    submitBtn.textContent = 'Send OTP';
                } else {
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
                currentView = 'login';
            }
            updateView();
        });

        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentView = 'forgotPassword';
            updateView();
        });

        loginToggleContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('login-toggle-btn')) {
                loginMethod = e.target.dataset.method;
                loginToggleContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                updateView();
            }
        });

        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();

            const handleSuccessfulLogin = async () => {
                try {
                    // Initialize cart data
                    if (auth.currentUser) {
                        await initializeUserCart(auth.currentUser);
                    }
                    
                    // Redirect
                    const params = new URLSearchParams(window.location.search);
                    const redirectUrl = params.get('redirect');
                    window.location.href = redirectUrl || 'index.html';
                } catch (error) {
                    console.error("Error initializing cart after login:", error);
                }
            };

            const email = emailInput.value;
            const password = document.getElementById('login-password').value;

            try {
                if (currentView === 'login' && loginMethod === 'phone') {
                    if (!otpSent) {
                        if (!/^\d{10}$/.test(email)) {
                            return alert('Please enter a valid 10-digit phone number.');
                        }
                        alert(`Phone authentication not implemented. OTP simulation for ${email}.`);
                        otpSent = true;
                        otpGroup.style.display = 'block';
                        otpInput.required = true;
                        submitBtn.textContent = 'Verify OTP & Log In';
                    } else {
                        if (otpInput.value === '123456') {
                            alert('Phone login simulation successful!');
                            localStorage.setItem('mor_user_loggedin', 'true');
                            handleSuccessfulLogin();
                        } else {
                            alert('Invalid OTP. Please try again.');
                        }
                    }
                } else if (currentView === 'signup') {
                    const confirmPassword = confirmInput.value;
                    if (password !== confirmPassword) return alert('Passwords do not match!');
                    await createUserWithEmailAndPassword(auth, email, password);
                    alert('✅ Account created successfully!');
                    handleSuccessfulLogin();
                } else if (currentView === 'login' && loginMethod === 'email') {
                    await signInWithEmailAndPassword(auth, email, password);
                    alert('✅ Login successful!');
                    handleSuccessfulLogin();
                } else if (currentView === 'forgotPassword') {
                    await sendPasswordResetEmail(auth, email);
                    window.showToast('Password reset email sent! Check your inbox.', 'fa-paper-plane');
                    currentView = 'login';
                    updateView();
                }
            } catch (err) {
                alert(`❌ ${err.message}`);
            }
        });

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