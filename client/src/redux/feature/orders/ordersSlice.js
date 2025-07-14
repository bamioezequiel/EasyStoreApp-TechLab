import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderAPI from './ordersAPI';

export const fetchOrders = createAsyncThunk(
  'order/fetchAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderAPI.fetchAllOrders(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// addOrder con token
export const addOrder = createAsyncThunk(
  'order/add-order',
  async (order, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderAPI.createOrder(order, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// editOrder con token
export const editOrder = createAsyncThunk(
  'order/edit',
  async ({ id, order }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderAPI.updateOrder(id, order, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// removeOrder con token
export const removeOrder = createAsyncThunk(
  'order/remove',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await orderAPI.deleteOrder(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((o) => o.id !== action.payload);
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
