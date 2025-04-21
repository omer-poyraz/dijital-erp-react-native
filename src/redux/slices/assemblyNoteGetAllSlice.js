import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteGetAllService } from '../../service';

export const fetchAssemblyNoteGetAll = createAsyncThunk(
    'assemblyNoteGetAll/fetchAssemblyNoteGetAll',
    async () => {
        const response = await AssemblyNoteGetAllService()
        return response.result
    }
);

const assemblyNoteGetAllSlice = createSlice({
    name: 'assemblyNoteGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyNoteGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyNoteGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyNoteGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyNoteGetAllSlice.reducer;
