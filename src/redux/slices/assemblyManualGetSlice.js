import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyManualGetService } from '../../service';

export const fetchAssemblyManualGet = createAsyncThunk(
    'assemblyManualGet/fetchAssemblyManualGet',
    async ({ id }) => {
        const response = await AssemblyManualGetService(id)
        return response.result
    }
);

const assemblyManualGetSlice = createSlice({
    name: 'assemblyManualGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyManualGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyManualGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyManualGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyManualGetSlice.reducer;
