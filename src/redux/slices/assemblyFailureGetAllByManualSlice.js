import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureGetAllByManualService } from '../../service';

export const fetchAssemblyFailureGetAllByManual = createAsyncThunk(
    'assemblyFailureGetAllByManual/fetchAssemblyFailureGetAllByManual',
    async ({ id }) => {
        const response = await AssemblyFailureGetAllByManualService(id)
        return response.result
    }
);

const assemblyFailureGetAllByManualSlice = createSlice({
    name: 'assemblyFailureGetAllByManual',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureGetAllByManual.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureGetAllByManual.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureGetAllByManual.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureGetAllByManualSlice.reducer;
