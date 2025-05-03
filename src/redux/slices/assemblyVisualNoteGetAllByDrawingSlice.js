import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyVisualNoteGetAllByDrawingService } from '../../service';

export const fetchAssemblyVisualNoteGetAllByDrawing = createAsyncThunk(
    'assemblyVisualNoteGetAllByDrawing/fetchAssemblyVisualNoteGetAllByDrawing',
    async ({ id }) => {
        const response = await AssemblyVisualNoteGetAllByDrawingService(id)
        return response.result
    }
);

const assemblyVisualNoteGetAllByDrawingSlice = createSlice({
    name: 'assemblyVisualNoteGetAllByDrawing',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyVisualNoteGetAllByDrawing.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyVisualNoteGetAllByDrawing.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyVisualNoteGetAllByDrawing.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyVisualNoteGetAllByDrawingSlice.reducer;
