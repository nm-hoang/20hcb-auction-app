import React from 'react';
import {
  Result,
  Card,
  Row,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';

function SignUpSuccess() {
  return (
    <Row className="my-5 mx-4" justify="center">
      <Card className="shadow-md">
        <Result
          status="success"
          title="Congratulations, your account has been successful created."
          extra={[
            <Link to="/login">
              <Button size="large" type="primary" key="console">
                Login
              </Button>
            </Link>,
          ]}
        />
      </Card>
    </Row>
  );
}

export default SignUpSuccess;
