import { NavLink } from "react-router-dom";
import LastOrder from "../OrdersArea/LastOrderToast";
import ItemInCartCard from "./ItemInCartCard";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { Button, Col, Row, Space, Spin } from "antd";

const CartPage = () => {
  const itemsInCart = useSelector((state: RootState) => state.shoppingCart.products);
  const orders = [];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <h1>Your-Cart</h1>
      {itemsInCart === undefined && <Spin />}
      {itemsInCart.length === 0 && <h4>Cart Is Empty</h4>}

      <Row align={'middle'} justify={'center'}>
        <Col>
          {orders.length > 0 && (
            <>
              <h5>You have {orders.length} order`s on the way</h5>
              {orders.map(order =>
                <LastOrder key={order.orderId} order={order} />
              )}
            </>
          )}
        </Col>

        <Col>
          <Row className="m-auto d-flex justify-content-center">
            {itemsInCart.map((itemInCart) => (
              <ItemInCartCard key={itemInCart.phone_id} itemInCart={itemInCart} />
            ))}
          </Row>
        </Col>
      </Row>

      <NavLink to={itemsInCart?.length === 0 ? null : '/order'}>
        <Button className="mt-2" disabled={itemsInCart?.length === 0}>
          Continue To Order
        </Button>
      </NavLink>
    </Space>
  );
};

export default CartPage;