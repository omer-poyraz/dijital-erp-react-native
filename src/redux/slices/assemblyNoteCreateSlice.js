import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyNoteCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyNoteCreate = createAsyncThunk(
    'assemblyNoteCreate/fetchAssemblyNoteCreate',
    async ({ formData, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

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
