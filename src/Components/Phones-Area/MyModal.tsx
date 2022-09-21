import { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import ItemInCartModel from "../../Models/item-in-cart model";
import { PhoneModel } from "../../Models/phone-model";
import notifyService from "../../Services/NotifyService";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import store from "../../Redux/Store";

interface MyModalProps {
  phone: PhoneModel;
  show: boolean;
  close: any;
  save: any
};

function MyModal(props: MyModalProps): JSX.Element {
  const [stockInCart, setStockInCart] = useState(1);

  const plus = () => {
    setStockInCart(stockInCart + 1);
  };

  const minus = () => {
    if (stockInCart === 0) {
      return;
    };
    setStockInCart(stockInCart - 1);
  };

  const save = async () => {
    // props.save();

    // if (store.getState().shoppingCart.phones.find(phone => phone._id === props.phone._id)) {
    //       try {
    //             const phoneToUpdate = new ItemInCartModel();
    //             phoneToUpdate.cartId = store.getState().shoppingCart?.cartId;
    //             phoneToUpdate_id = props.phone_id;
    //             phoneToUpdate.stock = stockInCart;
    //             phoneToUpdate.totalPrice = props.phone.price * stockInCart;
    //             await shoppingCartServices.updateStockInCart(phoneToUpdate);
    //             notifyService.success("Updated...");
    //       } catch (err: any) {
    //             alert(err.massage);
    //       }
    // } else {
    //       try {
    //             const itemToAdd = new ItemInCartModel();
    //             itemToAdd_id = props.phone_id;
    //             itemToAdd.stock = stockInCart;
    //             itemToAdd.cartId = store.getState().shoppingCart?.cartId;
    //             itemToAdd.totalPrice = props.phone.price * stockInCart;
    //             await shoppingCartServices.addItemIntoShoppingCart(itemToAdd);
    //             notifyService.success("Added");
    //       } catch (err: any) {
    //             alert(err);
    //       }
    // }
  }

  return (
    <Modal show={props.show} onHide={props.close} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>{props.phone?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Modal.Title>Set Stock To Order</Modal.Title>

        <ButtonGroup>
          <Button variant="success" onClick={plus}>
            <strong>+</strong>
          </Button>
          <h1 style={{ margin: '10px' }}>{stockInCart}</h1>
          <Button variant="danger" onClick={minus}>
            <strong>–</strong>
          </Button>
        </ButtonGroup>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={save}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;