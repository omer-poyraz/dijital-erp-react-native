import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyVisualNoteGetService } from '../../service';

export const fetchAssemblyVisualNoteGet = createAsyncThunk(
    'assemblyVisualNoteGet/fetchAssemblyVisualNoteGet',
    async ({ id }) => {
        const response = await AssemblyVisualNoteGetService(id)
        return response.result
    }
);

const assemblyVisualNoteGetSlice = createSlice({
    name: 'assemblyVisualNoteGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyVisualNoteGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyVisualNoteGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyVisualNoteGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyVisualNoteGetSlice.reducer;
