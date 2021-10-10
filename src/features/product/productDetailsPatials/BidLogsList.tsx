import React, { useEffect } from 'react';
import {
  Col, Row, Tabs,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BidLogCard from './BidLogCard';
import { BidLogType } from '../../../types/bidLogType';
import { getProductBidLogs, selectProduct } from '../productSlice';

export interface IBidLogsProps {
  productId: string
}

function BidLogsList(props: IBidLogsProps): JSX.Element {
  const { productId } = props;
  const dispatch = useDispatch();

  const logs = useSelector(selectProduct).bidLogs;

  useEffect(() => {
    dispatch(getProductBidLogs({ productId }));
  }, []);

  return (
    <Tabs>
      <Tabs.TabPane tab="Bid History">
        <Row
          className="mb-4"
          justify="space-between"
        >

          <Col span={24} className="max-h-300">
            {logs?.map((log: BidLogType) => (
              <BidLogCard
                key={log._id}
                bidLog={log}
              />
            ))}
          </Col>
        </Row>
      </Tabs.TabPane>
    </Tabs>
  );
}

export default BidLogsList;
