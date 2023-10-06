import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./slicers/auth-slicer";
import storeSlicer from "./slicers/store-slicer";
import shoppingCartSlicer from "./slicers/shopping-cart-slicer";

const store = configureStore({
  reducer: {
    auth: authSlicer.reducer,
    store: storeSlicer.reducer,
    shoppingCart: shoppingCartSlicer.reducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;