import styled from 'styled-components';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paging from '../components/ui/Pagination';

import { FaSistrix } from 'react-icons/fa';

import {
  getProductList,
  searchProductList,
  categoryProductList,
} from '../components/api/itemAPI';
import CategoryContainer from '../components/itemList/CategoryContainer';
import ItemListItem from '../components/itemList/ItemListItem';
import Main from '../components/main/Main';
import Footer from '../components/main/Footer';

const ItemListContainerWrap = styled.div`
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

const SearchContainer = styled.form`
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

const ItemHeaderContainer = styled.div`
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

const ItemBodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-evenly;
  height: 80%;
  margin-top: 20px;
`;

const AdminButton = styled.button``;

const ItemList = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const isSubmitClicked = true;

  const [page, setPage] = useState(0);
  const [count, setCount] = useState(1);
  const size = 10;

  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!searchValue) {
        const getProductListFilter = async () => {
          const response = await getProductList(page, size);
          setItems(response.data.data);
          setCount(response.data.pageInfo.totalElements);
        };
        getProductListFilter();
      }
      setKeyword(searchValue);
    }
  };
  console.log(searchValue);
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAdmin = () => {
    navigate('/admin-item/0', { state: isSubmitClicked });
  };

  useEffect(() => {
    const getProductListFilter = async () => {
      const response = await getProductList(page, size);
      // setItems((prevItems) => [...prevItems, ...response.data.data]);
      setItems(response.data.data);
      setCount(response.data.pageInfo.totalElements);
    };
    getProductListFilter();
  }, [page, size]);

  useEffect(() => {
    if (!categoryFilter) return;
    if (categoryFilter === 'NO_CATEGORY') {
      window.location.reload();
    }
    const categoryProductListFilter = async () => {
      const response = await categoryProductList(categoryFilter);
      // console.log(response.data.data);
      setItems(response.data.data);
      setCount(response.data.data.length);
    };
    categoryProductListFilter();
  }, [categoryFilter]);

  useEffect(() => {
    if (!keyword) return;
    const searchProductListFilter = async () => {
      const response = await searchProductList(keyword);
      console.log(response.data.data);
      setItems(response.data.data);
      setCount(response.data.data.length);
    };
    searchProductListFilter();
  }, [keyword]);

  return (
    <>
      <Main>
        <ItemListContainerWrap>
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
              <AdminButton onClick={handleAdmin}>상품 등록하기</AdminButton>
            </ItemHeaderContainer>
            <ItemBodyContainer>
              {items?.map((item) => (
                <ItemListItem key={item.productId} item={item} />
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
