import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingNoteGetService } from '../../service';

export const fetchTechnicalDrawingNoteGet = createAsyncThunk(
    'technicalDrawingNoteGet/fetchTechnicalDrawingNoteGet',
    async ({ id }) => {
        const response = await TechnicalDrawingNoteGetService(id)
        return response.result
    }
);

const technicalDrawingNoteGetSlice = createSlice({
    name: 'technicalDrawingNoteGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingNoteGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingNoteGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingNoteGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingNoteGetSlice.reducer;
