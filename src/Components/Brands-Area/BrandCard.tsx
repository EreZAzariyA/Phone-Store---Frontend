import { Button, Card } from "react-bootstrap";
import { BrandModel } from "../../Models/brand-model";
import { toUpperCase } from "../../Utils/helpers";
import { NavLink } from "react-router-dom";
import { FcNext } from "react-icons/fc";


interface BrandCardProps {
  brand: BrandModel;
}

const BrandCard = (props: BrandCardProps) => {
  return (
    <Card
      key={props.brand._id}
      style={{ width: '15rem' }}
      className="m-1 p-1 w-auto text-decoration-none mb-3"
    >
      <Card.Img variant="top" height={'150'} src={props.brand.img} />
      <Card.Title>{toUpperCase(props.brand.brand)}</Card.Title>

      <NavLink to={`/brands/${props.brand._id}`}>
        <Button variant="light">
          Shop <FcNext />
        </Button>
      </NavLink>
    </Card>
  );
};

export default BrandCard;