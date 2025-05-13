import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CMMModuleCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchCMMModuleCreate = createAsyncThunk(
    'cmmModuleCreate/fetchCMMModuleCreate',
    async ({ formData }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = new FormData()
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach(file => {
                data.append("file", file);
            });
        }
        data.append("CMM", formData.CMM)
        data.append("UserId", userId)

        const response = await CMMModuleCreateService(data)
        return response.result
    }
);

const cmmModuleCreateSlice = createSlice({
    name: 'cmmModuleCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCMMModuleCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCMMModuleCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCMMModuleCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default cmmModuleCreateSlice.reducer;
