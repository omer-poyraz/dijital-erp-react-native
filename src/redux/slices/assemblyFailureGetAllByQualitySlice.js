import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyFailureGetByQualityService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyFailureGetAllByQuality = createAsyncThunk(
    'assemblyFailureGetAllByQuality/fetchAssemblyFailureGetAllByQuality',
    async () => {
        var id = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId
        const response = await AssemblyFailureGetByQualityService(id)
        console.log("AssemblyFailureGetByQualityService", response)
        return response.result
    }
);

const assemblyFailureGetAllByQualitySlice = createSlice({
    name: 'assemblyFailureGetAllByQuality',
    initialState: {
        data: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyFailureGetAllByQuality.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyFailureGetAllByQuality.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyFailureGetAllByQuality.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyFailureGetAllByQualitySlice.reducer;
