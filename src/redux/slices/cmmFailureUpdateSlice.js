import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMFailureUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMFailureUpdate = createAsyncThunk(
    'cmmFailureUpdate/fetchCMMFailureUpdate',
    async ({ formData, id, manualId }) => {
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
            "id": id,
            "userId": userId
        }

        const response = await CMMFailureUpdateService(data)
        return response.result
    }
);

const cmmFailureUpdateSlice = createSlice({
    name: 'cmmFailureUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMFailureUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMFailureUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMFailureUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmFailureUpdateSlice.reducer;
