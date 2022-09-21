import { createSlice } from "@reduxjs/toolkit";
import ItemInCartModel from "../../Models/item-in-cart model";

interface InitialState {
  _id: string;
  user_id: string;
  createDate: Date;
  phones: ItemInCartModel[];
};

class initialState implements InitialState {
  _id: string = null;
  user_id: string = null;
  createDate: Date = null;
  phones: ItemInCartModel[] = [];
};

const shoppingCartSlicer = createSlice({
  name: 'shopping_cart',
  initialState: {...new initialState()},
  reducers: {
    fetchShoppingCartAction(state, action) {
      state.phones = action.payload;
      return state;
    },
    removeShoppingCartAction(state) {
      state.phones = [];
      return state;
    },
    addProductToCartAction(state, action) {
      state.phones.push(action.payload);
      return state;
    },
    updateProductInCartAction(state, action) {
      const phoneIndex = state.phones.findIndex((phone) => phone.phone_id === action.payload.product_id);
      state.phones[phoneIndex] = action.payload;
      return state;
    },
    removeProductFromCartAction(state, action) {
      const index = state.phones.findIndex((phone) => phone.phone_id === action.payload);
      state.phones.splice(index, 1);
      return state;
    },
    resetCartAction(state) {
      state.phones = [];
      return state;
    },
  }
});

export const {
  fetchShoppingCartAction,
  removeShoppingCartAction,
  addProductToCartAction,
  updateProductInCartAction,
  removeProductFromCartAction,
  resetCartAction,
} = shoppingCartSlicer.actions;
export default shoppingCartSlicer;