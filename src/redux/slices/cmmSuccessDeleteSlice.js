import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMSuccessDeleteService } from '../../service';

export const fetchCMMSuccessDelete = createAsyncThunk(
    'cmmSuccessDelete/fetchCMMSuccessDelete',
    async ({ id }) => {
        const response = await CMMSuccessDeleteService(id)
        return response.result
    }
);

const cmmSuccessDeleteSlice = createSlice({
    name: 'cmmSuccessDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMSuccessDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMSuccessDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMSuccessDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmSuccessDeleteSlice.reducer;
