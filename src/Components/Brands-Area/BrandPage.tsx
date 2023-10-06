import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import PhoneCard from "../Phones-Area/PhoneCard";
import OthersBrands from "./OthersBrand";
import { Col, Container, Row } from "react-bootstrap"

const BrandPage = () => {
  const { brand_id } = useParams();
  const store = useSelector((state: RootState) => state.store);
  const brand = store.brands.find((b) => b._id === brand_id);
  const phones = [...store.phones].filter((phone) => phone.brand_id === brand_id);

  return (
    <Container>
      <Row xs='4' className="mt-2 mb-1">
        <Col>
          <NavLink className='text-decoration-none' to='/brands'>
            Go Back
          </NavLink>
        </Col>
      </Row>

      {/* Page title */}
      <h1>{brand?.brand ? brand.brand.at(0).toUpperCase() + brand.brand.slice(1) : ''}</h1>
      <Row>
        <Container>
          <Row className="justify-content-center">
            {phones.map((phone) =>
              <PhoneCard key={phone._id} phone={phone} />
            )}
          </Row>
        </Container>
      </Row>

      <Row>
        {/* Others brands */}
        <Container className="w-auto">
          <Row>
            <h2>You May Also Like</h2>
          </Row>
          <Row className="flex-nowrap overflow-auto ">
            <OthersBrands brand_id={brand?._id} />
          </Row>
        </Container>
      </Row>
    </Container >
  );
};

export default BrandPage;