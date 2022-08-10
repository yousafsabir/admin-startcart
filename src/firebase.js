import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "hackathon-65dd0.firebaseapp.com",
    projectId: "hackathon-65dd0",
    storageBucket: "hackathon-65dd0.appspot.com",
    messagingSenderId: "185332252339",
    appId: "1:185332252339:web:385757d79fc00cf7c53ac6",
    measurementId: "G-KRD62SL6G4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// exportin the fireStore
export const db = getFirestore(app);
// exporting storage
export const storage = getStorage(app);
// exporting auth
export const auth = getAuth(app);
