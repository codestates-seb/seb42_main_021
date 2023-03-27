import styled from 'styled-components';

export const PageName = styled.h1`
  margin-bottom: 40px;
  padding-bottom: 5px;
  height: 10%;
  border-bottom: 3px solid var(--border);
`;

export const ItemInformationContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
`;

export const ItemInformationBox = styled.div`
  width: 100%;
  > div {
    display: flex;
    margin-bottom: 20px;
    width: 100%;
    > label {
      display: block;
      width: 22%;
    }
    select {
      :focus {
        outline: none;
        border: 1px solid var(--grayblue);
        box-shadow: 0 0 0 5px var(--graywhite);
        border-radius: 4px;
      }
    }
    span {
      margin-left: 5px;
    }
    img {
      width: 350px;
    }
  }
`;

export const ItemDescriptionBox = styled.div`
  margin-bottom: 100px;
  div {
    margin-bottom: 10px;
  }
`;

export const ContentInput = styled.input`
  height: 20px;
  border-radius: 4px;
  margin-right: 10px;
  :focus {
    outline: none;
    border: 1px solid var(--grayblue);
    box-shadow: 0 0 0 5px var(--graywhite);
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 20px;
  z-index: 1000;
  button {
    width: 100px;
    height: 40px;
    border-radius: var(--bd-rd);
    background-color: var(--blue);
    color: var(--white);
  }
`;
