import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserUpdate } from '../../service';

export const fetchUserUpdate = createAsyncThunk(
    'userUpdate/fetchUserUpdate',
    async ({ file, UserId, FirstName, LastName, UserName, Email, tckno, PhoneNumber, PhoneNumber2, Address, Field, DepartmentID, Title, Birthday, StartDate, DepartureDate, Gender, IsActive }) => {
        console.log(file, UserId, FirstName, LastName, UserName, Email, tckno, PhoneNumber, PhoneNumber2, Address, Field, DepartmentID, Title || "", Birthday, StartDate, DepartureDate, Gender || "Erkek", IsActive)
        const data = new FormData();
        if (file) data.append("file", file[0]);
        data.append("UserId", UserId);
        data.append("FirstName", FirstName);
        data.append("LastName", LastName);
        data.append("UserName", UserName);
        data.append("Email", Email);
        data.append("TCKNO", tckno);
        data.append("PhoneNumber", PhoneNumber);
        data.append("PhoneNumber2", PhoneNumber2);
        data.append("Address", Address);
        data.append("Field", Field);
        if (DepartmentID !== null) data.append("DepartmentID", DepartmentID);
        data.append("Title", Title || "");
        data.append("Birthday", Birthday);
        data.append("StartDate", StartDate);
        data.append("DepartureDate", DepartureDate);
        data.append("Gender", Gender || "Erkek");
        data.append("IsActive", IsActive);

        const response = await UserUpdate(data)
        return response.result
    }
);

const userUpdateSlice = createSlice({
    name: 'userUpdate',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserUpdate.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserUpdate.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userUpdateSlice.reducer;
