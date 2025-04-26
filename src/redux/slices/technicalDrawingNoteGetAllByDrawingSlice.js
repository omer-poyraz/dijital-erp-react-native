import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingNoteGetAllByDrawingService } from '../../service';

export const fetchTechnicalDrawingNoteGetAllByDrawing = createAsyncThunk(
    'technicalDrawingNoteGetAllByDrawing/fetchTechnicalDrawingNoteGetAllByDrawing',
    async ({ id }) => {
        const response = await TechnicalDrawingNoteGetAllByDrawingService(id)
        return response.result
    }
);

const technicalDrawingNoteGetAllByDrawingSlice = createSlice({
    name: 'technicalDrawingNoteGetAllByDrawing',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingNoteGetAllByDrawing.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingNoteGetAllByDrawing.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingNoteGetAllByDrawing.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingNoteGetAllByDrawingSlice.reducer;
