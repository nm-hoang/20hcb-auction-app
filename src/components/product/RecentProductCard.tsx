import React from 'react';
import { Badge } from 'antd';
import ProductCard, { IProductCardProp } from './ProductCard';

export interface IProductCardWithBadgeProps extends IProductCardProp {
  text?: string
}

function RecentProductCard(props: IProductCardWithBadgeProps): JSX.Element {
  const { product, text } = props;
  return (
    <Badge.Ribbon text={text ?? 'New'} color="red">
      <ProductCard product={product} />
    </Badge.Ribbon>
  );
}

export default RecentProductCard;
