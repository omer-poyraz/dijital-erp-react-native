import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblySuccessCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblySuccessCreate = createAsyncThunk(
    'assemblySuccessCreate/fetchAssemblySuccessCreate',
    async ({ formData, manualId }) => {
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
            "userId": userId,
        }

        const response = await AssemblySuccessCreateService(data)
        return response.result
    }
);

const assemblySuccessCreateSlice = createSlice({
    name: 'assemblySuccessCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblySuccessCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblySuccessCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblySuccessCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblySuccessCreateSlice.reducer;
