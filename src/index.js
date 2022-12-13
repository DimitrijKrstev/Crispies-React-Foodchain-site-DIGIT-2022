import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/index.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_OeG5MmNul_6QhTtB_16zvamik9uBD2c",
  authDomain: "crispies-3dcb9.firebaseapp.com",
  projectId: "crispies-3dcb9",
  storageBucket: "crispies-3dcb9.appspot.com",
  messagingSenderId: "1075287717682",
  appId: "1:1075287717682:web:805edd9097efe41635892b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

setPersistence(auth, browserLocalPersistence);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

