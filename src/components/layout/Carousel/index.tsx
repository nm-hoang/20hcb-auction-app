import React from 'react';
import { Carousel, Image } from 'antd';
import carousel1 from '../../../assets/img/carousel/carousel-1.png';
import carousel2 from '../../../assets/img/carousel/carousel-2.jpeg';
import carousel3 from '../../../assets/img/carousel/carousel-3.jpeg';
import carousel4 from '../../../assets/img/carousel/carousel-4.jpeg';

function CarouselComponent() {
  return (
    <Carousel autoplay>
      <Image
        preview={false}
        src={carousel1}
      />
      <Image
        preview={false}
        src={carousel2}
      />
      <Image
        preview={false}
        src={carousel3}
      />
      <Image
        preview={false}
        src={carousel4}
      />
    </Carousel>
  );
}

export default CarouselComponent;
