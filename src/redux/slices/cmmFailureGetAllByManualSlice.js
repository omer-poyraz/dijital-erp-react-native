import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMFailureGetAllByManualService } from '../../service';

export const fetchCMMFailureGetAllByManual = createAsyncThunk(
    'cmmFailureGetAllByManual/fetchCMMFailureGetAllByManual',
    async ({ id }) => {
        const response = await CMMFailureGetAllByManualService(id)
        return response.result
    }
);

const cmmFailureGetAllByManualSlice = createSlice({
    name: 'cmmFailureGetAllByManual',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMFailureGetAllByManual.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMFailureGetAllByManual.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMFailureGetAllByManual.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmFailureGetAllByManualSlice.reducer;
