import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMUpdate = createAsyncThunk(
    'cmmUpdate/fetchCMMUpdate',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = new FormData();
        console.log(formData.file)
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach(file => {
                data.append("file", file);
            });
        }
        if (formData.resultFile && formData.resultFile.length > 0) {
            formData.resultFile.forEach(file => {
                data.append("resultFile", file);
            });
        }
        data.append("ProjectName", formData.ProjectName)
        data.append("PartCode", formData.PartCode)
        data.append("Stand", formData.Stand)
        data.append("Time", formData.Time)
        data.append("Date", formData.Date)
        data.append("InstallResultDate", formData.InstallResultDate)
        data.append("SolidModel", formData.SolidModel)
        data.append("Description", formData.Description)
        data.append("MeasuringPersonID", formData.MeasuringPersonID)
        data.append("CMMUserID", formData.CMMUserID)
        data.append("ResponibleID", formData.ResponibleID)
        data.append("PersonInChargeID", formData.PersonInChargeID)
        data.append("QualityOfficerID", formData.QualityOfficerID)
        data.append("UserId", userId)
        data.append("ID", id)

        const response = await CMMUpdateService(data)
        return response.result
    }
);

const cmmUpdateSlice = createSlice({
    name: 'cmmUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmUpdateSlice.reducer;
