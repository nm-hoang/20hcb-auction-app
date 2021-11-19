import React, { useEffect } from 'react';
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Skeleton,
  Button,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectGetMe,
  getMe,
  updateProfile,
  selectRequesting,
} from '../../auth/authSlice';

function EditProfilePage(): JSX.Element {
  const dispatch = useDispatch();
  const profile = useSelector(selectGetMe);
  const requesting = useSelector(selectRequesting);
  const [form] = Form.useForm();
  const handleSubmit = (e: any) => {
    dispatch(updateProfile(e));
  };
  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        username: profile!.username,
        email: profile!.email,
        fullName: profile!.user.fullName,
        address: profile!.user.address,
        phoneNumber: profile!.user.phoneNumber,
      });
    } else {
      dispatch(getMe());
    }
  }, [profile]);

  return (
    <>
      <Row
        justify="center"
        className="mb-5"
      >
        <Col sm={20} md={12}>
          <Card
            title="Edit profile"
          >
            {profile ? (
              <Form
                form={form}
                layout="horizontal"
                name="profileForm"
                labelCol={{ span: 6 }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Full name"
                  name="fullName"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone number"
                  name="phoneNumber"
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Row justify="center" gutter={10}>
                    <Col>
                      <Link to="/profile">
                        <Button
                          htmlType="button"
                        >
                          Cancel
                        </Button>
                      </Link>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={requesting === true}
                      >
                        Confirm
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            )
              : <Skeleton active />}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EditProfilePage;
