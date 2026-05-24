// Firebase initialization (CDN modular SDK)
// Replace the firebaseConfig below with your project's config from Firebase Console.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// === REPLACE WITH YOUR FIREBASE CONFIG ===
export const firebaseConfig = {
  apiKey: "AIzaSyBjs0a4aelsMMqYAQxFch6pxYB0tkJLfGE",
  authDomain: "mariki-3497a.firebaseapp.com",
  projectId: "mariki-3497a",
  storageBucket: "mariki-3497a.firebasestorage.app",
  messagingSenderId: "407565484293",
  appId: "1:407565484293:web:b3717da3a5af987056f76c"
};

// === CLOUDINARY (unsigned upload preset) ===
export const cloudinaryConfig = {
  cloudName: "dqghwqc5y",
  uploadPreset: "marikiportal"
};

// === CLICKPESA ===
export const clickpesaConfig = {
  // Public client identifier; secret key MUST stay server-side (Netlify function / Cloud Function)
  merchantId: "IDKkBydy1iKV1fDTNIMND3Y0IHjARGMv",
  // The endpoint of your server (Netlify function) that proxies ClickPesa.
  apiEndpoint: "/.netlify/functions/clickpesa"
};

// === SUPERADMIN ALERT (for new registrations) ===
export const adminNotify = {
  email: "superadmin@mariki.family",
  phone: "+255700000000"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
