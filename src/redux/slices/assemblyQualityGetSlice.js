import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyQualityGetService } from '../../service';

export const fetchAssemblyQualityGet = createAsyncThunk(
    'assemblyQualityGet/fetchAssemblyQualityGet',
    async ({ id }) => {
        const response = await AssemblyQualityGetService(id)
        return response.result
    }
);

const assemblyQualityGetSlice = createSlice({
    name: 'assemblyQualityGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyQualityGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyQualityGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyQualityGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyQualityGetSlice.reducer;
