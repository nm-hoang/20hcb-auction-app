import React, { useEffect } from 'react';
import { Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CarouselComponent from '../../../components/layout/Carousel';
import { getTopFiveProducts, selectProduct } from '../productSlice';
import ListProducts from '../../../components/product/ListProducts';

function Homepage() {
  const dispatch = useDispatch();
  const productState = useSelector(selectProduct);

  useEffect(() => {
    dispatch(getTopFiveProducts());
  }, []);

  return (
    <>
      <CarouselComponent />
      <Row justify="center" className="my-5">
        <Col xxl={16} xl={20} lg={22} md={20} sm={18} xs={22}>
          <Row justify="start" className="mb-3">
            <Col>
              <Typography.Title>Top products</Typography.Title>
            </Col>
          </Row>

          <ListProducts
            title="Close soon"
            products={productState.listNextClose}
          />

          <ListProducts
            className="mt-5"
            title="Highest bid turns"
            products={productState.listHighestBidTurns}
          />

          <ListProducts
            className="mt-5"
            title="Highest price"
            products={productState.listHighestPrice}
          />
        </Col>
      </Row>
    </>
  );
}

export default Homepage;
