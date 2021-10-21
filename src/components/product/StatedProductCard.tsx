import React, { useEffect, useState } from 'react';
import ProductCard, { IProductCardProp } from './ProductCard';
import RecentProductCard from './RecentProductCard';
import { isNewProduct } from '../../helpers/isNewProduct';

export interface IStatedProductCard extends IProductCardProp {}

function StatedProductCard(props: IStatedProductCard): JSX.Element {
  const { product, isWatching } = props;
  const [highlight, setHighlight] = useState<boolean>(false);

  useEffect(() => {
    setHighlight(isNewProduct(product.createdAt, 10));
  }, []);

  return (
    <>
      {
        highlight
          ? <RecentProductCard product={product} isWatching={isWatching} />
          : <ProductCard product={product} isWatching={isWatching} />
      }
    </>
  );
}

export default StatedProductCard;
