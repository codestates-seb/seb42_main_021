import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { findProductByProductId } from '../../components/api/itemDetailAPI';

const ItemListItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = item.productId;
    const url = `/product/${id}`;
    const responseProductDetail = await findProductByProductId(id);

    navigate(url, { state: { responseProductDetail } });
  };

  return (
    <ItemLayoutButton onClick={handleClick}>
      <ItemImgBox>
        <img src={item.thumbnailImageURL} alt="" />
      </ItemImgBox>
      <ItemBodyContainer>
        <ItemTitleBox>
          <p>{item.subtitle}</p>
          <h2>{item.productName}</h2>
        </ItemTitleBox>
        <ItemValueBox>
          {/* <span>{list.rates} </span> */}
          <b>{Number(item.price).toLocaleString('ko-KR')}원</b>
        </ItemValueBox>
      </ItemBodyContainer>
    </ItemLayoutButton>
  );
};

export default ItemListItem;

const ItemLayoutButton = styled.button`
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
    height: 168px;
    border: 1px solid var(--border);
    border-radius: var(--bd-rd);
    object-fit: cover;
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
  text-align: left;
  p {
    font-size: 16px;
  }
  h2 {
    font-size: 20px;
    margin-top: 7px;
  }
`;
const ItemValueBox = styled.div`
  text-align: left;

  b {
    font-size: 18px;
  }
`;
