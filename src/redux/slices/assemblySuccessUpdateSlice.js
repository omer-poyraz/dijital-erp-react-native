import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblySuccessUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblySuccessUpdate = createAsyncThunk(
    'assemblySuccessUpdate/fetchAssemblySuccessUpdate',
    async ({ formData, id, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "description": formData.description,
            "technician": formData.technician,
            "partCode": formData.partCode,
            "status": Boolean(formData.status),
            "approval": formData.approval,
            "pendingQuantity": parseInt(formData.pendingQuantity),
            "qualityDescription": formData.qualityDescription,
            "date": formData.date,
            "assemblyManuelID": parseInt(manualId),
            "id": id,
            "userId": userId,
        }

        const response = await AssemblySuccessUpdateService(data)
        return response.result
    }
);

const assemblySuccessUpdateSlice = createSlice({
    name: 'assemblySuccessUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblySuccessUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblySuccessUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblySuccessUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblySuccessUpdateSlice.reducer;
