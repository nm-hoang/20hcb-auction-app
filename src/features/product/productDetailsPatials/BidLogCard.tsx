import React from 'react';
import {
  Avatar, Col, Row, Space, Typography,
} from 'antd';
import { BidLogType } from '../../../types/bidLogType';
import { toCurrencyFormat } from '../../../helpers/toCurrencyFormat';

export interface IAvatarTextAndCaption {
  bidLog: BidLogType
}

function BidLogCard(props: IAvatarTextAndCaption): JSX.Element {
  const {
    bidLog,
  } = props;

  return (
    <Row
      gutter={[12, 12]}
      align="middle"
      justify="space-between"
      className="mt-3 mb-4"
    >
      <Col>
        <Avatar size="small" src={bidLog.bidderBrief.profilePicture.secureUrl} />
      </Col>
      <Col flex="auto">
        <Space direction="vertical" size={0}>
          <Space>
            <Typography.Text strong>
              {bidLog.bidderBrief.fullName}
            </Typography.Text>
            <Typography.Text>
              placed a bid
            </Typography.Text>
          </Space>
          <Typography.Text
            type="secondary"
            className="fs-caption"
          >
            {new Date(bidLog.createdAt).toLocaleString()}
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical" size={0}>
          <Typography.Title level={5}>
            {toCurrencyFormat(bidLog.price)}
          </Typography.Title>
        </Space>
      </Col>
    </Row>
  );
}

export default BidLogCard;
