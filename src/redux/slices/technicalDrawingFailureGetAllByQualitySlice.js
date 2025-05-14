import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureGetQualityOfficerService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingFailureGetAllByQuality = createAsyncThunk(
    'technicalDrawingFailureGetAllByQuality/fetchTechnicalDrawingFailureGetAllByQuality',
    async () => {
        var id = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId
        const response = await TechnicalDrawingFailureGetQualityOfficerService(id)
        return response.result
    }
);

const technicalDrawingFailureGetAllByQualitySlice = createSlice({
    name: 'technicalDrawingFailureGetAllByQuality',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureGetAllByQuality.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureGetAllByQuality.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureGetAllByQuality.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureGetAllByQualitySlice.reducer;
