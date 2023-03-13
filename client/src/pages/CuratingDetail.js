import MainHeader from '../components/main/MainHeader';
import styled from 'styled-components';
import SubCarousel from '../components/ui/SubCarousel';
import locationImg from '../img/location.png';
import Footer from '../components/main/Footer';
import Navigation from '../components/main/Navigation';
import { curationList } from '../assets/curationState';
import { useParams } from 'react-router-dom';
import Location from '../components/mapApi/Location';
import { useState } from 'react';

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
  margin-top: 35px;
  img {
    width: 100%;
    height: 100%;
  }
  h3 {
    font-size: 24px;
  }
  p {
    text-align: right;
    color: var(--midgray);
  }
`;
const LocationApiContainer = styled.div`
  margin-top: 30px;
  h4 {
    margin: 0 10px;
    font-size: 20px;
    margin-bottom: 10px;
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
  .width {
    width: 350px;
  }
  img {
    width: 450px;
    height: 200px;
    background-size: cover;
    margin: 10px;
    border: 1px solid gray;
    border-radius: var(--bd-rd);
  }
  p {
    text-align: center;
    margin: 10px;
  }
`;
const ContainerBorderTop = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #e8dcdc;
  width: 100%;
  height: 3px;
  border-radius: var(--bd-rd);
`;

const CuratingDetail = () => {
  const { id } = useParams();
  const ID = Number(id);

  const [carousel] = useState([curationList.SubCarouselImg[ID - 1]]);
  const [location] = useState([curationList.mapLocation[ID - 1]]);
  const [curatingContent] = useState([curationList.curatingContent[ID - 1]]);
  console.log(location[0].title);
  return (
    <CuratingDetailLayout>
      <MainHeader />
      <Main>
        <SubCarousel carousel={carousel} />
        <CuratingTitleContainer>
          <h3>{location[0].title}</h3>
          <p>출처: {curatingContent[0].subText} </p>
          <ContainerBorderTop />
        </CuratingTitleContainer>
        <LocationApiContainer>
          <h4>위치</h4>
          <Location location={location} />
          <LocationTextBox>
            <img src={locationImg} alt="" />
            <p>{location[0].location}</p>
          </LocationTextBox>
          <ContainerBorderTop />
        </LocationApiContainer>
        <CuratingBodyContainer>
          <CuratingBodyImgBox>
            <img src={curatingContent[0].img} alt="" />
          </CuratingBodyImgBox>
          <CuratingBodyTitleBox>
            <h4>기본정보</h4>
            <BodyTitleTextBox>
              <li>환경</li>
              <li>{curatingContent[0].titleText1}</li>
            </BodyTitleTextBox>
            <BodyTitle2TextBox>
              <li>매너타임</li>
              <li>{curatingContent[0].titleText2}</li>
            </BodyTitle2TextBox>
          </CuratingBodyTitleBox>
          <CuratingBodyCotentBox>
            <h4>캠핑장 소개</h4>
            <BodyContentTextBox>
              <p>{curatingContent[0].contentText}</p>
            </BodyContentTextBox>
            <ContainerBorderTop />
            <BodyContentImgBox>
              <p>{curatingContent[0].contentText2}</p>
              <ContainerBorderTop className="width" />
              <img src={curatingContent[0].contentImg1} alt="" />
              <p>{curatingContent[0].contentText3}</p>
              <ContainerBorderTop className="width" />
              <img src={curatingContent[0].contentImg2} alt="" />
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
