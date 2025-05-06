import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentGetService } from '../../service';

export const fetchDepartmentGet = createAsyncThunk(
    'departmentGet/fetchDepartmentGet',
    async ({ id }) => {
        const response = await DepartmentGetService(id)
        return response.result
    }
);

const departmentGetSlice = createSlice({
    name: 'departmentGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartmentGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDepartmentGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default departmentGetSlice.reducer;
