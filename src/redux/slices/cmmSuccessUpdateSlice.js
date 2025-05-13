import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMSuccessUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMSuccessUpdate = createAsyncThunk(
    'cmmSuccessUpdate/fetchCMMSuccessUpdate',
    async ({ formData, id, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

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
            "id": id,
            "userId": userId,
        }

        const response = await CMMSuccessUpdateService(data)
        return response.result
    }
);

const cmmSuccessUpdateSlice = createSlice({
    name: 'cmmSuccessUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMSuccessUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMSuccessUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMSuccessUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmSuccessUpdateSlice.reducer;
