import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingSuccessDeleteService } from '../../service';

export const fetchTechnicalDrawingSuccessDelete = createAsyncThunk(
    'technicalDrawingSuccessDelete/fetchTechnicalDrawingSuccessDelete',
    async ({ id }) => {
        const response = await TechnicalDrawingSuccessDeleteService(id)
        return response.result
    }
);

const technicalDrawingSuccessDeleteSlice = createSlice({
    name: 'technicalDrawingSuccessDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingSuccessDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingSuccessDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingSuccessDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingSuccessDeleteSlice.reducer;
