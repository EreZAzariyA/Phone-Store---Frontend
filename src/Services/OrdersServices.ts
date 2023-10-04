import axios from "axios";
import OrderModel from "../Models/order-model";
import config from "../Utils/Config";
import store from "../Redux/Store";
import { fetchGuestsOrdersAction, fetchUserOrdersAction, setNewOrderAction } from "../Redux/OrdersState";

class OrdersServices {
  async setNewOrder(order: OrderModel): Promise<OrderModel> {
    const response = await axios.post<OrderModel>(config.urls.orders.newOrder, order);
    const newOrder = response.data;
    store.dispatch(setNewOrderAction(newOrder));
    return newOrder;
  };

  async getUserOrders(userEmail: string): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(config.urls.orders.getUsersOrders + userEmail);
    const userOrders = response.data;
    store.dispatch(fetchUserOrdersAction(userOrders));
    return userOrders;
  };

  async getGuestsOrders(): Promise<OrderModel[]> {
    const response = await axios.get<OrderModel[]>(config.urls.orders.getGuestsOrder);
    const guestOrders = response.data;
    store.dispatch(fetchGuestsOrdersAction(guestOrders));
    return guestOrders;
  };
};

const ordersServices = new OrdersServices();
export default ordersServices;