import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeGetAllService } from '../../service';

export const fetchEmployeeGetAll = createAsyncThunk(
    'employeeGetAll/fetchEmployeeGetAll',
    async () => {
        const response = await EmployeeGetAllService()
        return response.result
    }
);

const employeeGetAllSlice = createSlice({
    name: 'employeeGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchEmployeeGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default employeeGetAllSlice.reducer;
