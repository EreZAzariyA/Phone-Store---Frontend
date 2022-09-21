import { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Image, InputGroup, Row } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { numberWithCommas } from "../..";
import undefineImage from "../../Assets/undefine-card-img.jpg";
import ItemInCartModel from "../../Models/item-in-cart model";
import { myLorem } from "../../App";
import OthersPhones from "./OthersPhones";
import { useSelector } from "react-redux";
import store, { RootState } from "../../Redux/Store";
import shoppingCartServices from "../../Services/ShoppingCartsServices";
import notifyService from "../../Services/NotifyService";


const OnePhonePage = () => {
  const { phoneId } = useParams();
  const phone = useSelector((state: RootState) => state.store.phones.find((p) => p._id === phoneId));
  const shoppingCartProducts = useSelector((state: RootState) => state.shoppingCart?.phones);
  const [inCart, setInCart] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    const check = () => {
      const item = shoppingCartProducts?.find(item => item?.phone_id === phone?._id);
      if (item) {
        setInCart(true);
      }
    };

    check();
  }, [phone?._id, shoppingCartProducts]);

  const plus = () => {
    if (amount >= 10) {
      return;
    }
    setAmount(amount + 1);
  };

  const minus = () => {
    if (amount === 0) {
      return;
    }
    setAmount(amount - 1);
  };

  const addToCart = async () => {
    const itemToAdd = new ItemInCartModel();
    itemToAdd.cart_id = store.getState().shoppingCart._id || null;
    itemToAdd.phone_id = phone._id;
    itemToAdd.amount = amount;
    itemToAdd.totalPrice = phone?.price * amount;

    try {
      if (itemToAdd.amount > 0) {
        await shoppingCartServices.addItemIntoShoppingCart(itemToAdd);
        if (!inCart) {
          notifyService.success("Added...");
        } else if (inCart) {
          notifyService.success("Updated...");
        }
      } else if (itemToAdd.amount === 0) {
        await shoppingCartServices.removePhoneFromCart(itemToAdd.phone_id, itemToAdd.cart_id);
        notifyService.error("Deleted...");
      }
    } catch (err: any) {
      notifyService.error(err);
    }
  };

  return (
    <Container>
      {/* Back button */}
      <Row xs='4' sm='4' className="mt-2 mb-2">
        <Col>
          <NavLink className='text-decoration-none' to={`/brands/${phone?.brand_id}`}>
            Go Back
          </NavLink>
        </Col>
      </Row>

      <Container>
        <Row>
          {/* Image-carousel */}
          <Col sm='6' xs='12'>
            {/* When image still lode from the server*/}
            {phone?.picture === undefined && <Image src={undefineImage} width='60%' alt={"undefine image"} />}

            {/* When there is an image */}
            {phone?.picture && (
              <Carousel variant="dark">
                <Carousel.Item>
                  <Image src={phone?.picture} width='70%' alt={`${phone?.name + 'ImageURL'}`} />
                </Carousel.Item>
                <Carousel.Item>
                  <Image src={phone?.picture} width='70%' alt={`${phone?.name + 'ImageURL'}`} />
                </Carousel.Item>
              </Carousel>
            )}
          </Col>

          {/* Phone details */}
          <Col sm='6' xs='12' className='p-0' style={{ textAlign: 'left' }}>
            <h2>
              {phone?.name}
              {phone?.name === undefined &&
                <p className="w-50 placeholder placeholder-wave placeholder-xs" />
              }
            </h2>

            <div className="text-muted pt-2 pb-2">
              {phone?.description ? (
                <span>
                  {phone?.description + " Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, expedita ut, deleniti reiciendis nisi unde quod"}
                </span>
              ) : (
                <>
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                  <span className="w-75 placeholder placeholder-wave placeholder-xs" />
                </>
              )}
            </div>

            <h5 className="pt-2 pb-2 fw-bolder" style={{ fontFamily: 'sans-serif' }}>
              {phone?.price ? (
                <span>{"$ " + numberWithCommas(phone?.price)}</span>
              ) : (
                <p className="w-25 placeholder placeholder-wave placeholder-xs" />
              )}
            </h5>

            <Row className="w-75 m-auto">
              <Col sm='6' xs='6'>
                <InputGroup size="sm">
                  <Button variant="success" onClick={plus}>+</Button>
                  <InputGroup.Text>{amount}</InputGroup.Text>
                  <Button variant='danger' onClick={minus}>-</Button>
                </InputGroup>
              </Col>
              <Col sm='6' xs='6'>
                {!inCart &&
                  <Button size="sm" className="p-1" variant='dark' onClick={addToCart}>
                    Add To Cart ✔
                  </Button>
                }
                {inCart &&
                  <Button size="sm" className="p-1" variant='success' onClick={addToCart}>
                    In-Cart
                  </Button>
                }
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-3 m-auto">
          <Col md='8'>
            <h3 className="text-decoration-underline">Description</h3>
            <Row className="text-sm-start">
              {phone?.description + " " + myLorem}
              <br />
              <br />
              {myLorem}
            </Row>
          </Col>
          <Col md='4'>
            <h3 className="text-decoration-underline">In The Box</h3>
          </Col>
        </Row>

        <hr className="mt-5" />
        {/* Others phones */}
        <Row>
          <Container className="w-auto">
            <Row>
              <h2>You May Also Like</h2>
            </Row>
            <Row className="flex-nowrap overflow-auto">
              <OthersPhones phone={phone} />
            </Row>
          </Container>
        </Row>
      </Container>
    </Container>
  );
};

export default OnePhonePage;
