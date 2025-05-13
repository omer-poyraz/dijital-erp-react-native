import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMGetAllService } from '../../service';

export const fetchCMMGetAll = createAsyncThunk(
    'cmmGetAll/fetchCMMGetAll',
    async () => {
        const response = await CMMGetAllService()
        return response.result
    }
);

const cmmGetAllSlice = createSlice({
    name: 'cmmGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmGetAllSlice.reducer;
