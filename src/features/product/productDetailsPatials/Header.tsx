import React from 'react';
import {
  Button, Col, Row, Tag, Typography,
} from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Title } = Typography;

export interface IProductHeaderProps {
  name: string
  categoryName: string
}

function Header(props: IProductHeaderProps): JSX.Element {
  const { name, categoryName } = props;

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
          icon={<HeartOutlined />}
        />
      </Col>
    </Row>
  );
}

export default Header;
