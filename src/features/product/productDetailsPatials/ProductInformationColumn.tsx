import React from 'react';
import {
  Button, Card, Col, Divider, Row, Space, Typography,
} from 'antd';
import Header from './Header';
import AvatarWithText from '../../../components/common/AvatarWithText';
import Editor from '../../../components/common/Editor';
import { toCurrencyFormat } from '../../../helpers/toCurrencyFormat';
import BidLogsList from './BidLogsList';
import { Product } from '../../../types/productType';
import CountdownSection from './CountdownSection';

const { Text, Title } = Typography;

export interface IProductInformationColumn {
  product: Product
  onShowModal: Function
}

function ProductInformationColumn(props: IProductInformationColumn): JSX.Element {
  const { product, onShowModal } = props;

  const handleShowModal = () => onShowModal(true);

  return (
    <Col xxl={12} xl={12} lg={12} md={12} sm={22}>
      <Card
        className="rounded-12"
        bordered={false}
      >
        <Row>
          <Col span={24}>
            {!product
            || <Header name={product.name} categoryName={product.category.name} />}

            <Row
              gutter={[48, 12]}
              className="mb-4"
              justify="start"
              align="middle"
            >
              <Col>
                <AvatarWithText
                  title="Owner"
                  strong
                  src={product.ownerBrief.profilePicture.secureUrl}
                  text={product.ownerBrief.fullName}
                />
              </Col>

              {!product.highestBidderBrief || (
                <>
                  <Divider orientation="center" type="vertical" />

                  <Col>
                    <AvatarWithText
                      title="#1 Bidder"
                      src={product.highestBidderBrief?.profilePicture.secureUrl}
                      text={product.highestBidderBrief?.fullName}
                    />
                  </Col>
                </>
              )}
            </Row>

            <Row
              className="mb-4"
            >
              <Col span={24} className="max-h-200">
                {!product || (
                  <Editor
                    readOnly
                    data={JSON.parse(product.description[0].data)}
                  />

                )}
              </Col>
            </Row>

            <Row
              className="mb-4"
              justify="space-between"
            >
              <Col>
                <Space direction="vertical" size={6}>
                  <Text strong>Current Bid</Text>
                  {!product || (
                    <Title level={4}>
                      {toCurrencyFormat(product.price.currentBid)}
                    </Title>
                  )}
                </Space>
              </Col>

              <Col>
                <CountdownSection closeDate={product.closeDate} />
              </Col>
            </Row>

            <Row
              className="mb-4"
            >
              <Col span={12}>
                <Button
                  block
                  type="primary"
                  size="large"
                  onClick={handleShowModal}
                >
                  Place a Bid
                </Button>
              </Col>
            </Row>

            {!product || <BidLogsList productId={product._id} />}
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default ProductInformationColumn;
