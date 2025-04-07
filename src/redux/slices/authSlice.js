import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authorization = createAsyncThunk(
    'auth/authorization',
    async () => {
        
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        token: "",
        name: "",
        userId: "",
        status: 'idle',
    },
    reducers: {
        setIsLoggedIn(state, action) {
            state.isLogged = !state.isLogged;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorization.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authorization.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLogged = true;
                state.token = action.payload.accessToken;
                state.name = action.payload.name;
                state.userId = action.payload.userId;
            })
            .addCase(authorization.rejected, (state) => {
                state.status = 'failed';
                state.isLogged = false;
            });
    },
});

export const { setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
