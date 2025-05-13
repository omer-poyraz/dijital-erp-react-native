import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMNoteCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMNoteCreate = createAsyncThunk(
    'cmmNoteCreate/fetchCMMNoteCreate',
    async ({ formData, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "note": formData.note,
            "partCode": formData.partCode,
            "description": formData.description,
            "status": formData.status,
            "cmmid": manualId,
            "userId": userId
        }

        const response = await CMMNoteCreateService(data)
        return response.result
    }
);

const cmmNoteCreateSlice = createSlice({
    name: 'cmmNoteCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMNoteCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMNoteCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMNoteCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmNoteCreateSlice.reducer;
