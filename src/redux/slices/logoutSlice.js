import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchLogout = createAsyncThunk(
    'logout/fetchLogout',
    async () => {
        await AsyncStorage.clear();
        return true
    }
);

const logoutSlice = createSlice({
    name: 'logout',
    initialState: {
        logout: false,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchLogout.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default logoutSlice.reducer;
