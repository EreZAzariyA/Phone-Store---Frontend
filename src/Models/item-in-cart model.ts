class ItemInCartModel {
  cart_id: string;
  phone_id: string;
  amount: number;
  total_price: number;

  constructor(itemToAdd: ItemInCartModel) {
    this.cart_id = itemToAdd.cart_id;
    this.phone_id = itemToAdd.phone_id;
    this.amount = itemToAdd.amount;
    this.total_price = itemToAdd.total_price;
  };
};

export default ItemInCartModel;