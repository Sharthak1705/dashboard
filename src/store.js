import { configureStore } from "@reduxjs/toolkit";
import usageReducer from "./features/usageSlice";

export const store = configureStore({
  reducer: {
    usage: usageReducer,
  },
});
