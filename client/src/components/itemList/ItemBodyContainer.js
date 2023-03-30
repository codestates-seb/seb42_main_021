import React from 'react';
import useItemList from './useItemList';
import ItemListSingle from './ItemListSingle';

function ItemBodyContainer() {
  const { items } = useItemList();
  return (
    <ItemBodyContainer>
      {items?.map((item) => (
        <ItemListSingle key={item.productId} item={item} />
      ))}
    </ItemBodyContainer>
  );
}

export default ItemBodyContainer;
