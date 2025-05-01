import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EmployeeUpdateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchEmployeeUpdate = createAsyncThunk(
    'employeeUpdate/fetchEmployeeUpdate',
    async ({ formData, id }) => {
        const userId = await AsyncStorage.getItem("auth") === null ? null : JSON.parse(await AsyncStorage.getItem("auth")).user?.userId

        const data = new FormData();
        if (formData.file) {
            data.append("file", formData.file);
        }
        data.append("Name", formData.name)
        data.append("Surname", formData.surname)
        data.append("Email", formData.email)
        data.append("Phone", formData.phone)
        data.append("Address", formData.address)
        data.append("Field", formData.field)
        data.append("Birthday", formData.birthday)
        data.append("StartDate", formData.startDate)
        data.append("UserId", userId)
        data.append("ID", id)

        const response = await EmployeeUpdateService(data)
        return response.result
    }
);

const employeeUpdateSlice = createSlice({
    name: 'employeeUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeeUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchEmployeeUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default employeeUpdateSlice.reducer;
