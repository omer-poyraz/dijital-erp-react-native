import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMDeleteService } from '../../service';

export const fetchCMMDelete = createAsyncThunk(
    'cmmDelete/fetchCMMDelete',
    async ({ id }) => {
        const response = await CMMDeleteService(id)
        return response.result
    }
);

const cmmDeleteSlice = createSlice({
    name: 'cmmDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmDeleteSlice.reducer;
