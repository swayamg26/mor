// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);