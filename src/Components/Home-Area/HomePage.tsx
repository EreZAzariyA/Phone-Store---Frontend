import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import TopThreeProducts from "./TopPhones";
import TopBrands from "./TopBrands";
import TopCarousel from "./TopCarousel";
import { toUpperCase } from "../../Utils/helpers";
import { Button, Card, Container, Row } from "react-bootstrap";
import { FcNext } from "react-icons/fc";
import BrandCard from "../Brands-Area/BrandCard";

function HomePage(): JSX.Element {
  const store = useSelector((state: RootState) => state.store);

  return (
    <Container style={{ fontFamily: 'Crimson Pro, serif' }}>
      <Row style={{ backgroundColor: 'black', borderRadius: '0 0 10px 10px' }}>
        <TopCarousel />
      </Row>
      <Row className="pt-2 mb-2">
        <Container>
          <Row>
            <TopThreeProducts />
          </Row>
          <Row>
            <TopBrands />
          </Row>
        </Container>
      </Row>

      <Row>
        <Container>
          <h1>Our Brands</h1>
          <Row className="justify-content-center">
            {store.brands.map((brand) =>
              <BrandCard key={brand._id} brand={brand} />
            )}
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default HomePage;
