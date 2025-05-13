import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMNoteDeleteService } from '../../service';

export const fetchCMMNoteDelete = createAsyncThunk(
    'cmmNoteDelete/fetchCMMNoteDelete',
    async ({ id }) => {
        const response = await CMMNoteDeleteService(id)
        return response.result
    }
);

const cmmNoteDeleteSlice = createSlice({
    name: 'cmmNoteDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMNoteDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMNoteDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMNoteDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmNoteDeleteSlice.reducer;
