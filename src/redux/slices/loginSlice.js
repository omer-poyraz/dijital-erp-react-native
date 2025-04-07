import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { login } from '../../utils/services';
import { useNavigation } from '@react-navigation/native';


export const loginData = createAsyncThunk(
  'login/loginData',
  async (userName, password) => {
    const navigation = useNavigation()
    // var res = await login(userName, password);
    // if (res.statusCode === 200) {
    //   await AsyncStorage.setItem("auth", JSON.stringify(res.data))
    //   navigation.navigate("AuthM")
    //   return res.data;
    // } else {
    //   return "";
    // }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: {},
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loginData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default loginSlice.reducer;
