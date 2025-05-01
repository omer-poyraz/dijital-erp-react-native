import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeGetService } from '../../service';

export const fetchEmployeeGet = createAsyncThunk(
    'employeeGet/fetchEmployeeGet',
    async ({ id }) => {
        const response = await EmployeeGetService(id)
        return response.result
    }
);

const employeeGetSlice = createSlice({
    name: 'employeeGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchEmployeeGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default employeeGetSlice.reducer;
