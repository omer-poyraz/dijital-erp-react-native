import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMFailureCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMFailureCreate = createAsyncThunk(
    'cmmFailureCreate/fetchCMMFailureCreate',
    async ({ formData, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "inappropriateness": formData.Inappropriateness,
            "technicianID": formData.TechnicianID,
            "description": formData.Description,
            "qualityOfficerDescription": formData.QualityOfficerDescription,
            "qualityDescriptionDate": formData.QualityDescriptionDate,
            "partCode": formData.PartCode,
            "status": formData.Status,
            "pendingQuantity": formData.PendingQuantity,
            "total": formData.Total,
            "date": new Date(formData.Date).toISOString(),
            "cmmid": manualId,
            "userId": userId
        }

        const response = await CMMFailureCreateService(data)
        return response.result
    }
);

const cmmFailureCreateSlice = createSlice({
    name: 'cmmFailureCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMFailureCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMFailureCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMFailureCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmFailureCreateSlice.reducer;
