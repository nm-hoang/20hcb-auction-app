import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Avatar,
  Menu,
  Dropdown,
  Button,
} from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Element from './Element';
import logo from '../../../assets/img/logo/logo-sm.svg';

const { Text } = Typography;

function Header() {
  const isLoggedIn = false;
  const location = useLocation();
  const history = useHistory();

  const handleMenu = (e: any) => {
    switch (e.key) {
      case 'profile':
        history.push('/profile');
        break;
      case 'logout':
        history.push('/');
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenu}>
      <Menu.Item key="profile">
        Profile
      </Menu.Item>
      <Menu.Item key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );
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
    <Row className="d-flex px-4 py-3" justify="space-between" style={{ rowGap: '15px', columnGap: '6rem' }}>
      <Col>
        <Link to="/">
          <img src={logo} alt="Auction app" />
        </Link>
      </Col>
      <Col>
        <Row style={{ columnGap: '1rem' }}>
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
        <Row style={{ columnGap: '10px' }}>
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
          {!isLoggedIn
            ? (
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Typography.Link className="ant-dropdown-link">
                  <Avatar style={{ color: '#8c8c8c', backgroundColor: '#E6F7FF' }}>U</Avatar>
                  <Text className="ms-2">Username</Text>
                </Typography.Link>
              </Dropdown>
            )
            : ''}
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
