import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentDeleteService } from '../../service';

export const fetchDepartmentDelete = createAsyncThunk(
    'departmentDelete/fetchDepartmentDelete',
    async ({ id }) => {
        const response = await DepartmentDeleteService(id)
        return response.result
    }
);

const departmentDeleteSlice = createSlice({
    name: 'departmentDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartmentDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDepartmentDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default departmentDeleteSlice.reducer;
