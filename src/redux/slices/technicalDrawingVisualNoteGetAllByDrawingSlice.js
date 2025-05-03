import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingVisualNoteGetAllByDrawingService } from '../../service';

export const fetchTechnicalDrawingVisualNoteGetAllByDrawing = createAsyncThunk(
    'technicalDrawingVisualNoteGetAllByDrawing/fetchTechnicalDrawingVisualNoteGetAllByDrawing',
    async ({ id }) => {
        const response = await TechnicalDrawingVisualNoteGetAllByDrawingService(id)
        return response.result
    }
);

const technicalDrawingVisualNoteGetAllByDrawingSlice = createSlice({
    name: 'technicalDrawingVisualNoteGetAllByDrawing',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingVisualNoteGetAllByDrawing.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingVisualNoteGetAllByDrawing.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingVisualNoteGetAllByDrawing.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingVisualNoteGetAllByDrawingSlice.reducer;
