import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureGetService } from '../../service';

export const fetchTechnicalDrawingFailureGet = createAsyncThunk(
    'technicalDrawingFailureGet/fetchTechnicalDrawingFailureGet',
    async ({ id }) => {
        const response = await TechnicalDrawingFailureGetService(id)
        return response.result
    }
);

const technicalDrawingFailureGetSlice = createSlice({
    name: 'technicalDrawingFailureGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureGetSlice.reducer;
