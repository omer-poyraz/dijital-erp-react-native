import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingUpdate = createAsyncThunk(
    'technicalDrawingUpdate/fetchTechnicalDrawingUpdate',
    async ({ formData, id }) => {
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
        data.append("ID", id)

        const response = await TechnicalDrawingUpdateService(data)
        return response.result
    }
);

const technicalDrawingUpdateSlice = createSlice({
    name: 'technicalDrawingUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingUpdateSlice.reducer;
