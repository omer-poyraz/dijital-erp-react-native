import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AssemblyManualAddFileService } from '../../service';

export const fetchAssemblyManualAddFile = createAsyncThunk(
    'assemblyManualAddFile/fetchAssemblyManualAddFile',
    async ({ formData, id }) => {
        const userId = localStorage.getItem("auth") === null ? null : JSON.parse(localStorage.getItem("auth")).user?.userId

        const data = new FormData();
        console.log(formData.file)
        if (formData.file && formData.file.length > 0) {
            formData.file.forEach(file => {
                data.append("file", file);
            });
        }
        data.append("UserId", userId)
        data.append("ID", id)

        const response = await AssemblyManualAddFileService(data)
        return response.result
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
