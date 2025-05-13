import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMFailureGetAllService } from '../../service';

export const fetchCMMFailureGetAll = createAsyncThunk(
    'cmmFailureGetAll/fetchCMMFailureGetAll',
    async () => {
        const response = await CMMFailureGetAllService()
        return response.result
    }
);

const cmmFailureGetAllSlice = createSlice({
    name: 'cmmFailureGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMFailureGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMFailureGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMFailureGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmFailureGetAllSlice.reducer;
