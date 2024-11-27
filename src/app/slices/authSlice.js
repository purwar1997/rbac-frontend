import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, fetchLoggedInUser } from '../services/authService';
import { handleAsyncThunks } from '../../utils/helperFunctions';

export const loginAsync = createAsyncThunk('auth/login', handleAsyncThunks(login));

export const logoutAsync = createAsyncThunk('auth/logout', handleAsyncThunks(logout));

export const fetchLoggedInUserAsync = createAsyncThunk(
  'auth/fetchLoggedInUser',
  handleAsyncThunks(fetchLoggedInUser)
);

const initialState = {
  loggedInUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoggedInUserRoles(state, action) {
      state.loggedInUser.role = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.loggedInUser = null;
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      });
  },
});

export const { updateLoggedInUserRoles } = authSlice.actions;

export const selectLoggedInUser = state => state.auth.loggedInUser;

export default authSlice.reducer;
