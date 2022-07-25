import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../firebase";

import STATUSES from "../Statuses";
import ACTIONS from "../ProductActions";

const initialState = {
    data: [],
    status: STATUSES.IDLE,
    docId: "",
    action: ACTIONS.IDLE,
    edit: false,
};

const PdSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addId: (state, action) => {
            state.docId = action.payload;
        },
        editModeTrue: (state) => {
            state.edit = true;
        },
        editModeFalse: (state) => {
            state.edit = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.action = ACTIONS.ADD;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.status = STATUSES.IDLE;
                state.action = ACTIONS.IDLE;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.action = ACTIONS.IDLE;
                console.log(action.error);
            })
            .addCase(makeTrending.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.action = ACTIONS.TRENDING;
            })
            .addCase(makeTrending.fulfilled, (state) => {
                state.status = STATUSES.IDLE;
                state.action = ACTIONS.IDLE;
                state.docId = "";
            })
            .addCase(makeTrending.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.action = ACTIONS.IDLE;
                console.log(action.error);
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.action = ACTIONS.REMOVE;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.status = STATUSES.IDLE;
                state.action = ACTIONS.IDLE;
                state.docId = "";
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.action = ACTIONS.IDLE;
                console.log(action.error);
            })
            .addCase(saveEdit.pending, (state) => {
                state.status = STATUSES.LOADING;
                state.action = ACTIONS.EDIT;
            })
            .addCase(saveEdit.fulfilled, (state) => {
                state.status = STATUSES.IDLE;
                state.action = ACTIONS.IDLE;
                state.edit = false;
                state.docId = "";
            })
            .addCase(saveEdit.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.action = ACTIONS.IDLE;
                console.log(action.error);
            });
    },
});

export const { addId, editModeTrue, editModeFalse } = PdSlice.actions;

export default PdSlice.reducer;

export const addProduct = createAsyncThunk("addProduct", async (arg) => {
    // making empty product document
    const collectionRef = collection(db, arg.collection);
    const docSnap = await addDoc(collectionRef, {});
    // uploading photo to storage
    const fileRef = ref(storage, docSnap.id);
    await uploadBytes(fileRef, arg.photo);
    const photoUrl = await getDownloadURL(fileRef);
    // setting the document
    let fullPayload = { ...arg.data, id: docSnap.id, img: photoUrl };
    let docRef = doc(db, arg.store, docSnap.id);
    await setDoc(docRef, fullPayload);
});

export const makeTrending = createAsyncThunk(
    "makeTrending",
    async (arg, thunkApi) => {
        thunkApi.dispatch(addId(arg.docId));
        const docRef = doc(db, arg.collection, arg.docId);
        return await updateDoc(docRef, { trending: arg.payload });
    }
);

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async (arg, thunkApi) => {
        thunkApi.dispatch(addId(arg.docId));
        const docRef = doc(db, arg.collection, arg.docId);
        await deleteDoc(docRef);
        const fileRef = ref(storage, arg.docId);
        await deleteObject(fileRef);
    }
);

export const saveEdit = createAsyncThunk("saveEdit", async (arg) => {
    const docRef = doc(db, arg.collection, arg.docId);
    return await updateDoc(docRef, {
        title: arg.title,
        desc: arg.desc,
        price: arg.price,
    });
});
