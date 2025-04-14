import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Khởi tạo mảng giỏ hàng rỗng
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            // Kiểm tra nếu action.payload là hợp lệ và là một mảng
            if (Array.isArray(action.payload)) {
                action.payload.forEach((newItem) => {
                    // Kiểm tra nếu newItem có thuộc tính id
                    if (newItem.id) {
                        const existingItem = state.items.find((item) => item.id === newItem.id);
                        if (existingItem) {
                            existingItem.quantity += newItem.quantity; // Cộng dồn số lượng
                        } else {
                            state.items.push(newItem); // Thêm sản phẩm mới vào giỏ
                        }
                    }
                });
            }
        },
        addToCart: (state, action) => {
            const { item, quantity } = action.payload;

            // Kiểm tra nếu item có thuộc tính id và quantity hợp lệ
            if (item && item.id && quantity > 0) {
                const existingItem = state.items.find((item) => item.id === action.payload.item.id);
                
                if (existingItem) {
                    existingItem.quantity += Number(quantity); // Cập nhật số lượng sản phẩm
                } else {
                    state.items.push({
                        ...item,
                        quantity: Number(quantity),
                    });
                }
            } else {
                console.error('Invalid product data or quantity');
            }
        },
        removeFromCart: (state, action) => {
            // Kiểm tra nếu action.payload là hợp lệ
            if (action.payload) {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
        },
        updateCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            // Kiểm tra nếu id và quantity hợp lệ
            const item = state.items.find((item) => item.id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = []; // Xóa giỏ hàng
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice;
