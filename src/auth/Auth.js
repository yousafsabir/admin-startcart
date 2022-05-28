import { useEffect, useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import app from "../config/firebase.config";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// User State
export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return unsub;
    }, []);

    return currentUser;
};

// Login function
export const login = async (email, password) => {
    let login = await signInWithEmailAndPassword(auth, email, password);
    return login;
};

// logout function
export const logout = () => {
    return signOut(auth);
};
