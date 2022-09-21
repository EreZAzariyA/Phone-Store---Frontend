import { useEffect } from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from './Redux/Store';
import phonesServices from './Services/PhonesServices';
import brandsServices from './Services/BrandsServices';
import Login from './Components/Auth-Area/Login';
import Register from './Components/Auth-Area/Register';
import Header from './Components/Layout-Area/Header';
import HomePage from './Components/Home-Area/HomePage';
import BrandsArea from './Components/Brands-Area';
import PhonesArea from './Components/Phones-Area';
import OneBrandPage from './Components/Brands-Area/OneBrand';
import OnePhonePage from './Components/Phones-Area/OnePhonePage';
import CartPage from './Components/Cart-Area/CartPage';
import OrderPage from './Components/OrdersArea/OrderPage';
import AboutPage from './Components/AboutArea/AboutPage';

import Role from './Models/role';
import { Container, Row } from 'react-bootstrap';
import shoppingCartServices from './Services/ShoppingCartsServices';
import { AdminTopPhones } from './Components/Admin/TopPhones';
import { AdminTopBrands } from './Components/Admin/TopBrands';

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const store = useSelector((state: RootState) => state.store);

  useEffect(() => {
    const getData = async () => {
      await phonesServices.getAllPhones();
      await brandsServices.getAllBrands();
      if (user) {
        await shoppingCartServices.getShoppingCartByUserId(user._id);
      }
    };

    getData();
  }, [user]);

  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>

      <Row>
        <Routes>
          <Route path='/' element={<HomePage brands={store.brands} phones={store.phones} />} />
          <Route path='/brands' element={<BrandsArea />} />
          <Route path='/phones' element={<PhonesArea />} />
          <Route path='/brands/:brand_id' element={<OneBrandPage />} />
          <Route path='/phone/:phoneId' element={<OnePhonePage />} />
          <Route path='/about' element={<AboutPage />} />
          
          {user && (
            <>
              <Route path='/cart' element={<CartPage />} />
              <Route path='/order' element={<OrderPage />} />
            </>
          )}
          {!user && (
            <>
              <Route path='/auth/login' element={<Login />} />
              <Route path='/auth/register' element={<Register />} />
            </>
          )}

          {/* Admin Panel */}
          {(user && user.roleId === Role.Admin) && (
            <>
              <Route path='admin/top-phones' element={<AdminTopPhones />} />
              <Route path='admin/top-brands' element={<AdminTopBrands />} />
            </>
          )}

          <Route path='*' element={<Navigate to="/" />} />
        </Routes>

      </Row>

      <Row as='footer' style={{ color: 'white' }}>
        Footer
      </Row>
    </Container>
  );
}

export default App;


export const myLorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dolore eveniet nesciunt autem adipisci doloremque corrupti sequi laboriosam aperiam, nam illo blanditiis accusamus? Nostrum molestias corporis excepturi? Ipsam, perferendis reiciendis.';