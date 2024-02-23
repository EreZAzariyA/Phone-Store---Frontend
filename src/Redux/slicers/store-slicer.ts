import { createSlice } from '@reduxjs/toolkit'
import { BrandModel } from '../../Models/brand-model';
import { PhoneModel } from '../../Models/phone-model';

class initialState {
  public phones: PhoneModel[] = [];
  public brands: BrandModel[] = [];
};

const storeSlicer = createSlice({
  name: 'store',
  initialState: {...new initialState()},
  reducers: {
    fetchPhonesAction(state, action) {
      state.phones = action.payload;
      return state;
    },
    fetchBrandsAction(state, action) {
      state.brands = action.payload;
      return state;
    },
    addNewPhoneAction(state, action) {
      state.phones.push(action.payload);
      return state;
    },
    addNewBrandAction(state, action) {
      state.brands.push(action.payload);
      return state;
    },
    updatePhoneAction(state, action) {
      const phoneIndex = state.phones.findIndex((phone) => phone._id === action.payload._id);
      state.phones[phoneIndex] = action.payload;
      return state;
    },
    updateBrandAction(state, action) {
      const brandIndex = state.brands.findIndex((brand) => brand._id === action.payload._id);
      state.brands[brandIndex] = action.payload;
      return state;
    },
    removePhoneAction(state, action) {
      const phoneIndex = state.phones.findIndex((phone) => phone._id === action.payload);
      state.phones.splice(phoneIndex, 1);
      return state;
    },
    removeBrandAction(state, action) {
      const brandIndex = state.brands.findIndex((brand) => brand._id === action.payload);
      state.brands.splice(brandIndex, 1);
      return state;
    },
  }
});

export const {
    fetchPhonesAction,
    fetchBrandsAction,
    addNewPhoneAction,
    addNewBrandAction,
    updatePhoneAction,
    updateBrandAction,
    removePhoneAction,
    removeBrandAction
  } = storeSlicer.actions;
export default storeSlicer;