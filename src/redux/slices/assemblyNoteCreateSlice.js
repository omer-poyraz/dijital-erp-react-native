import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteCreateService } from '../../service';

export const fetchAssemblyNoteCreate = createAsyncThunk(
    'assemblyNoteCreate/fetchAssemblyNoteCreate',
    async ({ formData, manualId }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = {
            "note": formData.note,
            "description": formData.description,
            "status": formData.status,
            "assemblyManuelID": parseInt(manualId),
            "userId": userId
        }

        const response = await AssemblyNoteCreateService(data)
        return response.result
    }
);

const assemblyNoteCreateSlice = createSlice({
    name: 'assemblyNoteCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyNoteCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyNoteCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyNoteCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyNoteCreateSlice.reducer;
