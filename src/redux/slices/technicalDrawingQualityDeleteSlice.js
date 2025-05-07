import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingQualityDeleteService } from '../../service';

export const fetchTechnicalDrawingQualityDelete = createAsyncThunk(
    'technicalDrawingQualityDelete/fetchTechnicalDrawingQualityDelete',
    async ({ id }) => {
        const response = await TechnicalDrawingQualityDeleteService(id)
        return response.result
    }
);

const technicalDrawingQualityDeleteSlice = createSlice({
    name: 'technicalDrawingQualityDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingQualityDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingQualityDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingQualityDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingQualityDeleteSlice.reducer;
