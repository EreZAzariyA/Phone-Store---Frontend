import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../..";
import ItemInCartModel from "../../Models/item-in-cart model";
import OrderModel from "../../Models/order-model";
import notifyService from "../../Services/NotifyService";
import ordersServices from "../../Services/OrdersServices";
import { errStyle } from "../Auth-Area/Register";
import OrderConfirm from "./OrderConfirmModal";
import store, { RootState } from "../../Redux/Store";
import { useSelector } from "react-redux";

const colStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: 'white',
  borderRadius: '10px',
  margin: '5px'
}

const OrderPage = () => {
  const { register, handleSubmit, formState, setValue } = useForm<OrderModel>();
  const user = useSelector((state: RootState) => state.auth.user);
  if (user) {
    setValue('email', user.email);
    setValue('fullName', user.first_name + " " + user.last_name);
  }

  const isGuest = !user ? true : false;
  const [order, setOrder] = useState<OrderModel>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [inCreditCard, setInCreditCard] = useState(false);
  const itemsInCart = useSelector((state: RootState) => state.shoppingCart.phones);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    const q = window.confirm('Are you sure?');
    if (q) {
      setShow(false);
      navigate('/');
    }
  };

  const handleShow = () => setShow(true);

  const getTotalPrice = useCallback(() => {
    let sum: number = 0;
    itemsInCart?.forEach(item => {
      sum += item?.totalPrice;
    });
    setTotalPrice(sum);
  }, [itemsInCart]);

  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice]);

  const submit = async (orderToSet: OrderModel) => {
    handleShow();
    try {
      const order = await ordersServices.setNewOrder(orderToSet);
      setOrder(order);
      notifyService.success("Ok");
    } catch (err: any) {
      notifyService.error("Some error");
    }
  };

  const getProductByItemId = (itemId: string) => {
    const products = store.getState().store.phones;
    const product = products?.find(p => p._id === itemId);
    return product;
  };

  return (
    <Container>
      {/* Back Button */}
      <Row>
        <Col>
          <NavLink to='/cart' className="float-start">
            Go Back
          </NavLink>
        </Col>
      </Row>

      {/* Check-out & Summery */}
      <Row className="mt-2 p-3 flex-md-nowrap justify-content-center">
        {/* Form */}
        <Col md='8' lg='8' xl='8' style={colStyle}>
          <Form onSubmit={handleSubmit(submit)}>
            <h1>CHECKOUT</h1>
            <Form.Text style={{ textAlign: 'justify' }} as='h6'>
              User Details
            </Form.Text>

            <Row>
                  {/* Email */}
                  <Col>
                        <FloatingLabel label={"Email"}>
                              <Form.Control
                                    className={`form-control ${formState.errors.email ? 'is-invalid' : ''}`}
                                    type="email"
                                    disabled={!isGuest}
                                    autoFocus
                                    {...register('email', {
                                          required: { value: true, message: "Email is missing" },
                                          minLength: { value: 3, message: "Email must be minimum 3 chars" },
                                          maxLength: { value: 50, message: "Email can't exceed 50 chars" },
                                          pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                          }
                                    })} />

                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.email?.message}
                              </span>
                        </FloatingLabel>
                  </Col>

                  {/* Full name */}
                  <Col>
                        <FloatingLabel
                              label='Full Name'>
                              <Form.Control
                                    className={`form-control ${formState.errors.fullName ? 'is-invalid' : ''}`}
                                    type="text"
                                    maxLength={20}
                                    disabled={!isGuest}
                                    {...register('fullName', {
                                          required: { value: true, message: "Full name is missing" },
                                          minLength: { value: 5, message: "Full name must be minimum 5 chars" },
                                          maxLength: { value: 20, message: "Full name can't exceed 20 chars" }
                                    })} />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.fullName?.message}
                              </span>
                        </FloatingLabel>
                  </Col>
            </Row>

            <hr />
            <Form.Text style={{ textAlign: 'justify' }} as='h6'>
              Shopping Details
            </Form.Text>

            {/* Shipping-Details */}
            <Row>
                  {/* Zip Code */}
                  <Col>
                        <FloatingLabel
                              label='Zip Code'>
                              <Form.Control
                                    type="tel"
                                    maxLength={5}
                                    className={`form-control ${formState.errors.zipCode ? 'is-invalid' : ''}`}
                                    {...register('zipCode', {
                                          required: { value: true, message: "Zip-code is missing" },
                                          minLength: { value: 5, message: "Zip-code must be minimum 5 numbers" },
                                          maxLength: { value: 5, message: "Zip-code can't exceed 5 numbers" },
                                          pattern: { value: /^[A-Za-z0-9]+$/i, message: 'Invalid Zip-code' },
                                    })} />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.zipCode?.message}
                              </span>
                        </FloatingLabel>
                  </Col>

                  {/* City */}
                  <Col>
                        <FloatingLabel
                              label={"City"}>
                              <Form.Control type="text"
                                    className={`form-control ${formState.errors.city ? 'is-invalid' : ''}`}
                                    {...register('city', {
                                          required: { value: true, message: "City is missing" },
                                          minLength: { value: 3, message: "City must be minimum 3 chars" },
                                          maxLength: { value: 50, message: "City can't exceed 50 chars" }
                                    })} />
                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.city?.message}
                              </span>
                        </FloatingLabel>
                  </Col>

                  {/* Address */}
                  <Col xs='12'>
                        <FloatingLabel
                              label={"Address"}
                              className="mt-2">
                              <Form.Control
                                    className={`form-control ${formState.errors.address ? 'is-invalid' : ''}`}
                                    type="text"
                                    {...register('address', {
                                          required: { value: true, message: "Address is missing" },
                                          minLength: { value: 3, message: "Address must be minimum 3 chars" },
                                          maxLength: { value: 70, message: "Address can't exceed 70 chars" }
                                    })} />

                              <span className="mb-2" style={errStyle}>
                                    {formState.errors.address?.message}
                              </span>
                        </FloatingLabel>
                  </Col>
            </Row>

            <hr />
            <Form.Text style={{ textAlign: 'justify' }} as='h6'>
              Payment-Method
            </Form.Text>

            {/* Payment method radio */}
            <Row className="justify-content-center">
              <Col xs='6' sm='4'>
                    <Form.Check
                          inline
                          label={"Credit-Card"}
                          type="radio"
                          name={'card'}
                          required
                          onChange={() => setInCreditCard(true)}
                    />
              </Col>
              <Col xs='6' sm='4'>
                    <Form.Check
                          inline
                          type="radio"
                          label={"PayPal"}
                          name={'card'}
                          required
                          onChange={() => setInCreditCard(false)}
                    />
              </Col>
            </Row>

            {/* Credit-Card details */}
            {inCreditCard === true &&
              <Row>
                {/* Card number */}
                <Col sm='12' className="mt-2">
                  <Form.Text>
                    Card-Number
                  </Form.Text>

                    <FloatingLabel
                      label={"XXXX-XXXX-XXXX-XXXX"}
                      className="mt-2"
                    >
                      <Form.Control
                        autoFocus
                        className={`form-control ${formState.errors.paymentMethod?.creditCard?.cardNumber ? 'is-invalid' : ''} `}
                        type="tel"
                        maxLength={16}
                        {...register('paymentMethod.creditCard.cardNumber', {
                          required: { value: true, message: "Card number is missing" },
                          minLength: { value: 16, message: "Card number must be minimum 16 numbers" },
                          maxLength: { value: 16, message: "Card number can't exceed 16 numbers" }
                        })}
                      />

                      <span className="mb-2" style={errStyle}>
                        {formState.errors.paymentMethod?.creditCard?.cardNumber?.message}
                      </span>
                    </FloatingLabel>
                </Col>

                {/* Expire date */}
                <Col xs='6'>
                  <Form.Text>
                    Exp. Date
                  </Form.Text>

                  <FloatingLabel
                    label={"MM/YY"}
                    className="mt-2"
                  >
                    <Form.Control
                      className={`form-control ${formState.errors.paymentMethod?.creditCard?.expiredDate ? 'is-invalid' : ''} `}
                      type="month"
                      {...register('paymentMethod.creditCard.expiredDate', {
                        required: { value: true, message: "Card expire date is missing" },
                        maxLength: { value: 30, message: 'Error' },
                        minLength: { value: 5, message: 'Expire date can`t be lass then 4 digits' }
                      })}
                      />

                    <span className="mb-2" style={errStyle}>
                      {formState.errors.paymentMethod?.creditCard?.expiredDate?.message}
                    </span>
                  </FloatingLabel>
                </Col>

                {/* Security number*/}
                <Col xs='6'>
                  <Form.Text>
                    CVC
                  </Form.Text>

                  <FloatingLabel
                    label={'cvc'}
                    className="mt-2"
                  >
                    <Form.Control
                      className={`form-control ${formState.errors.paymentMethod?.creditCard?.securityNumber ? 'is-invalid' : ''} `}
                      type="tel"
                      maxLength={3}
                      {...register('paymentMethod.creditCard.securityNumber', {
                        required: { value: true, message: "Security number is missing" },
                        maxLength: { value: 3, message: 'Security number can`t exceed 3 digits' },
                        minLength: { value: 3, message: 'Security number must be 3 digits' }
                      })}
                    />

                    <span className="mb-2" style={errStyle}>
                      {formState.errors.paymentMethod?.creditCard?.securityNumber?.message}
                    </span>
                  </FloatingLabel>
                </Col>
              </Row>
            }

            <Button variant="success" type="submit" className="mt-3 mb-2">Confirm Order</Button>
          </Form>
        </Col>

        {/* Products List */}
        <Col md='4' lg='4' xl='4' style={colStyle}>
          <h1>Summery</h1>
          <br />
          {itemsInCart === undefined && <Spinner animation="border" />}
          {itemsInCart?.map(i =>
            <Card key={i.phone_id} className='m-1'>
              <Row className="flex-md-nowrap w-100">
                <Col md='5'>
                  <Card.Img src={getProductByItemId(i?.phone_id)?.picture} width='100' alt='' />
                </Col>
                <Col md='7'>
                  <Card.Title>
                    {getProductByItemId(i?.phone_id)?.name}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {'$' + numberWithCommas(getProductByItemId(i?.phone_id)?.price) + ' x ' + i?.totalPrice}
                    <br />
                    <span className="text-decoration-underline">
                      {'$' + numberWithCommas(getProductByItemId(i?.phone_id)?.price * i?.totalPrice)}
                    </span>
                  </Card.Text>
                </Col>
              </Row>
            </Card>
          )}
          <Table variant="light" hover striped className="mt-2">
            <tbody>
              <tr>
                <td>
                  Total
                </td>
                <th>
                  {numberWithCommas(totalPrice + 50) + '$'}
                </th>
              </tr>
              <tr>
                <td>
                  Shipping (Included)
                </td>
                <th>
                  50$
                </th>
              </tr>
              <tr>
                <td>
                  Vat (Included 17%)
                </td>
                <th>
                  {((17 / 100) * totalPrice).toFixed(2) + '$'}
                </th>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <OrderConfirm show={show} handleClose={handleClose} order={order} />
    </Container>
  );
};

export default OrderPage;