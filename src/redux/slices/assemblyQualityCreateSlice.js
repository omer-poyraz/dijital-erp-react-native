import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyQualityCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyQualityCreate = createAsyncThunk(
    'assemblyQualityCreate/fetchAssemblyQualityCreate',
    async ({ formData }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "description": formData.description,
            "note": formData.note,
            "assemblyFailureStateID": formData.assemblyFailureStateID,
            "userId": userId,
        }

        const response = await AssemblyQualityCreateService(data)
        return response.result
    }
);

const assemblyQualityCreateSlice = createSlice({
    name: 'assemblyQualityCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyQualityCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyQualityCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyQualityCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyQualityCreateSlice.reducer;
