import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllOrders,
  fetchOrderById,
  createOrder,
  changeOrderStatus,
} from './ordersAPI';

// Obtener todas las órdenes
export const getAllOrders = createAsyncThunk(
  'orders/getAll',
  async (_, thunkAPI) => {
    try {
      return await fetchAllOrders();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Obtener una orden por ID
export const getOrderById = createAsyncThunk(
  'orders/getById',
  async ({ id }, thunkAPI) => {
    try {
      return await fetchOrderById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Crear nueva orden
export const postCreateOrder = createAsyncThunk(
  'orders/create',
  async (_, thunkAPI) => {
    try {
      return await createOrder();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Cambiar estado de una orden
export const changeOrderStatusThunk = createAsyncThunk(
  'orders/changeStatus',
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      return await changeOrderStatus(orderId, newStatus);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Estado inicial
const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(postCreateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCreateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(postCreateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changeOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(changeOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
