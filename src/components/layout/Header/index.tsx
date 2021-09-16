import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Avatar,
  Menu,
  Dropdown,
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { TrademarkCircleOutlined } from '@ant-design/icons';
import Element from './Element';
import './header.scss';

const { Text } = Typography;
const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/login">
        Đăng nhập
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/signup">
        Đăng ký
      </Link>
    </Menu.Item>
  </Menu>
);

function Header() {
  const location = useLocation();
  const [selected, setSelected] = useState({
    homepage: false,
    marketplace: false,
  });
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setSelected({ homepage: true, marketplace: false });
        break;
      case '/login':
        setSelected({ homepage: false, marketplace: true });
        break;
      default:
        setSelected({ homepage: false, marketplace: false });
        break;
    }
  }, [location]);
  return (
    <Row className="d-flex px-4 py-3" justify="space-between" style={{ rowGap: '15px' }}>
      <Col>
        <Link to="/">
          <div className="logo-header">
            <TrademarkCircleOutlined className="me-2" />
            <Text className="txt-primary">Auction App</Text>
          </div>
        </Link>
      </Col>
      <Col xs={24} sm={8}>
        <Row style={{ columnGap: '1rem' }} className="d-flex" justify="center">
          <Link to="/">
            <Col>
              <Element text="Home" isSelected={selected.homepage} />
            </Col>
          </Link>
          <Link to="/">
            <Col>
              <Element text="Marketplace" isSelected={selected.marketplace} />
            </Col>
          </Link>
        </Row>
      </Col>
      <Col>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <Typography.Link className="ant-dropdown-link">
            <Avatar style={{ color: '#8c8c8c', backgroundColor: '#E6F7FF' }}>U</Avatar>
            <Text className="ms-2">Username</Text>
          </Typography.Link>
        </Dropdown>
      </Col>
    </Row>
  );
}

export default Header;
