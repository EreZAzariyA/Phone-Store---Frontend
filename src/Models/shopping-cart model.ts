import { PhoneModel } from "./phone-model";

class ShoppingCartModel {
  _id: string;
  user_id: string;
  createDate: Date;
  phones: PhoneModel[]
};

export default ShoppingCartModel;