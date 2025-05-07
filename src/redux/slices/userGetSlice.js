import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserGet } from '../../service';

export const fetchUserGet = createAsyncThunk(
    'userGet/fetchUserGet',
    async ({ id }) => {
        const response = await UserGet(id)
        return response.result
    }
);

const userGetSlice = createSlice({
    name: 'userGet',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserGet.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserGet.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserGet.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userGetSlice.reducer;
