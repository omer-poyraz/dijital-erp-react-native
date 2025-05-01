import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblySuccessGetAllService } from '../../service';

export const fetchAssemblySuccessGetAll = createAsyncThunk(
    'assemblySuccessGetAll/fetchAssemblySuccessGetAll',
    async () => {
        const response = await AssemblySuccessGetAllService()
        return response.result
    }
);

const assemblySuccessGetAllSlice = createSlice({
    name: 'assemblySuccessGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblySuccessGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblySuccessGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblySuccessGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblySuccessGetAllSlice.reducer;
