import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyQualityUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyQualityUpdate = createAsyncThunk(
    'assemblyQualityUpdate/fetchAssemblyQualityUpdate',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "description": formData.description,
            "note": formData.note,
            "assemblyFailureStateID": formData.assemblyFailureStateID,
            "id": id,
            "userId": userId,
        }

        const response = await AssemblyQualityUpdateService(data)
        return response.result
    }
);

const assemblyQualityUpdateSlice = createSlice({
    name: 'assemblyQualityUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyQualityUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyQualityUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyQualityUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyQualityUpdateSlice.reducer;
