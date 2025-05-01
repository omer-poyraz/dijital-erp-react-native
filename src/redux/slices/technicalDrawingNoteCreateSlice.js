import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TechnicalDrawingNoteCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchTechnicalDrawingNoteCreate = createAsyncThunk(
    'technicalDrawingNoteCreate/fetchTechnicalDrawingNoteCreate',
    async ({ formData, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        console.log(userId)
        const data = {
            "note": formData.note,
            "partCode": formData.partCode,
            "description": formData.description,
            "status": Boolean(formData.status),
            "technicalDrawingID": parseInt(manualId),
            "userId": userId
        }

        console.log(data)

        const response = await TechnicalDrawingNoteCreateService(data)
        return response.result
    }
);

const technicalDrawingNoteCreateSlice = createSlice({
    name: 'technicalDrawingNoteCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTechnicalDrawingNoteCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTechnicalDrawingNoteCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTechnicalDrawingNoteCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default technicalDrawingNoteCreateSlice.reducer;
