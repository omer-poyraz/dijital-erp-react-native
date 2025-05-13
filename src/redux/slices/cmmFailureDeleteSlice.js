import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMFailureDeleteService } from '../../service';

export const fetchCMMFailureDelete = createAsyncThunk(
    'cmmFailureDelete/fetchCMMFailureDelete',
    async ({ id }) => {
        const response = await CMMFailureDeleteService(id)
        return response.result
    }
);

const cmmFailureDeleteSlice = createSlice({
    name: 'cmmFailureDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMFailureDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMFailureDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMFailureDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmFailureDeleteSlice.reducer;
