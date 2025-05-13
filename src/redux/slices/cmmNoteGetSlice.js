import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMNoteGetService } from '../../service';

export const fetchCMMNoteGet = createAsyncThunk(
    'cmmNoteGet/fetchCMMNoteGet',
    async ({ id }) => {
        const response = await CMMNoteGetService(id)
        return response.result
    }
);

const cmmNoteGetSlice = createSlice({
    name: 'cmmNoteGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMNoteGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMNoteGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMNoteGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmNoteGetSlice.reducer;
