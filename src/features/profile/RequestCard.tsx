import React from 'react';
import {
  Button, Card, Col, Row, Typography,
} from 'antd';

function RequestCard(): JSX.Element {
  return (
    <Card className="mb-3">
      <Row>
        <Col flex="auto">
          <Typography.Title level={4}>
            Bidder
            {' '}
            {'>'}
            {' '}
            Seller
          </Typography.Title>
          <Typography.Text>Status: </Typography.Text>
          <Typography.Text type="warning">Pending</Typography.Text>
        </Col>

        <Col>
          <Button
            type="ghost"
            danger
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default RequestCard;
