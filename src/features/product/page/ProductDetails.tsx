import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Col, Input, InputNumber, Modal,
  Row,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getProduct, patchPlaceBid, selectProduct } from '../productSlice';
import ProductImagesGrid from '../ProductImagesGrid';
import ProductInformationColumn from '../productDetailsPatials/ProductInformationColumn';

const { confirm } = Modal;

function ProductDetails(): JSX.Element {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const productState = useSelector(selectProduct);
  const product = productState.single;
  const inputRef = React.createRef<Input>();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [placePrice, setPlacePrice] = useState<number>(product?.price.currentBid || 0);

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleShowModal = () => setIsVisible(true);

  const handleCancelBid = () => {
    setIsVisible(false);
  };

  const handlePlaceBid = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure to place a bid at ${placePrice}?`,
      onOk() {
        if (product) {
          dispatch(patchPlaceBid({
            productId: product?._id,
            price: placePrice,
          }));
        }
        setIsVisible(false);
      },
    });
  };

  const onPlaceBid = (value: number) => {
    setPlacePrice(Number(value));
  };

  return (
    <>
      <Row justify="center">
        <Col xxl={16} xl={20} lg={22} md={22} sm={22}>
          <Row
            className="my-5"
            gutter={[12, 24]}
            justify="center"
          >
            {!product?.images || <ProductImagesGrid images={product?.images} />}

            {!product || (
            <ProductInformationColumn
              product={product}
              onShowModal={handleShowModal}
            />
            )}
          </Row>
        </Col>
      </Row>

      <Modal
        title="Place a Bid"
        visible={isVisible}
        onOk={handlePlaceBid}
        onCancel={handleCancelBid}
        closable={false}
        centered
      >
        <InputNumber
          className="w-100"
          min={0}
          value={placePrice}
          onChange={onPlaceBid}
          step={product?.price.bidStep}
        />
      </Modal>
    </>
  );
}

export default ProductDetails;
