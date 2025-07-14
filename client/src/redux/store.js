import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feature/auth/authSlice';
import productsReducer from './feature/products/productsSlice';
import ordersReducer from './feature/orders/ordersSlice';
import roleReducer from './feature/role/roleSlice';
import categoriesReducer from './feature/category/categorySlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        orders: ordersReducer,
        role: roleReducer,
        categories: categoriesReducer

    }
})