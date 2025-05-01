import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

export const isJobAndHoldSlice = createSlice({
    name: 'jobAndHold',
    initialState,
    reducers: {
        openJobAndHold: (state) => {
            state.isOpen = true;
        },
        closeJobAndHold: (state) => {
            state.isOpen = false;
        },
        changeStatusJobAndHold: (state) => {
            state.isOpen = !state.isOpen
        },
    },
});

export const { openJobAndHold, closeJobAndHold, changeStatusJobAndHold } = isJobAndHoldSlice.actions;

export default isJobAndHoldSlice.reducer;
