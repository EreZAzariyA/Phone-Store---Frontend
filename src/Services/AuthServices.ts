import axios from "axios";
import CredentialsModel from "../Models/credentials-model";
import UserModel from "../Models/user-model";
import config from "../Utils/Config";
import store from "../Redux/Store";
import { loginAction, logoutAction, registerAction } from "../Redux/slicers/auth-slicer";


class AuthServices {
  public async register(user: UserModel): Promise<void> {
    const response = await axios.post<string>(config.urls.auth.register, user);
    const token = response.data;
    // this.onRegister(token);
    store.dispatch(registerAction(token));
    store.dispatch(loginAction(token));
  };

  public async login(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post<string>(config.urls.auth.login, credentials);
    const token = response.data;
    store.dispatch(loginAction(token));
    // this.onLogin(token);
  };

  public async logout(): Promise<void> {
    store.dispatch(logoutAction());
  };

  // public async onLogin(token: string) {
  //       const decodedData = jwtDecode(token);
  //       const user: UserModel = (decodedData as any).user;
  //       const shoppingCart = await shoppingCartServices.getShoppingCartByUserId(user.userId);
  //       if (!shoppingCart) {
  //             console.log("You still don`t have a shopping cart. Create one to start shopping.");
  //       } else {
  //             await shoppingCartServices.getItemsFromCartByCartId(shoppingCart.cartId);

  //             await ordersServices.getUserOrders(user?.email);
  //       }

  // }

  //     public async onRegister(token: string) {
  //           const decodedData = jwtDecode(token);
  //           const user: UserModel = (decodedData as any).user;
  //           const shoppingCart = await shoppingCartServices.getShoppingCartByUserId(user.userId);
  //           shoppingCartStore.dispatch(fetchShoppingCartAction(shoppingCart));
  //           const items = await shoppingCartServices.getItemsFromCartByCartId(shoppingCart.cartId);
  //           shoppingCartStore.dispatch(fetchItemsFromShoppingCartAction(items));
  //     }
}


export const authServices = new AuthServices();
