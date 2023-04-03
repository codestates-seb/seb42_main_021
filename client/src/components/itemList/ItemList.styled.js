import styled from 'styled-components';

export const ItemListContainerWrap = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchContainer = styled.form`
  display: flex;
  justify-content: center;
  position: relative;
  input {
    width: 500px;
    height: 40px;
    border-radius: var(--bd-rd);
    text-indent: 30px;
    ::placeholder {
      color: var(--gray);
    }
  }
  .icons {
    position: absolute;
    top: 12px;
    left: 10px;
    color: var(--blue);
  }
  img {
    width: 40px;
    height: 40px;
  }
`;

export const ItemHeaderContainer = styled.div`
  margin-top: 35px;
  h3 {
    border-top: 1px solid var(--whtegray);
    margin-left: 15px;
    font-size: 20px;
  }
  button {
    padding: 10px;
    margin-left: 390px;
    width: 100px;
    height: 50px;
    background-color: var(--blue);
    border-radius: var(--bd-rd);
    color: var(--white);
    font-size: 12px;
  }
`;

export const ItemBodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: flex-start;
  height: 80%;
  margin-top: 20px;
  margin-left: 20px;
`;

export const AdminButton = styled.button``;
