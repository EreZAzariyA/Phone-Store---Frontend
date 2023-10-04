import { BrandModel } from "../../Models/brand-model";
import notifyService from "../../Services/NotifyService";
import brandsServices from "../../Services/BrandsServices";
import { Button, Checkbox, Form, Input, message } from "antd";

interface AddBrandProps {
  brand?: BrandModel,
  onBack: Function
};

const AddBrand = (props: AddBrandProps) => {
  const initialValues = {
    _id: props.brand?._id || '',
    brand: props.brand?.brand || '',
    img: props.brand?.img || '',
    on_top: props.brand?.on_top || false,
  };

  const submit = async (values: BrandModel) => {
    const brand = new BrandModel({...values});
    let msg = '';
    try {
      if (props.brand) {
        brand._id = props.brand._id;
        await brandsServices.updateBrand(brand);
        msg = `Brand '${brand.brand}' Updated Successfully`;
      } else {
        await brandsServices.addNewBrand({_id: brand._id, ...brand});
        msg =`Brand '${brand.brand}' Added Successfully`;
      }
      message.success(msg);
      props.onBack();
    } catch (err: any) {
      notifyService.error(err);
    }
  };

  return (
    <Form onFinish={submit} initialValues={initialValues}>
      <Button type="link" onClick={() => props.onBack()}>Go Back</Button>
      <Form.Item label="Brand Name" name={'brand'}>
        <Input type="text" required />
      </Form.Item>
      <Form.Item label="Brand Image" name={'img'}>
        <Input type="text" required />
      </Form.Item>
      <Form.Item label="On Top" name={'on_top'} valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <Button htmlType="submit">Done</Button>
    </Form>
  );
};

export default AddBrand;