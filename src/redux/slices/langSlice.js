import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changeLangs = createAsyncThunk(
  'lang/changeLangs',
  async (lng) => {
    try {
      let storedLang = await AsyncStorage.getItem("lang");

      if (!lng || lng === "") {
        lng = storedLang || "TR";
      }

      await AsyncStorage.setItem("lang", lng);

      return lng;
    } catch (error) {
      console.error('Dil değiştirme hatası:', error);
      return "TR";
    }
  }
);

const langSlice = createSlice({
  name: 'lang',
  initialState: {
    lang: "TR",
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeLangs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeLangs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lang = action.payload;
      })
      .addCase(changeLangs.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default langSlice.reducer;
