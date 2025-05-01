import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureGetAllByDrawingService } from '../../service';

export const fetchTechnicalDrawingFailureGetAllByDrawing = createAsyncThunk(
    'technicalDrawingFailureGetAllByDrawing/fetchTechnicalDrawingFailureGetAllByDrawing',
    async ({ id }) => {
        const response = await TechnicalDrawingFailureGetAllByDrawingService(id)
        return response.result
    }
);

const technicalDrawingFailureGetAllByDrawingSlice = createSlice({
    name: 'technicalDrawingFailureGetAllByDrawing',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureGetAllByDrawing.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureGetAllByDrawing.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureGetAllByDrawing.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureGetAllByDrawingSlice.reducer;
