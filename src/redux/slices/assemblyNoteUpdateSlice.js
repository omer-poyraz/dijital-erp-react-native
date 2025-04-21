import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteUpdateService } from '../../service';

export const fetchAssemblyNoteUpdate = createAsyncThunk(
    'assemblyNoteUpdate/fetchAssemblyNoteUpdate',
    async ({ formData, id, manualId }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "note": formData.note,
            "description": formData.description,
            "status": formData.status,
            "assemblyManuelID": parseInt(manualId),
            "id": id,
            "userId": userId
        }

        const response = await AssemblyNoteUpdateService(data)
        return response.result
    }
);

const assemblyNoteUpdateSlice = createSlice({
    name: 'assemblyNoteUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyNoteUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyNoteUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyNoteUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyNoteUpdateSlice.reducer;
