import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
export const signin = createAsyncThunk(
  "user/signin",
  async (code, { rejectWithValue, dispatch, getState }) => {
    axios.defaults.withCredentials = false;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/discord/callback",
        { code }
      );
      dispatch(setCredentials(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(signin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
