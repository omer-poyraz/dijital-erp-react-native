import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblySuccessGetAllByManualService } from '../../service';

export const fetchAssemblySuccessGetAllByManual = createAsyncThunk(
    'assemblySuccessGetAllByManual/fetchAssemblySuccessGetAllByManual',
    async ({ id }) => {
        const response = await AssemblySuccessGetAllByManualService(id)
        return response.result
    }
);

const assemblySuccessGetAllByManualSlice = createSlice({
    name: 'assemblySuccessGetAllByManual',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblySuccessGetAllByManual.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblySuccessGetAllByManual.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblySuccessGetAllByManual.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblySuccessGetAllByManualSlice.reducer;
