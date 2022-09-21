import { createSlice } from "@reduxjs/toolkit";
import { PhoneModel } from "../../Models/phone-model";

class initialState {
  public products: PhoneModel[] = [];

  constructor() {
    const pro = JSON.parse(localStorage.getItem('guest_items'));
    if (pro) {
      this.products = pro;
    }
  };
};

const shoppingCartSlicer = createSlice({
  name: 'guest_shopping_cart',
  initialState: {...new initialState()},
  reducers: {
    fetchGuestShoppingCartAction(state, action) {
      state.products = action.payload;
      localStorage.setItem('guest_items', action.payload);
      return state;
    },
    removeGuestCartAction(state) {
      state.products = [];
      localStorage.removeItem('guest_items');
      return state;
    },
    addProductToGuestCartAction(state, action) {
      // state.products.push(action.payload);
      // localStorage.setItem('guest_items', JSON.stringify(state.products));
      console.log({payload: action.payload});
      
      return state;
    },
    updateProductInGuestCartAction(state, action) {
      const productIndex = state.products.findIndex((product) => product._id === action.payload.product_id);
      state.products[productIndex] = action.payload;
      localStorage.setItem('guest_items', JSON.stringify(state.products));
      return state;
    },
    removeProductFromGuestCartAction(state, action) {
      const index = state.products.findIndex((product) => product._id === action.payload);
      state.products.splice(index, 1);
      localStorage.setItem('guest_items', JSON.stringify(state.products));
      return state;
    },
    resetGuestCartAction(state) {
      state.products = [];
      localStorage.setItem('guest_items', JSON.stringify(state.products));
      return state;
    },
  }
});

export const {
  fetchGuestShoppingCartAction,
  removeGuestCartAction,
  addProductToGuestCartAction,
  updateProductInGuestCartAction,
  removeProductFromGuestCartAction,
  resetGuestCartAction,
} = shoppingCartSlicer.actions;
export default shoppingCartSlicer;