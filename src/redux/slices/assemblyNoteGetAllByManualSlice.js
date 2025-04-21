import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteGetAllByManualService } from '../../service';

export const fetchAssemblyNoteGetAllByManual = createAsyncThunk(
    'assemblyNoteGetAllByManual/fetchAssemblyNoteGetAllByManual',
    async ({ id }) => {
        const response = await AssemblyNoteGetAllByManualService(id)
        return response.result
    }
);

const assemblyNoteGetAllByManualSlice = createSlice({
    name: 'assemblyNoteGetAllByManual',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyNoteGetAllByManual.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyNoteGetAllByManual.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyNoteGetAllByManual.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyNoteGetAllByManualSlice.reducer;
