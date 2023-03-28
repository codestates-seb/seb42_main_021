import styled from 'styled-components';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from 'react-icons/io5';

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Pre = styled.div`
  z-index: 3;
  .icon {
    z-index: 100;
    position: absolute;
    left: 150%;
    top: -60%;
    width: 40px;
    height: 40px;
    color: white;
  }
`;
const NextTo = styled.div`
  z-index: 3;
  .icon {
    position: absolute;
    right: 150%;
    top: -60%;
    width: 40px;
    height: 40px;
    color: white;
  }
`;

const ImageBox = styled.div``;

const Image = styled.img`
  width: 530px;
  height: 350px;
  background-size: cover;
  object-fit: cover;
`;

export default function SubCarousel({ carousel }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: (
      <NextTo>
        <IoChevronForwardCircleOutline className="icon" />
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <IoChevronBackCircleOutline className="icon" />
      </Pre>
    ),
  };
  return (
    <div>
      <StyledSlider {...settings}>
        <div>
          <ImageBox>
            <Image src={carousel.img1} />
          </ImageBox>
        </div>
        <div>
          <ImageBox>
            <Image src={carousel.img2} />
          </ImageBox>
        </div>
        <div>
          <ImageBox>
            <Image src={carousel.img3} />
          </ImageBox>
        </div>
        <div>
          <ImageBox>
            <Image src={carousel.img4} />
          </ImageBox>
        </div>
      </StyledSlider>
    </div>
  );
}
