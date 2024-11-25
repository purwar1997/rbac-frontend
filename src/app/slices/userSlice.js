import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchUserById,
  addNewUser,
  editUser,
  deleteUser,
  activateUser,
  deactivateUser,
  archiveUser,
  restoreUser,
} from '../services/userService';
import { handleAsyncThunks } from '../../utils/helperFunctions';

export const fetchUsersAsync = createAsyncThunk('user/fetchUsers', handleAsyncThunks(fetchUsers));

export const fetchUserByIdAsync = createAsyncThunk(
  'user/fetchUserById',
  handleAsyncThunks(fetchUserById)
);

export const addNewUserAsync = createAsyncThunk('user/addNewUser', handleAsyncThunks(addNewUser));

export const editUserAsync = createAsyncThunk('user/editUser', handleAsyncThunks(editUser));

export const deleteUserAsync = createAsyncThunk('user/deleteUser', handleAsyncThunks(deleteUser));

export const activateUserAsync = createAsyncThunk(
  'user/activateUser',
  handleAsyncThunks(activateUser)
);

export const deactivateUserAsync = createAsyncThunk(
  'user/deactivateUser',
  handleAsyncThunks(deactivateUser)
);

export const archiveUserAsync = createAsyncThunk(
  'user/archiveUser',
  handleAsyncThunks(archiveUser)
);

export const restoreUserAsync = createAsyncThunk(
  'user/restoreUser',
  handleAsyncThunks(restoreUser)
);

const initialState = {
  status: 'idle',
  users: [],
  error: null,
  selectedUserStatus: 'idle',
  selectedUser: null,
  selectedUserError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchUserByIdAsync.pending, state => {
        state.selectedUserStatus = 'loading';
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.selectedUserStatus = 'succeeded';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserByIdAsync.rejected, (state, action) => {
        state.selectedUserStatus = 'failed';
        state.selectedUserError = action.error;
      })
      .addCase(addNewUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users.splice(index, 1, action.payload);
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload);
        state.users.splice(index, 1);
      })
      .addCase(activateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users.splice(index, 1, action.payload);
      })
      .addCase(deactivateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users.splice(index, 1, action.payload);
      })
      .addCase(archiveUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users.splice(index, 1, action.payload);
      })
      .addCase(restoreUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users.splice(index, 1, action.payload);
      });
  },
});

export default userSlice.reducer;
