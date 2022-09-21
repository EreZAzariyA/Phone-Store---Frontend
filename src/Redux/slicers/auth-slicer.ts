import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from "jwt-decode";
import UserModel from '../../Models/user-model';

interface InitialState {
  token: string;
  user: UserModel;
};

class initialState implements InitialState {
  public token: string = null;
  public user: UserModel = null;

  constructor() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const decodedData = jwtDecode(this.token);
      this.user = (decodedData as any).user;
    }
  };
};

const authSlicer = createSlice({
  name: 'auth',
  initialState: {...new initialState()},
  reducers: {
    loginAction(state, action) {
      const token = action.payload;
      localStorage.setItem('token', token);
      state.token = token;
      const decodedData = jwtDecode(token);
      state.user = (decodedData as any).user;
      return state;
    },
    registerAction(state, action) {
    },
    logoutAction(state) {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
      return state;
    }
  }
});

export const {
  loginAction,
  registerAction,
  logoutAction,
  } = authSlicer.actions;
export default authSlicer;