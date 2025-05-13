import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMModuleDeleteService } from '../../service';

export const fetchCMMModuleDelete = createAsyncThunk(
    'cmmModuleDelete/fetchCMMModuleDelete',
    async ({ id }) => {
        const response = await CMMModuleDeleteService(id)
        return response.result
    }
);

const cmmModuleDeleteSlice = createSlice({
    name: 'cmmModuleDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMModuleDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMModuleDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMModuleDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmModuleDeleteSlice.reducer;
