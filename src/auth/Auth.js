import { useEffect, useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    app,
} from "firebase/auth";

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
    return signInWithEmailAndPassword(auth, email, password);
};

// logout function
export const logout = () => {
    return signOut(auth);
};
