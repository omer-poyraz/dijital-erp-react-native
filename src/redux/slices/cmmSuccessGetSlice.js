import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMSuccessGetService } from '../../service';

export const fetchCMMSuccessGet = createAsyncThunk(
    'cmmSuccessGet/fetchCMMSuccessGet',
    async ({ id }) => {
        const response = await CMMSuccessGetService(id)
        return response.result
    }
);

const cmmSuccessGetSlice = createSlice({
    name: 'cmmSuccessGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMSuccessGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMSuccessGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMSuccessGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmSuccessGetSlice.reducer;
