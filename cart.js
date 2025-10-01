import { auth, db } from "./src/auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Helper function to get cart from Firestore
async function getCartFromFirestore(userId) {
    try {
        const docRef = doc(db, "carts", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Cart loaded from Firestore:", docSnap.data());
            return docSnap.data().items || {};
        }
        return {};
    } catch (error) {
        console.error("Error getting cart:", error);
        return {};
    }
}

// Add to cart function
export async function addToCart(productId, productData) {
    try {
        if (!auth.currentUser) {
            console.log("No user logged in");
            alert("Please login to add items to cart");
            return false;
        }

        const userId = auth.currentUser.uid;
        console.log("Adding to cart for user:", userId);

        // Get current cart
        const cart = await getCartFromFirestore(userId);
        
        // Update cart
        cart[productId] = {
            ...productData,
            qty: (cart[productId]?.qty || 0) + 1,
            lastUpdated: new Date().toISOString()
        };

        // Save to Firestore
        await setDoc(doc(db, "carts", userId), { 
            items: cart,
            updatedAt: new Date().toISOString()
        });

        // Update localStorage
        localStorage.setItem("mor_cart", JSON.stringify(cart));
        console.log("Cart updated successfully:", cart);
        
        return true;
    } catch (error) {
        console.error("Error in addToCart:", error);
        alert("Failed to add item to cart");
        return false;
    }
}

// Remove from cart function
export async function removeFromCart(productId) {
    try {
        if (!auth.currentUser) {
            console.log("No user logged in");
            return false;
        }

        const userId = auth.currentUser.uid;
        const cart = await getCartFromFirestore(userId);

        if (cart[productId]) {
            delete cart[productId];
            
            await setDoc(doc(db, "carts", userId), { 
                items: cart,
                updatedAt: new Date().toISOString()
            });

            localStorage.setItem("mor_cart", JSON.stringify(cart));
            console.log("Item removed from cart:", productId);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        alert("Failed to remove item from cart");
        return false;
    }
}
