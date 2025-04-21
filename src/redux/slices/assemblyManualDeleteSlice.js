import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyManualDeleteService } from '../../service';

export const fetchAssemblyManualDelete = createAsyncThunk(
    'assemblyManualDelete/fetchAssemblyManualDelete',
    async ({ id }) => {
        const response = await AssemblyManualDeleteService(id)
        return response.result
    }
);

const assemblyManualDeleteSlice = createSlice({
    name: 'assemblyManualDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyManualDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyManualDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyManualDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyManualDeleteSlice.reducer;
