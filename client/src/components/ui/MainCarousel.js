import { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from 'react-icons/io5';
import camping from '../../img/camping.jpg';
import camping1 from '../../img/camping1.jpg';
import camping2 from '../../img/camping2.jpg';
import camping4 from '../../img/camping4.jpg';
import camping5 from '../../img/camping5.jpg';
import camping6 from '../../img/camping6.jpg';
import island from '../../img/island.jpg';
import sea from '../../img/sea.jpg';
import { Link } from 'react-router-dom';

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

const TextBox = styled.div`
  position: absolute;
  width: 50px;
  height: 20px;
  border-radius: var(--bd-rd);
  font-size: 12px;
  font-weight: bold;
  background: var(--whitegray200);
  opacity: 0.5;
  text-align: center;
`;
const TextLink = styled(Link)`
  position: absolute;
  top: 20px;
  width: 100px;
  height: 50px;
  color: black;
  margin-top: 10px;
  transform: translate(-50%, -50%);
`;
const ImageBox = styled.div``;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

export default function MainCarousel(props) {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef();
  const slider2 = useRef();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
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
      <StyledSlider
        {...settings}
        asNavFor={nav2}
        ref={(slider1) => setNav2(slider1)}
      >
        <div>
          <TextBox>
            <TextLink className="textLink" to="/product">
              호수
            </TextLink>
          </TextBox>
          <ImageBox>
            <Image src={camping1} />
          </ImageBox>
        </div>
        <div>
          <TextBox>
            <TextLink className="textLink" to="/product">
              섬
            </TextLink>
          </TextBox>
          <ImageBox>
            <Image src={island} />
          </ImageBox>
        </div>
        <div>
          <TextBox>
            <TextLink className="textLink" to="/product">
              산·숲
            </TextLink>
          </TextBox>
          <ImageBox>
            <Image src={camping5} />
          </ImageBox>
        </div>
        <div>
          <TextBox>
            <TextLink className="textLink" to="/product">
              강
            </TextLink>
          </TextBox>
          <ImageBox>
            <Image src={camping} />
          </ImageBox>
        </div>
      </StyledSlider>

      <StyledSlider
        {...settings}
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        <div>
          <TextBox>
            <TextLink to="/product">호수</TextLink>
          </TextBox>
          <ImageBox>
            <Image src={camping1} />
          </ImageBox>
        </div>
        <div>
          <TextBox>
            <TextLink className="textLink" to="/product">
              섬
            </TextLink>
          </TextBox>
          <ImageBox>
            <Image src={island} />
          </ImageBox>
        </div>
        <div>
          <TextBox>
            <TextLink className="textLink" to="/product">
              산·숲
            </TextLink>
          </TextBox>
          <ImageBox>
            <Image src={camping5} />
          </ImageBox>
        </div>
        <div>
          <TextBox>
            <TextLink className="textLink" to="/product">
              강
            </TextLink>
          </TextBox>
          <ImageBox>
            <Image src={camping} />
          </ImageBox>
        </div>
      </StyledSlider>
    </div>
  );
}
