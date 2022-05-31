import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all: [],
    current: {},
    isCurrent: false,
};

const adminSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addAdmin: (state, action) => {
            let index = state.all.findIndex(
                (item) => item.uid === action.payload.uid
            );
            if (state.all.length === 0) {
                state.all = [...state.all, action.payload];
            } else if (index === -1) {
                state.all = [...state.all, action.payload];
            }
        },
        addCurrent: (state, action) => {
            state.current = action.payload;
            state.isCurrent = true;
            console.log("current user:", state.current);
        },
        removeCurrent: (state, action) => {
            state.current = {};
            state.isCurrent = false;
        },
    },
});

export const { addAdmin, addCurrent, removeCurrent } = adminSlice.actions;

export default adminSlice.reducer;
