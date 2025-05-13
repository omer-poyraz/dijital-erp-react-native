import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMNoteGetAllService } from '../../service';

export const fetchCMMNoteGetAll = createAsyncThunk(
    'cmmNoteGetAll/fetchCMMNoteGetAll',
    async () => {
        const response = await CMMNoteGetAllService()
        return response.result
    }
);

const cmmNoteGetAllSlice = createSlice({
    name: 'cmmNoteGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMNoteGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMNoteGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMNoteGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmNoteGetAllSlice.reducer;
