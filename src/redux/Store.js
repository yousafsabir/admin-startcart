import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slices/adminSlice";
import productsSlice from "./slices/productsSlice";

const Store = configureStore({
    reducer: {
        admin: adminSlice,
        products: productsSlice,
    },
});

export default Store;
