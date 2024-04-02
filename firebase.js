// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYA7BORIO2g8MaesUVk6SgiTIG3j6GwG8",
  authDomain: "web-canva-477a9.firebaseapp.com",
  projectId: "web-canva-477a9",
  storageBucket: "web-canva-477a9.appspot.com",
  messagingSenderId: "437655425150",
  appId: "1:437655425150:web:8932e72514b17282ec882f",
  measurementId: "G-S7LWP0SS99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);