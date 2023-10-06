import ItemInCartModel from "./item-in-cart model";

class ShoppingCartModel {
  _id: string;
  user_id: string;
  createDate: Date;
  products: ItemInCartModel[];
};

export default ShoppingCartModel;