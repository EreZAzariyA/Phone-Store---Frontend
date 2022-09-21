import axios from "axios";
import ItemInCartModel from "../Models/item-in-cart model";
import ShoppingCartModel from "../Models/shopping-cart model";
import { addProductToCartAction, fetchShoppingCartAction, removeProductFromCartAction, updateProductInCartAction} from "../Redux/slicers/shopping-cart-slicer";
import config from "../Utils/Config";
import store from "../Redux/Store";
import { addProductToGuestCartAction, removeProductFromGuestCartAction, updateProductInGuestCartAction } from "../Redux/slicers/guest-slicer";

class ShoppingCartsServices {
  public async getShoppingCartByUserId(userId: string): Promise<ShoppingCartModel> {
    const response = await axios.get<ShoppingCartModel>(config.urls.shopping_carts.shopping_cart_by_userId + userId);
    const shoppingCart = response.data;
    store.dispatch(fetchShoppingCartAction(shoppingCart));
    return shoppingCart;
  };

  public async getItemsFromCartByCartId(shoppingCartId: string): Promise<ItemInCartModel[]> {
    const response = await axios.get<ItemInCartModel[]>(config.urls.shopping_carts.items_in_cart + shoppingCartId);
    const itemsInCart = response.data;
    return itemsInCart;
  };

  public async addItemIntoShoppingCart(itemToAdd: ItemInCartModel): Promise<ItemInCartModel> {
    if (store.getState().auth.user) {
      const response = await axios.post<ItemInCartModel>(config.urls.shopping_carts.add_item_to_cart, itemToAdd);
      const addedItem = response.data;
      store.dispatch(addProductToCartAction(itemToAdd));
      return addedItem;
    } else {
      store.dispatch(addProductToGuestCartAction(itemToAdd));
      return itemToAdd;
    }
  };

  public async updateStockInCart(phoneToUpdate: ItemInCartModel): Promise<ItemInCartModel> {
    if (store.getState().auth.user) {
      const response = await axios.patch<ItemInCartModel>(config.urls.shopping_carts.update, phoneToUpdate);
      const updatedItem = response.data;
      store.dispatch(updateProductInCartAction(updatedItem));
      return updatedItem;
    } else {
      store.dispatch(updateProductInGuestCartAction(phoneToUpdate));
      return phoneToUpdate;
    }
  };

  public async removePhoneFromCart(phoneIdToRemove: string, cartId: string): Promise<void> {
    if (store.getState().auth.user) {
      await axios.delete(config.urls.shopping_carts.remove + phoneIdToRemove + "/" + cartId);
      store.dispatch(removeProductFromCartAction(phoneIdToRemove));
    } else {
      store.dispatch(removeProductFromGuestCartAction(phoneIdToRemove));
    }
  };
};
const shoppingCartServices = new ShoppingCartsServices();
export default shoppingCartServices;