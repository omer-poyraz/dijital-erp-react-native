import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingDeleteService } from '../../service';

export const fetchTechnicalDrawingDelete = createAsyncThunk(
    'technicalDrawingDelete/fetchTechnicalDrawingDelete',
    async ({ id }) => {
        const response = await TechnicalDrawingDeleteService(id)
        return response.result
    }
);

const technicalDrawingDeleteSlice = createSlice({
    name: 'technicalDrawingDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingDeleteSlice.reducer;
