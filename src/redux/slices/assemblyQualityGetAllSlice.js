import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyQualityGetAllService } from '../../service';

export const fetchAssemblyQualityGetAll = createAsyncThunk(
    'assemblyQualityGetAll/fetchAssemblyQualityGetAll',
    async () => {
        const response = await AssemblyQualityGetAllService()
        return response.result
    }
);

const assemblyQualityGetAllSlice = createSlice({
    name: 'assemblyQualityGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyQualityGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyQualityGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyQualityGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyQualityGetAllSlice.reducer;
