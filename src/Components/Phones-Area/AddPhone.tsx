import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { PhoneModel } from "../../Models/phone-model";
import phonesServices from "../../Services/PhonesServices";
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";

interface AddPhoneProps {
  phone?: PhoneModel,
  onBack: Function
};

const AddPhone = (props: AddPhoneProps) => {
  const store = useSelector((state: RootState) => state.store);

  const initialValues = {
    name: props.phone?.name || '',
    description: props.phone?.description || '',
    brand_id: props.phone?.brand_id || '',
    price: props.phone?.price || 0,
    rating: props.phone?.rating || 0,
    picture: props.phone?.picture || '',
    on_top: props.phone?.on_top || false,
  };

  const submit = async (values: PhoneModel) => {
    const phone = new PhoneModel({...values});
    let msg: string = '';
    try {
      if (props.phone) {
        phone._id = props.phone._id;
        await phonesServices.updatePhone(phone);
        msg = `Phone '${phone.name}' Updated Successfully`;
      } else {
        await phonesServices.addNewPhone(phone);
        msg = `Phone '${phone.name}' Added Successfully`;
      }
      message.success(msg);
      props.onBack();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify={'start'} align={'middle'}>
        <Col>
          <Button type="link" onClick={() => props.onBack()}>Go Back</Button>
        </Col>
      </Row>

      <Form onFinish={submit} initialValues={initialValues}>
        <Form.Item
          label="Phone Name"
          name={'name'}
          rules={[
            { required: true, message: "Phone name is missing" },
            { min: 3, message: "Phone name must be minimum 3 chars" },
            { max: 50, message: "Phone name can't exceed 50 chars" },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Phone Description"
          name={'description'}
          rules={[
            { required: true, message: "Phone description is missing" },
            { min: 50, message: "Phone description must be minimum 50 chars" },
            { max: 250, message: "Phone description can't exceed 250 chars" },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Brand"
          name={'brand_id'}
          rules={[{ required: true, message: 'Please select brand' }]}
        >
          <Select>
            <Select.Option key={''} disabled>Select Brand...</Select.Option>
            {store.brands.map((brand) => (
              <Select.Option key={brand._id}>{brand.brand}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name={'price'}
          rules={[
            { required: true, message: 'Please enter price' },
            {validator: (_, val) => {
              return new Promise((resolve, reject) => {
                if (val < 1) {
                  reject('Price can`t be lass then 1$');
                }
                if (val > 8000) {
                  reject('Price can`t be more then 8000$');
                }
                resolve(true);
              });
            }}
          ]}
        >
          <InputNumber min={0} suffix={'$'} />
        </Form.Item>

        <Form.Item
          label="Rating"
          name={'rating'}
          rules={[{ required: true, message: 'Please enter rate' }]}
        >
          <Select>
            <Select.Option key={''} disabled>Select Rate...</Select.Option>
            <Select.Option key={1} >1</Select.Option>
            <Select.Option key={2} >2</Select.Option>
            <Select.Option key={3} >3</Select.Option>
            <Select.Option key={4} >4</Select.Option>
            <Select.Option key={5} >5</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Picture"
          name={'picture'}
          rules={[
            { required: true, message: "Phone picture is missing" },
            {
              pattern: /\.(jpg|jpeg|png|gif)$/,
              message: 'Invalid image URL format (must end with .jpg, .jpeg, .png, or .gif)',
            }
          ]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="On Top" name={'on_top'} valuePropName="checked">
          <Checkbox />
        </Form.Item>

        <Button htmlType="submit">Done</Button>
      </Form>
    </Space>
  );
};

export default AddPhone;