import { db } from "./config/firebase.config";
import {
    collection,
    doc,
    addDoc,
    setDoc,
    deleteDoc,
    query,
    getDocs,
    where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const database = db;
// CRUD Hooks

export const addFire = async (Collection, payload) => {
    try {
        let collectionRef = collection(database, Collection);
        await addDoc(collectionRef, payload);
        toast.success("value added successfully");
    } catch (error) {
        console.log(error);
    }
};

export const deleteFire = async (Collection, id) => {
    try {
        let docRef = doc(database, Collection, id);
        await deleteDoc(docRef);
        toast.success("value deleted successfully");
    } catch (error) {
        console.log(error);
    }
};
export const editFire = async (Collection, id, payload) => {
    try {
        let docRef = doc(database, Collection, id);
        await setDoc(docRef, payload);
        toast.success("value updated successfully");
    } catch (error) {
        console.log(error);
    }
};

export const queryDeleteFire = async (Collection, signal) => {
    try {
        let collectionRef = collection(database, Collection);
        let q = query(collectionRef, where("value", "==", signal));
        // we have made query, now we are gonna get the docs
        const snapshot = await getDocs(q);
        // this is raw data, lets get wanted data
        let results = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        // now deleting the data
        results.forEach(async (result) => {
            let docRef = doc(database, "counter", result.id);
            await deleteDoc(docRef);
        });
    } catch (error) {
        console.log(error);
    }
};
