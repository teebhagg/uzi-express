import { CartItemWithProduct, CartWithIncludes, ProductWithIncludes } from '@/lib/prisma';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useLocalStorage } from 'usehooks-ts';

const initialState: Partial<CartWithIncludes> = {
  userId: "anonymous",
  items: [],
};



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<Partial<CartWithIncludes>>): Partial<CartWithIncludes> => {
      // state = { ...state, ...action.payload };
      return {
        ...state,
        ...action.payload,
        items: action.payload.items ? [...action.payload.items] : state.items
      };
      // return state;
    },
    addToCart: (state, action: PayloadAction<CartItemWithProduct>): Partial<CartWithIncludes> => {
      if (!state.items) {
        state.items = [];
      }
      state.items.push(action.payload)
      return state;
    },

    removeFromCart: (state, action: PayloadAction<CartItemWithProduct>): Partial<CartWithIncludes> => {
      if (!state.items) {
        state.items = [];
      }
      state.items = state.items.filter((item) => item.id !== action.payload?.id);
      return state;
    },

    resetCart: () => {
      return initialState
    },
  },
});

export const { updateCart, resetCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;