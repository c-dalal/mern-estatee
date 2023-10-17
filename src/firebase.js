// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-28160.firebaseapp.com",
  projectId: "mern-estate-28160",
  storageBucket: "mern-estate-28160.appspot.com",
  messagingSenderId: "103687103517",
  appId: "1:103687103517:web:7ee94f263ff661cc6892f4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
