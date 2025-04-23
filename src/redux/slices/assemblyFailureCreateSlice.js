import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyFailureCreate = createAsyncThunk(
    'assemblyFailureCreate/fetchAssemblyFailureCreate',
    async ({ formData, manualId }) => {
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
            "userId": userId
        }

        const response = await AssemblyFailureCreateService(data)
        return response.result
    }
);

const assemblyFailureCreateSlice = createSlice({
    name: 'assemblyFailureCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureCreateSlice.reducer;
