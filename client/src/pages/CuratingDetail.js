import { useParams } from 'react-router-dom';
import Location from '../components/mapApi/Location';
import SubCarousel from '../components/ui/SubCarousel';

import Footer from '../components/main/Footer';
import CuratingBodyImg from '../components/curating/CuratingBodyImg';

import { curationList } from '../assets/curationState';
import {
  BodyContentImgBox,
  ContainerBorderTop,
  CuratingBodyContainer,
  CuratingBodyCotentBox,
  CuratingBodyTitleBox,
  CuratingDetailLayout,
  CuratingTitleContainer,
  LocationApiContainer,
  Main,
} from '../components/curating/CuratingDetail.styled';
import locationImg from '../img/location.png';

const CuratingDetail = () => {
  const { id } = useParams();
  const ID = Number(id);
  const carousel = curationList.SubCarouselImg[ID - 1];
  const location = [curationList.mapLocation[ID - 1]];
  const curatingContent = [curationList.curatingContent[ID - 1]];
  // 배열 안에 객체 리스트들로 처리
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
          <div>
            <img src={locationImg} alt="" />
            <p>{location[0].location}</p>
          </div>
          <ContainerBorderTop />
        </LocationApiContainer>
        <CuratingBodyContainer>
          <CuratingBodyImg />
          <CuratingBodyTitleBox>
            <h4>기본정보</h4>
            <ul>
              <li>환경</li>
              <li style={{ marginLeft: '30px' }}>
                {curatingContent[0].titleText1}
              </li>
            </ul>
            <ul>
              <li>매너타임</li>
              <li>{curatingContent[0].titleText2}</li>
            </ul>
          </CuratingBodyTitleBox>
          <CuratingBodyCotentBox>
            <h4>캠핑장 소개</h4>
            <div>
              <p>{curatingContent[0].contentText}</p>
            </div>
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
