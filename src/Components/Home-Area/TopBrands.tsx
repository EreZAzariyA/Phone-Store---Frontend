import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import store from "../../Redux/Store";
import storeServices from "../../Services/StoreServices";
import { BrandModel } from "../../Models/brand-model";
import { Button, Card, Container, Row } from "react-bootstrap";
import undefineImage from "../../Assets/undefine-card-img.jpg";

const TopBrands = () => {
  const [topBrands, setTopBrands] = useState<BrandModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getTopBrands = async () => {
      const topBrands = await storeServices.getTopBrands();
      setTopBrands(topBrands);
      setIsLoading(false);
    };

    getTopBrands();
  }, []);

  const getBrandById = (_id: string) => {
    const brands = store.getState().store.brands.find(brand => brand._id === _id);
    return brands;
  };

  return (
    <Container className='w-auto'>
      <h1>Top 3 Brands</h1>

      <Row className="flex-nowrap overflow-auto m-auto">
        {!isLoading && topBrands.map((brand) =>
          <Card
            key={brand._id}
            as={NavLink}
            to={`/brands/${brand._id}`}
            style={{ width: '15rem' }}
            className="m-1 p-1 w-auto text-decoration-none mb-3"
          >
            <Card.Img variant="top" height='200' src={getBrandById(brand._id)?.img} />
            <Card.Title style={{ color: "black" }}>
              {brand.brand}
            </Card.Title>

            <Button size='sm' variant="dark" className="w-auto m-auto mt-1 mb-1">
              Go see
            </Button>
          </Card>
        )}
        {isLoading && <UndefineTopBrands />}
      </Row>
      <hr className='m-auto mt-2 mb-2' />
    </Container>
  );
};

export default TopBrands;

const UndefineTopBrands = () => (
  <>
    <Card
      style={{ width: '15rem' }}
      className="m-1 p-1 text-decoration-none mb-3"
    >
      <Card.Img variant="top" height='150' src={undefineImage} />
      <Card.Body>
        <p className="w-50 placeholder placeholder-wave placeholder-xs" />
        <br />
        <p className="w-75 placeholder placeholder-wave placeholder-xs" />
        <br />
        <Button disabled>

        </Button>
      </Card.Body>
    </Card>

    <Card
      style={{ width: '15rem' }}
      className="m-1 p-1 text-decoration-none mb-3"
    >
      <Card.Img variant="top" height='150' src={undefineImage} />
      <Card.Body>
        <p className="w-50 placeholder placeholder-wave placeholder-xs" />
        <br />
        <p className="w-75 placeholder placeholder-wave placeholder-xs" />
        <br />
        <Button disabled>

        </Button>
      </Card.Body>
    </Card>

    <Card
      style={{ width: '15rem' }}
      className="m-1 p-1 text-decoration-none mb-3"
    >
      <Card.Img variant="top" height='150' src={undefineImage} />
      <Card.Body>
        <p className="w-50 placeholder placeholder-wave placeholder-xs" />
        <br />
        <p className="w-75 placeholder placeholder-wave placeholder-xs" />
        <br />
        <Button disabled>

        </Button>
      </Card.Body>
    </Card>
  </>
);
