import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyQualityDeleteService } from '../../service';

export const fetchAssemblyQualityDelete = createAsyncThunk(
    'assemblyQualityDelete/fetchAssemblyQualityDelete',
    async ({ id }) => {
        const response = await AssemblyQualityDeleteService(id)
        return response.result
    }
);

const assemblyQualityDeleteSlice = createSlice({
    name: 'assemblyQualityDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyQualityDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyQualityDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyQualityDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyQualityDeleteSlice.reducer;
