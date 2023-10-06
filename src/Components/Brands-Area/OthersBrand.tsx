import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { Card, Button } from "react-bootstrap";
import { FcNext } from "react-icons/fc";

interface OthersBrandsProps {
  brand_id: string;
};

const OthersBrands = (props: OthersBrandsProps) => {
  const brands = useSelector((state: RootState) => state.store.brands);
  const othersBrands = [...brands || []].filter((brand) => brand._id !== props.brand_id);

  return (
    <>
      {othersBrands.map(brand =>
        <Card
          key={brand._id}
          style={{ width: '15rem' }}
          className="m-1 p-1 w-auto text-decoration-none mb-3"
          as={NavLink}
          to={`/brands/${brand._id}`}
        >
          <Card.Img variant="top" height='150px' src={brand.img} alt={brand.brand + ' ImageURL'} />

          <Card.Body>
            <Button variant="light">
              Shop <FcNext />
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default OthersBrands;