import MainHeader from '../components/main/MainHeader';
import styled from 'styled-components';
import SubCarousel from '../components/ui/SubCarousel';
import locationImg from '../img/location.png';
import Footer from '../components/main/Footer';
import Navigation from '../components/main/Navigation';
import { curationList } from '../assets/curationState';
// import background from '../img/background.png';
// import camping from '../img/camping.jpg';
import camping1 from '../img/camping1.jpg';
// import camping2 from '../img/camping2.jpg';
// import camping4 from '../img/camping4.jpg';
// import camping5 from '../img/camping5.jpg';
import Location from '../components/mapApi/Location';
import { useState } from 'react';
// const images = [background, camping, camping1, camping2, camping4, camping5];
// const curatingDetailList = [];

const CuratingDetailLayout = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = styled.div`
  height: 100%;
  width: 530px;
  max-width: 530px;
  background-color: var(--white);
  border-radius: var(--bd-rd);
  /* padding-top: 79px; */
  padding-bottom: 90px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CuratingTitleContainer = styled.div`
  margin: 0 10px;
  margin-top: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  h3 {
    font-size: 24px;
  }
`;
const LocationApiContainer = styled.div`
  margin-top: 20px;
  h4 {
    margin: 0 10px;
    font-size: 20px;
  }
  img {
    width: 25px;
    height: 25px;
  }
`;
const LocationTextBox = styled.div`
  display: flex;
  margin: 20px 10px;
  img {
    margin-right: 10px;
  }
  p {
    font-size: 16px;
  }
`;

const CuratingBodyContainer = styled.div``;
const CuratingBodyImgBox = styled.div`
  img {
    width: 530px;
    height: 530px;
  }
`;

const CuratingBodyTitleBox = styled.div`
  margin: 20px 10px;
  h4 {
    margin: 20px 0;
    font-size: 20px;
  }
`;
const BodyTitleTextBox = styled.ul`
  display: flex;
  margin: 10px 0;
  gap: 100px;
  li {
    :nth-child(2) {
      color: var(--midgray);
    }
  }
`;
const BodyTitle2TextBox = styled.ul`
  display: flex;
  margin: 10px 0;
  gap: 68px;
  li {
    :nth-child(2) {
      color: var(--midgray);
    }
  }
`;

const CuratingBodyCotentBox = styled.div`
  margin: 20px 10px;
  h4 {
    margin: 20px 0;
    font-size: 20px;
  }
`;
const BodyContentTextBox = styled.div`
  p {
    color: var(--midgray);
    margin-bottom: 15px;
  }
`;
const BodyContentImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  img {
    width: 450px;
    height: 200px;
    background-size: cover;
    margin: 10px;
  }
  p {
    text-align: center;
    margin: 10px;
  }
`;
const ContainerBorderTop = styled.p`
  margin-top: 10px;
  margin-bottom: 5px;
  background-color: #e8dcdc;
  width: 100%;
  height: 3px;
  border-radius: var(--bd-rd);
`;
const CuratingDetail = () => {
  const [carousel] = useState(curationList.SubCarouselImg);
  const [location] = useState(curationList.mapLocation);
  const [curatingContent] = useState(curationList.curatingContent);
  console.log(location);
  return (
    <CuratingDetailLayout>
      <MainHeader />
      <Main>
        <SubCarousel carousel={carousel} />
        <CuratingTitleContainer>
          <h3>{location[1].title}</h3>
          <ContainerBorderTop />
        </CuratingTitleContainer>
        <LocationApiContainer>
          <h4>위치</h4>
          <Location />
          <LocationTextBox>
            <img src={locationImg} alt="" />
            <p>{location[1].locationTitle}</p>
          </LocationTextBox>
          <ContainerBorderTop />
        </LocationApiContainer>
        <CuratingBodyContainer>
          <CuratingBodyImgBox>
            <img src={camping1} alt="" />
          </CuratingBodyImgBox>
          <CuratingBodyTitleBox>
            <h4>기본정보</h4>
            <BodyTitleTextBox>
              <li>환경</li>
              <li>{curatingContent[2].titleText1}</li>
            </BodyTitleTextBox>
            <BodyTitle2TextBox>
              <li>매너타임</li>
              <li>{curatingContent[2].titleText2}</li>
            </BodyTitle2TextBox>
          </CuratingBodyTitleBox>
          <CuratingBodyCotentBox>
            <h4>캠핑장 소개</h4>
            <BodyContentTextBox>
              <p>{curatingContent[2].contentText}</p>
            </BodyContentTextBox>
            <ContainerBorderTop />
            <BodyContentImgBox>
              <p>{curatingContent[2].contentText2}</p>
              <img src={curatingContent[2].contentImg1} alt="" />
              <p>{curatingContent[2].contentText3}</p>
              <img src={curatingContent[2].contentImg2} alt="" />
            </BodyContentImgBox>
            <ContainerBorderTop />
          </CuratingBodyCotentBox>
        </CuratingBodyContainer>
        <Footer />
      </Main>
      <Navigation />
    </CuratingDetailLayout>
  );
};

export default CuratingDetail;
