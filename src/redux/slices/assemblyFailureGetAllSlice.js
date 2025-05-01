import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureGetAllService } from '../../service';

export const fetchAssemblyFailureGetAll = createAsyncThunk(
    'assemblyFailureGetAll/fetchAssemblyFailureGetAll',
    async () => {
        const response = await AssemblyFailureGetAllService()
        return response.result
    }
);

const assemblyFailureGetAllSlice = createSlice({
    name: 'assemblyFailureGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureGetAllSlice.reducer;
