// src/features/role/roleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as roleAPI from './roleAPI';

// fetchRoles no necesita token
export const fetchRoles = createAsyncThunk(
  'role/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await roleAPI.fetchAllRoles();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// addRole con token
export const addRole = createAsyncThunk(
  'role/add-role',
  async (role, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roleAPI.createRole(role, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// editRole con token
export const editRole = createAsyncThunk(
  'role/edit',
  async ({ id, role }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roleAPI.updateRole(id, role, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// removeRole con token
export const removeRole = createAsyncThunk(
  'role/remove',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await roleAPI.deleteRole(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addRole.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editRole.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((r) => r.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeRole.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((r) => r.id !== action.payload);
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default roleSlice.reducer;
