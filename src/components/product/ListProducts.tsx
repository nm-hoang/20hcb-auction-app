import React from 'react';
import { Col, Row, Typography } from 'antd';
import { Product } from '../../types/productType';
import ProductCard from './ProductCard';
import { ProductConditions } from '../../api/productApi';

export interface IListProductProps {
  title?: string
  className?: string
  products?: Product[]
  productCondition?: ProductConditions
}

function ListProducts(props: IListProductProps): JSX.Element {
  const {
    title, className, products,
  } = props;

  return (
    <div className={className}>
      {title ? (
        <Row justify="start" className="mb-3">
          <Col>
            <Typography.Title level={3}>{title}</Typography.Title>
          </Col>
        </Row>
      ) : <></>}

      <Row gutter={[32, 48]} justify="start" className="mb-3">
        {products?.map((product) => (
          <Col key={product._id} className="gutter-row" xxl={6} xl={6} lg={8} md={12} sm={24} xs={20}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ListProducts;
