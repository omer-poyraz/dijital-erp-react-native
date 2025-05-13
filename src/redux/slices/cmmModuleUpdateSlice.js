import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMModuleUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMModuleUpdate = createAsyncThunk(
    'cmmModuleUpdate/fetchCMMModuleUpdate',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = new FormData()
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach(file => {
                data.append("file", file);
            });
        }
        data.append("CMM", formData.CMM)
        data.append("ID", id)
        data.append("UserId", userId)

        const response = await CMMModuleUpdateService(data)
        return response.result
    }
);

const cmmModuleUpdateSlice = createSlice({
    name: 'cmmModuleUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMModuleUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMModuleUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMModuleUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmModuleUpdateSlice.reducer;
