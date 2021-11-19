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
import { useDispatch } from 'react-redux';
import Element from './Element';
import logo from '../../../assets/img/logo/logo-sm.svg';
import {
  checkAuth,
  clearAccessTokenFromLocalStorage,
  clearRoleFromLocalStorage, LOCAL_STORAGE_CURRENT_USER,
} from '../../../helpers/auth';
import { setLogInMsgToDefault } from '../../../features/auth/authSlice';
import { CurrentUser } from '../../../types/accountType';

const { Text } = Typography;

function Header() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser: CurrentUser = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_CURRENT_USER) as string,
  );

  const handleMenu = (e: any) => {
    switch (e.key) {
      case 'profile':
        history.push('/profile');
        break;
      case 'logout':
        dispatch(setLogInMsgToDefault());
        clearAccessTokenFromLocalStorage();
        clearRoleFromLocalStorage();
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
      case '/marketplace':
        setSelected({ homepage: false, marketplace: true });
        break;
      default:
        setSelected({ homepage: false, marketplace: false });
        break;
    }
  }, [location]);
  return (
    <Row className="d-flex px-4 py-3 bg-white" justify="space-between" style={{ rowGap: '15px', columnGap: '6rem' }}>
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
          <Link to="/marketplace">
            <Col>
              <Element text="Marketplace" isSelected={selected.marketplace} />
            </Col>
          </Link>
        </Row>
      </Col>
      <Col>
        <Row style={{ columnGap: '10px' }}>
          {!checkAuth()
            ? (
              <>
                <Link to="/login">
                  <Button type="primary">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Register</Button>
                </Link>
              </>
            )
            : (
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Typography.Link className="ant-dropdown-link">
                  <Avatar
                    style={{ color: '#8c8c8c', backgroundColor: '#E6F7FF' }}
                    src={currentUser.profilePicture.secureUrl}
                  />
                  <Text className="ms-2">{currentUser.fullName}</Text>
                </Typography.Link>
              </Dropdown>
            )}
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
