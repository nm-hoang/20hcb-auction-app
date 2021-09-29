import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CarouselComponent from '../../../components/layout/Carousel';
import ListProducts from '../../../components/product/ListProducts';
import { getProducts, selectProduct } from '../../homepage/productSlice';

function MarketplacePage(): JSX.Element {
  const dispatch = useDispatch();
  const productState = useSelector(selectProduct);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <CarouselComponent />
      <Row justify="center" className="my-5">
        <Col xxl={16} xl={20} lg={22} md={20} sm={18} xs={22}>
          <Row justify="start" className="mb-3 my-5">
            <Col>
              {/* TODO: create filter component */}
              This is the filter
            </Col>
          </Row>

          <ListProducts
            className="mt-5"
            products={productState.list}
          />
        </Col>
      </Row>
    </>
  );
}

export default MarketplacePage;
