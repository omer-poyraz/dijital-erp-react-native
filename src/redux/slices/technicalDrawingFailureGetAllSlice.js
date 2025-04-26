import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureGetAllService } from '../../service';

export const fetchTechnicalDrawingFailureGetAll = createAsyncThunk(
    'technicalDrawingFailureGetAll/fetchTechnicalDrawingFailureGetAll',
    async () => {
        const response = await TechnicalDrawingFailureGetAllService()
        return response.result
    }
);

const technicalDrawingFailureGetAllSlice = createSlice({
    name: 'technicalDrawingFailureGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureGetAllSlice.reducer;
