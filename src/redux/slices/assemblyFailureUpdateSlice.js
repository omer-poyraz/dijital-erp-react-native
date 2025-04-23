import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyFailureUpdate = createAsyncThunk(
    'assemblyFailureUpdate/fetchAssemblyFailureUpdate',
    async ({ formData, id, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "inappropriateness": formData.inappropriateness,
            "technician": formData.technician,
            "partCode": formData.partCode,
            "status": Boolean(formData.status),
            "pendingQuantity": parseInt(formData.pendingQuantity),
            "qualityDescription": formData.qualityDescription,
            "date": formData.date,
            "assemblyManuelID": parseInt(manualId),
            "id": id,
            "userId": userId
        }

        const response = await AssemblyFailureUpdateService(data)
        return response.result
    }
);

const assemblyFailureUpdateSlice = createSlice({
    name: 'assemblyFailureUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureUpdateSlice.reducer;
