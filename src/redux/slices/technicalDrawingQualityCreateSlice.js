import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingQualityCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingQualityCreate = createAsyncThunk(
    'technicalDrawingQualityCreate/fetchTechnicalDrawingQualityCreate',
    async ({ formData }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "description": formData.description,
            "note": formData.note,
            "technicalDrawingFailureStateID": formData.technicalDrawingFailureStateID,
            "userId": userId,
        }

        const response = await TechnicalDrawingQualityCreateService(data)
        return response.result
    }
);

const technicalDrawingQualityCreateSlice = createSlice({
    name: 'technicalDrawingQualityCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingQualityCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingQualityCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingQualityCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingQualityCreateSlice.reducer;
