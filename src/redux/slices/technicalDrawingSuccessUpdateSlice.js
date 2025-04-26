import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingSuccessUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingSuccessUpdate = createAsyncThunk(
    'technicalDrawingSuccessUpdate/fetchTechnicalDrawingSuccessUpdate',
    async ({ formData, id, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "projectName": formData.projectName,
            "stand": formData.stand,
            "partCode": formData.partCode,
            "description": formData.description,
            "productionQuantity": parseInt(formData.productionQuantity),
            "quantityDescription": formData.quantityDescription,
            "approval": formData.approval,
            "status": Boolean(formData.status),
            "date": new Date(formData.date).toISOString(),
            "operatorID": formData.operatorID,
            "technicalDrawingID": parseInt(manualId),
            "id": id,
            "userId": userId,
        }

        const response = await TechnicalDrawingSuccessUpdateService(data)
        return response.result
    }
);

const technicalDrawingSuccessUpdateSlice = createSlice({
    name: 'technicalDrawingSuccessUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingSuccessUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingSuccessUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingSuccessUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingSuccessUpdateSlice.reducer;
