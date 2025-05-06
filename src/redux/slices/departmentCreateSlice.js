import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentCreateService } from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchDepartmentCreate = createAsyncThunk(
    'departmentCreate/fetchDepartmentCreate',
    async ({ formData }) => {
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

        const response = await DepartmentCreateService(data)
        return response.result
    }
);

const departmentCreateSlice = createSlice({
    name: 'departmentCreate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartmentCreate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDepartmentCreate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchDepartmentCreate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default departmentCreateSlice.reducer;
