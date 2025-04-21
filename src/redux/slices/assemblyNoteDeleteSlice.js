import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteDeleteService } from '../../service';

export const fetchAssemblyNoteDelete = createAsyncThunk(
    'assemblyNoteDelete/fetchAssemblyNoteDelete',
    async ({ id }) => {
        const response = await AssemblyNoteDeleteService(id)
        return response.result
    }
);

const assemblyNoteDeleteSlice = createSlice({
    name: 'assemblyNoteDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyNoteDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyNoteDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyNoteDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyNoteDeleteSlice.reducer;
