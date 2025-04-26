import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureDeleteService } from '../../service';

export const fetchTechnicalDrawingFailureDelete = createAsyncThunk(
    'technicalDrawingFailureDelete/fetchTechnicalDrawingFailureDelete',
    async ({ id }) => {
        const response = await TechnicalDrawingFailureDeleteService(id)
        return response.result
    }
);

const technicalDrawingFailureDeleteSlice = createSlice({
    name: 'technicalDrawingFailureDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureDeleteSlice.reducer;
