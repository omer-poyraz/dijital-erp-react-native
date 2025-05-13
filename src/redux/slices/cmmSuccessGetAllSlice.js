import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMSuccessGetAllService } from '../../service';

export const fetchCMMSuccessGetAll = createAsyncThunk(
    'cmmSuccessGetAll/fetchCMMSuccessGetAll',
    async () => {
        const response = await CMMSuccessGetAllService()
        return response.result
    }
);

const cmmSuccessGetAllSlice = createSlice({
    name: 'cmmSuccessGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMSuccessGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMSuccessGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMSuccessGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmSuccessGetAllSlice.reducer;
