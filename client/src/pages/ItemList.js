import React from 'react';
import Paging from '../components/ui/Pagination';

import Main from '../components/main/Main';
import Footer from '../components/main/Footer';

import CategoryContainer from '../components/itemList/CategoryContainer';
import useItemList from '../components/itemList/useItemList';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import SearchContainer from '../components/itemList/SearchContainer';
import ItemHeaderContainer from '../components/itemList/ItemHeaderContainer';
import ItemBodyContainer from '../components/itemList/ItemBodyContainer';

import { ItemListContainerWrap } from '../components/itemList/ItemList.styled';

const ItemList = () => {
  const { page, count, setPage, setCategoryFilter, categoryFilter } =
    useItemList();

  return (
    <>
      <Main>
        <ItemListContainerWrap>
          <LoadingSpinner />
          <div>
            <SearchContainer />
            <CategoryContainer
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
            <ItemHeaderContainer />
            <ItemBodyContainer />
            <Paging page={page} count={count} setPage={setPage} />
          </div>
          <Footer />
        </ItemListContainerWrap>
      </Main>
    </>
  );
};

export default ItemList;
