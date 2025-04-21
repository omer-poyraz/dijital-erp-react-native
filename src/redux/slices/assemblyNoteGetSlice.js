import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteGetService } from '../../service';

export const fetchAssemblyNoteGet = createAsyncThunk(
    'assemblyNoteGet/fetchAssemblyNoteGet',
    async ({ id }) => {
        const response = await AssemblyNoteGetService(id)
        return response.result
    }
);

const assemblyNoteGetSlice = createSlice({
    name: 'assemblyNoteGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyNoteGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyNoteGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyNoteGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyNoteGetSlice.reducer;
