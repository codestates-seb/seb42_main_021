import React from 'react';

import { FaSistrix } from 'react-icons/fa';

import useItemList from './useItemList';
import { SearchContainer } from './ItemList.styled';

function Search() {
  const { searchValue, handleChange, handleKeyDown } = useItemList();
  return (
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
  );
}

export default Search;
