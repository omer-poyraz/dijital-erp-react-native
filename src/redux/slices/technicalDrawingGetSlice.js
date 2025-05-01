import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingGetService } from '../../service';

export const fetchTechnicalDrawingGet = createAsyncThunk(
    'technicalDrawingGet/fetchTechnicalDrawingGet',
    async ({ id }) => {
        const response = await TechnicalDrawingGetService(id)
        return response.result
    }
);

const technicalDrawingGetSlice = createSlice({
    name: 'technicalDrawingGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingGetSlice.reducer;
