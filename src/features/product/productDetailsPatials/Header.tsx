import React from 'react';
import {
  Button, Col, Row, Tag, Typography,
} from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addProductToWatchlist } from '../productSlice';

const { Title } = Typography;

export interface IProductHeaderProps {
  productId: string
  name: string
  categoryName: string
  isWatching?: boolean
}

function Header(props: IProductHeaderProps): JSX.Element {
  const dispatch = useDispatch();
  const {
    productId, name, categoryName, isWatching,
  } = props;

  const handleAddProductToWatchlist = () => {
    dispatch(addProductToWatchlist({ productId }));
  };

  return (
    <Row
      gutter={[12, 12]}
      className="mb-4"
      justify="space-between"
      align="middle"
    >
      <Col>
        <Title level={3} className="m-0">{name}</Title>
      </Col>
      <Col flex="auto">
        <Tag>{categoryName}</Tag>
      </Col>
      <Col>
        <Button
          className="ant-input-borderless"
          shape="circle"
          icon={isWatching ? <HeartFilled /> : <HeartOutlined />}
          onClick={handleAddProductToWatchlist}
        />
      </Col>
    </Row>
  );
}

export default Header;
