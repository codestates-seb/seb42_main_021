import MainCarousel from '../components/ui/MainCarousel';
import MainBoxLarge from '../components/ui/MainBoxLarge';
import MainBoxSmall from '../components/ui/MainBoxSmall';
import Footer from '../components/main/Footer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import {
  ContainerBorderTop,
  ExplainContentBox,
  ExplainLayout,
  Main,
  MainCarouselContentBox,
} from '../components/homes/Home.styled';

const Home = () => {
  return (
    <>
      <Main>
        <LoadingSpinner />
        <MainCarousel />
        <MainCarouselContentBox>
          <h3>
            여러 테마별 장소도 확인하고 용품도 확인하세요 !<br />
            (위에서 원하는 테마를 클릭해주세요.)
          </h3>
        </MainCarouselContentBox>
        <ExplainLayout>
          <div>
            <ExplainContentBox>
              <MainBoxSmall backgroundColor="#ffa800" color="#ffa800">
                함께 떠나는 멋진 오토캠핑!
              </MainBoxSmall>
              <MainBoxLarge>
                멋진 오토캠핑을 즐기기 위해 <br />
                필요한 물품들을 모두 챙겨드립니다.
                <br /> 또한, 국내외에서 유명한 캠핑장들도 소개하며, <br />
                오토캠핑의 즐거움을 함께 나누고 있습니다.
                <br /> 함께 멋진 캠핑 여행을 떠나보세요!
              </MainBoxLarge>
            </ExplainContentBox>
            <ExplainContentBox>
              <MainBoxSmall backgroundColor="#0165FC" color="#0165FC">
                편안한 자연 속 캠핑, <br />
                저희와 함께하세요!
              </MainBoxSmall>
              <MainBoxLarge>
                자연 속에서 편안한 캠핑을 즐기고 싶으신가요? <br />
                오토캠핑을 즐기기 위한 필수 아이템부터 <br />
                여러 가지 유용한 제품까지 <br />
                다양하게 소개하고 있습니다.
                <br />
                저희와 함께 멋진 자연 속 캠핑을 즐겨보세요!
              </MainBoxLarge>
            </ExplainContentBox>
            <ExplainContentBox>
              <MainBoxSmall backgroundColor="#024f27" color="#024f27">
                오토캠핑장 소개와 캠핑 물품 <br />
                모두 여기서 만나보세요.
              </MainBoxSmall>
              <MainBoxLarge>
                여러분이 캠핑을 즐길 때 필요한 모든 것들을 <br />
                저희와 함께 쉽게 찾아보실 수 있습니다. <br />
                저희와 함께 멋진 캠핑 여행을 계획해보세요!
              </MainBoxLarge>
            </ExplainContentBox>
          </div>
          <div>
            <ContainerBorderTop />
            <MainBoxLarge width="width">
              "자연과 함께하는 캠핑, 즐기면서 나누는 차차박!"
            </MainBoxLarge>
            <ContainerBorderTop />
          </div>
        </ExplainLayout>
        <Footer />
      </Main>
    </>
  );
};

export default Home;
