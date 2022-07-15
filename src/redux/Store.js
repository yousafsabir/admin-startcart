import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import PdSlice from "./slices/PdSlice";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        product: PdSlice,
    },
});

export default store;
