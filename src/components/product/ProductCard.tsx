import React from 'react';
import {
  Avatar, Button,
  Card, Col, Divider, Image, Row, Tag, Typography,
} from 'antd';
import { ClockCircleTwoTone, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toCurrencyFormat } from '../../helpers/toCurrencyFormat';
import { Product } from '../../types/productType';
import useCountdown from '../../hooks/useCountdown';
import { addProductToWatchlist } from '../../features/product/productSlice';

const { Text, Title } = Typography;

export interface IProductCardProp {
  product: Product
  isWatching?: boolean
}

function ProductCard(prop: IProductCardProp): JSX.Element {
  const dispatch = useDispatch();

  const { product, isWatching } = prop;
  const history = useHistory();
  const [hours, minutes, seconds] = useCountdown(product.closeDate);

  const onSelect = () => {
    history.push(`/products/${product._id}`);
  };

  const onAddToFavorite = (productId: string) => {
    dispatch(addProductToWatchlist({ productId }));
  };

  return (
    <>
      <Card
        className="p-1 hoverable border--highlight"
        size="small"
        bordered={false}
      >
        {/* TODO: constraint square */}
        <Image
          width="100%"
          onClick={onSelect}
          className="rounded-4"
          preview={false}
          src={product.images[0].secureUrl}
        />
        <Row justify="space-between" align="middle" className="my-2">
          <Col className="truncate truncate--100">
            <Text className="mb-0" onClick={onSelect}>{product.name}</Text>
          </Col>
          <Col>
            <Tag>{product.category.name}</Tag>
          </Col>
        </Row>

        <Row justify="space-between" align="middle" className="mb-2 fs-caption">
          <Col>
            <Text type="secondary">Current Bid</Text>
          </Col>
          <Col className="truncate truncate--200">
            <Title level={5}>
              {toCurrencyFormat(product.price.currentBid)}
            </Title>
          </Col>
        </Row>

        <Row justify="space-between" align="middle" className="mb-2 fs-caption">
          <Col>
            <Text type="secondary">Owner</Text>
          </Col>
          <Col className="d-flex ant-row-middle">
            <Avatar size="small" src={product.ownerBrief.profilePicture.secureUrl} />
            <Text className="ms-2 fs-caption">
              {product.ownerBrief.fullName}
              {' '}
              (
              {product.ownerBrief.rating}
              )
            </Text>
          </Col>
        </Row>

        <Row justify="space-between" align="middle" className="mb-2 fs-caption">
          <Col>
            <Text type="secondary">#1 Bidder</Text>
          </Col>
          <Col className="d-flex ant-row-middle">
            {product.highestBidderBrief
              ? (
                <>
                  <Avatar
                    size="small"
                    src={product.highestBidderBrief?.profilePicture.secureUrl}
                  />
                  <Text className="ms-2">
                    {product.highestBidderBrief?.fullName}
                    {' '}
                    (
                    {product.highestBidderBrief?.rating}
                    )
                  </Text>
                </>
              ) : (
                <>
                  <Avatar size="small">NA</Avatar>
                  <Text className="ms-2">No record</Text>
                </>
              )}
          </Col>
        </Row>

        <Divider orientation="center" className="mb-2 mt-3" />

        <Row justify="space-between" align="middle" className="mb-2 fs-caption">
          <Col>
            <Text type="secondary">{new Date(product.createdAt).toLocaleString()}</Text>
          </Col>
          <Col>
            <Button
              type="default"
              shape="circle"
              className="ant-input-borderless"
              icon={isWatching ? <HeartFilled /> : <HeartOutlined />}
              onClick={() => onAddToFavorite(product._id)}
            />
          </Col>
        </Row>

        <Divider orientation="center" className="mt-2 mb-3" />

        <Row justify="center" align="middle" className="mb-2 fs-caption">
          <Col>
            <ClockCircleTwoTone
              twoToneColor={hours + minutes + seconds === 0 ? '#8c8c8c' : '#52c41a'}
            />
            <Text type="secondary" className="mx-2">
              End in:
              {' '}
              {`${hours}:${minutes}:${seconds}`}
            </Text>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default ProductCard;
