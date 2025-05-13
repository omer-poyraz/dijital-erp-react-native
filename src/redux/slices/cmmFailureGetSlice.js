import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMFailureGetService } from '../../service';

export const fetchCMMFailureGet = createAsyncThunk(
    'cmmFailureGet/fetchCMMFailureGet',
    async ({ id }) => {
        const response = await CMMFailureGetService(id)
        return response.result
    }
);

const cmmFailureGetSlice = createSlice({
    name: 'cmmFailureGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMFailureGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMFailureGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMFailureGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmFailureGetSlice.reducer;
