import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

export const isLeftMenuSlice = createSlice({
    name: 'leftMenu',
    initialState,
    reducers: {
        openLeftMenu: (state) => {
            state.isOpen = true;
        },
        closeLeftMenu: (state) => {
            state.isOpen = false;
        },
        changeStatusLeftMenu: (state) => {
            state.isOpen = !state.isOpen
        },
    },
});

export const { openLeftMenu, closeLeftMenu, changeStatusLeftMenu } = isLeftMenuSlice.actions;

export default isLeftMenuSlice.reducer;
