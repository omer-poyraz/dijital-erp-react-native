import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblySuccessGetService } from '../../service';

export const fetchAssemblySuccessGet = createAsyncThunk(
    'assemblySuccessGet/fetchAssemblySuccessGet',
    async ({ id }) => {
        const response = await AssemblySuccessGetService(id)
        return response.result
    }
);

const assemblySuccessGetSlice = createSlice({
    name: 'assemblySuccessGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblySuccessGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblySuccessGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblySuccessGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblySuccessGetSlice.reducer;
