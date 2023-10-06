import axios from "axios";
import CredentialsModel from "../Models/credentials-model";
import UserModel from "../Models/user-model";
import config from "../Utils/Config";
import store from "../Redux/Store";
import { loginAction, logoutAction, registerAction } from "../Redux/slicers/auth-slicer";
import { removeShoppingCartAction } from "../Redux/slicers/shopping-cart-slicer";

class AuthServices {
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(config.urls.auth.register, user);
    const token = response.data;
    store.dispatch(registerAction(token));
    store.dispatch(loginAction(token));
  };

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(config.urls.auth.login, credentials);
    const token = response.data;
    store.dispatch(loginAction(token));
  };

  public async logout(): Promise<void> {
    store.dispatch(logoutAction());
    store.dispatch(removeShoppingCartAction());
  };
}


export const authServices = new AuthServices();
