import { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import ItemInCartModel from "../../Models/item-in-cart model";
import LastOrder from "../OrdersArea/LastOrderToast";
import ItemInCartCard from "./ItemInCartCard";
import { useSelector } from "react-redux";
import store, { RootState } from "../../Redux/Store";

const CartPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [itemsInCart, setItemsInCart] = useState<ItemInCartModel[]>();
  const orders = []

  return (
    <Container>
      <h1>Your-Cart</h1>
      {/* When items loaded */}
      {itemsInCart === undefined &&
        <Spinner animation="border" role="status" className="p-4 m-4 me-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }

      {/* If there is no items */}
      {itemsInCart?.length === 0 && <h4>Cart Is Empty</h4>}

      {/* Mapping the items */}
      <Row className="m-auto justify-content-center">
        {orders?.length > 0 &&
          <Col md='4'>
            <>
              <h5>You have {orders?.length} order`s on the way</h5>
              {orders?.map(order =>
                <LastOrder key={order?.orderId} order={order} />
              )}
            </>
          </Col>
        }

        <Col className="m-auto">
          <Row>
            {itemsInCart?.map(itemInCart => (
              <ItemInCartCard key={itemInCart?.phone_id} itemInCart={itemInCart} />
            ))}
          </Row>
        </Col>
      </Row>

      <NavLink to={itemsInCart?.length === 0 ? null : '/order'}>
        <Button className="mt-2" disabled={itemsInCart?.length === 0}>
          Continue To Order
        </Button>
      </NavLink>
    </Container>
  );
};

export default CartPage;