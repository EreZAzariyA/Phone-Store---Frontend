import { NavLink } from "react-router-dom";
import { PhoneModel } from "../../Models/phone-model"
import { Button, Card, Carousel, Image, Row } from "react-bootstrap";
import undefineImage from "../../Assets/undefine-card-img.jpg";

interface PhoneCardProps {
  phone: PhoneModel;
};

const PhoneCard = (props: PhoneCardProps) => {
  return (
    <Card
      style={{ width: '15rem' }}
      className="m-1 p-1 w-auto text-decoration-none mb-3"
    >
      {!props.phone?.picture ? (
        <Image src={undefineImage} height='200' alt={"undefine image"} />
      ) : (
        <div style={{ width: '200px'}}>
          <Carousel variant="dark">
            <Carousel.Item className="mr-2">
              <Card.Img src={props.phone?.picture} height='200' alt={`${props.phone?.name + 'ImageURL'}`} />
            </Carousel.Item>
            <Carousel.Item className="mr-2">
              <Card.Img src={props.phone?.picture} height='200' alt={`${props.phone?.name + 'ImageURL'}`} />
            </Carousel.Item>
          </Carousel>
        </div>
      )}
      {/* <Card.Img src={props.phone.picture} alt={`${props.phone.name}-image`}/> */}

      <Card.Title>
        {props.phone?.name}
      </Card.Title>

      <Row className="m-auto">
        <NavLink to={`/phone/${props.phone._id}`}>
            <Button size="sm" variant="dark" className="mb-2">
              See Product
            </Button>
        </NavLink>
      </Row>

    </Card>
  );
};

export default PhoneCard;