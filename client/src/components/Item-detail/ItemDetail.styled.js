import styled from 'styled-components';

export const ImageBox = styled.div`
  width: 100%;
  padding: 30px 0;
  > img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

export const ProductInformation = styled.div`
  display: flex;
  flex-direction: row;
  > button {
    width: 20%;
  }
  > div {
    width: 80%;
    word-break: keep-all;
    #product-name {
      font-size: xx-large;
    }
    #product-price {
      font-size: xx-large;
    }
  }
  > icon {
    width: 20%;
  }
`;

export const ProductDescription = styled.p`
  margin: 10px 0 50px 0;
  word-break: break-all;
  color: ${(props) => props.color};
  img {
    width: 500px;
  }
`;

export const Modal = styled.div`
  position: fixed;
  bottom: 300px;
  right: 0;
  transform: translate(-50%, 0);
  z-index: 999;
  max-width: 300px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--bd-rd);
  > div {
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      > button {
        margin-top: 30px;
        width: 150px;
        height: 40px;
        border-radius: var(--bd-rd);
        background-color: var(--border);
        color: var(--black);
      }
    }
  }
`;

export const ReviewContainer = styled.div`
  > h3 {
    margin: 30px 16px;
    padding: 16px 0;
    border-bottom: 2px solid var(--border);
  }
`;
