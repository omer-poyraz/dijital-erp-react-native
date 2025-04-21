import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureDeleteService } from '../../service';

export const fetchAssemblyFailureDelete = createAsyncThunk(
    'assemblyFailureDelete/fetchAssemblyFailureDelete',
    async ({ id }) => {
        const response = await AssemblyFailureDeleteService(id)
        return response.result
    }
);

const assemblyFailureDeleteSlice = createSlice({
    name: 'assemblyFailureDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureDeleteSlice.reducer;
