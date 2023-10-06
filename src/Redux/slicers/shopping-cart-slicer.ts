import { createSlice } from "@reduxjs/toolkit";
import ItemInCartModel from "../../Models/item-in-cart model";

class InitialState {
  public _id: string = null;
  public user_id: string = null;
  public createDate: Date = null;
  public products: ItemInCartModel[] = [];
};

const initialState = new InitialState();

const shoppingCartSlicer = createSlice({
  name: 'shopping_cart',
  initialState: {...initialState},
  reducers: {
    fetchShoppingCartAction(state, action) {
      state = action.payload;
      return state;
    },
    removeShoppingCartAction(state) {
      state = {...initialState};
      return state;
    },
    addProductToCartAction(state, action) {
      state.products.push(action.payload);
      return state;
    },
    updateProductInCartAction(state, action) {
      const phoneIndex = state.products.findIndex((phone) => phone.phone_id === action.payload.phone_id);
      state.products[phoneIndex] = action.payload;
      return state;
    },
    removeProductFromCartAction(state, action) {
      const index = state.products.findIndex((phone) => phone.phone_id === action.payload);
      state.products.splice(index, 1);
      return state;
    },
    resetCartAction(state) {
      state.products = [];
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