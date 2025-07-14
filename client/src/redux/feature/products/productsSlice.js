import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productsAPI from './productsAPI';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try {
    return await productsAPI.fetchAllProducts();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addProduct = createAsyncThunk('products/add-product', async (product, thunkAPI) => {
  try {
    return await productsAPI.createProduct(product);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editProduct = createAsyncThunk('products/edit', async ({id, product}, thunkAPI) => {
  try {
    return await productsAPI.updateProduct(id, product);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeProduct = createAsyncThunk('products/remove', async (id, thunkAPI) => {
  try {
    await productsAPI.deleteProduct(id);
    return id; // devolvemos el id para eliminar en estado local
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add product
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Edit product
      .addCase(editProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Remove product
      .addCase(removeProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(p => p.id !== action.payload);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;
