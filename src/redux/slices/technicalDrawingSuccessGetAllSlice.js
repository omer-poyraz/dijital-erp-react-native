import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingSuccessGetAllService } from '../../service';

export const fetchTechnicalDrawingSuccessGetAll = createAsyncThunk(
    'technicalDrawingSuccessGetAll/fetchTechnicalDrawingSuccessGetAll',
    async () => {
        const response = await TechnicalDrawingSuccessGetAllService()
        return response.result
    }
);

const technicalDrawingSuccessGetAllSlice = createSlice({
    name: 'technicalDrawingSuccessGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingSuccessGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingSuccessGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingSuccessGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingSuccessGetAllSlice.reducer;
