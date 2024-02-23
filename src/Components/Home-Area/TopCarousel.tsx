import { Button, Carousel, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import img from "../../Assets/iPhone-14.jpg";
import moreImg from "../../Assets/Galaxy-S22-Ultra.jpg";

const TopCarousel = () => (
  <Carousel variant="light">
    <Carousel.Item>
      <Image height='300' src={img} alt='' className='w-100' />
      <Carousel.Caption style={{ position: 'absolute', top: '50%', right: 'auto' }}>
        <p>iPhone-14</p>
        <NavLink to='/'>
          <Button variant="light">
            Buy Now
          </Button>
        </NavLink>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <Image height='300' src={moreImg} alt='' className='w-100' />
    </Carousel.Item>
  </Carousel>
)

export default TopCarousel;