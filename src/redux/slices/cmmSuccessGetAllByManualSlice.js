import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMSuccessGetAllByManualService } from '../../service';

export const fetchCMMSuccessGetAllByManual = createAsyncThunk(
    'cmmSuccessGetAllByManual/fetchCMMSuccessGetAllByManual',
    async ({ id }) => {
        const response = await CMMSuccessGetAllByManualService(id)
        return response.result
    }
);

const cmmSuccessGetAllByManualSlice = createSlice({
    name: 'cmmSuccessGetAllByManual',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMSuccessGetAllByManual.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMSuccessGetAllByManual.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMSuccessGetAllByManual.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmSuccessGetAllByManualSlice.reducer;
