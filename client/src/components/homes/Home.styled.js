import styled from 'styled-components';

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

export const MainCarouselContentBox = styled.div`
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

export const ExplainLayout = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
`;
export const ExplainContentContainer = styled.div``;
export const ExplainContent2Container = styled.div``;
export const ExplainContentBox = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
export const ContainerBorderTop = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #e8dcdc;
  width: 100%;
  height: 3px;
  border-radius: var(--bd-rd);
`;
