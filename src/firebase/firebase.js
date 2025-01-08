// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvgAjqVb7Vn111V2CnyVpGfcAoPobT0So",
  authDomain: "react-da519.firebaseapp.com",
  projectId: "react-da519",
  storageBucket: "react-da519.firebasestorage.app",
  messagingSenderId: "536639477674",
  appId: "1:536639477674:web:59b08ff1a912c61e373dd3",
  measurementId: "G-V2MQ8JD3CM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };