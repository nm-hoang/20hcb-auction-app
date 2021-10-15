import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Row, Form, Typography, Input, Button,
} from 'antd';
import {
  recoveryPassword,
  selectRecoveryPasswordMessage,
} from '../authSlice';
import MessageStatus from '../../../constants/message-status';
import Notify from '../../../helpers/notify';
import { Account } from '../../../types/accountType';

function RecoveryPassword(): JSX.Element {
  const dispatch = useDispatch();
  const msg_RecoveryPassword = useSelector(selectRecoveryPasswordMessage);
  useEffect(() => {
    if (msg_RecoveryPassword === MessageStatus.SUCCESS) {
      Notify.success(MessageStatus.SUCCESS, 'A password reset message was sent to your email');
    }
  }, [msg_RecoveryPassword]);
  const handleSubmit = (e: Account) => {
    dispatch(recoveryPassword(e.email));
  };
  return (
    <Row className="py-5 px-3" justify="center">
      <Card className="shadow-md">
        <Typography.Title className="me-5" level={2}>Recovery password</Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
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
                required: true,
                message: 'Please enter your email',
              },
            ]}
          >
            <Input maxLength={200} placeholder="Email" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={msg_RecoveryPassword === MessageStatus.PENDING}
              block
              type="primary"
              htmlType="submit"
            >
              Recovery
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

export default RecoveryPassword;
