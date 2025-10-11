import { auth, db } from './src/auth.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', () => {
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const shippingForm = document.getElementById('shipping-form');

    if (!placeOrderBtn || !shippingForm) {
        console.error("Checkout form elements not found.");
        return;
    }

    placeOrderBtn.addEventListener('click', async () => {
        // 1. Check for logged-in user
        if (!auth.currentUser) {
            alert('You must be logged in to place an order.');
            window.location.href = `login.html?redirect=checkout.html`;
            return;
        }

        // 2. Validate the form
        if (!shippingForm.checkValidity()) {
            // You can show a more elegant message here
            alert('Please fill out all required shipping details.');
            shippingForm.reportValidity(); // This will show the browser's native validation messages
            return;
        }

        // 3. Get cart items and shipping details
        const cartItems = JSON.parse(localStorage.getItem('mor_cart')) || [];
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const shippingAddress = {
            fullName: document.getElementById('full-name').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            phone: document.getElementById('phone').value,
        };

        const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity), 0);

        // 4. Construct the order object
        const orderData = {
            userId: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            items: cartItems,
            shippingAddress: shippingAddress,
            subtotal: subtotal,
            total: subtotal, // Assuming free shipping for now
            status: 'placed',
            createdAt: serverTimestamp()
        };

        try {
            // 5. Save the order to Firestore
            await addDoc(collection(db, "orders"), orderData);
            alert('Thank you for your order! It has been placed successfully.');
            localStorage.removeItem('mor_cart'); // Clear the cart
            window.location.href = 'index.html'; // Redirect to home
        } catch (error) {
            console.error("Error placing order: ", error);
            alert('There was an error placing your order. Please try again.');
        }
    });
});