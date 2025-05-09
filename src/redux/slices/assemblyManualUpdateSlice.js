import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyManualUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyManualUpdate = createAsyncThunk(
    'assemblyManualUpdate/fetchAssemblyManualUpdate',
    async ({ formData, id }) => {
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
        data.append("ID", id)

        const response = await AssemblyManualUpdateService(data)
        return response.result
    }
);

const assemblyManualUpdateSlice = createSlice({
    name: 'assemblyManualUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyManualUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyManualUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyManualUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyManualUpdateSlice.reducer;
