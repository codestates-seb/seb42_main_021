import styled from 'styled-components';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getProductList,
  searchProductList,
  categoryProductList,
} from '../components/api/itemAPI';
import CategoryContainer from '../components/itemList/CategoryContainer';
import ItemListItem from '../components/itemList/ItemListItem';
import Main from '../components/main/Main';
import Footer from '../components/main/Footer';
import { FaSistrix } from 'react-icons/fa';

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

const SearchContainer = styled.div`
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
  a {
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
  background-color: whitesmoke;
  margin-top: 20px;
`;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const page = 0; // setState 없을시 useState X
  const size = 10;

  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const filterProductName = items.filter((item) => {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
      })[0];
      setKeyword((previousItems) => [...previousItems, filterProductName]);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const getProductListFilter = async () => {
      const response = await getProductList(page, size);
      console.log(response.data);
      // setItems((prevItems) => [...prevItems, ...response.data]);
      // setItems(response.상품목록);
      setItems(response.data);
    };
    getProductListFilter();
  }, [page, size]);

  useEffect(() => {
    if (categoryFilter.length > 0) {
      const categoryProductListFilter = async () => {
        // console.log(categoryFilter);
        const response = await categoryProductList(categoryFilter);
        // console.log(response.data);
        setItems(response.data);
        // 키: value 형태 X 덮어씌우기 아님, [id]: data
      };
      categoryProductListFilter();
    }
  }, [categoryFilter]);

  useEffect(() => {
    if (keyword.length > 0) {
      const searchProductListFilter = async () => {
        // console.log(keyword);
        const response = await searchProductList(keyword);
        // console.log(response.data);
        setItems(response.상품목록);
        // setItems((prevItems) => [...prevItems, ...response.data]);
        // 키: value 형태 X 덮어씌우기 아님, [id]: data
      };
      searchProductListFilter();
    }
  }, [keyword]);

  return (
    <>
      <Main>
        <ItemListContainerWrap>
          <SearchContainer>
            <FaSistrix className="icons" />
            <input
              value={searchValue}
              placeholder="찾으시려는 상품의 이름을 입력 후 Enter 해주세요."
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </SearchContainer>
          <CategoryContainer
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <ItemHeaderContainer>
            <h3>전체 상품</h3>
            <Link to="/admin-item/:id">상품 등록하기</Link>
          </ItemHeaderContainer>
          <ItemBodyContainer>
            {items?.map((item) => (
              <ItemListItem key={item.productId} item={item} />
            ))}
          </ItemBodyContainer>
          <Footer />
        </ItemListContainerWrap>
      </Main>
    </>
  );
};

export default ItemList;
