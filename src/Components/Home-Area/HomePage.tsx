import { Button, Card, Container, Row } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import TopThreeProducts from "./TopPhones";
import TopBrands from "./TopBrands";
import { FcNext } from "react-icons/fc";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import TopCarousel from "./TopCarousel";

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
              <Card
                key={brand._id}
                style={{ width: '15rem' }}
                className="m-1 p-1 w-auto text-decoration-none mb-3"
              >
                <Card.Img variant="top" height={'150'} src={brand.img} />

                <Card.Body>
                  <NavLink to={`/brands/${brand._id}`}>
                    <Button variant="light">
                      Shop <FcNext />
                    </Button>
                  </NavLink>
                </Card.Body>
              </Card>
            )}
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default HomePage;
