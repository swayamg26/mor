import { auth, db } from "./src/auth.js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export async function addToCart(productId, productData) {
    const user = auth.currentUser; // or use currentUser if exported from auth.js
    if (!user) {
        alert("Please login to add items to cart.");
        return;
    }

    const cartRef = doc(db, "users", user.uid, "cart", productId);
    const existing = await getDoc(cartRef);

    if (existing.exists()) {
        await updateDoc(cartRef, { qty: existing.data().qty + 1 });
    } else {
        await setDoc(cartRef, { ...productData, qty: 1 });
    }

    alert("✅ Item added to your cart!");
}
