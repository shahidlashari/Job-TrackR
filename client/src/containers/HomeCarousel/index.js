import React, { Component } from 'react';
import Slider from 'react-slick';
import { Image } from 'semantic-ui-react';
import carousel1 from '../../images/carousel1.jpg';
import carousel2 from '../../images/carousel2.png';
import carousel3 from '../../images/carousel3.jpg';
import carousel4 from '../../images/carousel4.jpg';
import carousel5 from '../../images/carousel5.jpg';
import carousel6 from '../../images/carousel6.png';
import carousel7 from '../../images/carousel7.png';
import carousel8 from '../../images/carousel8.jpg';

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
            <Image src={carousel1} height="350" width="400" />
          </div>
          <div>
            <Image src={carousel2} height="350" width="400" />
          </div>
          <div>
            <Image src={carousel3} height="350" width="400" />
          </div>
          <div>
            <Image src={carousel4} height="350" width="400" />
          </div>
          <div>
            <Image src={carousel5} height="350" width="400" />
          </div>
          <div>
            <Image src={carousel6} height="350" width="400" />
          </div>
          <div>
            <Image src={carousel7} height="350" width="400" />
          </div>
          <div>
            <Image src={carousel8} height="350" width="400" />
          </div>
        </Slider>
      </div>
    );
  }
}
