import styled from 'styled-components';
import { ReactComponent as NotfoundImg } from '../img/not_found.svg';

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

export const MainBox = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
`;

export const ContainerBox = styled.div`
  max-width: 1264px;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const NotFoundWrap = styled.div`
  min-width: 100%;
  background-color: var(--black-050);
  position: relative;
  flex: 1 0 auto;
  margin: 0 auto;
  text-align: left;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 195px;
  height: 195px;
  ${NotfoundImg} {
    border-radius: 50%;
  }
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
`;
const TitleH1 = styled.h1`
  font-size: 27px;
  margin: 20px 0px;
`;

const TitleP = styled.p`
  font-size: 19px;
  margin-bottom: 24px;
  margin: 20px 0px;
`;
const TextP = styled.p`
  margin: 20px 0px;
  font-size: 15px;
  a {
    color: hsl(206deg 100% 40%);
    text-decoration: none;
    cursor: pointer;
  }
`;

const NotFound = () => {
  return (
    <Main>
      <NotFoundWrap>
        <ContainerBox>
          <MainBox>
            <ContentBox>
              <ImgBox>
                <NotfoundImg />
              </ImgBox>
              <TextBox>
                <TitleH1>Page not found</TitleH1>
                <TitleP>
                  We&apos;re sorry, we couldn&apos;t find the page you
                  requested.
                </TitleP>

                <TextP>
                  If you feel something is missing that should be here,{' '}
                  <a href="/">contact us.</a>
                </TextP>
              </TextBox>
            </ContentBox>
          </MainBox>
        </ContainerBox>
      </NotFoundWrap>
    </Main>
  );
};

export default NotFound;