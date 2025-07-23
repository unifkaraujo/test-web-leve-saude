import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Sua config copiada do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDP6i7mCJi_I4HTr5Z-zztf2MtrJxvo-h0",
  authDomain: "feedbackhub-117ad.firebaseapp.com",
  projectId: "feedbackhub-117ad",
  storageBucket: "feedbackhub-117ad.firebasestorage.app",
  messagingSenderId: "254165561284",
  appId: "1:254165561284:web:1130f8dff8764c59d4be91"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);