import React from 'react';
import '../assets/Banner.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  fade: true, // add fade transition
};

const Banner = () => {
  return (
    <div className="banner">
      <Slider {...settings}>
        <div>
          <img src={require('../images/yachts-5971866.jpg')} alt="banner" />
          {/* <div className="slogan-overlay">
            <h1>Welcome to Luxury Yacht</h1>
          </div> */}
        </div>
        <div>
          <img
            src={require('../images/pexels-oliver-sjöström-1295036.jpg')}
            alt="banner"
          />
        </div>
        <div>
          <img
            src={require('../images/ron-dauphin-_80Yw7o7hlo-unsplash.jpg')}
            alt="banner"
          />
        </div>
        <div>
          <img
            src={require('../images/alix-greenman-_-qLdvyvBhY-unsplash.jpg')}
            alt="banner"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
