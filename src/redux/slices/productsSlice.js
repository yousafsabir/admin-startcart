import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

const productsSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            let index = state.products.findIndex(
                (item) => item.id === action.payload.id
            );
            if (state.products.length === 0) {
                state.products = [...state.products, action.payload];
            } else if (index === -1) {
                state.products = [...state.products, action.payload];
            }
        },
    },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
