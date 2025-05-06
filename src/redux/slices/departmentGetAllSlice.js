import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentGetAllService } from '../../service';

export const fetchDepartmentGetAll = createAsyncThunk(
    'departmentGetAll/fetchDepartmentGetAll',
    async () => {
        const response = await DepartmentGetAllService()
        return response.result
    }
);

const departmentGetAllSlice = createSlice({
    name: 'departmentGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartmentGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDepartmentGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default departmentGetAllSlice.reducer;
