"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  variant?: string;
  stock: number;
};

type CartState = {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  drawerOpen: boolean;
};

const initialState: CartState = {
  items: [],
  couponCode: "",
  couponDiscount: 0,
  drawerOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.variant === action.payload.variant
      );
      if (existing) {
        existing.qty = Math.min(existing.qty + action.payload.qty, existing.stock);
      } else {
        state.items.push(action.payload);
      }
      state.drawerOpen = true;
    },
    removeFromCart(state, action: PayloadAction<{ id: string; variant?: string }>) {
      state.items = state.items.filter(
        (i) => !(i.id === action.payload.id && i.variant === action.payload.variant)
      );
    },
    updateQty(state, action: PayloadAction<{ id: string; variant?: string; qty: number }>) {
      const item = state.items.find(
        (i) => i.id === action.payload.id && i.variant === action.payload.variant
      );
      if (item) item.qty = Math.min(Math.max(1, action.payload.qty), item.stock);
    },
    clearCart(state) {
      state.items = [];
      state.couponCode = "";
      state.couponDiscount = 0;
    },
    applyCoupon(state, action: PayloadAction<{ code: string; discount: number }>) {
      state.couponCode = action.payload.code;
      state.couponDiscount = action.payload.discount;
    },
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart, applyCoupon, setDrawerOpen } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectDrawerOpen = (state: { cart: CartState }) => state.cart.drawerOpen;
export const selectCoupon = (state: { cart: CartState }) => ({
  code: state.cart.couponCode,
  discount: state.cart.couponDiscount,
});
