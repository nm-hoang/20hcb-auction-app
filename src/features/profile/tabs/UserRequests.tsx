import React from 'react';
import { Col, Row } from 'antd';
import RequestCard from '../RequestCard';

function UserRequests(): JSX.Element {
  return (
    <>
      <Row
        justify="center"
        className="my-5"
      >
        <Col span={14}>
          <RequestCard />
          <RequestCard />
          <RequestCard />
        </Col>
      </Row>
    </>
  );
}

export default UserRequests;
