import React from 'react';

import { FaSistrix } from 'react-icons/fa';

import useItemList from './useItemList';
import { SearchContainer } from './ItemList.styled';

function Search() {
  const { searchValue, handleChange, onSubmit } = useItemList();
  return (
    <SearchContainer onSubmit={onSubmit}>
      <FaSistrix className="icons" />
      <input
        value={searchValue}
        placeholder="찾으시려는 상품의 이름을 입력 후 Enter 해주세요."
        onChange={handleChange}
        type="text"
      />
      <input type="submit" hidden />
      <button type="submit">제출</button>
    </SearchContainer>
  );
}

export default Search;
