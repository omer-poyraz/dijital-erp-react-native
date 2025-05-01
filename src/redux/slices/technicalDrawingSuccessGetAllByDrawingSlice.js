import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingSuccessGetAllByDrawingService } from '../../service';

export const fetchTechnicalDrawingSuccessGetAllByDrawing = createAsyncThunk(
    'technicalDrawingSuccessGetAllByDrawing/fetchTechnicalDrawingSuccessGetAllByDrawing',
    async ({ id }) => {
        const response = await TechnicalDrawingSuccessGetAllByDrawingService(id)
        return response.result
    }
);

const technicalDrawingSuccessGetAllByDrawingSlice = createSlice({
    name: 'technicalDrawingSuccessGetAllByDrawing',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingSuccessGetAllByDrawing.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingSuccessGetAllByDrawing.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingSuccessGetAllByDrawing.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingSuccessGetAllByDrawingSlice.reducer;
