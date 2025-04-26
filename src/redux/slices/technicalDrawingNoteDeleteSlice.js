import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingNoteDeleteService } from '../../service';

export const fetchTechnicalDrawingNoteDelete = createAsyncThunk(
    'technicalDrawingNoteDelete/fetchTechnicalDrawingNoteDelete',
    async ({ id }) => {
        const response = await TechnicalDrawingNoteDeleteService(id)
        return response.result
    }
);

const technicalDrawingNoteDeleteSlice = createSlice({
    name: 'technicalDrawingNoteDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingNoteDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingNoteDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingNoteDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingNoteDeleteSlice.reducer;
