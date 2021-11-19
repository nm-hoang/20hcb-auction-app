import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Card, Col, Form, Input, Row,
} from 'antd';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../auth/authSlice';

function ChangePasswordPage(): JSX.Element {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false);

  useEffect(() => {
    if (oldPassword && newPassword && passwordConfirmation) {
      setIsSubmittable(true);
    } else {
      setIsSubmittable(false);
    }
  }, [oldPassword, newPassword, passwordConfirmation]);

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleChangePassword = () => {
    if (oldPassword && newPassword && passwordConfirmation) {
      dispatch(changePassword({ oldPassword, newPassword, passwordConfirmation }));
    }
  };

  const rules = (value: string) => [
    {
      required: true,
      message: `Please input your ${value}`,
    },
  ];

  return (
    <>
      <Row
        className="my-5"
        justify="center"
      >
        <Col span={10}>
          <Card
            title="Change password"
          >
            <Form
              layout="horizontal"
              labelCol={{ span: 12 }}
            >
              <Form.Item
                label="Old password"
                name="old-password"
                rules={rules('old password')}
              >
                <Input.Password
                  allowClear
                  onChange={handleOldPasswordChange}
                />
              </Form.Item>

              <Form.Item
                label="New password"
                name="new-password"
                rules={rules('new password')}
              >
                <Input.Password
                  allowClear
                  onChange={handleNewPasswordChange}
                />
              </Form.Item>

              <Form.Item
                label="Confirm new password"
                name="new-password-confirmation"
                rules={rules('new password confirmation')}
              >
                <Input.Password
                  allowClear
                  onChange={handlePasswordConfirmationChange}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{ offset: 12 }}
              >
                <Button
                  type="primary"
                  disabled={!isSubmittable}
                  onClick={handleChangePassword}
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ChangePasswordPage;
