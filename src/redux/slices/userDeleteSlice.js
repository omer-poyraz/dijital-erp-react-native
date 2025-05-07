import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserDelete } from '../../service';

export const fetchUserDelete = createAsyncThunk(
    'userDelete/fetchUserDelete',
    async ({ id }) => {
        const response = await UserDelete(id)
        return response.result
    }
);

const userDeleteSlice = createSlice({
    name: 'userDelete',
    initialState: {
        data: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDelete.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDelete.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserDelete.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default userDeleteSlice.reducer;
