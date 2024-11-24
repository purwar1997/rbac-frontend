import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, fetchLoggedInUser } from '../services/authService';
import { AxiosError } from 'axios';

// const handleAsyncThunks= apiService => async(args, {rejectWithValue}) => {
//    try {
//     return apiService(args)
//    } catch (error) {

//    }
// }

export const loginAsync = createAsyncThunk('auth/login', async username => await login(username));

export const logoutAsync = createAsyncThunk('auth/logout', async () => await logout());

export const fetchLoggedInUserAsync = createAsyncThunk(
  'auth/fetchLoggedInUser',
  async id => await fetchLoggedInUser(id)
);

const initialState = {
  loggedInUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log(action.error instanceof Error);
        console.log(action.error instanceof AxiosError);
        console.log(action);
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.loggedInUser = null;
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      });
  },
});

export const selectLoggedInUser = state => state.auth.loggedInUser;

export default authSlice.reducer;
