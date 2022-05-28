import { useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
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

// Signup function
export const signup = async (email, password) => {
    let user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
};

// Login function
export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// logout function
export const logout = () => {
    return signOut(auth);
};
