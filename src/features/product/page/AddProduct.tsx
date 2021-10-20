import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Space,
  Row,
  Card,
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Rate,
  Upload,
  Spin,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import EditorJs from 'react-editor-js';
import { toolsType } from '../../../types/editorjs/toolsType';
import { Type, Category } from '../../../types/productType';
import { getCurrentUserFromLocalStorage } from '../../../helpers/auth';
import {
  getCategories,
  selectListCategories,
} from '../../category/categorySlice';
import {
  uploadFile,
  selectCloudinaryRequesting,
  selectListImages,
} from '../../cloudinary/cloudinarySlice';
import { createProduct, selectRequesting } from '../productSlice';

const { Title } = Typography;

function AddProduct(): JSX.Element {
  const dispatch = useDispatch();
  const requestingProduct = useSelector(selectRequesting);
  const requestingCloudinary = useSelector(selectCloudinaryRequesting);
  const categories = useSelector(selectListCategories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const listImages = useSelector(selectListImages);
  const { Option } = Select;
  const optionType = Type;
  const ownerUUID = getCurrentUserFromLocalStorage().uuid;
  const [desc, setDesc] = useState();
  const instanceRef: any = useRef(null);
  const handleChangeEditor = async () => {
    const savedData = await instanceRef.current.save();
    setDesc(savedData);
  };
  const handleSubmit = (e: any) => {
    const product: any = {
      ownerUUID,
      name: e.name,
      type: e.type,
      category: e.category,
      price: {
        initialPrice: e.initialPrice,
        bidStep: e.bidStep,
      },
      closeDate: Date.parse(e.closeDate),
      rating: e.rating,
      bannedBidder: e.bannedBidder,
      description: {
        version: Date.now().toString(),
        data: desc!,
      },
      images: listImages,
    };
    // console.log(product);
    dispatch(createProduct(product));
  };

  const [files, setFiles] = useState<any>([]);
  const propsUploadFile = {
    onRemove: (file: any) => {
      const index = files.indexOf(file);
      const newFileList = files.slice();
      newFileList.splice(index, 1);
      setFiles(newFileList);
    },
    beforeUpload: (file: any) => {
      setFiles((prevState: any) => [...prevState, file]);
      const formData = new FormData();
      formData.append('image', file, files.name);
      dispatch(uploadFile(formData));
      return false;
    },
    fileList: files,
  };

  return (
    <Row justify="center" className="py-5">
      <Card className="mw-50 shadow-md">
        <Title level={2}>Add a product</Title>
        <Form
          layout="vertical"
          name="signup-form"
          onFinish={handleSubmit}
        >
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
            label="Rating"
            name="rating"
          >
            <Rate defaultValue={0} />
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
              {categories && categories.map((category: Category) => (
                <Option
                  key={category.key}
                  value={category.key}
                >
                  {category.name}
                </Option>
              ))}
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
              placeholder="Choose type"
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
            label="Images"
            name="images"
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Upload {...propsUploadFile}>
              <Button icon={<UploadOutlined />}>Select file</Button>
              {requestingCloudinary
                ? (
                  <Space className="ms-2">
                    <Spin />
                    Uploading
                  </Space>
                )
                : ''}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Description"
          >
            <EditorJs
              placeholder="Let's write a description for product!"
              tools={toolsType}
              onChange={handleChangeEditor}
              instanceRef={(instance) => { instanceRef.current = instance; }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              block
              type="primary"
              loading={requestingProduct === true}
              disabled={requestingCloudinary === true}
            >
              {requestingProduct ? 'Adding' : 'Add product'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

export default AddProduct;
