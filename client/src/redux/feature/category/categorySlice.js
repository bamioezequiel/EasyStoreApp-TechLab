// src/features/category/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as categoryAPI from './categoryAPI';

// fetchCategories no necesita token
export const fetchCategories = createAsyncThunk(
  'category/fetchAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryAPI.fetchAllCategories(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// createCategory con token
export const addCategory = createAsyncThunk(
  'category/add-category',
  async (category, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryAPI.createCategory(category, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// updateCategory con token
export const editCategory = createAsyncThunk(
  'category/edit',
  async ({ id, category }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryAPI.updateCategory(id, category, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// removeCategory con token
export const removeCategory = createAsyncThunk(
  'category/remove',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await categoryAPI.deleteCategory(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((c) => c.id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
