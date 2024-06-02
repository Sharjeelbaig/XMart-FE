import { createSlice } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  user_id: number;
  category_id: number;
  cover_image: string;
  image: string;
  created_at: string;
}
const initialState: Item[] = [];

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    editItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    setAllItems: (_state, action) => {
      return action?.payload;
    },
  },
});

export const { addItem, editItem, deleteItem, setAllItems } = itemSlice.actions;

export default itemSlice.reducer;
