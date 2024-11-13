// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// const { firestore } = require("firebase-admin");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxcCt-CO1oUtQ7ppvJnoHrZMzZvfDKEFQ",
  authDomain: "backenddata-ae15b.firebaseapp.com",
  projectId: "backenddata-ae15b",
  storageBucket: "backenddata-ae15b.firebasestorage.app",
  messagingSenderId: "202588708462",
  appId: "1:202588708462:web:da0184cec0d83268ed107f",
  measurementId: "G-1ZNE0P8SM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
module.exports = { app, db, auth };
