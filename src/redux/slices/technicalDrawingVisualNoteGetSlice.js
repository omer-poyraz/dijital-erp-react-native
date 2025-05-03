import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingVisualNoteGetService } from '../../service';

export const fetchTechnicalDrawingVisualNoteGet = createAsyncThunk(
    'technicalDrawingVisualNoteGet/fetchTechnicalDrawingVisualNoteGet',
    async ({ id }) => {
        const response = await TechnicalDrawingVisualNoteGetService(id)
        return response.result
    }
);

const technicalDrawingVisualNoteGetSlice = createSlice({
    name: 'technicalDrawingVisualNoteGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingVisualNoteGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingVisualNoteGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingVisualNoteGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingVisualNoteGetSlice.reducer;
