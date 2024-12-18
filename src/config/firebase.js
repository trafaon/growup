import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    aapiKey: "AIzaSyAAzLKTV-Vc9MUdcBT4HmlP3tSuH7CoG6c", // Your API key
    authDomain: "growup-2f728.firebaseapp.com", // Your project's auth domain
    databaseURL: "https://growup-2f728.firebaseio.com", // Your project's database URL
    projectId: "growup-2f728", // Your project ID
    storageBucket: "growup-2f728.appspot.com", // Your project's storage bucket
    messagingSenderId: "768056342320", // Your app's sender ID (from the app ID)
    appId: "1:768056342320:web:7d27fd94776b21ec79faf5", // Your app ID
    measurementId: "G-GLFD6SZF9T" // Your project's measurement ID (if you have Google Analytics set up)
    
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 