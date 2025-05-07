import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingQualityGetAllByFailureService } from '../../service';

export const fetchTechnicalDrawingQualityGetAllByFailure = createAsyncThunk(
    'technicalDrawingQualityGetAllByFailure/fetchTechnicalDrawingQualityGetAllByFailure',
    async ({ id }) => {
        const response = await TechnicalDrawingQualityGetAllByFailureService(id)
        return response.result
    }
);

const technicalDrawingQualityGetAllByFailureSlice = createSlice({
    name: 'technicalDrawingQualityGetAllByFailure',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingQualityGetAllByFailure.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingQualityGetAllByFailure.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingQualityGetAllByFailure.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingQualityGetAllByFailureSlice.reducer;
