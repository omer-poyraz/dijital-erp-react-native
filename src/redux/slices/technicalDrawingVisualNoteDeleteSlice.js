import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingVisualNoteDeleteService } from '../../service';

export const fetchTechnicalDrawingVisualNoteDelete = createAsyncThunk(
    'technicalDrawingVisualNoteDelete/fetchTechnicalDrawingVisualNoteDelete',
    async ({ id }) => {
        const response = await TechnicalDrawingVisualNoteDeleteService(id)
        return response.result
    }
);

const technicalDrawingVisualNoteDeleteSlice = createSlice({
    name: 'technicalDrawingVisualNoteDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingVisualNoteDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingVisualNoteDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingVisualNoteDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingVisualNoteDeleteSlice.reducer;
