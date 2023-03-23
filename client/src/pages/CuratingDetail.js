import { useParams } from 'react-router-dom';

import Location from '../components/mapApi/Location';
import SubCarousel from '../components/ui/SubCarousel';

import Footer from '../components/main/Footer';
import CuratingBodyImg from '../components/curating/CuratingBodyImg';

import { curationList } from '../assets/curationState';
import locationImg from '../img/location.png';
import {
  BodyContentImgBox,
  BodyContentTextBox,
  BodyTitle2TextBox,
  BodyTitleTextBox,
  ContainerBorderTop,
  CuratingBodyContainer,
  CuratingBodyCotentBox,
  CuratingBodyTitleBox,
  CuratingDetailLayout,
  CuratingTitleContainer,
  LocationApiContainer,
  LocationTextBox,
  Main,
} from '../components/curating/CuratingDetail.styled';

const CuratingDetail = () => {
  const { id } = useParams();
  const ID = Number(id);
  const carousel = curationList.SubCarouselImg[ID - 1];
  const location = [curationList.mapLocation[ID - 1]];
  const curatingContent = [curationList.curatingContent[ID - 1]];

  return (
    <CuratingDetailLayout>
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
          <CuratingBodyImg />
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
    </CuratingDetailLayout>
  );
};

export default CuratingDetail;
