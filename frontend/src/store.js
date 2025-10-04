import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import sellerReducer from "./Slices/sellerSlice";



// Combine reducers
const reducer = {
  authState: authReducer,
  sellerState: sellerReducer,



};

// Create the store
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Customize middleware options if needed
      serializableCheck: false, // Disable serializable check for non-serializable values (e.g., functions in actions)
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;