import { auth, db } from "./auth.js";
import { collection, doc, setDoc, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Update existing review
export async function updateReview(productId, reviewId, updatedData) {
    if (!auth.currentUser) return false;
    try {
        const reviewDoc = doc(db, "reviews", productId, "items", reviewId);
        await setDoc(reviewDoc, {
            ...updatedData,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating review:", error);
        return false;
    }
}

// Delete review
export async function deleteReview(productId, reviewId) {
    if (!auth.currentUser) return false;
    try {
        const reviewDoc = doc(db, "reviews", productId, "items", reviewId);
        await deleteDoc(reviewDoc);
        return true;
    } catch (error) {
        console.error("Error deleting review:", error);
        return false;
    }
}

// Get average rating for a product
export async function getAverageRating(productId) {
    try {
        const reviews = await getReviews(productId);
        if (reviews.length === 0) return { average: 0, count: 0 };
        
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return {
            average: (totalRating / reviews.length).toFixed(1),
            count: reviews.length
        };
    } catch (error) {
        console.error("Error calculating average rating:", error);
        return { average: 0, count: 0 };
    }
}

// Display reviews in HTML
export function displayReviews(reviews, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = "";
    
    if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews yet. Be the first to review!</p>";
        return;
    }
    
    reviews.forEach(review => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review-item";
        reviewDiv.innerHTML = `
            <div class="review-header">
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <div class="review-author">${review.userName || review.userEmail}</div>
                <div class="review-date">${new Date(review.createdAt?.toDate()).toLocaleDateString()}</div>
            </div>
            <div class="review-content">
                <h4>${review.title || ''}</h4>
                <p>${review.comment}</p>
            </div>
            ${auth.currentUser && auth.currentUser.uid === review.userId ? `
                <div class="review-actions">
                    <button onclick="editReview('${review.id}')">Edit</button>
                    <button onclick="deleteReview('${review.id}')">Delete</button>
                </div>
            ` : ''}
        `;
        container.appendChild(reviewDiv);
    });
}
