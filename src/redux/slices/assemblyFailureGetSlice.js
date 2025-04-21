import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureGetService } from '../../service';

export const fetchAssemblyFailureGet = createAsyncThunk(
    'assemblyFailureGet/fetchAssemblyFailureGet',
    async ({ id }) => {
        const response = await AssemblyFailureGetService(id)
        return response.result
    }
);

const assemblyFailureGetSlice = createSlice({
    name: 'assemblyFailureGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureGetSlice.reducer;
