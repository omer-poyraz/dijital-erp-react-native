import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblySuccessDeleteService } from '../../service';

export const fetchAssemblySuccessDelete = createAsyncThunk(
    'assemblySuccessDelete/fetchAssemblySuccessDelete',
    async ({ id }) => {
        const response = await AssemblySuccessDeleteService(id)
        return response.result
    }
);

const assemblySuccessDeleteSlice = createSlice({
    name: 'assemblySuccessDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblySuccessDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblySuccessDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblySuccessDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblySuccessDeleteSlice.reducer;
