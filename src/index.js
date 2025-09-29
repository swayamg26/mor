// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh3ndQIWR_4wYvhptvoKVZuaFWlvNdSyQ",
  authDomain: "mor-by-mansi.firebaseapp.com",
  projectId: "mor-by-mansi",
  storageBucket: "mor-by-mansi.firebasestorage.app",
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

export { auth, db, storage };

// Track login state
onAuthStateChanged(auth, (user) => {
  const statusEl = document.getElementById("status");
  if (user) {
    console.log("✅ Logged in as:", user.email);
    if (statusEl) statusEl.innerText = `Welcome, ${user.email}`;
    localStorage.setItem('mor_user_loggedin', 'true');
  } else {
    console.log("❌ No user logged in");
    if (statusEl) statusEl.innerText = "Not logged in";
    localStorage.setItem('mor_user_loggedin', 'false');
  }
});
