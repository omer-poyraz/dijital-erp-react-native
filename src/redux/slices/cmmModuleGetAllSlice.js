import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMModuleGetAllService } from '../../service';

export const fetchCMMModuleGetAll = createAsyncThunk(
    'cmmModuleGetAll/fetchCMMModuleGetAll',
    async () => {
        const response = await CMMModuleGetAllService()
        return response.result
    }
);

const cmmModuleGetAllSlice = createSlice({
    name: 'cmmModuleGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMModuleGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMModuleGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMModuleGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmModuleGetAllSlice.reducer;
