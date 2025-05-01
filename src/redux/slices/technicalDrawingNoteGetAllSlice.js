import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingNoteGetAllService } from '../../service';

export const fetchTechnicalDrawingNoteGetAll = createAsyncThunk(
    'technicalDrawingNoteGetAll/fetchTechnicalDrawingNoteGetAll',
    async () => {
        const response = await TechnicalDrawingNoteGetAllService()
        return response.result
    }
);

const technicalDrawingNoteGetAllSlice = createSlice({
    name: 'technicalDrawingNoteGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingNoteGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingNoteGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingNoteGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingNoteGetAllSlice.reducer;
