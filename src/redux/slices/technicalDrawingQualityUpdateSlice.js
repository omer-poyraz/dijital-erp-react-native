import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingQualityUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingQualityUpdate = createAsyncThunk(
    'technicalDrawingQualityUpdate/fetchTechnicalDrawingQualityUpdate',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "description": formData.description,
            "note": formData.note,
            "technicalDrawingFailureStateID": formData.technicalDrawingFailureStateID,
            "id": id,
            "userId": userId,
        }

        const response = await TechnicalDrawingQualityUpdateService(data)
        return response.result
    }
);

const technicalDrawingQualityUpdateSlice = createSlice({
    name: 'technicalDrawingQualityUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingQualityUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingQualityUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingQualityUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingQualityUpdateSlice.reducer;
