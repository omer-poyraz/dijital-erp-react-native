import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureQualityDescriptionService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyQualityDescription = createAsyncThunk(
    'assemblyQualityDescription/fetchAssemblyQualityDescription',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = {
            "id": id,
            "qualityOfficerID": userId,
            "qualityOfficerDescription": formData.qualityOfficerDescription,
            "qualityDescriptionDate": formData.qualityDescriptionDate,
        }

        const response = await AssemblyFailureQualityDescriptionService(data)
        return response.result
    }
);

const assemblyQualityDescriptionSlice = createSlice({
    name: 'assemblyQualityDescription',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyQualityDescription.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyQualityDescription.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyQualityDescription.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyQualityDescriptionSlice.reducer;
