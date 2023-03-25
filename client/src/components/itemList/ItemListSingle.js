import React from 'react';
import { useNavigate } from 'react-router-dom';
import { findProductByProductId } from '../../components/api/itemDetailAPI';
import {
  ItemBodyContainer,
  ItemImgBox,
  ItemLayoutButton,
  ItemTitleBox,
  ItemValueBox,
} from './ItemListSingle.styled';

const ItemListSingle = ({ item }) => {
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

export default ItemListSingle;
