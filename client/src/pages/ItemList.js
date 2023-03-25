import React from 'react';
import Paging from '../components/ui/Pagination';
import { FaSistrix } from 'react-icons/fa';

import Main from '../components/main/Main';
import Footer from '../components/main/Footer';

import CategoryContainer from '../components/itemList/CategoryContainer';
import ItemListSingle from '../components/itemList/ItemListSingle';
import useItemList from '../components/itemList/useItemList';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import {
  AdminButton,
  ItemBodyContainer,
  ItemHeaderContainer,
  ItemListContainerWrap,
  SearchContainer,
} from '../components/itemList/ItemList.styled';

const ItemList = () => {
  const {
    handleChange,
    handleKeyDown,
    handleAdmin,
    page,
    items,
    count,
    searchValue,
    setPage,
    adminAccess,
    setCategoryFilter,
    categoryFilter,
  } = useItemList();
  return (
    <>
      <Main>
        <ItemListContainerWrap>
          <LoadingSpinner />
          <div>
            <SearchContainer>
              <FaSistrix className="icons" />
              <input
                value={searchValue}
                placeholder="찾으시려는 상품의 이름을 입력 후 Enter 해주세요."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="text"
              />
            </SearchContainer>
            <CategoryContainer
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
            />
            <ItemHeaderContainer>
              <h3>전체 상품</h3>
              {adminAccess && (
                <AdminButton onClick={handleAdmin}>상품 등록하기</AdminButton>
              )}
            </ItemHeaderContainer>
            <ItemBodyContainer>
              {items?.map((item) => (
                <ItemListSingle key={item.productId} item={item} />
              ))}
            </ItemBodyContainer>
            <Paging page={page} count={count} setPage={setPage} />
          </div>
          <Footer />
        </ItemListContainerWrap>
      </Main>
    </>
  );
};

export default ItemList;
