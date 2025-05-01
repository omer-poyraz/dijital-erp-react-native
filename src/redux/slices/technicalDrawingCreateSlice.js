import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingCreate = createAsyncThunk(
    'technicalDrawingCreate/fetchTechnicalDrawingCreate',
    async ({ formData }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = new FormData();
        console.log(formData.file)
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach(file => {
                data.append("file", file);
            });
        }
        data.append("ProjectName", formData.projectName)
        data.append("PartCode", formData.partCode)
        data.append("ResponibleID", formData.responibleID)
        data.append("PersonInChargeID", formData.personInChargeID)
        data.append("SerialNumber", formData.serialNumber)
        data.append("ProductionQuantity", formData.productionQuantity)
        data.append("Time", formData.time)
        data.append("Date", formData.date)
        data.append("Description", formData.description)
        data.append("OperatorDate", formData.operatorDate)
        data.append("UserId", userId)

        const response = await TechnicalDrawingCreateService(data)
        return response.result
    }
);

const technicalDrawingCreateSlice = createSlice({
    name: 'technicalDrawingCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingCreateSlice.reducer;
