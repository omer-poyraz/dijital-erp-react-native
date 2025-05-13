import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMSuccessCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMSuccessCreate = createAsyncThunk(
    'cmmSuccessCreate/fetchCMMSuccessCreate',
    async ({ formData, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        console.log("formData", formData)

        const data = {
            "description": formData.Description,
            "technicianID": formData.TechnicianID,
            "partCode": formData.PartCode,
            "status": formData.Status,
            "approval": formData.Approval,
            "pendingQuantity": formData.PendingQuantity,
            "qualityDescription": formData.QualityDescription,
            "date": new Date(formData.Date).toISOString(),
            "cmmid": manualId,
            "userId": userId,
        }
        console.log("data", data)

        const response = await CMMSuccessCreateService(data)
        return response.result
    }
);

const cmmSuccessCreateSlice = createSlice({
    name: 'cmmSuccessCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMSuccessCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMSuccessCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMSuccessCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmSuccessCreateSlice.reducer;
