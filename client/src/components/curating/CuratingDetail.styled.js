import styled from 'styled-components';

export const CuratingDetailLayout = styled.div`
  width: 100%;
  height: 100%;
`;

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

export const CuratingTitleContainer = styled.div`
  margin: 0 10px;
  margin-top: 35px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h3 {
    font-size: 24px;
  }
  p {
    text-align: right;
    color: var(--midgray);
  }
`;
export const LocationApiContainer = styled.div`
  margin-top: 30px;
  h4 {
    margin: 0 10px;
    font-size: 20px;
    margin-bottom: 30px;
  }
  img {
    width: 25px;
    height: 25px;
  }
  div {
    display: flex;
    margin: 20px 10px;
    img {
      margin-right: 10px;
    }
    p {
      font-size: 16px;
    }
  }
`;

export const CuratingBodyContainer = styled.div``;

export const CuratingBodyTitleBox = styled.div`
  margin: 20px 10px;
  h4 {
    margin: 20px 0;
    font-size: 20px;
  }
  ul {
    display: flex;
    margin: 10px 0;
    gap: 65px;
    li {
      :nth-child(2) {
        color: var(--midgray);
      }
    }
  }
`;

export const CuratingBodyCotentBox = styled.div`
  margin: 20px 10px;
  h4 {
    margin: 20px 0;
    font-size: 20px;
  }
  div {
    p {
      color: var(--midgray);
      margin-bottom: 15px;
      font-weight: bold;
      line-height: 200%;
    }
  }
`;

export const BodyContentImgBox = styled.div`
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
    object-fit: cover;
  }
  p {
    text-align: center;
    margin: 10px;
    font-weight: 1000;
    color: black !important;
  }
`;
export const ContainerBorderTop = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #e8dcdc;
  width: 100%;
  height: 3px;
  border-radius: var(--bd-rd) !important;
`;
