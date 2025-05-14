import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingFailureGetCMMUserService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingFailureGetAllByCMM = createAsyncThunk(
    'technicalDrawingFailureGetAllByCMM/fetchTechnicalDrawingFailureGetAllByCMM',
    async () => {
        var id = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId
        const response = await TechnicalDrawingFailureGetCMMUserService(id)
        return response.result
    }
);

const technicalDrawingFailureGetAllByCMMSlice = createSlice({
    name: 'technicalDrawingFailureGetAllByCMM',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingFailureGetAllByCMM.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingFailureGetAllByCMM.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingFailureGetAllByCMM.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingFailureGetAllByCMMSlice.reducer;
