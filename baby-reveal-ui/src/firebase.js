// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: "AIzaSyArsSt8NR2PJTScT12iIridl-BcRtJfsS0",
    authDomain: "baby-reveal-b9033.firebaseapp.com",
    projectId: "baby-reveal-b9033",
    storageBucket: "baby-reveal-b9033.appspot.com",
    messagingSenderId: "153378029233",
    appId: "1:153378029233:web:bbfe126bb9939c298dac90",
    measurementId: "G-LC6F057637"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// // Initialize App Check
// const appCheck = getAppCheck(app);
// appCheck.activate('your-public-site-key', true); // Replace 'your-public-site-key' with your actual reCAPTCHA v3 site key
//

// Initialize Firestore
const db = getFirestore(app);

export { db };
