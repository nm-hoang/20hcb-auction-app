import React from 'react';
import {
  Row,
  Space,
  Typography,
  Form,
  Button,
  Input,
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../authSlice';

const { Text, Title } = Typography;

function Signup() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSubmit = (e: object) => {
    dispatch(signup(e));
  };

  return (
    <Row className="d-flex px-3 my-5" justify="center">
      <Space direction="vertical" size={25}>
        <Text type="secondary">
          <Title level={2} style={{ marginBottom: 0 }}>Create Auction-app account</Title>
          Register with your email
          {process.env.REACT_APP_API_GATEWAY}
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
                type: 'email',
                message: 'Email invalid!',
              },
              {
                max: 50,
                message: 'Email must be maximum 50 characters',
              },
              {
                required: true,
                message: 'Please enter your email',
              },
            ]}
          >
            <Input placeholder="Email" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                max: 50,
                message: 'Email must be maximum 50 characters',
              },
              {
                min: 5,
                message: 'Email must be minimum 5 characters',
              },

            ]}
          >
            <Input placeholder="Username" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Full name"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Please enter your fullname',
              },
            ]}
          >
            <Input placeholder="Fullname" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please enter your address',
              },
            ]}
          >
            <Input placeholder="Email" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                min: 6,
                message: 'Username must be minimum 6 characters.',
              },
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
          >
            <Input.Password placeholder="Password" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please enter confirm password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Password does not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Row className="d-flex" style={{ columnGap: '.25rem', rowGap: '.5rem' }}>
              <Button type="primary" htmlType="submit" block>Create Account</Button>
              <Text type="secondary">Already have account?</Text>
              <Link to="/login">
                <Text className="txt-primary">Login</Text>
              </Link>
            </Row>
          </Form.Item>
        </Form>
      </Space>
    </Row>
  );
}

export default Signup;
