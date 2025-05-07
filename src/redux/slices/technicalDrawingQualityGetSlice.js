import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingQualityGetService } from '../../service';

export const fetchTechnicalDrawingQualityGet = createAsyncThunk(
    'technicalDrawingQualityGet/fetchTechnicalDrawingQualityGet',
    async ({ id }) => {
        const response = await TechnicalDrawingQualityGetService(id)
        return response.result
    }
);

const technicalDrawingQualityGetSlice = createSlice({
    name: 'technicalDrawingQualityGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingQualityGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingQualityGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingQualityGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingQualityGetSlice.reducer;
