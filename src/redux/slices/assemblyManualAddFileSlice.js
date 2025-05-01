import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyManualAddFileService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchAssemblyManualAddFile = createAsyncThunk(
    'assemblyManualAddFile/fetchAssemblyManualAddFile',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId;
        const data = new FormData();
        
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach((file, index) => {
                data.append('file', {
                    uri: file.uri,
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    lastModified: file.lastModified,
                });
            });
        }
        
        data.append("UserId", userId);
        data.append("ID", id);

        const response = await AssemblyManualAddFileService(data);
        return response;
    }
);

const assemblyManualAddFileSlice = createSlice({
    name: 'assemblyManualAddFile',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssemblyManualAddFile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssemblyManualAddFile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAssemblyManualAddFile.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default assemblyManualAddFileSlice.reducer;
