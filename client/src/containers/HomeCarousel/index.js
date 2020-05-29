import React, { Component } from 'react';
import Slider from 'react-slick';
import { Image } from 'semantic-ui-react';
import Carousel1 from '../../images/Carousel1.jpg';
import Carousel2 from '../../images/Carousel2.png';
import Carousel3 from '../../images/Carousel3.jpg';
import Carousel4 from '../../images/Carousel4.jpg';
import Carousel5 from '../../images/Carousel5.jpg';
import Carousel6 from '../../images/Carousel6.png';
import Carousel7 from '../../images/Carousel7.png';
import Carousel8 from '../../images/Carousel8.jpg';

export default class AutoPlay extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 3000,
      cssEase: 'linear',
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <Image src={Carousel1} height="300" width="300" />
          </div>
          <div>
            <Image src={Carousel2} height="300" width="300" />
          </div>
          <div>
            <Image src={Carousel3} height="300" width="300" />
          </div>
          <div>
            <Image src={Carousel4} height="300" width="300" />
          </div>
          <div>
            <Image src={Carousel5} height="300" width="300" />
          </div>
          <div>
            <Image src={Carousel6} height="300" width="300" />
          </div>
          <div>
            <Image src={Carousel7} height="300" width="300" />
          </div>
          <div>
            <Image src={Carousel8} height="300" width="300" />
          </div>
        </Slider>
      </div>
    );
  }
}
