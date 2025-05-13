import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMNoteUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMNoteUpdate = createAsyncThunk(
    'cmmNoteUpdate/fetchCMMNoteUpdate',
    async ({ formData, id, manualId }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "note": formData.Note,
            "partCode": formData.PartCode,
            "description": formData.Description,
            "status": true,
            "cmmid": manualId,
            "id": id,
            "userId": userId
        }

        const response = await CMMNoteUpdateService(data)
        return response.result
    }
);

const cmmNoteUpdateSlice = createSlice({
    name: 'cmmNoteUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMNoteUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMNoteUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMNoteUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmNoteUpdateSlice.reducer;
