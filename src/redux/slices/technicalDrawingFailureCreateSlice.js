import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingFailureCreate = createAsyncThunk(
    'technicalDrawingFailureCreate/fetchTechnicalDrawingFailureCreate',
    async ({ formData, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "inappropriateness": formData.inappropriateness,
            "projectName": formData.projectName,
            "stand": formData.stand,
            "partCode": formData.partCode,
            "description": formData.description,
            "productionQuantity": parseInt(formData.productionQuantity),
            "quantityDescription": formData.quantityDescription,
            "approval": formData.approval,
            "date": new Date(formData.date).toISOString(),
            "operatorID": formData.operatorID,
            "status": Boolean(formData.status),
            "technicalDrawingID": parseInt(manualId),
            "userId": userId
        }

        const response = await TechnicalDrawingFailureCreateService(data)
        return response.result
    }
);

const technicalDrawingFailureCreateSlice = createSlice({
    name: 'technicalDrawingFailureCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureCreateSlice.reducer;
