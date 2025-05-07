import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyQualityGetAllByFailureService } from '../../service';

export const fetchAssemblyQualityGetAllByFailure = createAsyncThunk(
    'assemblyQualityGetAllByFailure/fetchAssemblyQualityGetAllByFailure',
    async ({ id }) => {
        const response = await AssemblyQualityGetAllByFailureService(id)
        return response.result
    }
);

const assemblyQualityGetAllByFailureSlice = createSlice({
    name: 'assemblyQualityGetAllByFailure',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyQualityGetAllByFailure.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyQualityGetAllByFailure.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyQualityGetAllByFailure.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyQualityGetAllByFailureSlice.reducer;
