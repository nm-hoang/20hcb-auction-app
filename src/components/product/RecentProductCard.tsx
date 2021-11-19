import React from 'react';
import { Badge } from 'antd';
import ProductCard, { IProductCardProp } from './ProductCard';

export interface IProductCardWithBadgeProps extends IProductCardProp {
  text?: string
}

function RecentProductCard(props: IProductCardWithBadgeProps): JSX.Element {
  const { product, text, isWatching } = props;
  return (
    <Badge.Ribbon text={text ?? 'New'} color="gold">
      <ProductCard product={product} isWatching={isWatching} />
    </Badge.Ribbon>
  );
}

export default RecentProductCard;
