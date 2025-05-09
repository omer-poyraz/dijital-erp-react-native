import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureQualityDescriptionService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingQualityDescription = createAsyncThunk(
    'technicalDrawingQualityDescription/fetchTechnicalDrawingQualityDescription',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "id": id,
            "qualityOfficerID": userId,
            "qualityOfficerDescription": formData.qualityOfficerDescription,
            "qualityDescriptionDate": formData.qualityDescriptionDate,
        }

        const response = await TechnicalDrawingFailureQualityDescriptionService(data)
        return response.result
    }
);

const technicalDrawingQualityDescriptionSlice = createSlice({
    name: 'technicalDrawingQualityDescription',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingQualityDescription.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingQualityDescription.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingQualityDescription.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingQualityDescriptionSlice.reducer;
