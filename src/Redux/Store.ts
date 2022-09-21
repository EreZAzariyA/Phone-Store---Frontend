// import { createStore } from "redux";
// import { authReducer } from "./AuthState";
// import { guestsReducer } from "./GuestState";
// import { ordersReducer } from "./OrdersState";
// import { shoppingCartReducer } from "./ShoppingCartState";
// import { storeReducer } from "./StoreState";


// export const authStore = createStore(authReducer);
// export const store = createStore(storeReducer);
// export const shoppingCartStore = createStore(shoppingCartReducer);
// export const guestsStore = createStore(guestsReducer);
// export const ordersStore = createStore(ordersReducer);

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