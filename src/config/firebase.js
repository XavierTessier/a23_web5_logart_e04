// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, increment} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqu3B9vdkWHU8h5I37-ZoxqBubfwX1j5w",
  authDomain: "projet-synthese-e4-a23.firebaseapp.com",
  projectId: "projet-synthese-e4-a23",
  storageBucket: "projet-synthese-e4-a23.appspot.com",
  messagingSenderId: "782598370677",
  appId: "1:782598370677:web:28847d555c6015c8c00f3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const incrementValue = increment;