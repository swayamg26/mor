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

                if (loginMethod === 'phone') {
                    emailGroup.style.display = 'block'; // Re-use email field for phone
                    emailInput.type = 'tel';
                    emailInput.placeholder = '10-digit mobile number';
                    passwordGroup.style.display = 'none';
                    forgotPasswordGroup.style.display = 'none';
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

            // Function to handle successful login
            const handleSuccessfulLogin = () => {
                // For demonstration, we'll use localStorage to track login state
                localStorage.setItem('mor_user_loggedin', 'true');

                // Check for a redirect URL in the query parameters
                const params = new URLSearchParams(window.location.search);
                const redirectUrl = params.get('redirect');

                if (redirectUrl) {
                    window.location.href = redirectUrl; // Go back to the previous page
                } else {
                    window.location.href = 'index.html'; // Go to homepage
                }
            };

            if (currentView === 'login' && loginMethod === 'phone') {
                if (!otpSent) {
                    if (!/^\d{10}$/.test(emailInput.value)) {
                        alert('Please enter a valid 10-digit phone number.');
                        return;
                    }
                    // Simulate sending OTP
                    alert(`OTP sent to ${emailInput.value}`);
                    otpSent = true;
                    otpGroup.style.display = 'block';
                    otpInput.required = true;
                    submitBtn.textContent = 'Verify OTP & Log In';
                } else {
                    // Simulate OTP verification
                    if (otpInput.value === '123456') { // Example OTP
                        alert('Login successful!');
                        handleSuccessfulLogin();
                    } else {
                        alert('Invalid OTP. Please try again.');
                    }
                }
                return; // Stop further execution for phone login
            }

            if (currentView === 'login' && loginMethod === 'email') {
                alert('Login successful!');
                handleSuccessfulLogin();
            }

            if (currentView === 'signup') {
                const password = document.getElementById('login-password').value;
                const confirmPassword = confirmInput.value;
                if (password !== confirmPassword) {
                    alert('Passwords do not match. Please try again.');
                    return;
                }
                if (!/^\d{10}$/.test(mobileInput.value)) {
                    alert('Please enter a valid 10-digit mobile number.');
                    return; // Stop form submission
                }
                alert('Signup successful! Please log in.');
                // Switch to login view after signup
                currentView = 'login';
                updateView();
            }
            if (currentView === 'forgotPassword') {
                alert('Password reset link sent to your email!');
                currentView = 'login';
                updateView();
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