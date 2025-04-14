import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartslices';

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})