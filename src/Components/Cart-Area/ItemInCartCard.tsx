import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import ItemInCartModel from "../../Models/item-in-cart model"
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import { Popconfirm, message } from "antd";
import { Button, Card, Col, InputGroup, Row } from "react-bootstrap"
import { asPriceNum } from "../../Utils/helpers";

interface ItemInCartCardProps {
  itemInCart: ItemInCartModel;
};

const ItemInCartCard = (props: ItemInCartCardProps) => {
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const phones = useSelector((state: RootState) => state.store.phones);
  const phone = phones?.find((p) => p._id === props.itemInCart.phone_id);
  const [stock, setStock] = useState(props.itemInCart.amount || 0);

  const handleBtn = async (name: string) => {
    if (!shoppingCart._id) {
      message.error('Some error with your cart, please try to reload the page');
      return;
    }

    let msg = 'stock updated...';
    let phoneToUpdate = new ItemInCartModel(props.itemInCart);
    phoneToUpdate.cart_id = shoppingCart._id;
    let amount = 0;

    switch(name) {
      case 'minus':
        if (stock === 1) return;
        amount = stock - 1;
        phoneToUpdate.amount = amount;
      break;
      case 'plus':
        amount = stock + 1;
        phoneToUpdate.amount = amount;
      break;
    }

    try {
      phoneToUpdate.total_price = amount * (phone.price || 0);
      await shoppingCartServices.updateStockInCart(phoneToUpdate);
      setStock(amount);
      message.success(msg);
    } catch (err: any) {
      message.error(err.message);
      console.log(err);
    }
  };

  const handleRemove = async () => {
    try {
      await shoppingCartServices.removePhoneFromCart(props.itemInCart.phone_id, shoppingCart._id);
      message.success('Removed from cart');
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <Card
      style={{ width: '15rem' }}
      className="m-1 p-1 text-decoration-none mb-3"
    >
      <Popconfirm
        title="Are you sure?"
        onConfirm={handleRemove}
      >
        <Button
          size='sm'
          variant="danger"
          style={{ position: 'absolute', right: '4px', top: '4px' }}
        >
          -
        </Button>
      </Popconfirm>

      <Card.Img variant="top" src={phone?.picture} alt='' />

      <Card.Body>
        <Card.Title>
          {phone?.name}
        </Card.Title>

        <Card.Text className="text-muted mt-3 text-decoration-underline" as={Row}>
          {stock !== 1 && (
            <>
              <Col xs='8'>
                {'$' + asPriceNum(phone?.price)}
              </Col>
              <Col xs='4'>
                x1
              </Col>
            </>
           )}
          <Col xs='8'>
            {'$' + asPriceNum(stock * phone?.price)}
          </Col>
          <Col xs='4'>
            {'x' + stock}
          </Col>
        </Card.Text>

        <InputGroup size="sm" className="justify-content-center mt-3">
          <Button variant="dark" onClick={() => handleBtn('plus')} disabled={stock === 9}>
            +
          </Button>
          <InputGroup.Text>{stock}</InputGroup.Text>
          <Button variant="dark" onClick={() => handleBtn('minus')} disabled={stock === 1}>
            -
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default ItemInCartCard;