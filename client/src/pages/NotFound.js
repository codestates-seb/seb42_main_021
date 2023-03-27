import { ReactComponent as NotfoundImage } from '../img/not_found.svg';

import {
  ContainerBox,
  ContentBox,
  ImageBox,
  Main,
  MainBox,
  NotFoundWrap,
  TextBox,
  TextP,
  TitleH1,
  TitleP,
} from '../components/notFound/NotFound.styled';

const NotFound = () => {
  return (
    <Main>
      <NotFoundWrap>
        <ContainerBox>
          <MainBox>
            <ContentBox>
              <ImageBox>
                <NotfoundImage />
              </ImageBox>
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
