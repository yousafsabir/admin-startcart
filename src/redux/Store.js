import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";

const Store = configureStore({
    reducer: {
        admin: adminSlice,
    },
});

export default Store;
