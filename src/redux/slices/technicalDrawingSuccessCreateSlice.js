import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingSuccessCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingSuccessCreate = createAsyncThunk(
    'technicalDrawingSuccessCreate/fetchTechnicalDrawingSuccessCreate',
    async ({ formData, manualId }) => {
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
            "userId": userId,
        }

        const response = await TechnicalDrawingSuccessCreateService(data)
        return response.result
    }
);

const technicalDrawingSuccessCreateSlice = createSlice({
    name: 'technicalDrawingSuccessCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingSuccessCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingSuccessCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingSuccessCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingSuccessCreateSlice.reducer;
