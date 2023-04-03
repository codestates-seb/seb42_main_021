import styled from 'styled-components';

export const ItemLayoutButton = styled.button`
  width: 45%;
  height: 40%;
  :nth-child(2n + 1) {
    margin-right: 30px;
    margin-bottom: 35px;
  }

  margin-bottom: 5px;
`;
export const ItemImgBox = styled.div`
  img {
    width: 100%;
    height: 168px;
    border: 1px solid var(--border);
    border-radius: var(--bd-rd);
    object-fit: cover;
  }
`;
export const ItemBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: 10px;
`;
export const ItemTitleBox = styled.div`
  margin-bottom: 10px;
  text-align: left;
  p {
    font-size: 14px;
  }
  h2 {
    font-size: 18px;
    margin-top: 7px;
  }
`;
export const ItemValueBox = styled.div`
  text-align: left;

  b {
    font-size: 18px;
  }
`;
