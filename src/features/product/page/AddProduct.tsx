import React, { useRef, useState } from 'react';
import {
  Row,
  Card,
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
} from 'antd';
import EditorJs from 'react-editor-js';
import { toolsType } from '../../../types/editorjs/toolsType';
import { Type } from '../../../types/productType';
import { getCurrentUserFromLocalStorage } from '../../../helpers/auth';

const { Title } = Typography;

function AddProduct(): JSX.Element {
  const { Option } = Select;
  const optionType = Type;
  const ownerUUID = getCurrentUserFromLocalStorage().uuid;
  const [desc, setDesc] = useState();
  const instanceRef: any = useRef(null);
  const handleChange = async () => {
    const savedData = await instanceRef.current.save();
    setDesc(savedData);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const description = {
      version: Date.now(),
      data: desc,
    };
    const product = {
      ...e,
      description,
      ownerUUID,
    };
    console.log(product);
  };
  return (
    <Row justify="center" className="py-5">
      <Card className="mw-50">
        <Title level={2}>Add a product</Title>
        <Form
          layout="vertical"
          name="signup-form"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Images"
            name="images"

          >
            images
          </Form.Item>
          <Form.Item
            label="Product's name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input this feild',
              },
            ]}
          >
            <Input placeholder="Product's name" autoComplete="on" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input this feild',
              },
            ]}
          >
            <Select>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Initial price"
            name="initialPrice"
            rules={[
              {
                required: true,
                message: 'Please input this feild',
              },
            ]}
          >
            <InputNumber
              defaultValue={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            label="Bid step"
            name="bidStep"
            rules={[
              {
                required: true,
                message: 'Please input this feild',
              },
            ]}
          >
            <InputNumber
              defaultValue={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: 'Please input this feild',
              },
            ]}
          >
            <Select
              placeholder="Choose category"
            >
              {Object.values(optionType).map((type) => (
                <Option
                  key={type}
                  value={type}
                >
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Close date"
            name="closeDate"
            rules={[
              {
                required: true,
                message: 'Please input this feild',
              },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="Banned bidder"
            name="bannedBidder"
          >
            <Select mode="tags" placeholder="Banned bidder" />
          </Form.Item>
          <Form.Item
            label="Indexing"
            name="indexing"
            rules={[
              {
                required: true,
                message: 'Please input this feild',
              },
            ]}
          >
            <Input placeholder="Indexing" autoComplete="on" />
          </Form.Item>
          <Form.Item
            label="Description"
          >
            <EditorJs
              placeholder="Let's write a description for product!"
              tools={toolsType}
              onChange={handleChange}
              instanceRef={(instance) => { instanceRef.current = instance; }}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" block type="primary">Add product</Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

export default AddProduct;
