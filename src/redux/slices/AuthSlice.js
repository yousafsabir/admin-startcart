import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import AUTH from "../AuthActions";
import Statuses from "../Statuses";

const initialState = {
    data: [],
    status: Statuses.IDLE,
    action: AUTH.FETCHADMINS,
    isPresent: false,
    current: {},
};

const AuthSice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAdmin: (state, action) => {
            let index = state.data?.findIndex(
                (item) => item.uid === action.payload.uid
            );
            if (state.data.length === 0) {
                state.data = [...state.data, action.payload];
                console.log(state.data);
            } else if (index === -1) {
                state.data = [...state.data, action.payload];
                console.log(state.data);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = Statuses.LOADING;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = Statuses.IDLE;
                state.data.map((admin) => {
                    if (admin.uid === auth.currentUser.uid) {
                        state.current = admin;
                        state.isPresent = true;
                    }
                });
            })
            .addCase(login.rejected, (state, action) => {
                state.status = Statuses.ERROR;
                console.log(action.error);
            })
            .addCase(logout.fulfilled, (state) => {
                state.isPresent = false;
                state.current = {};
            })
            .addCase(fetchAdmins.pending, (state) => {
                state.status = Statuses.LOADING;
                // state.action = AUTH.FETCHADMINS; no need to do bcz its on fetch by default
                console.log("state pending");
            })
            .addCase(fetchAdmins.fulfilled, (state) => {
                // This validation because firebase doesn't throw error on no internet connection
                if (state.data.length === 0) {
                    state.status = Statuses.ERROR;
                    state.action = AUTH.FETCHADMINS;
                } else {
                    state.status = Statuses.IDLE;
                    state.action = AUTH.IDLE;
                }
            })
            .addCase(fetchAdmins.rejected, (state, action) => {
                state.status = Statuses.ERROR;
                state.action = AUTH.FETCHADMINS;
                console.log(action.error);
            });
    },
});

export const { addAdmin } = AuthSice.actions;

export default AuthSice.reducer;

export const login = createAsyncThunk("login", async (creds) => {
    const res = await signInWithEmailAndPassword(
        auth,
        creds.email,
        creds.password
    );
});

export const logout = createAsyncThunk("logout", async () => {
    return await signOut(auth);
});

export const fetchAdmins = createAsyncThunk(
    "admins/fetch",
    async (arg, thunkApi) => {
        const collectionRef = collection(db, "admins");
        const snapshot = await getDocs(collectionRef);
        snapshot.docs.map((doc) =>
            thunkApi.dispatch(addAdmin({ ...doc.data() }))
        );
    }
);
