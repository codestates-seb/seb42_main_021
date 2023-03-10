import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import light from '../../img/light.jpg';

const ItemLayout = styled(Link)`
  width: 45%;
  height: 40%;
  :nth-child(2n + 1) {
    margin-right: 30px;
  }
  margin-bottom: 5px;
`;
const ItemImgBox = styled.div`
  img {
    width: 100%;
    height: 100%;
    border: 1px solid var(--border);
    border-radius: var(--bd-rd);
  }
`;
const ItemBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: 10px;
`;
const ItemTitleBox = styled.div`
  margin-bottom: 10px;
  h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  p {
    font-size: 16px;
  }
`;
const ItemValueBox = styled.div`
  span {
    color: rgb(255, 170, 157);
    font-weight: bold;
  }
`;
const ItemListItem = ({ list }) => {
  return (
    <ItemLayout to="/">
      <ItemImgBox>
        <img src={light} alt="" />
      </ItemImgBox>
      <ItemBodyContainer>
        <ItemTitleBox>
          <h2>{list.title}</h2>
          <p>{list.subtitle}</p>
        </ItemTitleBox>
        <ItemValueBox>
          <span>{list.rates} </span>
          <b>{list.value}</b>
        </ItemValueBox>
      </ItemBodyContainer>
    </ItemLayout>
  );
};

export default ItemListItem;
