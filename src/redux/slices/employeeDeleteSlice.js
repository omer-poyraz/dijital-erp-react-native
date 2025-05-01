import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeDeleteService } from '../../service';

export const fetchEmployeeDelete = createAsyncThunk(
    'employeeDelete/fetchEmployeeDelete',
    async ({ id }) => {
        const response = await EmployeeDeleteService(id)
        return response.result
    }
);

const employeeDeleteSlice = createSlice({
    name: 'employeeDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchEmployeeDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default employeeDeleteSlice.reducer;
