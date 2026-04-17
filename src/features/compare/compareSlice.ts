"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CompareItem = { id: string; slug: string; name: string; image: string; price: number };

const compareSlice = createSlice({
  name: "compare",
  initialState: { items: [] as CompareItem[] },
  reducers: {
    addToCompare(state, action: PayloadAction<CompareItem>) {
      if (state.items.length >= 4) return;
      if (!state.items.find((i) => i.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCompare(state) {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
export const selectCompare = (state: { compare: { items: CompareItem[] } }) => state.compare.items;
