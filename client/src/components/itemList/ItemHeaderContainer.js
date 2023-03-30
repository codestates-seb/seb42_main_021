import React from 'react';

import useItemList from './useItemList';

import { AdminButton } from './ItemList.styled';

function ItemHeaderContainer() {
  const { adminAccess, handleAdmin } = useItemList();

  return (
    <ItemHeaderContainer>
      <h3>전체 상품</h3>
      {adminAccess && (
        <AdminButton onClick={handleAdmin}>상품 등록하기</AdminButton>
      )}
    </ItemHeaderContainer>
  );
}

export default ItemHeaderContainer;
