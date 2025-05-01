import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyNoteUpdate = createAsyncThunk(
    'assemblyNoteUpdate/fetchAssemblyNoteUpdate',
    async ({ formData, id, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "note": formData.note,
            "partCode": formData.partCode,
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
