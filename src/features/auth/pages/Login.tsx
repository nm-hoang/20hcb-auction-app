import React, { useEffect } from 'react';
import {
  Row,
  Space,
  Typography,
  Form,
  Button,
  Input,
} from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectLogInMessage } from '../authSlice';
import MessageStatus from '../../../constants/message-status';
import { checkAuth } from '../../../helpers/auth';

const { Text, Title } = Typography;

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const msg_LogIn = useSelector(selectLogInMessage);
  const [form] = Form.useForm();
  const handleSubmit = (e: object) => {
    dispatch(login(e));
  };

  useEffect(() => {
    if (checkAuth()) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    console.log(msg_LogIn);
    if (msg_LogIn === MessageStatus.SUCCESS) {
      history.push('/');
    }
  }, [msg_LogIn]);

  return (
    <Row className="d-flex px-3 my-5" justify="center">
      <Space direction="vertical" size={25}>
        <Text type="secondary">
          <Title level={2} style={{ marginBottom: 0 }}>Auction-App Account Login</Title>
          Welcome back! Login with your Email
        </Text>
        <Form
          layout="vertical"
          name="signup-form"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
            ]}
          >
            <Input placeholder="Email" autoComplete="on" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password placeholder="Password" autoComplete="on" />
          </Form.Item>
          <Form.Item>
            <Row className="d-flex" style={{ columnGap: '.25rem', rowGap: '.5rem' }}>
              <Button type="primary" htmlType="submit" block>Login</Button>
              <Space direction="vertical" size={0}>
                <Link to="/recoverypassword">
                  <Text className="txt-primary">Forgot your password</Text>
                </Link>
                <Link to="/signup">
                  <Text className="txt-primary">Register now</Text>
                </Link>
              </Space>
            </Row>
          </Form.Item>
        </Form>
      </Space>
    </Row>
  );
}

export default Login;
