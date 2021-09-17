import React from 'react';
import {
  Row, Col, Image, Typography, Space,
} from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import './footer.scss';

const { Text, Title } = Typography;

function Footer() {
  return (
    <Row className="d-flex footer p-5" style={{ columnGap: '40px', rowGap: '30px' }}>
      <Col md={6} lg={4}>
        <Space direction="vertical" size={10} style={{ width: '70%' }}>
          <Image
            width="120px"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Text type="secondary">Please contact us if you have any specific idea or request.</Text>
          <Text type="secondary">
            <MailOutlined />
            &nbsp; contact@auction.com
          </Text>
        </Space>
      </Col>
      <Col md={6} lg={4}>
        <Space direction="vertical" size={10}>
          <Title level={3}>About Us</Title>
          <Link to="/#">
            <Text type="secondary">About Online Auction</Text>
          </Link>
          <Link to="/#">
            <Text type="secondary">Community</Text>
          </Link>
          <Link to="/#">
            <Text type="secondary">Terms</Text>
          </Link>
        </Space>
      </Col>
      <Col md={6} lg={4}>
        <Space direction="vertical" size={10}>
          <Title level={3}>Support</Title>
          <Link to="/#">
            <Text type="secondary">FAQ</Text>
          </Link>
          <Link to="/#">
            <Text type="secondary">Help Center</Text>
          </Link>
          <Link to="/#">
            <Text type="secondary">Feedback</Text>
          </Link>
        </Space>
      </Col>
    </Row>
  );
}

export default Footer;
