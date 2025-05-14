import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureCMMDescriptionService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingCMMDescription = createAsyncThunk(
    'technicalDrawingCMMDescription/fetchTechnicalDrawingCMMDescription',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "id": id,
            "cmmid": userId,
            "cmmDescription": formData.cmmDescription,
            "cmmDescriptionDate": formData.cmmDescriptionDate,
        }

        console.log("TechnicalDrawingFailureCMMDescriptionService", data)

        const response = await TechnicalDrawingFailureCMMDescriptionService(data)
        return response.result
    }
);

const technicalDrawingCMMDescriptionSlice = createSlice({
    name: 'technicalDrawingCMMDescription',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingCMMDescription.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingCMMDescription.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingCMMDescription.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingCMMDescriptionSlice.reducer;
