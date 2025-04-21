import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyManualGetAllService } from '../../service';

export const fetchAssemblyManualGetAll = createAsyncThunk(
    'assemblyManualGetAll/fetchAssemblyManualGetAll',
    async () => {
        const response = await AssemblyManualGetAllService()
        return response.result
    }
);

const assemblyManualGetAllSlice = createSlice({
    name: 'assemblyManualGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyManualGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyManualGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyManualGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyManualGetAllSlice.reducer;
