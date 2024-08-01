import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cart-slice";
import { userSlice } from "./features/user-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      user: userSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
