import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyVisualNoteDeleteService } from '../../service';

export const fetchAssemblyVisualNoteDelete = createAsyncThunk(
    'assemblyVisualNoteDelete/fetchAssemblyVisualNoteDelete',
    async ({ id }) => {
        const response = await AssemblyVisualNoteDeleteService(id)
        return response.result
    }
);

const assemblyVisualNoteDeleteSlice = createSlice({
    name: 'assemblyVisualNoteDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyVisualNoteDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyVisualNoteDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyVisualNoteDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyVisualNoteDeleteSlice.reducer;
