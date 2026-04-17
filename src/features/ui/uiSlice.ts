"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mobileMenuOpen: false,
    searchOpen: false,
    toasts: [] as { id: string; message: string; type: "success" | "error" | "info" }[],
  },
  reducers: {
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.mobileMenuOpen = action.payload;
    },
    setSearchOpen(state, action: PayloadAction<boolean>) {
      state.searchOpen = action.payload;
    },
    addToast(state, action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>) {
      state.toasts.push({ ...action.payload, id: Date.now().toString() });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setMobileMenuOpen, setSearchOpen, addToast, removeToast } = uiSlice.actions;
export default uiSlice.reducer;
