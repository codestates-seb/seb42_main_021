import styled from 'styled-components';
import Main from '../components/main/Main';
import { FaSistrix } from 'react-icons/fa';
import CategoryContainer from '../components/itemList/CategoryContainer';
import { useState } from 'react';
import ItemListItem from '../components/itemList/ItemListItem';
import { useStore } from 'zustand';
import SubHeader from '../components/main/SubHeader';

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
  button {
    padding: 10px;
    margin-left: 380px;
    width: 100px;
    height: 50px;
    background-color: var(--blue);
    border-radius: var(--bd-rd);
    color: var(--white);
    font-size: 12px;
  }
`;
const itemList = [
  {
    itemId: 1,
    subtitle: 'test1',
    title: '1번네임입니다',
    rates: '9%',
    value: '1,490,000원',
  },
  {
    itemId: 2,
    subtitle: 'test2',
    title: '2번네임입니다',
    rates: '16%',
    value: '1억원',
  },
  {
    itemId: 3,
    subtitle: 'test3',
    title: '3번네임입니다',
    rates: '30%',
    value: '10억원',
  },
  {
    itemId: 4,
    subtitle: 'test4',
    title: '4번네임입니다',
    rates: '20%',
    value: '100억원',
  },
];

const ItemBodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 20px;
`;

const ItemList = () => {
  // 5개 종류 Filter
  // const [filterOption, setFilterOption] = useStore(0);

  const [items, setItems] = useState(itemList);
  const [searchValue, setSearchValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setSearchValue(event.target.value);
    }
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filterItemList = items.filter((item) => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  });
  return (
    <>
      <SubHeader />
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
          <CategoryContainer />
          <ItemHeaderContainer>
            <h3>전체 상품</h3>
            <button>상품 등록하기</button>
          </ItemHeaderContainer>
          <ItemBodyContainer>
            {filterItemList.length > 0
              ? filterItemList.map((item) => (
                  <ItemListItem key={item.itemId} list={item} />
                ))
              : items.map((item) => (
                  <ItemListItem key={item.itemId} list={item} />
                ))}
          </ItemBodyContainer>
        </ItemListContainerWrap>
      </Main>
    </>
  );
};

export default ItemList;
