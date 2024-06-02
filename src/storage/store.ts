import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import itemsSlice from "./items/itemsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    items: itemsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
