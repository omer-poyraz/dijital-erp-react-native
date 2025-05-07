import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserGetAll } from '../../service';

export const fetchUserGetAll = createAsyncThunk(
    'userGetAll/fetchUserGetAll',
    async ({ search, pageNumber, pageSize }) => {
        const response = await UserGetAll(search, pageNumber, pageSize)
        return response.result
    }
);

const userGetAllSlice = createSlice({
    name: 'userGetAll',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserGetAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserGetAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserGetAll.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userGetAllSlice.reducer;
