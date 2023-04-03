import styled from 'styled-components';
import { ReactComponent as NotfoundImage } from '../../img/not_found.svg';

export const Main = styled.div`
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

export const NotFoundWrap = styled.div`
  min-width: 100%;
  background-color: var(--black-050);
  position: relative;
  flex: 1 0 auto;
  margin: 0 auto;
  text-align: left;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
`;

export const ImageBox = styled.div`
  width: 195px;
  height: 195px;
  ${NotfoundImage} {
    border-radius: 50%;
  }
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
`;
export const TitleH1 = styled.h1`
  font-size: 27px;
  margin: 20px 0px;
`;

export const TitleP = styled.p`
  font-size: 19px;
  margin-bottom: 24px;
  margin: 20px 0px;
`;
export const TextP = styled.p`
  margin: 20px 0px;
  font-size: 15px;
  a {
    color: hsl(206deg 100% 40%);
    text-decoration: none;
    cursor: pointer;
  }
`;
