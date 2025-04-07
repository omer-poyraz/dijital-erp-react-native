import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        pageID: 0,
        lang: "TR"
    },
    reducers: {
        changePage(state, action) {
            const page = action.payload.page;
            if (typeof page === 'number' && page >= 0) {
                state.pageID = page;
            } else {
                console.error("Geçersiz sayfa numarası:", page);
            }
        },
        changeLang(state, action) {
            const lng = action.payload.lang;
            state.lang = lng
        }
    }
});

    export const { changePage, changeLang } = appSlice.actions;

    export default appSlice.reducer;