// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA32We0jqNUNVEDpHt5VUt3u-E4NnvJw-M",
    authDomain: "my-ecommerce-5cca3.firebaseapp.com",
    projectId: "my-ecommerce-5cca3",
    storageBucket: "my-ecommerce-5cca3.firebasestorage.app",
    messagingSenderId: "147873501982",
    appId: "1:147873501982:web:83bcf67e88734c65796f0f",
    measurementId: "G-L451F39RBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDB = getFirestore(app)
const auth = getAuth(app)

export { fireDB, analytics, auth };