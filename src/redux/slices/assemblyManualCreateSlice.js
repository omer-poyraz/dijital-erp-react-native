import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyManualCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyManualCreate = createAsyncThunk(
    'assemblyManualCreate/fetchAssemblyManualCreate',
    async ({ formData }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = new FormData();
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach(file => {
                data.append("file", file);
            });
        }
        data.append("ProjectName", formData.projectName)
        data.append("PartCode", formData.partCode)
        data.append("Responible", formData.responible)
        data.append("PersonInCharge", formData.personInCharge)
        data.append("QualityOfficerID", formData.qualityOfficerID)
        data.append("SerialNumber", formData.serialNumber)
        data.append("ProductionQuantity", formData.productionQuantity)
        data.append("Time", formData.time)
        data.append("Date", formData.date)
        data.append("Description", formData.description)
        data.append("TechnicianDate", formData.technicianDate)
        data.append("UserId", userId)

        const response = await AssemblyManualCreateService(data)
        return response.result
    }
);

const assemblyManualCreateSlice = createSlice({
    name: 'assemblyManualCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyManualCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyManualCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyManualCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyManualCreateSlice.reducer;
