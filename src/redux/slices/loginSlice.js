import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../service';

export const loginData = createAsyncThunk(
  'login/loginData',
  async ({ data }, { rejectWithValue }) => {
    try {
      const formData = { "userName": data.userName, "password": data.password }
      const response = await login(formData);

      if (response?.isSuccess && response?.statusCode === 200) {
        await AsyncStorage.setItem('auth', JSON.stringify({
          ...response.result.user,
          user: response.result.user,
          accessToken: response.result.accessToken,
          refreshToken: response.result.refreshToken,
          refreshTokenExpireTime: response.result.user.refreshTokenExpireTime
        }));
        return response.result;
      } else {
        return rejectWithValue(response?.message || 'Giriş başarısız');
      }
    } catch (error) {
      console.error('Login hatası:', error);
      return rejectWithValue(error?.message || 'Bağlantı hatası');
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'login/checkAuthState',
  async () => {
    try {
      const authData = await AsyncStorage.getItem('auth');
      if (authData) {
        return JSON.parse(authData);
      }
      return null;
    } catch (error) {
      console.error('Auth durumu kontrol hatası:', error);
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'login/logoutUser',
  async () => {
    try {
      await AsyncStorage.removeItem('auth');
      return true;
    } catch (error) {
      console.error('Çıkış hatası:', error);
      return false;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    status: 'idle',
    error: null,
    loginSuccess: false
  },
  reducers: {
    resetLoginSuccess: (state) => {
      state.loginSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;
        state.loginSuccess = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.loginSuccess = false;
        state.status = 'idle';
      });
  },
});

export const { resetLoginSuccess } = loginSlice.actions;
export default loginSlice.reducer;