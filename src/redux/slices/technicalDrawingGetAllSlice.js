import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingGetAllService } from '../../service';

export const fetchTechnicalDrawingGetAll = createAsyncThunk(
    'technicalDrawingGetAll/fetchTechnicalDrawingGetAll',
    async () => {
        const response = await TechnicalDrawingGetAllService()
        return response.result
    }
);

const technicalDrawingGetAllSlice = createSlice({
    name: 'technicalDrawingGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingGetAllSlice.reducer;
