import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRoles, fetchRoleById, addNewRole, editRole } from '../services/roleService';

export const fetchRolesAsync = createAsyncThunk('role/fetchRoles', async () => await fetchRoles());

export const fetchRoleByIdAsync = createAsyncThunk(
  'role/fetchRoleById',
  async id => await fetchRoleById(id)
);

export const addNewRoleAsync = createAsyncThunk(
  'role/addNewRole',
  async roleDetails => await addNewRole(roleDetails)
);

export const editRoleAsync = createAsyncThunk(
  'role/editRole',
  async ({ id, updates }) => await editRole(id, updates)
);

const initialState = {
  status: 'idle',
  roles: [],
  error: null,
  selectedRoleStatus: 'idle',
  selectedRole: null,
  selectedRoleError: null,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRolesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchRoleByIdAsync.pending, state => {
        state.selectedRoleStatus = 'loading';
      })
      .addCase(fetchRoleByIdAsync.fulfilled, (state, action) => {
        state.selectedRoleStatus = 'succeeded';
        state.selectedRole = action.payload;
      })
      .addCase(fetchRoleByIdAsync.rejected, (state, action) => {
        state.selectedRoleStatus = 'failed';
        state.selectedRoleError = action.error;
      })
      .addCase(addNewRoleAsync.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(editRoleAsync.fulfilled, (state, action) => {
        const index = state.roles.findIndex(role => role.id === action.payload.id);
        state.roles.splice(index, 1, action.payload);
      });
  },
});

export const selectRoles = state => state.role.roles;

export default roleSlice.reducer;
