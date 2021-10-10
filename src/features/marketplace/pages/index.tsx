import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import CarouselComponent from '../../../components/layout/Carousel';
import ListProducts from '../../../components/product/ListProducts';
import { getProductCount, getProducts, selectProduct } from '../../product/productSlice';
import ProductFilter from '../../product/ProductFilter';
import { ConditionQueryType, SortQueryType } from '../../../types/productType';
import PaginationComponent from '../../../components/common/PaginationComponent';

function MarketplacePage(): JSX.Element {
  const dispatch = useDispatch();
  const productState = useSelector(selectProduct);
  const [sortBy, setSortBy] = useState<SortQueryType>(SortQueryType.TIME);
  const [cond, setCond] = useState<ConditionQueryType>(ConditionQueryType.HIGH_LOW);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { total } = productState;

  const handleApplyFilters = (
    sortByValue: SortQueryType, condValue: ConditionQueryType,
  ) => {
    setSortBy(sortByValue);
    setCond(condValue);
    setCurrentPage(1);
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, sortBy, cond }));
    dispatch(getProductCount());
  }, [currentPage, sortBy, cond]);

  return (
    <>
      <CarouselComponent />
      <Row justify="center" className="my-5">
        <Col xxl={16} xl={20} lg={22} md={20} sm={18} xs={22}>
          <Row justify="start" className="mb-3 my-5">
            <Col>
              <ProductFilter onApplyFilters={handleApplyFilters} />
            </Col>
          </Row>

          <ListProducts
            className="mt-5"
            products={productState.list}
          />

          <Row justify="center" className="mb-3 my-5">
            <Col>
              <PaginationComponent
                onPageChange={handlePageChange}
                total={total!}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default MarketplacePage;
