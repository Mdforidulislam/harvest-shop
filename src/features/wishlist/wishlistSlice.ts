"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistItem = { id: string; slug: string; name: string; image: string; price: number; salePrice?: number };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] as WishlistItem[] },
  reducers: {
    toggleWishlist(state, action: PayloadAction<WishlistItem>) {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(action.payload);
    },
    removeWishlistItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
export const selectWishlist = (state: { wishlist: { items: WishlistItem[] } }) => state.wishlist.items;
export const selectIsWishlisted = (id: string) => (state: { wishlist: { items: WishlistItem[] } }) =>
  state.wishlist.items.some((i) => i.id === id);
