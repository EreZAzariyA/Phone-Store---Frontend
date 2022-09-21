import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { NavLink, useParams } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import { PhoneModel } from "../../Models/phone-model";
import brandsServices from "../../Services/BrandsServices";
import phonesServices from "../../Services/PhonesServices";
import PhoneCard from "../Phones-Area/PhoneCard";
import OthersBrands from "./OthersBrand";
import { useSelector } from "react-redux";

const OneBrandPage = () => {
  const [brand, setBrand] = useState<BrandModel>();
  const [phones, setPhones] = useState<PhoneModel[]>();
  const params = useParams();

  const getBrandByParams = useCallback(async () => {
    const brand_id = params.brand_id;
    const brand = await brandsServices.getOneBrand(brand_id);
    setBrand(brand);
    getPhonesByBrandId(brand?._id);
  }, [params.brand_id]);

  useEffect(() => {
    getBrandByParams();
  }, [getBrandByParams]);

  const getPhonesByBrandId = (async (brand_id: string) => {
    const phones = await phonesServices.getPhonesByBrandId(brand_id);
    setPhones(phones);
  });

  return (
    <Container>
      {/* Back button */}
      <Row xs='4' className="mt-2 mb-1">
        <Col>
          <NavLink className='text-decoration-none' to='/'>
            Go Back
          </NavLink>
        </Col>
      </Row>

      {/* Page title */}
      <h1>{brand?.brand}</h1>

      <Row>
        <Container>
          <Row className="justify-content-center">
            {phones?.map(phone =>
              <PhoneCard key={phone?._id} phone={phone} />
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

export default OneBrandPage;