import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMCreate = createAsyncThunk(
    'cmmCreate/fetchCMMCreate',
    async ({ formData }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = new FormData();
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

        const response = await CMMCreateService(data)
        return response.result
    }
);

const cmmCreateSlice = createSlice({
    name: 'cmmCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmCreateSlice.reducer;
