import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMGetService } from '../../service';

export const fetchCMMGet = createAsyncThunk(
    'cmmGet/fetchCMMGet',
    async ({ id }) => {
        const response = await CMMGetService(id)
        return response.result
    }
);

const cmmGetSlice = createSlice({
    name: 'cmmGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmGetSlice.reducer;
