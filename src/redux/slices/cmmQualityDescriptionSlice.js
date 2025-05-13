import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMFailureQualityDescriptionService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMQualityDescription = createAsyncThunk(
    'cmmQualityDescription/fetchCMMQualityDescription',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "id": id,
            "qualityOfficerID": userId,
            "qualityOfficerDescription": formData.qualityOfficerDescription,
            "qualityDescriptionDate": formData.qualityDescriptionDate,
        }

        const response = await CMMFailureQualityDescriptionService(data)
        return response.result
    }
);

const cmmQualityDescriptionSlice = createSlice({
    name: 'cmmQualityDescription',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMQualityDescription.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMQualityDescription.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMQualityDescription.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmQualityDescriptionSlice.reducer;
