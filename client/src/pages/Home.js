import styled from 'styled-components';
import MainCarousel from '../components/ui/MainCarousel';
import MainBoxL from '../components/ui/MainBoxL';
import MainBoxS from '../components/ui/MainBoxS';
import Footer from '../components/main/Footer';

const Main = styled.div`
  height: 100%;
  width: 530px;
  max-width: 530px;
  background-color: var(--white);
  border-radius: var(--bd-rd);
  padding-bottom: 90px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MainCarouselContentBox = styled.div`
  width: 100%;
  height: 35px;
  margin-top: 20px;
  margin-bottom: 60px;
  color: black;
  text-align: center;
  vertical-align: center;
  line-height: 35px;
  h3 {
    color: black;
  }
`;

const ExplainLayout = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
`;
const ExplainContentContainer = styled.div``;
const ExplainContent2Container = styled.div``;
const ExplainContentBox = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const ContainerBorderTop = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #e8dcdc;
  width: 100%;
  height: 3px;
  border-radius: var(--bd-rd);
`;

const Home = () => {
  return (
    <>
      <Main>
        <MainCarousel />
        <MainCarouselContentBox>
          <h3>
            여러 테마별 장소도 확인하고 용품도 확인하세요 !<br />
            (위에서 원하는 테마를 클릭해주세요.)
          </h3>
        </MainCarouselContentBox>
        <ExplainLayout>
          <ExplainContentContainer>
            <ExplainContentBox>
              <MainBoxS backgroundColor="#ffa800" color="#ffa800">
                함께 떠나는 멋진 오토캠핑!
              </MainBoxS>
              <MainBoxL>
                멋진 오토캠핑을 즐기기 위해 <br />
                필요한 물품들을 모두 챙겨드립니다.
                <br /> 또한, 국내외에서 유명한 캠핑장들도 소개하며, <br />
                오토캠핑의 즐거움을 함께 나누고 있습니다.
                <br /> 함께 멋진 캠핑 여행을 떠나보세요!
              </MainBoxL>
            </ExplainContentBox>
            <ExplainContentBox>
              <MainBoxS backgroundColor="#0165FC" color="#0165FC">
                편안한 자연 속 캠핑, <br />
                저희와 함께하세요!
              </MainBoxS>
              <MainBoxL>
                자연 속에서 편안한 캠핑을 즐기고 싶으신가요? <br />
                오토캠핑을 즐기기 위한 필수 아이템부터 <br />
                여러 가지 유용한 제품까지 <br />
                다양하게 소개하고 있습니다.
                <br />
                저희와 함께 멋진 자연 속 캠핑을 즐겨보세요!
              </MainBoxL>
            </ExplainContentBox>
            <ExplainContentBox>
              <MainBoxS backgroundColor="#024f27" color="#024f27">
                오토캠핑장 소개와 캠핑 물품 <br />
                모두 여기서 만나보세요.
              </MainBoxS>
              <MainBoxL>
                여러분이 캠핑을 즐길 때 필요한 모든 것들을 <br />
                저희와 함께 쉽게 찾아보실 수 있습니다. <br />
                저희와 함께 멋진 캠핑 여행을 계획해보세요!
              </MainBoxL>
            </ExplainContentBox>
          </ExplainContentContainer>
          <ExplainContent2Container>
            <ContainerBorderTop />
            <MainBoxL width="width">
              "자연과 함께하는 캠핑, 즐기면서 나누는 차차박!"
            </MainBoxL>
            <ContainerBorderTop />
          </ExplainContent2Container>
        </ExplainLayout>
        <Footer />
      </Main>
    </>
  );
};

export default Home;
