import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingSuccessGetService } from '../../service';

export const fetchTechnicalDrawingSuccessGet = createAsyncThunk(
    'technicalDrawingSuccessGet/fetchTechnicalDrawingSuccessGet',
    async ({ id }) => {
        const response = await TechnicalDrawingSuccessGetService(id)
        return response.result
    }
);

const technicalDrawingSuccessGetSlice = createSlice({
    name: 'technicalDrawingSuccessGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingSuccessGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingSuccessGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingSuccessGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingSuccessGetSlice.reducer;
