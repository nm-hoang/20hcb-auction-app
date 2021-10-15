import React from 'react';
import {
  Result,
  Card,
  Row,
  Button,
} from 'antd';
import { Link } from 'react-router-dom';

function CheckMail() {
  return (
    <Row className="py-5 px-3" justify="center">
      <Card className="shadow-md">
        <Result
          title=" Thank you! An email has been sent to your email address."
          subTitle="Please check your inbox to verify your email address and follow the instructions."
          extra={(
            <Link to="/login">
              <Button size="large" type="primary" key="console">
                Login
              </Button>
            </Link>
          )}
        />
      </Card>
    </Row>
  );
}

export default CheckMail;
