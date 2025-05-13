import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMModuleGetService } from '../../service';

export const fetchCMMModuleGet = createAsyncThunk(
    'cmmModuleGet/fetchCMMModuleGet',
    async ({ id }) => {
        const response = await CMMModuleGetService(id)
        return response.result
    }
);

const cmmModuleGetSlice = createSlice({
    name: 'cmmModuleGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMModuleGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMModuleGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMModuleGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmModuleGetSlice.reducer;
