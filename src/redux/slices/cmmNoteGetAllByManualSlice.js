import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMNoteGetAllByManualService } from '../../service';

export const fetchCMMNoteGetAllByManual = createAsyncThunk(
    'cmmNoteGetAllByManual/fetchCMMNoteGetAllByManual',
    async ({ id }) => {
        const response = await CMMNoteGetAllByManualService(id)
        return response.result
    }
);

const cmmNoteGetAllByManualSlice = createSlice({
    name: 'cmmNoteGetAllByManual',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMNoteGetAllByManual.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMNoteGetAllByManual.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMNoteGetAllByManual.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmNoteGetAllByManualSlice.reducer;
