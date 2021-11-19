import React from 'react';
import { Carousel, Image } from 'antd';
import { v4 as uuid } from 'uuid';
import carousel1 from '../../../assets/img/carousel/carousel-1.png';
import carousel2 from '../../../assets/img/carousel/carousel-2.jpeg';
import carousel3 from '../../../assets/img/carousel/carousel-3.jpeg';
import carousel4 from '../../../assets/img/carousel/carousel-4.jpeg';

const images = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
];

function CarouselComponent() {
  return (
    <Carousel autoplay>
      {
        images.map((image) => (
          <Image
            key={uuid()}
            preview={false}
            src={image}
            height="auto"
            width="auto"
          />
        ))
      }
    </Carousel>
  );
}

export default CarouselComponent;
