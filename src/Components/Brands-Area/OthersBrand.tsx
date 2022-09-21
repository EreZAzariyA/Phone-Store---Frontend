import { useState, useCallback, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BrandModel } from "../../Models/brand-model";
import brandsServices from "../../Services/BrandsServices";
import { FcNext } from "react-icons/fc";

interface OthersBrandsProps {
      brand_id: string;
}

const OthersBrands = (props: OthersBrandsProps) => {
      const [othersBrands, setOthersBrands] = useState<BrandModel[]>();

      const getOthersBrands = useCallback(async () => {
            const allBrands = await brandsServices.getAllBrands();
            const othersBrands = allBrands.filter(brand => brand._id !== props.brand_id);
            setOthersBrands(othersBrands);
      }, [props.brand_id]);

      useEffect(() => {
            getOthersBrands();
      }, [getOthersBrands]);

      return (
            <>
                  {othersBrands?.map(brand =>
                        <Card key={brand?._id} style={{ width: '12rem' }} className='m-1' as={NavLink} to={`/brands/${brand?._id}`}>

                              <Card.Img variant="top" height='150px' src={brand?.img} alt={brand?.brand + ' ImageURL'} />

                              <Card.Body>
                                    <Button variant="light">
                                          Shop <FcNext />
                                    </Button>
                              </Card.Body>
                        </Card>

                  )}
            </>
      )
}

export default OthersBrands;